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
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: false    },
    modulList: { type: Schema.Types.ObjectId, ref: 'ModulList', required: false},
    Modulnumber: { type: String, required: false },
    Modulname: { type: String, required: false },
    CreditPoints: { type: Number, default: 0 },
});

export const Modul = model<IModul, ModulModel>('Modul', ModulSchema);
