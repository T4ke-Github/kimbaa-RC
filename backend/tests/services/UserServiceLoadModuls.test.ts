import { logger } from "../../src/logger/testLogger";
import { ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";
import { User } from "../../src/model/UserModel";
import * as ModulService from "../../src/services/ModulService";
import * as ModulListService from "../../src/services/ModulListService";
import * as UserService from "../../src/services/UserService";
import { ModulResource } from "../../src/Resources";

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
    expect(await Modul.findOne({ Modulname: "Mathematik I" })).toBeTruthy();
    expect(await Modul.findOne({ Modulname: "Mathematik II" })).toBeTruthy();
    expect(await Modul.findOne({ Modulname: "Frontend–Design Web: Fortgeschrittene Techniken" })).toBeTruthy();
    expect(await Modul.findOne({ Modulname: "Praxisprojekt" })).toBeTruthy();
    expect(await Modul.findOne({ Modulname: "Programmierung I" })).toBeTruthy();
    expect(await Modul.findOne({ Modulnumber: "11430_106565" })).toBeTruthy();
    //check if modulname and modulenumber are matching the same modul
    const testmodul = await Modul.findOne({ Modulname: "Programmierung I" });
    expect(testmodul?.Modulnumber).toBe("11430_106565");
    
    logger.info("ModulService.test create many Modul into modullist wurde beendet");

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