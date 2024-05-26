import { ModulListResource } from "../Resources";
import { User } from "../model/UserModel";
import { ModulList } from "../model/ModulListModel";
import { Modul } from "../model/ModulModel";
import { dateToString, stringToDate } from "./ServiceHelper";
import { logger } from "../logger/serviceLogger";

export async function getModulListe(studentId: string): Promise<ModulListResource> {
    logger.info("getModulListe wird gestartet");
    const modulliste = await ModulList.findById({ studentId: studentId }).exec();
    if (modulliste) {
        const userId = await User.findById({studentId: studentId }).exec();
        if (userId) {
            const listmodule = await Modul.find({ student: modulliste.id }).exec();
            const allCredits = listmodule.reduce((sum, modul) => sum + modul.CreditPoints, 0);

            const modulListResource: ModulListResource = {
                id: modulliste.id,
                student_id: userId?.id,
                studentId: userId?.studentId,
                course: modulliste.course,
                datum: dateToString(modulliste.datum),
                updatedAt: modulliste.updatedAt ? dateToString(modulliste.updatedAt) : undefined,
            };
            return modulListResource;

        }else{
            logger.info("userId nicht gefunden");
            throw new Error("userId nicht gefunden");
        }
        

    }
    else {
        logger.info("modulListe nicht gefunden");
        throw new Error("modulListe nicht gefunden");
    }

}

export async function createModulListe(modulListResource: ModulListResource): Promise<ModulListResource> {
    logger.info("createModulListe wird gestartet");

    try {
        const user = await User.findById({ studentId:  modulListResource.student_id }).exec();

        const modulliste = await ModulList.create({
            id: modulListResource.id,
            student_id: user?.id,
            studentId: user?.studentId,
            course: modulListResource.course,
            datum: new Date(),
            updatedAt: new Date(),
        })
        const datum = new Date();
        const updatedAt = modulListResource.updatedAt ? stringToDate(modulListResource.updatedAt) : datum;
        return { id: modulliste.id,
            student_id: user?.id,
            studentId: user?.studentId as string,
            course: modulliste.course,
            datum: dateToString(modulliste.datum),
            updatedAt: dateToString(updatedAt),
        };

    } catch (error) {
        throw new Error("Fehler beim Erstellen der ModulListe: " + error);
        
    }

}

export async function updateModulListe(modulListResource: ModulListResource): Promise<ModulListResource> {
    logger.info("updateModulListe wird gestartet");

    // Die ID muss korrekt verwendet werden
    const modulliste = await ModulList.findById(modulListResource.id).exec();
    const user = await User.findById(modulListResource.studentId).exec();

    if (modulliste !== null && user !== null) {
        // Aktualisieren der Modulliste mit neuen Werten
        if (modulListResource.course) {
            modulliste.course = modulListResource.course.toString();
        }
        if (modulListResource.datum) {
            modulliste.datum = stringToDate(modulListResource.datum);
        }
        modulliste.updatedAt = new Date();
        
        // Speichern der aktualisierten Modulliste
        const updated = await modulliste.save();
        
        return {
            id: updated.id,
            student_id: user.id,
            studentId: user.studentId.toString(),
            course: updated.course,
            datum: dateToString(updated.datum),
            updatedAt: updated.datum.toString(),
        };
    } else {
        logger.info("modulListe nicht gefunden");
        throw new Error("modulListe nicht gefunden");
    }
}

export async function deleteModulListe(id: string): Promise<void> {
    logger.info("ModulListe.Service.deleteModulListe wird gestartet");

    // Find the ModulList by ID
    const modulListe = await ModulList.findById(id).exec();
    if (!modulListe) {
        throw new Error("ModulListeService: deleteModulListe: ModulListe nicht gefunden");
    }

    // Delete all dependent modules (if such a relationship exists)
    // Assuming there might be a collection of Modul that references ModulList by modulListeId
    // await Modul.deleteMany({ modulListeId: id }).exec(); // Uncomment and modify if needed

    // Delete the ModulList by ID
    await ModulList.findByIdAndDelete(id).exec();

    logger.info(`ModulListe und zugehörige Module wurden gelöscht: ${id}`);
}