// In ModuleListe.ts
import { Model, Schema, Types, model } from "mongoose";
import { User } from "../model/UserModel";



export interface IModulList extends Document {
  student: Types.ObjectId;
  studentId: string;
  course: string;
  datum: Date;
  updatedAt?: Date;
}
type ModulListModel = Model<IModulList>;

const ModulListSchema: Schema = new Schema({
  student: { type:Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  studentId: { type: String, required: false, unique: true },
  course: { type: String, required: true },
  datum: { type: Date, required: true, timestamps: true },
  updatedAt: { type: Date, required: false, timestamps: true },
});

ModulListSchema.pre('save', async function(next) {
  if (this.isModified('student')) {
    const user = await User.findById(this.student);
    if (user) {
      this.studentId = user.studentId;
    }
  }
  next();
});

export const ModulList = model<IModulList, ModulListModel>('ModulList', ModulListSchema);
