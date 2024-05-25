import { logger } from "../../src/logger/testLogger";
import { ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { User } from "../../src/model/UserModel";

//create modulList
test("ModulList.test create ModulList", async () => {
    logger.info("ModulList.test create ModulList wird gestartet");
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
    expect(modulListe.id).toBeDefined();
    expect(modulListe.studentId).toBe(user.studentId);
    logger.info("ModulList.test create ModulList wurde beendet");
})

//add modul to modulList
test("ModulList.test add Modul to ModulList", async () => {
    logger.info("ModulList.test add Modul to ModulList wird gestartet");
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
    });
    await modul.save();
    modulListe.modules.push(modul._id);
    await modulListe.save();
    expect(modulListe.modules).toContain(modul._id);
    expect(modulListe.modules.length).toBe(1);
    logger.info("ModulList.test add Modul to ModulList wurde beendet");
})
//save multiple moduls to modulList
test("ModulList.test save multiple Moduls to ModulList", async () => {
    logger.info("ModulList.test save multiple Moduls to ModulList wird gestartet");
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
    });
    await modul.save();
    const modul2 = new Modul({
        Modulnummer: "123457",
        Modulname: "test2",
    });
    await modul2.save();
    modulListe.modules.push(modul._id);
    modulListe.modules.push(modul2._id);
    await modulListe.save();
    expect(modulListe.modules).toContain(modul._id);
    expect(modulListe.modules).toContain(modul2._id);
    expect(modulListe.modules.length).toBe(2);
    logger.info("ModulList.test save multiple Moduls to ModulList wurde beendet");
})
//save multiple moduls to modulList abd add creditpoints
test("ModulList.test save multiple Moduls to ModulList and add creditpoints", async () => {
    logger.info("ModulList.test save multiple Moduls to ModulList and add creditpoints wird gestartet");
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
        CreditPoints: 9,
    });
    await modul.save();
    const modul2 = new Modul({
        Modulnummer: "123457",
        Modulname: "test2",
    });
    await modul2.save();
    modulListe.modules.push(modul._id);
    modulListe.modules.push(modul2._id);
    await modulListe.save();
    expect(modulListe.modules).toContain(modul._id);
    expect(modulListe.modules).toContain(modul2._id);
    expect(modulListe.modules.length).toBe(2);

    logger.info("ModulList.test save multiple Moduls to ModulList and add creditpoints wurde beendet");
})

//remove modulliste
test("ModulList.test remove ModulList", async () => {
    logger.info("ModulList.test remove ModulList wird gestartet");
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
    });
    await modul.save();
    modulListe.modules.push(modul._id);
    await modulListe.save();
    expect(modulListe.modules).toContain(modul._id);
    expect(modulListe.modules.length).toBe(1);
    const removed = await ModulList.findByIdAndDelete(modulListe._id);
    expect(removed?.id).toBe(null);
    
    logger.info("ModulList.test remove ModulList wurde beendet");
})