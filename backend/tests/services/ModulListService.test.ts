import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { ModulList } from "../../src/model/ModulListModel";
import { IUser, User } from "../../src/model/UserModel";
import * as ModulListService from "../../src/services/ModulListService";

// User before each test
let user1: HydratedDocument<IUser>;
let user2: HydratedDocument<IUser>;
beforeEach(async () => {
    user1 = new User({
        name: "test1",
        password: "test1",
        studentId: "123456",
        email: "test1@bht-berlin.de"
    });
    user2 = new User({
        name: "test2",
        password: "test2",
        studentId: "654321",
        email: "test2@bht-berlin.de"
    });
    await user1.save();
    await user2.save();
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

test("ModulListService.test createModulList without datum throws error", async () => {
    logger.info("ModulListService.test createModulList without datum wird gestartet");
    
    logger.info("ModulListService.test createModulList without datum wurde beendet");
});

test("ModulListService.test createModulList without studentId throws error", async () => {
    logger.info("ModulListService.test createModulList without studentId wird gestartet");
    
    
    logger.info("ModulListService.test createModulList without studentId wurde beendet");
});
