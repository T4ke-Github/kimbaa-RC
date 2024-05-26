import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IUser, User } from "../../src/model/UserModel";
import { login } from "../../src/services/AuthenticationService";
import * as UserService from "../../src/services/UserService";
import * as ModulService from "../../src/services/ModulService";
import * as ModulListService from "../../src/services/ModulListService";
import { ModulList } from "../../src/model/ModulListModel";
import { Modul } from "../../src/model/ModulModel";

test("Load Module UserService", async () => {
    logger.info("UserServiceLoadModuls wird gestartet");
    const user = await UserService.createUser({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        department: "Medieninformatik",
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