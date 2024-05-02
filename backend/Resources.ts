export type UserResource = {
    id?: string;
    name: string;
    password?: string;
    admin: boolean;
    matrikelnummer: number;
    email: string;
    ersteAnmeldung: Date;
    letzteAnmeldung: Date;
    pwAnderungDatum: Date;
    fehlerhafteAnmeldeversuche: number;
    fachbereich: string;
    immatrikuliertSeit: Date;
    CreditPoints: number;
    telefon: number;
}

export type AntragZulassungResource = {
    ersteller: string;
    anlage_1_id: string;
    anlage_2_id: string;
    zielsemester: string;
    name: string;
    studiengang: string;
    fachbereich: string;
    email: string;
    adresse: AdressResource;
    fragen: AntragZulassungKontrollfragenResource[];
    datum: Date;
}

export type AdressResource = {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export type AntragZulassungKontrollfragenResource = {
    dummy_frage: string;
    dummy_antwort: string;
}

