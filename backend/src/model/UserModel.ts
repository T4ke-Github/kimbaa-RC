import * as bcrypt from 'bcryptjs';
import { Model, Schema, model } from "mongoose";
import { logger } from "../backlogger";




export interface IUser {
  name: string; // Required
  password: string; // Required
  admin?: boolean; // Optional, default: false
  studentId: number; // Required, unique
  application?: string;
  address?: string;
  email?: string; // Optional
  createdAt?: Date; // Required
  updatedAt?: Date; // Optional
  department?: string; // Optional
  enrolledSince?: Date; // Optional
  CreditPoints?: number; // Optional
  phone?: number; // Optional
}

interface IUserMethods {
  isCorrectPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
//ggf noch Adress verweis hinzufügen
export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  studentId: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      //Validator to check if the length of the studentId is at least 6 by MongoDB
      validator: function (v: number) {
        return v.toString().length >= 6; // studentId muss mindestens 6 Zeichen lang sein
      },
      message: props => `Die studentId muss mindestens 6 Zeichen lang sein, aber Sie haben ${props.value}.`
    }
  },
  application : { type: String },
  address: { type: String },
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
  createdAt: { type: Date},
  updatedAt: { type: Date},
  department: { type: String },
  enrolledSince: { type: String },
  CreditPoints: { type: Number },
  phone: { type: Number },
},{
  timestamps: true,
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});
//Update User only allowed with studentId
UserSchema.pre("findOneAndUpdate", function (next) {
  const query = this.getQuery();

  if (!query.studentId) {
    const error = new Error("Updates dürfen nur über die studentId erfolgen.");
    return next(error);
  }

  next(); // Fortfahren, wenn studentId vorhanden ist
});
UserSchema.pre("updateOne", function (next) {
  const query = this.getQuery();

  if (!query.studentId) {
    const error = new Error("Updates dürfen nur über die studentId erfolgen.");
    return next(error);
  }
  next(); // Fortfahren, wenn studentId vorhanden ist
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
