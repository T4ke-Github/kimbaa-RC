import { ModulListResource } from "../Resources";
import { logger } from "../logger/serviceLogger";
import { ModulList } from "../model/ModulListModel";
import { Modul } from "../model/ModulModel";
import { User } from "../model/UserModel";
import { dateToString, stringToDate } from "./ServiceHelper";

export async function getModulList(studentId: string): Promise<ModulListResource> {
    logger.info("getModulList wird gestartet");
    const modulList = await ModulList.findById({ studentId: studentId }).exec();
    if (modulList) {
        const userId = await User.findById({studentId: studentId }).exec();
        if (userId) {
            const listmodule = await Modul.find({ student: modulList.id }).exec();
            const allCredits = listmodule.reduce((sum, modul) => sum + modul.CreditPoints, 0);

            const modulListResource: ModulListResource = {
                id: modulList.id,
                creator: userId?.id,
                studentId: userId?.studentId,
                course: modulList.course,
                datum: dateToString(modulList.datum),
                updatedAt: modulList.updatedAt ? dateToString(modulList.updatedAt) : undefined,
            };
            return modulListResource;

        }else{
            logger.info("userId nicht gefunden");
            throw new Error("userId nicht gefunden");
        }
        

    }
    else {
        logger.info("modulList nicht gefunden");
        throw new Error("modulList nicht gefunden");
    }

}

export async function createModulList(modulListResource: ModulListResource): Promise<ModulListResource> {
    logger.info("createModulList wird gestartet");

    try {
        const user = await User.findById(modulListResource.creator).exec();

        const modulList = await ModulList.create({
            id: modulListResource.id,
            creator: user?.id,
            studentId: user?.studentId,
            course: modulListResource.course,
            datum: new Date(),
            updatedAt: new Date(),
        })
        const datum = new Date();
        const updatedAt = modulListResource.updatedAt ? stringToDate(modulListResource.updatedAt) : datum;
        return { id: modulList.id,
            creator: user?.id.toString(),
            studentId: user?.studentId,
            course: modulList.course,
            datum: dateToString(modulList.datum),
            updatedAt: dateToString(updatedAt),
        };

    } catch (error) {
        throw new Error("Fehler beim Erstellen der ModulList: " + error);
        
    }

}

export async function updateModulList(modulListResource: ModulListResource): Promise<ModulListResource> {
    logger.info("updateModulList wird gestartet");
    let modulList;
    let user;

    // Die ID muss korrekt verwendet werden
    if(modulListResource.id){
        modulList = await ModulList.findById(modulListResource.id).exec();
    }
    if(!modulList && modulListResource.creator){
        modulList = await ModulList.findOne({ creator: modulListResource.creator }).exec();
    }
    if (!modulList && modulListResource.studentId) {
        user = await User.findOne({ studentId: modulListResource.studentId }).exec();
        if (user) {
            modulList = await ModulList.findOne({ creator: user.id }).exec();
        }
    }

    if (modulList) {
        // Wenn der Benutzer noch nicht definiert ist, suchen Sie ihn anhand der studentId in der Modulliste
        if (!user) {
            user = await User.findOne({ studentId: modulList.studentId }).exec();
        }

        // Aktualisieren der Modulliste mit neuen Werten
        if (modulListResource.course) {
            modulList.course = modulListResource.course;
        }
        if (modulListResource.datum) {
            modulList.datum = stringToDate(modulListResource.datum);
        }
        modulList.updatedAt = new Date();
        
        // Speichern der aktualisierten Modulliste
        const updated = await modulList.save();
        
        return {
            id: updated.id,
            creator: user ? user.id : 'N/A',
            studentId: user ? user.studentId.toString() : 'N/A',
            course: updated.course,
            datum: dateToString(updated.datum),
            updatedAt: updated.updatedAt ? updated.updatedAt.toISOString() : new Date().toISOString(),
        };
    } else {
        logger.info("ModulListService: updateModulList: modulList nicht gefunden");
        throw new Error("ModulListService: updateModulList: modulList nicht gefunden");
    }
}

export async function deleteModulList(id: string): Promise<void> {
    logger.info("ModulList.Service.deleteModulList wird gestartet");

    // Find the ModulList by ID
    const modulList = await ModulList.findById(id).exec();
    if (!modulList) {
        throw new Error("ModulListService: deleteModulList: ModulList nicht gefunden");
    }

    // Delete all dependent modules (if such a relationship exists)
    // Assuming there might be a collection of Modul that references ModulList by modulListId
    // await Modul.deleteMany({ modulListId: id }).exec(); // Uncomment and modify if needed

    // Delete the ModulList by ID
    await ModulList.findByIdAndDelete(id).exec();

    logger.info(`ModulList und zugehörige Module wurden gelöscht: ${id}`);
}