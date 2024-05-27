import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { IUser, User } from "../../src/model/UserModel";
import * as ModulListService from "../../src/services/ModulListService";
import * as ModulService from "../../src/services/ModulService";
import * as UserService from "../../src/services/UserService";
import { ModulResource } from "../../src/Resources";

// User before each test
let user1: HydratedDocument<IUser>;
let user2: HydratedDocument<IUser>;
let modulList1: HydratedDocument<IModulList>;
beforeEach(async () => {
    
    user1 = new User({
        name: "test1",
        password: "test1",
        studentId: "123456",
        email: "test1@bht-berlin.de",
        course: "test",
    });
    user2 = new User({
        name: "test2",
        password: "test2",
        studentId: "654321",
        email: "test2@bht-berlin.de"
        , course: "test",
    });
    await user1.save();
    await user2.save();
    modulList1 = new ModulList({
        creator: user1.id,
        course: "Informatik",
        datum: new Date(),
    })
});

test("ModulListService.test createModulList", async () => {
    logger.info("ModulListService.test createModulList wird gestartet");
    const modulList = await ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    });
    const foundlist = await ModulList.findById(modulList.id);
    expect(foundlist).toBeTruthy();
    expect(foundlist!.studentId).toBe("123456");
    logger.info("ModulListService.test createModulList wurde beendet");
});


test("ModulListService.test deleteModulList", async () => {
    logger.info("ModulListService.test deleteModulList wird gestartet");
    const modulList = await ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    });
    const result = await ModulListService.deleteModulList(modulList.id!);
    expect(await ModulList.findById(modulList.id)).toBeFalsy();
    logger.info("ModulListService.test deleteModulList wurde beendet");
});

test("ModulListService.test updateModulList with list.id", async () => {
    logger.info("ModulListService.test updateModulList wird gestartet");
    const modulList = await ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    })
    

    const newList = await ModulListService.updateModulList({
        id: modulList!.id,
        course: "Medieninformatik"
    });
    expect(newList.studentId).toBe("123456");
    expect(newList.course).toBe("Medieninformatik");

    logger.info("ModulListService.test updateModulList wurde beendet");
});
//update modul with creator /user.id
test("ModulListService.test updateModulList with creator", async () => {
    logger.info("ModulListService.test updateModulList wird gestartet");
    const modulList = await ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    })
    

    const newList = await ModulListService.updateModulList({
        creator: user1.id,
        course: "Medieninformatik"
    });
    expect(newList.studentId).toBe("123456");
    expect(newList.course).toBe("Medieninformatik");

    logger.info("ModulListService.test updateModulList wurde beendet");
});
//update modullist with studentId
test("ModulListService.test updateModulList with studentId", async () => {
    logger.info("ModulListService.test updateModulList wird gestartet");
    const modulList = await ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    })
    

    const newList = await ModulListService.updateModulList({
        studentId: user1.studentId,
        course: "Medieninformatik"
    });
    expect(newList.studentId).toBe("123456");
    expect(newList.course).toBe("Medieninformatik");

    logger.info("ModulListService.test updateModulList wurde beendet");
});

test("ModulListService.test getModulList", async () => {
    logger.info("ModulListService.test getModulList wird gestartet");
    const testliste = ModulListService.createModulList({
        creator: user1.id,
        course: "Informatik",
    })
    const foundlist = await ModulListService.getModulList("123456");
    expect(foundlist).toBeTruthy();
    expect(foundlist!.studentId).toBe("123456");
    logger.info("ModulListService.test getModulList wurde beendet");
});

test("ModulListService.test createModulList without datum throws error", async () => {
    logger.info("ModulListService.test createModulList without datum wird gestartet");
    
    logger.info("ModulListService.test createModulList without datum wurde beendet");
});

test("ModulListService.test createModulList without studentId throws error", async () => {
    logger.info("ModulListService.test createModulList without studentId wird gestartet");
    
    
    logger.info("ModulListService.test createModulList without studentId wurde beendet");
});

test("ModulListService.test getModulList allCredits", async () => {
    logger.info("ModulListService.test getModulList allCredits wird gestartet");
    const testliste = new ModulList({
        creator: user1.id,
        course: "Informatik",
        studentId: "123456",
        datum: new Date(),
    })
    await testliste.save();
    //add modules with credits
    const modul1 = new Modul({
        creator: user1.id,
        modulList: testliste.id,
        modulnumber: "123456",
        modulname: "test",
        creditPoints: 5,
        solved: true,
        required: true
    })
    const modul2 = new Modul({
        creator: user1.id,
        modulList: testliste.id,
        modulnumber: "654321",
        modulname: "test2",
        creditPoints: 5,
        solved: true,
        required: true
    })
    const modul3 = new Modul({
        creator: user1.id,
        modulList: testliste.id,
        modulnumber: "1234567",
        modulname: "test3",
        creditPoints: 5,
        solved: true,
        required: true
    })
    await modul1.save();
    await modul2.save();
    await modul3.save();
    const foundlist = await ModulListService.getModulList("123456");
    expect(foundlist).toBeTruthy();
    //modulService calculates all credits
    const UserID = user1.id;
    const result = await ModulService.calculateModuleSummary(UserID);
    expect(result.credits).toBe(15);
    logger.info("ModulListService.test getModulList allCredits wurde beendet"); 
});

