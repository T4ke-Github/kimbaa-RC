import { Schema, model, Types, Model } from "mongoose";

// Adressschema für die Adresse des Antragstellers
export interface IAdress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// Interface für das Kontrollfragen-Objekt im Antrag
export interface IAntragZulassungKontrollfragen {
  frage: string;
  antwort: string;
}

// Interface für das Antragsmodell
export interface IAntragZulassung {
  ersteller: Types.ObjectId; // Required
  anlage_1_id: Types.ObjectId; // Optional
  anlage_2_id: Types.ObjectId; // Optional
  zielsemester: string; // Required
  name: string; // Required
  studiengang: string; // Required
  fachbereich: string; // Optional
  email: string; // Required
  adresse: IAdress; // Required
  fragen: IAntragZulassungKontrollfragen[]; // Optional
  datum: Date; // Required
}

// Typ für das Antragsmodell
type AntragZulassungModel = Model<IAntragZulassung>;

// Schema für das Antragsmodell
const AntragZulassungSchema = new Schema<IAntragZulassung>({
  ersteller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  anlage_1_id: { type: Schema.Types.ObjectId, ref: "Anlage", required: false },
  anlage_2_id: { type: Schema.Types.ObjectId, ref: "Anlage", required: false },
  zielsemester: { type: String, required: true },
  name: { type: String, required: true },
  studiengang: { type: String, required: true },
  fachbereich: { type: String },
  email: { type: String, required: true },
  adresse: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  fragen: [
    {
      frage: { type: String, required: true },
      antwort: { type: String, required: false },
    },
  ],
  datum: { type: Date, required: true },
});

// Modell für den Antrag auf Zulassung
export const AntragZulassung = model<IAntragZulassung, AntragZulassungModel>("AntragZulassung", AntragZulassungSchema);
