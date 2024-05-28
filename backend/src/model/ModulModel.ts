// In Module.ts
import { Model, Schema, Types, model } from "mongoose";


export interface IModul extends Document {
    creator: Types.ObjectId;
    modulList: Types.ObjectId;
    modulnumber?: string;
    modulname?: string;
    creditPoints?: number;
    solved?: boolean;
    required?: boolean;
}
type ModulModel = Model<IModul>;

const ModulSchema: Schema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: false    },
    modulList: { type: Schema.Types.ObjectId, ref: 'ModulList', required: false},
    modulnumber: { type: String, required: false },
    modulname: { type: String, required: false },
    creditPoints: { type: Number, default: 0 },
    solved: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
});

export const Modul = model<IModul, ModulModel>('Modul', ModulSchema);
