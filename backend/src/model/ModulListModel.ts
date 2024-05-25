// In ModuleListe.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IModul } from './ModulModel';

export interface IModulList extends Document {
  studentId: number;
  modules: IModul['_id'][]; // Referenz auf die Module
}

const ModulListSchema: Schema = new Schema({
  studentId: { type: Number, required: true, unique: true },
  modules: [{ type: Schema.Types.ObjectId, ref: 'Modul' }],
});

export const ModulList = mongoose.model<IModulList>('ModulList', ModulListSchema);
