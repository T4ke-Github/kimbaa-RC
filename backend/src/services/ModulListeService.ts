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
