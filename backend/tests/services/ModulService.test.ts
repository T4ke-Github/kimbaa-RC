import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IModulList, ModulList } from "../../src/model/ModulListModel";
import { IUser, User } from "../../src/model/UserModel";
import { Modul } from "../../src/model/ModulModel";
import * as ModulService from "../../src/services/ModulService";
import * as ModulListService from "../../src/services/ModulListService";

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
        Modulnumber: "123456",
        Modulname: "test",
        CreditPoints: 5,
    })
    const modul2 = new Modul({
        creator: user1.id,
        modulList: modulList.id,
        Modulnumber: "654321",
        Modulname: "test2",
        CreditPoints: 5,
    })
    const modul3 = new Modul({
        creator: user1.id,
        modulList: modulList.id,
        Modulnumber: "1234567",
        Modulname: "test3",
        CreditPoints: 5,
    })
    await modul1.save();
    await modul2.save();
    await modul3.save();

    //get alle module
    const alleEintraege = await ModulService.getAlleModule(modulList.id);
    expect(alleEintraege.length).toBe(3);
    expect(alleEintraege[0].Modulnumber).toBe("123456");
    expect(alleEintraege[1].Modulnumber).toBe("654321");
    expect(alleEintraege[2].Modulnumber).toBe("1234567");
    logger.info("ModulService.test create many Modul into modullist wurde beendet");
})
/* 
test("EintragService.test getalleEintraege protokolliderror", async () => {
    logger.info("EintragService.test getalleEintraege protokollID error wird gestartet");
    // catch error 
    try {
        const alleEintraege = await EintragService.getAlleEintraege("test");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test getalleAlleEintraege ProtokollId error wird beendet");
})
test("EintragService.test getalleEintraege protokolliderror", async () => {
    logger.info("EintragService.test getalleEintraege protokollID error wird gestartet");
    // catch error 
    //dummy id
    const dummyid = "123456789012345678901234"
    try {
        const alleEintraege = await EintragService.getAlleEintraege(dummyid);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test getalleAlleEintraege ProtokollId error wird beendet");
})

test("EintragService.test getalleEintraege keine einträge gefunden", async () => {
    logger.info("EintragService.test getalleEintraege keine Eintraege gefunden wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await protokoll1.save();
    try {
        const alleEintraege = await EintragService.getAlleEintraege(protokoll1.id);
        expect(alleEintraege.length).toBe(0);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test getalleAlleEintraege keine Eintraege gefunden wird beendet");
})

//Update Eintrag
test("EintragService.test updateEintrag", async () => {
    logger.info("EintragService.test updateEintrag wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await protokoll1.save();
    const eintrag1 = new Eintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    await eintrag1.save();
    const eintrag2 = new Eintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "cola", menge: 1 });
    await eintrag2.save();
    const eintrag3 = new Eintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    await eintrag3.save();
    const alleprotokoll = await ProtokollService.getAlleProtokolle(pfleger1.id);
    const eintraege = await EintragService.getAlleEintraege(protokoll1.id);
    expect(alleprotokoll.length).toBe(1);
    expect(eintraege.length).toBe(3);
    expect(eintraege[0].ersteller).toBe(pfleger1.id);
    expect(eintraege[1].ersteller).toBe(pfleger1.id);
    expect((eintraege[0].getraenk)).toBe("wasser");
    expect((eintraege[1].getraenk)).toBe("cola");
    expect((eintraege[0].menge)).toBe(1);
    const updatedResource: EintragResource = {
        id: eintrag1.id,
        getraenk: "wasser",
        menge: 2,
        kommentar: "mehr wasser ist besser",
        protokoll: protokoll1.id,
        ersteller: pfleger1.id
    }
    const updateEintrag = await EintragService.updateEintrag(updatedResource);
    expect(updateEintrag.getraenk).toBe("wasser");
    expect(updateEintrag.menge).toBe(2);
    expect(updateEintrag.kommentar).toBe("mehr wasser ist besser");
    expect(updateEintrag.ersteller).toBe(pfleger1.id);
    expect(updateEintrag.protokoll).toBe(protokoll1.id);
    logger.info("EintragService.test updateEintrag wird beendet");
})

test("EintragService.test updateEintrag mit fehler", async () => {
    logger.info("EintragService.test updateEintrag mit fehler wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await protokoll1.save();
    const wrongEintragResource: EintragResource = {
        id: "6464af5dcbdf3a402b1f1234",
        getraenk: "wasser",
        menge: 2,
        kommentar: "mehr wasser ist besser",
        protokoll: protokoll1.id,
        ersteller: pfleger1.id
    }
    try {
        const updateEintrag = await EintragService.updateEintrag(wrongEintragResource);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
})

test("EintragService.test deleteEintrag", async () => {
    logger.info("EintragService.test deleteEintrag wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await protokoll1.save();
    const eintrag1 = new Eintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    await eintrag1.save();
    expect(eintrag1.getraenk).toBe("wasser");
    expect(eintrag1.menge).toBe(1);
    await EintragService.deleteEintrag(eintrag1.id);
    expect((await Eintrag.findOne({ id: eintrag1.id }))).toBe(null);
    logger.info("EintragService.test deleteEintrag wird beendet");
})

test("EintragService.test deleteEintrag mit fehler", async () => {
    logger.info("EintragService.test deleteEintrag mit fehler wird gestartet");
    try {
        await EintragService.deleteEintrag("6464af5dcbdf3a402b1f1234");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test deleteEintrag mit fehler wird beendet");
})

//create eintrag Tests
test("EintragService.test createEintrag", async () => {
    logger.info("EintragService.test createEintrag wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await protokoll1.save();
    const eintrag1 = await EintragService.createEintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    expect(eintrag1.getraenk).toBe("wasser");
    expect(eintrag1.menge).toBe(1);
    logger.info("EintragService.test createEintrag wird beendet");
})

test("EintragService.test createEintrag no pfleger with this id", async () => {
    logger.info("EintragService.test createEintrag no pfleger with this id wird gestartet");
    const dummypflegerid = "123456789012345678901234";
    //protokoll1 erstellen
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1.id, patient: "test", datum: new Date() });
    await protokoll1.save();
    try {
        await EintragService.createEintrag({ ersteller: dummypflegerid, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test createEintrag no pfleger with this id wird beendet");
})

test("EintragService.test createEintrag no protokoll with this id", async () => {
    logger.info("EintragService.test createEintrag no protokoll with this id wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    try {
        await EintragService.createEintrag({ ersteller: pfleger1.id, protokoll: "6464af5dcbdf3a402b1f1234", getraenk: "wasser", menge: 1 });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test createEintrag no protokoll with this id wird beendet");
})
test("EintragService.test createEintrag protokoll closed", async () => {
    logger.info("EintragService.test createEintrag protokoll closed wird gestartet");
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const protokoll1 = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date(), closed: true });
    await protokoll1.save();
    try {
        await EintragService.createEintrag({ ersteller: pfleger1.id, protokoll: protokoll1.id, getraenk: "wasser", menge: 1 });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("EintragService.test createEintrag protokoll closed wird beendet");
})

test("EintragService.test getAlleEinträge leeres Protokoll", async () => {
    const pfleger1 = new Pfleger({ name: "pfleger1", password: "test1", admin: false });
    await pfleger1.save();
    const emptyProtokoll = new Protokoll({ ersteller: pfleger1, patient: "test", datum: new Date() });
    await emptyProtokoll.save();
    const alleEintraege = await EintragService.getAlleEintraege(emptyProtokoll.id);
    expect(alleEintraege.length).toBe(0);
})
 */

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