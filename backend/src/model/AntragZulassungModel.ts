import { Model, Schema, Types, model } from "mongoose";

// Adressschema für die Adresse des AntragsSteller
export interface IAdress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// Interface für das Kontrollfragen-Objekt im AntragZulassung
export interface IAntragZulassungKontrollfragen {
  frage: string;
  antwort: string;
}

// Interface für das applicationsmodell
export interface IAntragZulassung {
  creator: Types.ObjectId; // Required
  attach1id: Types.ObjectId; // Optional
  attach2id: Types.ObjectId; // Optional
  finalSemester: string; // Required
  name: string; // Required
  degreeProgram: string; // Required
  department: string; // Optional
  email: string; // Required
  adress: IAdress; // Required
  extension: IAntragZulassungKontrollfragen[]; // Optional
  datum: Date; // Required
}

// Typ für das applicationsmodell
type AntragZulassungModel = Model<IAntragZulassung>;

// Schema für das applicationsmodell
const AntragZulassungSchema = new Schema<IAntragZulassung>({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  attach1id: { type: Schema.Types.ObjectId, ref: "Anlage", required: false },
  attach2id: { type: Schema.Types.ObjectId, ref: "Anlage", required: false },
  finalSemester: { type: String, required: false },
  name: { type: String, required: false },
  degreeProgram: { type: String, required: false },
  department: { type: String },
  email: { type: String, required: false },
  adress: { type: String, required: false },
  extension: 
    {
      frage: { type: String, required: false },
      antwort: { type: String, required: false },
    },
  datum: { type: Date, required: false },
});

// Modell für den application auf Zulassung
export const AntragZulassung = model<IAntragZulassung, AntragZulassungModel>("AntragZulassung", AntragZulassungSchema);
