import { ModulResource } from "../Resources";
import { logger } from "../logger/serviceLogger";
import { ModulList } from "../model/ModulListModel";
import { Modul } from "../model/ModulModel";
import { User } from "../model/UserModel";
/**
 * Gibt alle Module in einer ModulList zurück.
 * Wenn die ModulList nicht gefunden wurde, wird ein Fehler geworfen.
 */
export async function getAlleModule(modulListId: string): Promise<ModulResource[]> {
    logger.info("Modul.Service.getAlleModule wird gestartet");
    const modulList = await ModulList.findById(modulListId).exec();
    if (!modulList) {
        logger.info("getAlleModule: keine gültige ID");
        throw new Error("getAlleModule: keine gültige ID");
    } else {
        logger.info("modulListId: " + modulListId);
        const alleModule = await Modul.find({ modulList: modulListId }).exec();
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
        const user = await User.findById(modul.creator).exec();

        const modulResource: ModulResource = {
            id: modul.id,
            creator: user?.id.toString(),
            modulList: modul.modulList.toString() || '',
            modulnumber: modul.modulnumber,
            modulname: modul.modulname,
            creditPoints: modul.creditPoints,
            solved: modul.solved,
            required: modul.required,
        };
        return modulResource;
    } else {
        logger.info("getModul: Modul mit ID ${id} nicht gefunden.");
        throw new Error("getModul: Modul mit ID ${id} nicht gefunden.");
    }
}

/**
 * Erzeugt ein Modul.
 * Daten, die berechnet werden aber in der gegebenen Ressource gesetzt sind, werden ignoriert.
 * Falls die ModulList geschlossen ist, wird ein Fehler geworfen.
 */
export async function createModul(modulResource: ModulResource): Promise<ModulResource> {
    const user = await User.findById(modulResource.creator).exec();
    if (!user) {
        throw new Error(`createModul: No user found with id ${modulResource.creator}`);
    }
    const modulList = await ModulList.findById(modulResource.modulList).exec();
    if (!modulList) {
        throw new Error(`createModul: No modulList found with id ${modulResource.modulList}`);
    }

    const modul = await Modul.create({
        creator: user.id,
        modulList: modulResource.modulList,
        Modulnumber: modulResource.modulnumber!,
        Modulname: modulResource.modulname!,
        CreditPoints: modulResource.creditPoints
    });

    return {
        id: modul.id,
        creator: user.id,
        modulList: modulList.id,
        modulnumber: modul.modulnumber,
        modulname: modul.modulname,
        creditPoints: modul.creditPoints
    }
}

/**
 * Updated ein Modul. Es können nur Modulnummer, Modulname und CreditPoints geändert werden.
 */
export async function updateModul(modulResource: ModulResource): Promise<ModulResource> {
    const modul = await Modul.findById(modulResource.id).exec();

    if (modul !== null) {
        const user = await User.findById(modul.creator).exec();
        const modulList = await ModulList.findById(modul.modulList).exec();

        modul.modulnumber = modulResource.modulnumber!;
        modul.modulname = modulResource.modulname!;
        if (modulResource.creditPoints) {
            modul.creditPoints = modulResource.creditPoints;
        }

        const updated = await modul.save();

        return {
            id: modul.id,
            creator: user?.id,
            modulList: modulList?.id || '',
            modulnumber: updated.modulnumber,
            modulname: updated.modulname,
            creditPoints: updated.creditPoints
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
