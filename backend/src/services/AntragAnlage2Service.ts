import { IAntragAnlage2, AntragAnlage2 } from "../model/AntragAnlage2Model";
import { logger } from "../logger/serviceLogger";
import { AntragAnlage2Resource } from "../Resources";

export async function createAntragAnlage2(resource: AntragAnlage2Resource): Promise<IAntragAnlage2> {
    logger.info("Creating AntragAnlage2");
    const anlage2 = new AntragAnlage2(resource);
    await anlage2.save();
    return anlage2;
}

export async function getAntragAnlage2ById(id: string): Promise<IAntragAnlage2 | null> {
    logger.info("Fetching AntragAnlage2 by ID");
    return AntragAnlage2.findById(id).exec();
}

export async function updateAntragAnlage2(resource: AntragAnlage2Resource): Promise<IAntragAnlage2 | null> {
    logger.info("Updating AntragAnlage2");
    const anlage2 = await AntragAnlage2.findById(resource.id).exec();
    if (anlage2) {
        Object.assign(anlage2, resource);
        await anlage2.save();
        return anlage2;
    }
    return null;
}

export async function deleteAntragAnlage2(id: string): Promise<void> {
    logger.info("Deleting AntragAnlage2");
    await AntragAnlage2.findByIdAndDelete(id).exec();
}
