import { User, IUser } from "../../src/model/UserModel";
import { logger } from "../../src/backlogger";
import * as UserService from "../../src/services/UserService";
import { HydratedDocument } from "mongoose";



beforeEach(async () => {
    await User.deleteMany({});

    const user1 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        matrikelnummer: 666456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "6",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    await user1.save();
    const user2 = new User({
        name: "RealOtto",
        password: "test",
        admin: false,
        matrikelnummer: 666999,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "6",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    await user2.save();

});


test("UserService.test getAlleUser", async () => {
    logger.info("UserService.test getAlleUser wird gestartet");
    const alleUser = await UserService.getAlleUser();
    expect(alleUser.length).toBe(2); 
    logger.info("UserService.test getAlleUser wurde beendet");
});

test("UserService.test createUser by resource", async () => {
    logger.info("UserService.test createUser wird gestartet");

    const userResource = {
        name: "Neuer Benutzer",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    };

    const neuErstellterUser = await UserService.createUser(userResource);

    expect(neuErstellterUser.name).toBe("Neuer Benutzer"); // Überprüfen Sie, ob der Benutzer korrekt erstellt wurde
    logger.info("UserService.test createUser wurde beendet");
});

test("UserService.test getalleUser and find by name", async () => {
    logger.info("UserService.test getalleUser and find by name wird gestartet");

    const alleUser = await UserService.getAlleUser();
    const userbyname = await alleUser.find(user => user.name === "DerOtto");
    if (userbyname === undefined || userbyname === null)
    {
        logger.error("UserService.test getalleUser and find by name: Benutzer nicht gefunden");
        throw new Error("Benutzer nicht gefunden");
    }else if (userbyname.name !== undefined && userbyname.name !== null)
        {
            logger.info("UserService.test getalleUser and find by name: Benutzer gefunden");
            expect(userbyname.name).toBe("DerOtto");
        }

    logger.info("UserService.test getalleUser and find by name wurde beendet");

});
test("UserService.test deleteUser", async () => {
    logger.info ("UserService.test deleteUser not implemented yet");
});
test("UserService.test create user without password", async () => {
    logger.info ("UserService.test updateUser not implemented yet");
});
//User mit gleicher matrikelnummer
test("UserService.test createUser with same matrikelnummer", async () => {
    logger.info ("UserService.test createUser with same matrikelnummer not implemented yet");

});
//User mit gleicher email
test("UserService.test createUser with same email", async () => {
    logger.info ("UserService.test createUser with same email not implemented yet");
});
//user mit leerem namen
test("UserService.test createUser with empty name", async () => {
    logger.info ("UserService.test createUser with empty name not implemented yet");
});
//User updaten
test("UserService.test updateUser", async () => {
    logger.info ("UserService.test updateUser not implemented yet");

});
//User update mit leerem namen 
test("UserService.test updateUser with empty name", async () => {
    logger.info ("UserService.test updateUser with empty name not implemented yet");

});
//User wrong ID
test("UserService.test getUser with wrong ID", async () => {
    logger.info("UserService.test getUser with wrong ID not implemented yet");

});
//delete User not found
test("UserService.test deleteUser not found", async () => {
    logger.info("UserService.test deleteUser not found not implemented yet");
});

//delete User
test("UserService.test deleteUser", async () => {
    logger.info("UserService.test deleteUser not implemented yet");

});


