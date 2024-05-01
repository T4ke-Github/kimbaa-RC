import { UserResource } from "../Resources"; // This should be your resource interface for User
import { User } from "../model/UserModel";
import { AntragZulassung } from "../model/AntragZulassungModel";
import { logger } from "../backlogger";
import * as bcrypt from 'bcryptjs';
import { Types } from "mongoose";

/**
 * Holt alle Benutzer, ohne Passwörter zurückzugeben.
 */
export async function getAlleUser(): Promise<UserResource[]> {
    logger.info("UserService.getAlleUser wird gestartet");
    const users = await User.find({}).exec();
    const userResources: UserResource[] = users.map(user => ({
        id: user.id,
        name: user.name,
        password: user.password,
        admin: user.admin,
        matrikelnummer: user.matrikelnummer,
        email: user.email,
        ersteAnmeldung: user.ersteAnmeldung,
        letzteAnmeldung: user.letzteAnmeldung,
        pwAnderungDatum: user.pwAnderungDatum,
        fehlerhafteAnmeldeversuche: user.fehlerhafteAnmeldeversuche,
        fachbereich: user.fachbereich,
        immatrikuliertSeit: user.immatrikuliertSeit,
        CreditPoints: user.CreditPoints,
        telefon: user.telefon
    }));
    return userResources; 
}

/**
 * Erstellt einen neuen Benutzer, überprüft erforderliche Felder.
 */
export async function createUser(userResource: UserResource): Promise<UserResource> {
    logger.info("UserService.createUser wird gestartet");

    if(!userResource.name || !userResource.password) {
        logger.error("createUser: Name oder Passwort fehlt");
        throw new Error("Name oder Passwort fehlt");
    }

    const user = await User.create({
        ...userResource,
        password: await bcrypt.hash(userResource.password, 10) // Verschlüsseltes Passwort speichern
    });

    logger.info("UserService.createUser: Benutzer erstellt mit ID: " + user.id);
    return user; 
}

/**
 * Aktualisiert einen Benutzer, einschließlich Passwortänderungen.
 */
export async function updateUser(userResource: UserResource): Promise<UserResource> {
    logger.info("UserService.updateUser wird gestartet");

    if (!userResource.id) {
        logger.error("updateUser: Benutzer-ID fehlt");
        throw new Error("Benutzer-ID fehlt");
    }

    const user = await User.findById(userResource.id).exec();

    if (user) {
        user.name = userResource.name || user.name;
        user.email = userResource.email || user.email;
        user.admin = userResource.admin ?? user.admin;

        if (userResource.password) {
            const hashedPassword = await bcrypt.hash(userResource.password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        logger.info("UserService.updateUser: Benutzer aktualisiert mit ID: " + user.id);
        return user;
    } else {
        throw new Error("Benutzer nicht gefunden.");
    }
}

/**
 * Löscht einen Benutzer anhand der ID.
 */
export async function deleteUser(id: string): Promise<void> {
    logger.info("UserService.deleteUser wird gestartet");
    try {
        const user = await User.findById(id).exec();

        if (user) {
            logger.info("UserService.deleteUser: Benutzer gefunden und bereit zu löschen: " + user.name);
            await AntragZulassung.deleteMany({ ersteller: user._id }); // Löscht verbundene Daten
            await user.deleteOne({ _id: new Types.ObjectId(id) });
            logger.info("UserService.deleteUser: Benutzer gelöscht: " + user.name);
        } else {
            throw new Error("Benutzer nicht gefunden.");
        }
    } catch (error) {
        logger.error("Fehler beim Löschen des Benutzers: " + error);
        throw new Error("Fehler beim Löschen des Benutzers.");
    }
}
