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
  finalSemester: { type: String, required: true },
  name: { type: String, required: true },
  degreeProgram: { type: String, required: true },
  department: { type: String },
  email: { type: String, required: true },
  adress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  extension: 
    {
      frage: { type: String, required: true },
      antwort: { type: String, required: false },
    },
  datum: { type: Date, required: true },
});

// Modell für den application auf Zulassung
export const AntragZulassung = model<IAntragZulassung, AntragZulassungModel>("AntragZulassung", AntragZulassungSchema);
