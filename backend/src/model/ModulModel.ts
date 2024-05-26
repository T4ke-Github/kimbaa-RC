// In Module.ts
import { Model, Schema, Types, model } from "mongoose";


export interface IModul extends Document {
    creator: Types.ObjectId;
    modulList: Types.ObjectId;
    Modulnumber: string;
    Modulname: string;
    CreditPoints: number;
}
type ModulModel = Model<IModul>;

const ModulSchema: Schema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    modulList: { type: Schema.Types.ObjectId, ref: 'ModulList', required: true, unique: true },
    Modulnumber: { type: String, required: true },
    Modulname: { type: String, required: true },
    CreditPoints: { type: Number,require: true, default: 0 },
});

export const Modul = model<IModul, ModulModel>('Modul', ModulSchema);
