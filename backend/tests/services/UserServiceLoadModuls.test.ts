import exp from "constants";
import { logger } from "../../src/logger/testLogger";
import { ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { User } from "../../src/model/UserModel";
import * as ModulService from "../../src/services/ModulService";
import * as UserService from "../../src/services/UserService";

test("Load Module UserService", async () => {
    logger.info("UserServiceLoadModuls wird gestartet");
    const user = await UserService.createUser({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    })
    //get modullist from user
    const modulList = await ModulList.findOne({ creator: user.id });
    const neuErstellterUser = await User.findOne({ studentId: 666456 });
    const alleEintraege = await ModulService.getAlleModule(modulList?.id);
    expect(alleEintraege.length).toBe(55);
    expect(await Modul.findOne({ modulname: "Mathematik I" })).toBeTruthy();
    expect(await Modul.findOne({ modulname: "Mathematik II" })).toBeTruthy();
    expect(await Modul.findOne({ modulname: "Frontend–Design Web: Fortgeschrittene Techniken" })).toBeTruthy();
    expect(await Modul.findOne({ modulname: "Praxisprojekt" })).toBeTruthy();
    expect(await Modul.findOne({ modulname: "Programmierung I" })).toBeTruthy();
    expect(await Modul.findOne({ modulnumber: "11430_106565" })).toBeTruthy();
    //check if modulname and modulenumber are matching the same modul
    const testmodul = await Modul.findOne({ modulname: "Programmierung I" });

    expect(testmodul?.creditPoints).toBe(10);
    expect(testmodul?.required).toBe(true);
    expect(testmodul?.solved).toBe(false);
    // Test für das Modul "Mathematik I"
    const mathematikI = await Modul.findOne({ modulname: "Mathematik I" });
    expect(mathematikI?.creditPoints).toBe(5);
    expect(mathematikI?.required).toBe(true);
    expect(mathematikI?.solved).toBe(false);

    // Test für das Modul "Grundlagen der Theoretischen Informatik"
    const theoretischeInformatik = await Modul.findOne({ modulname: "Grundlagen der Theoretischen Informatik" });
    expect(theoretischeInformatik?.creditPoints).toBe(5);
    expect(theoretischeInformatik?.required).toBe(true);
    expect(theoretischeInformatik?.solved).toBe(false);

    // Test für das Modul "Mediendesign Grundlagen"
    const mediendesign = await Modul.findOne({ modulname: "Mediendesign Grundlagen" });
    expect(mediendesign?.creditPoints).toBe(5);
    expect(mediendesign?.required).toBe(true);
    expect(mediendesign?.solved).toBe(false);

    // Test für das Modul "Technische Grundlagen der Informatik"
    const technischeGrundlagen = await Modul.findOne({ modulname: "Technische Grundlagen der Informatik" });
    expect(technischeGrundlagen?.creditPoints).toBe(5);
    expect(technischeGrundlagen?.required).toBe(true);
    expect(technischeGrundlagen?.solved).toBe(false);

    // Test für das Modul "Programmierung I"
    const programmierungI = await Modul.findOne({ modulname: "Programmierung I" });
    expect(programmierungI?.creditPoints).toBe(10);
    expect(programmierungI?.required).toBe(true);
    expect(programmierungI?.solved).toBe(false);

    // Test für das Modul "Mathematik II"
    const mathematikII = await Modul.findOne({ modulname: "Mathematik II" });
    expect(mathematikII?.creditPoints).toBe(5);
    expect(mathematikII?.required).toBe(true);
    expect(mathematikII?.solved).toBe(false);

    // Test für das Modul "Algorithmen und Datenstrukturen"
    const algorithmenDatenstrukturen = await Modul.findOne({ modulname: "Algorithmen und Datenstrukturen" });
    expect(algorithmenDatenstrukturen?.creditPoints).toBe(5);
    expect(algorithmenDatenstrukturen?.required).toBe(true);
    expect(algorithmenDatenstrukturen?.solved).toBe(false);

    expect(testmodul?.modulnumber).toBe("11430_106565");
    logger.info("UserServiceLoadModuls wurde beendet");
})

//add credits to preloaded moduls
/* test("Load Module UserService update credits", async () => {
    const user = await UserService.createUser({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    })
    //get modullist from user
    const modulList = await ModulList.findOne({ creator: user.id });
    const neuErstellterUser = await User.findOne({ studentId: 666456 });
    const alleEintraege = await ModulService.getAlleModule(modulList?.id);
    expect(alleEintraege.length).toBe(55);
    //get credits
    const modulliste1 = await ModulListService.getModulList(modulList?.id);
    const creditsNix = modulliste1.allCredits;
    expect(creditsNix).toBe(0)
    //Update modul with credits
    const modulUpdate = await ModulService.updateModul({
         */