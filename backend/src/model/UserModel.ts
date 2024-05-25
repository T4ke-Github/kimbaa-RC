import * as bcrypt from 'bcryptjs';
import { Model, Schema, model } from "mongoose";





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
}

interface IUserMethods {
  isCorrectPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;
//ggf noch Adress verweis hinzufügen
export const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  //mqaximum length 100
  name: { type: String, required: true, maxlength: 100 },
  password: { type: String, required: true, maxlength: 100 },
  admin: { type: Boolean, default: false },
  studentId: {
    type: Number,
    required: true,
    unique: true,
    min: 100000,  // Mindestwert für eine 6-stellige Zahl
    max: 999999,  // Höchstwert für eine 6-stellige Zahl
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

        return regex.test(v);
      },
      message: (props) => `Die E-Mail-Adresse muss mit '@bht-berlin.de' enden, aber Sie haben '${props.value}'.`,
    },
  },
  createdAt: { type: Date},
  updatedAt: { type: Date},
  department: { type: String },
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

    if (password === this.password) {
      
      return false;
    }

    const isMatch = await bcrypt.compare(password, this.password);
    if (isMatch) {
      return true;
    } else {
      return false;
    }

};

export const User = model<IUser, UserModel>("User", UserSchema);
