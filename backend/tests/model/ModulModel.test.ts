import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { IModul, Modul } from "../../src/model/ModulModel";
import { User } from "../../src/model/UserModel";

//Create Modul with 5creditpoints
test("Modul.test create Modul", async () => {
    logger.info("Modul.test create Modul wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const modul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    });
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.Modulnummer).toBe("123456");
    expect(modul.Modulname).toBe("test");
    expect(modul.CreditPoints).toBe(5);
    logger.info("Modul.test create Modul wurde beendet");
})
//create Modul with 7 creditpoints
test("Modul.test create Modul with 7 creditpoints", async () => {
    logger.info("Modul.test create Modul with 7 creditpoints wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const modul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 7,
    });
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.Modulnummer).toBe("123456");
    expect(modul.Modulname).toBe("test");
    expect(modul.CreditPoints).toBe(7);
    logger.info("Modul.test create Modul with 7 creditpoints wurde beendet");
})

//create modul with default 0 creditpoints
test("Modul.test create Modul with 0 creditpoints", async () => {
    logger.info("Modul.test create Modul with 0 creditpoints wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const modul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",

    });
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.Modulnummer).toBe("123456");    
    expect(modul.Modulname).toBe("test");
    expect(modul.CreditPoints).toBe(0);
    logger.info("Modul.test create Modul with 0 creditpoints wurde beendet");
})

//create modul with 8 creditpoints
test("Modul.test create Modul with 8 creditpoints", async () => {
    logger.info("Modul.test create Modul with 8 creditpoints wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const modul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 8,
    });
    await modul.save();
    expect(modul.id).toBeDefined();
    expect(modul.Modulnummer).toBe("123456");
    expect(modul.Modulname).toBe("test");
    expect(modul.CreditPoints).toBe(8);
    logger.info("Modul.test create Modul with 8 creditpoints wurde beendet");
})
//remove modul
test("Modul.test remove Modul", async () => {
    logger.info("Modul.test remove Modul wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const modulListe = new ModulList({
        studentId: user.studentId,
        modules: [],
    });
    await modulListe.save();
    const modul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 8,
    });
    await modul.save();
    modulListe.modules.push(modul._id);
    await modulListe.save();
    expect(modulListe.modules).toContain(modul._id);
    const findModul = await Modul.findOne({ _id: modul._id });
    expect(findModul).not.toBeNull();
    //delete
    await Modul.deleteOne({ _id: modul._id });
    //check if deleted
    const modul2 = await Modul.findOne({ _id: modul._id });
    expect(modul2).toBeNull();
    //expect(modulListe.modules).not.toContain(modul._id);
    logger.info("Modul.test remove Modul wurde beendet");
})

// Aktualisieren Sie ein Modul
test("Module.test update Module", async () => {
    const module: IModul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    });
    await module.save();
    module.CreditPoints = 10;
    await module.save();
    expect(module.CreditPoints).toBe(10);
});

// Fügen Sie ein Modul zur Modulliste hinzu
test("ModuleListe.test add Module to ModuleListe", async () => {
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
    });
    await user.save();
    const module: IModul = new Modul({
        Modulnummer: "123456",
        Modulname: "test",
        CreditPoints: 5,
    });
    await module.save();
    const moduleListe: IModulList = new ModulList({
        studentId: user.studentId,
        modules: [],
    });
    await moduleListe.save();
    moduleListe.modules.push(module._id);
    await moduleListe.save();
    expect(moduleListe.modules).toContainEqual(module._id);
});

