import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { IModul, Modul } from "../../src/model/ModulModel";
import { User, IUser } from "../../src/model/UserModel";

let user: HydratedDocument<IUser>;
let ModuleListe: HydratedDocument<IModulList>;
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
    ModuleListe = new ModulList({
        student: user.id,
        course: "Medieninformatik",
        datum: new Date(),
    })
    await ModuleListe.save();
})
//Create Modul with 5creditpoints
test("Modul.test create Modul", async () => {
    logger.info("Modul.test create Modul wird gestartet");
    const modul = new Modul({
        student: user.id,
        modulliste: ModuleListe.id,
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    })
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.Modulnummer).toBe("123456");
    expect(modul.Modulname).toBe("test");
    expect(modul.CreditPoints).toBe(5);
    logger.info("Modul.test create Modul wurde beendet");
})
//remove
test("Modul.test remove Modul", async () => {
    logger.info("Modul.test remove Modul wird gestartet");
    const modul = new Modul({
        student: user.id,
        modulliste: ModuleListe.id,
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ Modulnummer: "123456" })).not.toBeNull();
    //delete
    await Modul.deleteOne({ Modulnummer: "123456" });
    expect(await Modul.findOne({ Modulnummer: "123456" })).toBeNull();
    logger.info("Modul.test remove Modul wurde beendet");
})
//change
test("Modul.test change Modul", async () => {
    logger.info("Modul.test change Modul wird gestartet");
    const modul = new Modul({
        student: user.id,
        modulliste: ModuleListe.id,
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ Modulnummer: "123456" })).not.toBeNull();
    //change
    await Modul.updateOne({ Modulnummer: "123456" }, { Modulname: "test2" });
    const changemodul = await Modul.findOne({ Modulnummer: "123456" });
    expect(changemodul!.Modulname).toBe("test2");
    logger.info("Modul.test change Modul wurde beendet");
})
//modul without creditpoints works
test("Modul.test change Modul without creditpoints", async () => {
    logger.info("Modul.test change Modul without creditpoints wird gestartet");
    const modul = new Modul({
        student: user.id,
        modulliste: ModuleListe.id,
        Modulnummer: "123456",
        Modulname: "test",
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ Modulnummer: "123456" })).not.toBeNull();
    //change
    await Modul.updateOne({ Modulnummer: "123456" }, { Modulname: "test2" })
    logger.info("Modul.test change Modul without creditpoints wurde beendet")

})

