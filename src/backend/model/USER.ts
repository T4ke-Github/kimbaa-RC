import * as bcrypt from 'bcryptjs';
//import { logger } from "../../src/logger";
import mongoose, { Schema, model, Model } from "mongoose";

export interface IAdress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IAntragZulassung {
  date: Date;
  approved: boolean;
}

export interface IUser {
  name: string; // Required, unique
  password: string; // Required
  admin: boolean; // Optional, default: false
  matrikelnummer: number; // Required, unique
  antrag: IAntragZulassung; // Required
  adress: IAdress; // Required
  email: string; // Optional
  ersteAnmeldung: Date; // Required
  letzteAnmeldung: Date; // Optional
  pw_änderungDatum: Date; // Required
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

export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  matrikelnummer: { type: Number, required: true, unique: true },
  antrag: {
    date: { type: Date, required: true },
    approved: { type: Boolean, required: true },
  },
  adress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: { type: String },
  ersteAnmeldung: { type: Date, required: true },
  letzteAnmeldung: { type: Date },
  pw_änderungDatum: { type: Date, required: true },
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
