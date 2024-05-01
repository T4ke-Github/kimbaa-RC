export type USERResource = {
    name: string;
    password: string;
    admin: boolean;
    matrikelnummer: number;
    antrag: {
        date: Date;
        approved: boolean;
    };
    adress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    email: string;
    ersteAnmeldung: Date;
    letzteAnmeldung: Date;
    pw_ÄnderungDatum: Date;
    fehlerhafteAnmeldeversuche: number;
    fachbereich: string;
    immatrikuliertSeit: Date;
    CreditPoints: number;
    telefon: number;
}

