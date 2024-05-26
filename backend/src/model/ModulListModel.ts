// In ModuleListe.ts
import { Model, Schema, Types, model } from "mongoose";
import { User } from "../model/UserModel";



export interface IModulList extends Document {
  creator: Types.ObjectId;
  studentId: string;
  course: string;
  datum: Date;
  updatedAt?: Date;
}
type ModulListModel = Model<IModulList>;

const ModulListSchema: Schema = new Schema({
  creator: { type:Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: false, unique: true },
  course: { type: String, required: true },
  datum: { type: Date, required: true, timestamps: true },
  updatedAt: { type: Date, required: false, timestamps: true },
});

ModulListSchema.pre('save', async function(next) {
  const user = await User.findById(this.creator).exec();
  if (user) {
    this.studentId = user.studentId;
  }
  next();
});

export const ModulList = model<IModulList, ModulListModel>('ModulList', ModulListSchema);
