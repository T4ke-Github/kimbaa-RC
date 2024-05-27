export type UserResource = {
    id?: string;
    name?: string;
    password?: string;
    admin?: boolean;
    studentId?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    course?: string;
}
export type ModulResource = {
    id?: string;
    creator?: string;
    modulList?: string;
    modulnumber?: string;
    modulname?: string;
    creditPoints?: number;
    solved?: boolean;
    required?: boolean;
}

export type ModulListResource = {
    id?: string;
    creator?: string;
    studentId?: string;
    course?: string;
    datum?: string;
    updatedAt?: string;
    allCredits?: number;
}


export type applicationZulassungResource = {
    creator?: string;
    attach1id?: string;
    attach2id?: string;
    finalSemester?: string;
    name?: string;
    degreeProgram?: string;
    course?: string;
    department?: string;
    email?: string;
    adresse?: AdressResource;
    fragen?: applicationZulassungKontrollfragenResource[];
    datum?: Date;
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

export type LoginResource = {
    id: string
    role: "a"|"u"
    /** Expiration time in seconds since 1.1.1970 */
    exp: number
}