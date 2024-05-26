import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { User, IUser } from "../../src/model/UserModel";


let user: HydratedDocument<IUser>;
beforeEach(async () => {
    user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    })
    await user.save();
})
//create modulList
test("ModulList.test create ModulList", async () => {
    logger.info("ModulList.test create ModulList wird gestartet");
    const modulliste = new ModulList({
        creator: user.id,
        course: "Medieninformatik",
        datum: new Date(),
    })
    await modulliste.save();
    const foundlist = await ModulList.findById(modulliste.id);
    expect(foundlist).not.toBeNull();
    expect(foundlist!.studentId).toBe("123456");
    logger.info("ModulList.test create ModulList wurde beendet");
})

test("ModulList.test remove ModulList", async () => {
    logger.info("ModulList.test remove ModulList wird gestartet");
    const modulliste = new ModulList({
        creator: user.id,
        course: "Medieninformatik",
        datum: new Date(),
    })
    await modulliste.save();
    //check if exist
    expect(await ModulList.findOne({ studentId: user.studentId })).not.toBeNull();
    //delete
    await ModulList.deleteOne({ studentId: user.studentId });
    expect(await ModulList.findOne({ studentId: user.studentId })).toBeNull();
    logger.info("ModulList.test remove ModulList wurde beendet");
})
//protokoll ändern
test("ModulList.test change ModulList", async () => {
    logger.info("ModulList.test change ModulList wird gestartet");
    const modulliste = new ModulList({
        creator: user.id,
        course: "Medieninformatik",
        datum: new Date(),
    })
    await modulliste.save();
    modulliste.course = "Informatik";
    await modulliste.save();
    expect(modulliste.course).toBe("Informatik");
    expect(modulliste.studentId).toBe("123456");
    logger.info("ModulList.test change ModulList wurde beendet");
})

//protokoll ohne datum wirft fehler
test("ModulList.test change ModulList without date", async () => {
    logger.info("ModulList.test change ModulList without date wird gestartet");
    try {
        await ModulList.updateOne({ studentId: user.studentId }, { course: "Informatik" });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
})