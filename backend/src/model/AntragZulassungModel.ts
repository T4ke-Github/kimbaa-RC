import { Model, Schema, Types, model } from "mongoose";

// UserData schema for the UserData of the applicant
export interface IUserData {
  lastName: string; // Required | Nachname
  firstName: string; // Required | Vorname
  street: string; // Straße
  city: string; // Stadt
  postalCode: string; // Postleitzahl
  country: string; // Land
  email: string; // Required | E-Mail
  phone: string; // Required | Telefon
}

// Schema for the UserData
const UserDataSchema = new Schema<IUserData>({
  lastName: { type: String, required: true }, // Nachname
  firstName: { type: String, required: true }, // Vorname
  street: { type: String, required: true }, // Straße
  city: { type: String, required: true }, // Stadt
  postalCode: { type: String, required: true }, // Postleitzahl
  country: { type: String, required: true }, // Land
  email: { type: String, required: true }, // E-Mail
  phone: { type: String, required: true }, // Telefon
});

// Interface for the application model
export interface IApplication {
  creator: Types.ObjectId; // Required | Ersteller
  attach1id: Types.ObjectId; // Optional | Anlage 1 ID
  attach2id: Types.ObjectId; // Optional | Anlage 2 ID
  matriculationNumber: string; // Required | Matrikelnummer
  department: string; // Required | Fachbereich
  course: string; // Required | Studiengang
  bachelor: boolean; // Required | Bachelor
  master: boolean; // Required | Master
  userData: IUserData; // Required | Benutzerdaten
  internshipCompleted: boolean; // Required | Praxisphase abgeschlossen
  recognitionApplied: boolean; // Required | Anerkennung beantragt
  internshipCompletedFrom: Date; // Required | Praxisphase abgeleistet von
  internshipCompletedTo: Date; // Required | Praxisphase abgeleistet bis
  modulesCompleted: boolean; // Required | Module abgeschlossen
  modulesPending: boolean; // Required | Module ausstehend
  attachment2Included: boolean; // Required | Anlage 2 beigefügt
  topicSuggestion: boolean; // Required | Thema vorgeschlagen
  date: Date; // Required | Datum
}

// Type for the application model
type ApplicationModel = Model<IApplication>;

// Schema for the application model
const ApplicationSchema = new Schema<IApplication>({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Ersteller
  attach1id: { type: Schema.Types.ObjectId, ref: "Attachment", required: false }, // Anlage 1 ID
  attach2id: { type: Schema.Types.ObjectId, ref: "Attachment", required: false }, // Anlage 2 ID
  matriculationNumber: { type: String, required: true }, // Matrikelnummer
  department: { type: String, required: true }, // Fachbereich
  course: { type: String, required: true }, // Studiengang
  bachelor: { type: Boolean, required: true }, // Bachelor
  master: { type: Boolean, required: true }, // Master
  userData: { type: UserDataSchema, required: true }, // Benutzerdaten
  internshipCompleted: { type: Boolean, required: true, default: false }, // Praxisphase abgeschlossen
  recognitionApplied: { type: Boolean, required: false, default: false }, // Anerkennung beantragt
  internshipCompletedFrom: { type: Date, required: false }, // Praxisphase abgeleistet von
  internshipCompletedTo: { type: Date, required: false }, // Praxisphase abgeleistet bis
  modulesCompleted: { type: Boolean, required: true, default: false }, // Module abgeschlossen
  modulesPending: { type: Boolean, required: true, default: false }, // Module ausstehend
  attachment2Included: { type: Boolean, required: true, default: false }, // Anlage 2 beigefügt
  topicSuggestion: { type: Boolean, required: true, default: false }, // Thema vorgeschlagen
  date: { type: Date, required: true }, // Datum
},{
  timestamps: true,
});

// Model for the application for admission
export const Application = model<IApplication, ApplicationModel>("Application", ApplicationSchema);
