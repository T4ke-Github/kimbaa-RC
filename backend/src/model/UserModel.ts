import * as bcrypt from 'bcryptjs';
import { logger } from "../backlogger";
import mongoose, { Schema, model, Model } from "mongoose";




export interface IUser {
  name: string; // Required
  password: string; // Required
  admin: boolean; // Optional, default: false
  matrikelnummer: number; // Required, unique
  email: string; // Optional
  ersteAnmeldung: Date; // Required
  letzteAnmeldung: Date; // Optional
  pwAnderungDatum: Date; // Required
  fehlerhafteAnmeldeversuche: number; // Required, default: 0
  fachbereich: string; // Optional
  immatrikuliertSeit: Date; // Optional
  CreditPoints: number; // Optional
  telefon: number; // Optional
}

interface IUserMethods {
  isCorrectPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
//ggf noch Adress verweis hinzufügen
export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true, unique: false },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  matrikelnummer: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      //Validator to check if the length of the matrikelnummer is at least 6 by MongoDB
      validator: function (v: number) {
        return v.toString().length >= 6; // Matrikelnummer muss mindestens 6 Zeichen lang sein
      },
      message: props => `Die Matrikelnummer muss mindestens 6 Zeichen lang sein, aber Sie haben ${props.value}.`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        const regex = /@bht-berlin.de$/;
        logger.info(regex.test(v));
        logger.info(v);
        return regex.test(v);
      },
      message: (props) => `Die E-Mail-Adresse muss mit '@bht-berlin.de' enden, aber Sie haben '${props.value}'.`,
    },
  },
  ersteAnmeldung: { type: Date, required: false },
  letzteAnmeldung: { type: Date },
  pwAnderungDatum: { type: Date, required: true },
  fehlerhafteAnmeldeversuche: { type: Number, default: 0 },
  fachbereich: { type: String },
  immatrikuliertSeit: { type: Date },
  CreditPoints: { type: Number },
  telefon: { type: Number },
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});
//Update User only allowed with Matrikelnummer
UserSchema.pre("findOneAndUpdate", function (next) {
  const query = this.getQuery();

  if (!query.matrikelnummer) {
    const error = new Error("Updates dürfen nur über die Matrikelnummer erfolgen.");
    return next(error);
  }

  next(); // Fortfahren, wenn Matrikelnummer vorhanden ist
});
UserSchema.pre("updateOne", function (next) {
  const query = this.getQuery();

  if (!query.matrikelnummer) {
    const error = new Error("Updates dürfen nur über die Matrikelnummer erfolgen.");
    return next(error);
  }

  next(); // Fortfahren, wenn Matrikelnummer vorhanden ist
});




UserSchema.methods.isCorrectPassword = async function (password: string) {
  try {
    if (password === this.password) {
      logger.info("Fehler das Passwort ist der gespeicherte Hash.");
      return false;
    }

    const isMatch = await bcrypt.compare(password, this.password);
    if (isMatch) {
      logger.info("Passwort ist korrekt.");
      return true;
    } else {
      logger.info("Passwort ist falsch.");
      return false;
    }
  } catch (error) {
    logger.error("Fehler beim Vergleichen des Passworts: " + error);
    throw error;
  }
};

export const User = model<IUser, UserModel>("User", UserSchema);
