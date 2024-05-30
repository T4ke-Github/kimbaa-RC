import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { IUser, User } from "../../src/model/UserModel";

let user: HydratedDocument<IUser>;
let moduleList: HydratedDocument<IModulList>;
beforeEach(async () => {
    user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: "123456",
        email: "test@bht-berlin.de",
        course: "test",
    })
    await user.save();
    moduleList = new ModulList({
        creator: user.id,
        course: "Medieninformatik",
        datum: new Date(),
    })
    await moduleList.save();
})
//Create Modul with 5creditpoints
test("Modul.test create Modul", async () => {
    logger.info("Modul.test create Modul wird gestartet");
    const modul = new Modul({
        creator: user.id,
        modulList: moduleList.id,
        modulnumber: "123456",
        modulname: "test",
        creditPoints: 5,
    })
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.modulnumber).toBe("123456");
    expect(modul.modulname).toBe("test");
    expect(modul.creditPoints).toBe(5);
    logger.info("Modul.test create Modul wurde beendet");
})
//remove
test("Modul.test remove Modul", async () => {
    logger.info("Modul.test remove Modul wird gestartet");
    const modul = new Modul({
        creator: user.id,
        modulList: moduleList.id,
        modulnumber: "123456",
        modulname: "test",
        creditPoints: 5,
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ modulnumber: "123456" })).not.toBeNull();
    //delete
    await Modul.deleteOne({ modulnumber: "123456" });
    expect(await Modul.findOne({ modulnumber: "123456" })).toBeNull();
    logger.info("Modul.test remove Modul wurde beendet");
})
//change
test("Modul.test change Modul", async () => {
    logger.info("Modul.test change Modul wird gestartet");
    const modul = new Modul({
        creator: user.id,
        modulList: moduleList.id,
        modulnumber: "123456",
        modulname: "test",
        creditPoints: 5,
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ modulnumber: "123456" })).not.toBeNull();
    //change
    await Modul.updateOne({ modulnumber: "123456" }, { modulname: "test2" });
    const changemodul = await Modul.findOne({ modulnumber: "123456" });
    expect(changemodul!.modulname).toBe("test2");
    logger.info("Modul.test change Modul wurde beendet");
})
//modul without creditpoints works
test("Modul.test change Modul without creditpoints", async () => {
    logger.info("Modul.test change Modul without creditpoints wird gestartet");
    const modul = new Modul({
        creator: user.id,
        modulList: moduleList.id,
        modulnumber: "123456",
        modulname: "test",
    })
    await modul.save();
    //check if exist
    expect(await Modul.findOne({ modulnumber: "123456" })).not.toBeNull();
    //change
    await Modul.updateOne({ modulnumber: "123456" }, { modulname: "test2" }); 
    const changemodul = await Modul.findOne({ modulnumber: "123456" });
    expect(changemodul!.modulname).toBe("test2");
    logger.info("Modul.test change Modul without creditpoints wurde beendet")

})

