import { Application, IApplication } from "../model/AntragZulassungModel";
import { logger } from "../logger/serviceLogger";
import { ApplicationResource } from "../Resources";
import { User } from "../model/UserModel";

export async function createApplication(applicationResource: ApplicationResource): Promise<IApplication> {
    logger.info("AntragZulassungService.createApplication wird gestartet");

    try {
        const application = new Application(applicationResource);
        await application.save();
        logger.info("AntragZulassungService.createApplication: Antrag erstellt mit ID: " + application.id);
        return application;
    } catch (error) {
        logger.error("AntragZulassungService: Create : " + error);
        throw new Error("Antrag Erstellung Fehler: " + error);
    }
}

export async function getApplicationById(id: string): Promise<IApplication | null> {
    logger.info("AntragZulassungService.getApplicationById wird gestartet");
    //find user by id
    const user = await User.findById({ _id: id}).exec();

    if (user) {
        
        try {
            const application = await Application.findOne({creator: {$eq: user.id}}).exec();
            if (application === null) {
                return null;
            }
            logger.info("AntragZulassungService.getApplicationById: Antrag gefunden mit ID: " + application.id);
            return application;
        } catch (error) {
            logger.error("AntragZulassungService: Get : " + error);
            throw new Error("Fehler beim Abrufen des Antrags: " + error);
        }
    } else {
        throw new Error("User nicht gefunden.");
    }
}

export async function updateApplication(applicationResource: ApplicationResource): Promise<IApplication> {
    logger.info("AntragZulassungService.updateApplication wird gestartet");

    const application = await Application.findById(applicationResource.id).exec();

    if (application && application !== null) {
        Object.assign(application, applicationResource);
        await application.save();
        logger.info("AntragZulassungService.updateApplication: Antrag aktualisiert mit ID: " + application.id);
        return application;
    } else {
        throw new Error("Antrag nicht gefunden.");
    }
}

export async function deleteApplication(id: string): Promise<void> {
    logger.info("AntragZulassungService.deleteApplication wird gestartet");

    const application = await Application.findById(id).exec();

    if (application === null) {
        throw new Error("Antrag nicht gefunden.");
    }
    if (application !== null) {
        logger.info("AntragZulassungService.deleteApplication: Antrag gefunden und bereit zu löschen: " + application.id);
        await application.deleteOne();
        logger.info("AntragZulassungService.deleteApplication: Antrag gelöscht: " + application.id);
    }
}
