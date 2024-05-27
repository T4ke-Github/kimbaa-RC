
import fs from 'fs';
import { Types } from "mongoose";
import path from 'path';
import { UserResource } from "../Resources"; // This should be your resource interface for User
import { logger } from "../logger/serviceLogger";
import { AntragZulassung } from "../model/AntragZulassungModel";
import { User } from "../model/UserModel";
import * as modulListService from "./ModulListService";
import * as modulService from "./ModulService";
import { dateToString } from './ServiceHelper';


//createModulListfromJson
async function createModulListFromJson(userId: string) {
    try {
        // Pfad zur JSON-Datei backend\modulListe.json
        const jsonPath = path.resolve(__dirname, '..', 'MedieninformatikmodulListe.json');
        logger.info("jsonPath: " + jsonPath);

        // Lese die JSON-Datei
        const jsonData = fs.readFileSync(jsonPath, 'utf-8');

        // Parse die JSON-Daten
        const modulData = JSON.parse(jsonData);

        // Erstelle eine neue Modulliste für den Benutzer
        const modulListResource = {
            creator: userId,
            course: 'Medieninformatik', // Setze dies auf den tatsächlichen Kurs des Benutzers
        };
        const newModulList = await modulListService.createModulList(modulListResource);

        // Gehe durch alle Module in der JSON-Datei und erstelle sie für den Benutzer
        for (const category in modulData) {
            for (const modul of modulData[category]) {
                if (!modul.Modulnummer) {
                    logger.error('Modul hat keine Modulnummer: ' + JSON.stringify(modul));
                    continue;
                }

                const modulResource = {
                    creator: userId,
                    modulList: newModulList.id,
                    Modulnumber: modul.Modulnummer, // Achte auf die Groß-/Kleinschreibung
                    Modulname: modul.Modulname,
                    CreditPoints: 0, // Setze dies auf die tatsächliche Anzahl der Kreditpunkte für das Modul
                };

                logger.info("Creating modulResource: " + JSON.stringify(modulResource)); // Debug-Log

                try {
                    await modulService.createModul(modulResource);
                    logger.info("ModulResource created: " + JSON.stringify(modulResource));
                } catch (error) {
                    logger.error('Error creating module: ' + JSON.stringify(modulResource) + '. Error: ' + error);
                }
            }
        }
    } catch (error) {
        logger.error('Error: ' + error);
    }
}
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
        course: user.course || undefined,
    }));
    return userResources; 
}
//getOne by studentid or email
export async function getOneUser(identifier: { studentId?: string; email?: string }): Promise<UserResource> {
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
            course: user.course || undefined,
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
            course: userResource.course,
        })
    
        await user.save();
        //create ModulList for user if course is Medieninformatik
        if (user.course === "Medieninformatik") {
            try {
                await createModulListFromJson(user.id);
                logger.info("ModulList created for user: " + user.id);
            } catch (error) {
                logger.error('Fehler beim Erstellen der Modulliste: ' + error);
                throw new Error('Fehler beim Erstellen der Modulliste: ' + error);
            }
        }
        
        const datum = new Date(); 
        const updatedAt = userResource.updatedAt ? new Date(userResource.updatedAt) : datum;
    
    
        return { id: user.id,
            name: user.name,
            admin: user.admin || false,
            studentId: user.studentId,
            email: user.email,
            createdAt: userResource.createdAt,
            updatedAt: dateToString(updatedAt),
            course: user.course,
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

        const user = await User.findById(id).exec();

        if (user === null || user.name === null) {
            throw new Error("Benutzer nicht gefunden.");
        }
        if (user !== null) {
            logger.info("UserService.deleteUser: Benutzer gefunden und bereit zu löschen: " + user.name);
            await AntragZulassung.deleteMany({ creator: user._id }); // Löscht verbundene Daten
            await user.deleteOne({ _id: new Types.ObjectId(id) });
            logger.info("UserService.deleteUser: Benutzer gelöscht: " + user.name);
        }

}
