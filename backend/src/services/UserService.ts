import * as bcrypt from 'bcryptjs';
import { Types } from "mongoose";
import { UserResource } from "../Resources"; // This should be your resource interface for User
import { logger } from "../backlogger";
import { User } from "../model/UserModel";
import { AntragZulassung } from "../model/AntragZulassungModel";
import { dateToString } from './ServiceHelper';

/**
 * Holt alle Benutzer, ohne Passwörter zurückzugeben.
 */
export async function getAlleUser(): Promise<UserResource[]> {
    logger.info("UserService.getAlleUser wird gestartet");
    const users = await User.find({}).exec();
    const userResources: UserResource[] = users.map(user => ({
        id: user.id,
        name: user.name,
        admin: user.admin || false,
        studentId: user.studentId,
        application: user.application || undefined,
        address: user.address || undefined,
        email: user.email,
        department: user.department || undefined,
        CreditPoints: user.CreditPoints || undefined,
        phone: user.phone || undefined
    }));
    return userResources; 
}
//getOne by studentid or email
export async function getOneUser(identifier: { studentId?: number; email?: string }): Promise<UserResource> {
    logger.info("UserService.getOneUser wird gestartet");

    try {
        let user = null;

        if (identifier.studentId) {
            user = await User.findOne({ studentId: identifier.studentId }).exec();
        } else if (identifier.email) {
            user = await User.findOne({ email: identifier.email }).exec();
        } else {
            throw new Error("Either studentId or email must be provided");
        }

        if (user === null) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            name: user.name,
            admin: user.admin || false,
            studentId: user.studentId,
            email: user.email,
            department: user.department || undefined,
            CreditPoints: user.CreditPoints || undefined,
            phone: user.phone || undefined
        };
    } catch (error) {
        throw new Error("Fehler beim Abrufen des Benutzers: " + error);
    }
}
/**
 * Erstellt einen neuen Benutzer, dont give back the password.
 */
export async function createUser(userResource: UserResource): Promise<UserResource> {
    logger.info("UserService.createUser wird gestartet");

    try {
        const user = new User({
            name: userResource.name,
            email: userResource.email,
            studentId: userResource.studentId,
            password: userResource.password,
        })
    
        await user.save();
        const datum = new Date(); 
        const updatedAt = userResource.updatedAt ? new Date(userResource.updatedAt) : datum;
    
    
        return { id: user.id,
            name: user.name,
            admin: user.admin || false,
            studentId: user.studentId,
            email: user.email,
            createdAt: userResource.createdAt,
            updatedAt: dateToString(updatedAt),
            department: user.department,
            enrolledSince: user.enrolledSince ? dateToString(user.enrolledSince) : undefined,
            CreditPoints: user.CreditPoints,
        };
    } catch (error) {
        logger.error("UserService: Create : " + error);
        throw new Error("User Creation error: " + error);
    }
    
}

/**
 * Aktualisiert einen Benutzer, einschließlich Passwortänderungen.
 */
export async function updateUser(userResource: UserResource): Promise<UserResource> {
    logger.info("UserService.updateUser wird gestartet");

    const user = await User.findById(userResource.id).exec();

    if (user && user !== null) {
        if (userResource.name) user.name = userResource.name;
        if (userResource.studentId) user.studentId = userResource.studentId;
        if (userResource.email) user.email = userResource.email;
        if (userResource.admin !== undefined) user.admin = userResource.admin;
        if (userResource.password) user.password = userResource.password;

        await user.save();
        logger.info("UserService.updateUser: Benutzer aktualisiert mit ID: " + user.id);
        return { id: user.id, name: user.name, admin: user.admin, studentId: user.studentId, email: user.email };
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
            await AntragZulassung.deleteMany({ creator: user._id }); // Löscht verbundene Daten
            await user.deleteOne({ _id: new Types.ObjectId(id) });
            logger.info("UserService.deleteUser: Benutzer gelöscht: " + user.name);
        }
    } catch (error) {
        logger.error("Fehler beim Löschen des Benutzers: " + error);
        throw new Error("Fehler beim Löschen des Benutzers.");
    }
}
