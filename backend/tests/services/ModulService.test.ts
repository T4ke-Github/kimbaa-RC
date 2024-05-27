import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { IUser, User } from "../../src/model/UserModel";
import * as ModulService from "../../src/services/ModulService";
import * as ModulListService from "../../src/services/ModulListService";
import * as UserService from "../../src/services/UserService";
import { ModulResource } from "../../src/Resources";
import exp from "constants";

// User before each test
let user1: HydratedDocument<IUser>;
let modulList: HydratedDocument<IModulList>;
beforeEach(async () => {
    user1 = new User({
        name: "test1",
        password: "test1",
        studentId: "123456",
        email: "test1@bht-berlin.de"
    });
    modulList = new ModulList({
        creator: user1.id,
        course: "Informatik",
        studentId: "123456",
        datum: new Date(),
    });
    await user1.save();
    await modulList.save();

});

test("ModulService.test getAlleModule create many Modul into modullist", async () => {
    logger.info("ModulService.test create many Modul into modullist wird gestartet");
    const modul1 = new Modul({
        creator: user1.id,
        modulList: modulList.id,
        modulnumber: "123456",
        modulname: "test",
        creditPoints: 5,
    })
    const modul2 = new Modul({
        creator: user1.id,
        modulList: modulList.id,
        modulnumber: "654321",
        modulname: "test2",
        creditPoints: 5,
    })
    const modul3 = new Modul({
        creator: user1.id,
        modulList: modulList.id,
        modulnumber: "1234567",
        modulname: "test3",
        creditPoints: 5,
    })
    await modul1.save();
    await modul2.save();
    await modul3.save();

    //get alle module
    const alleEintraege = await ModulService.getAlleModule(modulList.id);
    expect(alleEintraege.length).toBe(3);
    expect(alleEintraege[0].modulnumber).toBe("123456");
    expect(alleEintraege[1].modulnumber).toBe("654321");
    expect(alleEintraege[2].modulnumber).toBe("1234567");
    logger.info("ModulService.test create many Modul into modullist wurde beendet");
})

//update Moduls
test("ModulService.test updateModule by list to solved", async () => {
    logger.info("ModulService.test updateModul wird gestartet");
    const user = await UserService.createUser({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    })
    //create modul update list

    const updatelist: ModulResource[] = [
        {
            creator: user.id,
            modulname: "Mathematik I",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Grundlagen der Theoretischen Informatik",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Mathematik II",
            solved: true
        }
    ]
    const userID = user.id;
    const result = await ModulService.updateModulesByModuleNameAndUserId(updatelist);

    const modulList = await ModulList.findOne({ creator: user.id });
    const alleEintraege = await ModulService.getAlleModule(modulList?.id);
    const mathe = await Modul.findOne({ modulname: "Mathematik I" });
    const gti = await Modul.findOne({ modulname: "Grundlagen der Theoretischen Informatik" });
    const mathe2 = await Modul.findOne({ modulname: "Mathematik II" });

    expect(alleEintraege.length).toBe(55);
    expect(mathe?.solved).toBe(true);
    expect(gti?.solved).toBe(true);
    expect(mathe2?.solved).toBe(true);
    logger.info("ModulService.test updateModul wurde beendet");
})

//check for solved and required modules
//update Moduls
test("ModulService.test calculateSolvedModuls", async () => {
    logger.info("ModulService.test updateModul wird gestartet");
    const user = await UserService.createUser({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    })
    //create modul update list

    const updatelist: ModulResource[] = [
        {
            creator: user.id,
            modulname: "Mathematik I",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Grundlagen der Theoretischen Informatik",
            solved: true
        },
        {   
            creator: user.id,
            modulname: "Mathematik II",
            solved: true
        }
    ]
    const userID = user.id;
    const result = await ModulService.updateModulesByModuleNameAndUserId(updatelist);

    const modulList = await ModulList.findOne({ creator: user.id });
    const alleEintraege = await ModulService.getAlleModule(modulList?.id);
    const solvedModules = await ModulService.calculateModuleSummary(user.id!);
    expect(solvedModules.credits).toBe(15);
    expect(solvedModules.allrequired).toBe(false);
    expect(solvedModules.minreqCredits).toBe(false);
        logger.info("ModulService.test calculateModuleSummary wurde beendet");
})




test("ModulService.test getalleModule liste error", async () => {
    logger.info("ModulService.test getalleModule liste error wird gestartet");
    try {
        await ModulService.getAlleModule("test");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("ModulService.test getalleModule liste error wird beendet");
})

test("ModulService.test getalleModule listeID error", async () => {
    logger.info("ModulService.test getalleModule listeID error wird gestartet");
    const dummyid = "123456789012345678901234"
    try {
        const alleEintraege = await ModulService.getAlleModule(dummyid);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("ModulService.test getalleModule listeID error wird beendet");
})

