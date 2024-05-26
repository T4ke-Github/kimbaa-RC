import { ModulResource } from "../Resources";
import { Modul } from "../model/ModulModel";
import { User } from "../model/UserModel";
import { ModulList } from "../model/ModulListModel";
import { dateToString } from "./ServiceHelper";
import { logger } from "../logger/serviceLogger";
/**
 * Gibt alle Module in einer ModulListe zurück.
 * Wenn die ModulListe nicht gefunden wurde, wird ein Fehler geworfen.
 */
export async function getAlleModule(modulListeId: string): Promise<ModulResource[]> {
    logger.info("Modul.Service.getAlleModule wird gestartet");
    const modulListe = await ModulList.findById(modulListeId).exec();
    if (!modulListe) {
        logger.info("keine gültige ID");
        throw new Error("keine gültige ID");
    } else {
        logger.info("modulListeId: " + modulListeId);
        const alleModule = await Modul.find({ modulliste: modulListeId }).exec();
        let module: ModulResource[] = [];
        for (let i = 0; i < alleModule.length; i++) {
            module[i] = await getModul(alleModule[i]?.id);
        }

        return module;
    }
}

/**
 * Liefert die ModulResource mit angegebener ID.
 * Falls kein Modul gefunden wurde, wird ein Fehler geworfen.
 */
export async function getModul(id: string): Promise<ModulResource> {
    logger.info("Modul.Service.getModul wird gestartet");
    const modul = await Modul.findById(id).exec();
    logger.info("modul: " + modul);
    if (modul) {
        const user = await User.findById(modul.student).exec();
        logger.info("Modul mit ID ${id} gefunden.");
        logger.info("user: " + user);
        logger.info("studentId: " + modul.student);
        logger.info("studentName: " + user?.name);
        const modulResource: ModulResource = {
            id: modul.id,
            studentid: user?.id.toString() || '',
            modulliste: modul.modulliste.toString() || '',
            Modulnumber: modul.Modulnumber,
            Modulname: modul.Modulname,
            CreditPoints: modul.CreditPoints
        };
        return modulResource;
    } else {
        logger.info("Modul mit ID ${id} nicht gefunden.");
        throw new Error("Modul mit ID ${id} nicht gefunden.");
    }
}

/**
 * Erzeugt ein Modul.
 * Daten, die berechnet werden aber in der gegebenen Ressource gesetzt sind, werden ignoriert.
 * Falls die ModulListe geschlossen ist, wird ein Fehler geworfen.
 */
export async function createModul(modulResource: ModulResource): Promise<ModulResource> {
    const user = await User.findById(modulResource.studentid).exec();
    if (!user) {
        throw new Error(`No user found with id ${modulResource.studentid}`);
    }
    const modulListe = await ModulList.findById(modulResource.modulliste).exec();
    if (!modulListe) {
        throw new Error(`No modulListe found with id ${modulResource.modulliste}`);
    }

    const modul = await Modul.create({
        student: user.id,
        modulliste: modulResource.modulliste,
        Modulnummer: modulResource.Modulnumber!,
        Modulname: modulResource.Modulname!,
        CreditPoints: modulResource.CreditPoints
    });

    return {
        id: modul.id,
        studentid: user.id,
        modulliste: modulListe.id,
        Modulnumber: modul.Modulnumber,
        Modulname: modul.Modulname,
        CreditPoints: modul.CreditPoints
    }
}

/**
 * Updated ein Modul. Es können nur Modulnummer, Modulname und CreditPoints geändert werden.
 */
export async function updateModul(modulResource: ModulResource): Promise<ModulResource> {
    const modul = await Modul.findById(modulResource.id).exec();

    if (modul !== null) {
        const user = await User.findById(modul.student).exec();
        const modulListe = await ModulList.findById(modul.modulliste).exec();

        modul.Modulnumber = modulResource.Modulnumber!;
        modul.Modulname = modulResource.Modulname!;
        modul.CreditPoints = modulResource.CreditPoints;

        const updated = await modul.save();

        return {
            id: modul.id,
            studentid: user?.id || '',
            modulliste: modulListe?.id || '',
            Modulnumber: updated.Modulnumber,
            Modulname: updated.Modulname,
            CreditPoints: updated.CreditPoints
        };
    } else {
        throw new Error("No ModulID: " + modulResource.id + " found");
    }
}

/**
 * Beim Löschen wird das Modul über die ID identifiziert. 
 * Falls es nicht gefunden wurde (oder aus anderen Gründen nicht gelöscht werden kann), wird ein Fehler geworfen.
 */
export async function deleteModul(id: string): Promise<void> {
    const modul = await Modul.findById(id).exec();
    if(modul){
        await Modul.deleteOne({ _id: id }).exec();
    }else{
        throw new Error("Fehler beim Loeschen des Moduls");
    }
}
