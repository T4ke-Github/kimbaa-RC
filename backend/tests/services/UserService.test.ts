import { logger } from "../../src/backlogger";
import { User } from "../../src/model/UserModel";
import * as UserService from "../../src/services/UserService";



beforeEach(async () => {
    const user1 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: 666456,
        email: "test@bht-berlin.de",
        department: "6",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user1.save();
    const user2 = new User({
        name: "RealOtto",
        password: "test",
        admin: false,
        studentId: 666999,
        email: "test2@bht-berlin.de",
        department: "6",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user2.save();

});


test("UserService.test getAlleUser", async () => {
    logger.info("UserService.test getAlleUser wird gestartet");
    const alleUser = await UserService.getAlleUser();
    expect(alleUser.length).toBe(2); 
    logger.info("UserService.test getAlleUser wurde beendet");
});

test("UserService.test createUser ", async () => {
    logger.info("UserService.test createUser wird gestartet");
    const user = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        admin: false,
        studentId: 666222,
        email: "cuel@bht-berlin.de", 
        department: "6",

        CreditPoints: 0,
        phone: 123
    })
    const neuErstellterUser = await User.findOne({ studentId: 666222 });

    expect(neuErstellterUser!.name).toBe("Neuer Benutzer"); // Überprüfen Sie, ob der Benutzer korrekt erstellt wurde
    logger.info("UserService.test createUser wurde beendet");
});

//getOne
test("UserService.test getOneUser by studentId(number)", async () => {
    logger.info("UserService.test getOneUser wird gestartet");
    const user = await UserService.getOneUser({studentId: 666456});
    expect(user.name).toBe("DerOtto");
    logger.info("UserService.test getOneUser wurde beendet");
}); 
test("UserService.test getOneUser by email", async () => {
    logger.info("UserService.test getOneUser wird gestartet");
    const user = await UserService.getOneUser({email: "test@bht-berlin.de"});
    expect(user.name).toBe("DerOtto");
    logger.info("UserService.test getOneUser wurde beendet");
});

test("UserService.test Create User with minimal data", async () => {
    logger.info("UserService.test Create User with minimal data wird gestartet");
    const user = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: 666222,
        email: "cuel@bht-berlin.de"
    })
    const neuErstellterUser = await User.findOne({ studentId: 666222 });

    expect(neuErstellterUser!.name).toBe("Neuer Benutzer"); //prüfen Sie, ob der Benutzer korrekt erstellt wurde
    logger.info("UserService.test Create User with minimal data wurde beendet");
})

/* 
test("UserService.test deleteUser", async () => {
    logger.info ("UserService.test deleteUser not implemented yet");
});
test("UserService.test create user without password", async () => {
    logger.info ("UserService.test updateUser not implemented yet");
});
//User mit gleicher studentId
test("UserService.test createUser with same studentId", async () => {
    logger.info ("UserService.test createUser with same studentId not implemented yet");
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


 */