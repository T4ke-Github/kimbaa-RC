export type UserResource = {
    id?: string;
    name: string;
    password?: string;
    admin: boolean;
    studentId: number;
    email: string;
    firstLogin: Date;
    lastLogin: Date;
    pwChangeDate: Date;
    failedLoginCount: number;
    department: string;
    enrolledSince: Date;
    CreditPoints: number;
    phone: number;
}

export type applicationZulassungResource = {
    creator: string;
    attach1id: string;
    attach2id: string;
    finalSemester: string;
    name: string;
    degreeProgram: string;
    department: string;
    email: string;
    adresse: AdressResource;
    fragen: applicationZulassungKontrollfragenResource[];
    datum: Date;
}

export type AdressResource = {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export type applicationZulassungKontrollfragenResource = {
    dummy_frage: string;
    dummy_antwort: string;
}

