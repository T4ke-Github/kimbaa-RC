// In Module.ts
import mongoose, { Document, Schema } from 'mongoose';


export interface IModul extends Document {
  Modulnummer: string;
  Modulname: string;
  CreditPoints?: number;
}

const ModulSchema: Schema = new Schema({
  Modulnummer: { type: String, required: true },
  Modulname: { type: String, required: true },
  CreditPoints: { type: Number, default: 0 },
});

export const Modul = mongoose.model<IModul>('Modul', ModulSchema);
