import * as bcrypt from 'bcryptjs';
//import { logger } from "../../src/logger";
import mongoose, { Schema, model, Model } from "mongoose";


export interface IUser {
  name: string; // Required, unique
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
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  matrikelnummer: { type: Number, required: true, unique: true },
  email: { type: String },
  ersteAnmeldung: { type: Date, required: true },
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

UserSchema.methods.isCorrectPassword = async function (password: string) {
  try {
    if (password === this.password) {
      //logger.info("Fehler das Passwort ist der gespeicherte Hash.");
      return false;
    }

    const isMatch = await bcrypt.compare(password, this.password);
    if (isMatch) {
      //logger.info("Passwort ist korrekt.");
      return true; 
    } else {
      //logger.info("Passwort ist falsch.");
      return false; 
    }
  } catch (error) {
    //logger.error("Fehler beim Vergleichen des Passworts: " + error);
    throw error;
  }
};

export const User = model<IUser, UserModel>("User", UserSchema);
