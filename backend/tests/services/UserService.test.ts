import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IUser, User } from "../../src/model/UserModel";
import { login } from "../../src/services/AuthenticationService";
import * as UserService from "../../src/services/UserService";


beforeEach(async () => {
    const user1 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        department: "6",
    });
    await user1.save();
    const user2 = new User({
        name: "RealOtto",
        password: "test",
        admin: false,
        studentId: 666999,
        email: "test2@bht-berlin.de",
        department: "6",
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
        studentId: "666222",
        email: "cuel@bht-berlin.de", 
        department: "6",
    })
    const neuErstellterUser = await User.findOne({ studentId: 666222 });

    expect(neuErstellterUser!.name).toBe("Neuer Benutzer"); // Überprüfen Sie, ob der Benutzer korrekt erstellt wurde
    logger.info("UserService.test createUser wurde beendet");
});

//getOne
test("UserService.test getOneUser by studentId(number)", async () => {
    logger.info("UserService.test getOneUser wird gestartet");
    const user = await UserService.getOneUser({studentId: "666456"});
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
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    const neuErstellterUser = await User.findOne({ studentId: "666222" });

    expect(neuErstellterUser!.name).toBe("Neuer Benutzer"); //prüfen Sie, ob der Benutzer korrekt erstellt wurde
    logger.info("UserService.test Create User with minimal data wurde beendet");
})

/* test("PflegerService.test deletePfleger", async () => {
    logger.info("PflegerService.test deletePfleger wird gestartet");

    await PflegerService.createPfleger({ name: "Paul", password: "test", admin: false });

    const pfleger = await Pfleger.findOne({ name: "Paul" }).exec();

    await PflegerService.deletePfleger(pfleger!.id);
    //check if pfleger was deleted
    const pflegerFound: HydratedDocument<IPfleger>[] =
        await Pfleger.find({ name: "Paul" }).exec();
    expect(pflegerFound.length).toBe(0);
    logger.info("PflegerService.test deletePfleger wird beendet");
}) */
test("UserService.test deleteUser", async () => {
    logger.info("UserService.test deleteUser wird gestartet");

    const user = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    const findUser = await User.findOne({ studentId: 666222 });
    await UserService.deleteUser(findUser!.id);
    //check if user was deleted
    const userFound: HydratedDocument<IUser>[] =
        await User.find({ studentId: 666222 }).exec();
    expect(userFound.length).toBe(0);
    logger.info("UserService.test deleteUser wurde beendet");
});

test("UserService.test create user without password", async () => {
    logger.info("UserService.test create user without password ");
    try {
        const user = await UserService.createUser({
            name: "Neuer Benutzer",
            admin: false,
            studentId: "666222",
            email: "cuel@bht-berlin.de"
        })
        logger.error("UserService.test create user without password not working correctly");
    } catch (error) {
        logger.info("UserService.test create user without password working correctly");
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("UserService.test create user without password beendet");
});
//User mit gleicher studentId
test("UserService.test createUser with same studentId", async () => {
    logger.info ("UserService.test createUser with same studentId");
    try {
        const user = await UserService.createUser({
            name: "Neuer Benutzer",
            password: "test",
            studentId: "666456",
            email: "cuel@bht-berlin.de"
        })
        logger.error("UserService.test createUser with same studentId not working correctly");
    } catch (error) {
        
        logger.info("UserService.test createUser with same studentId working correctly");
        expect(error).toBeInstanceOf(Error);
    }

    logger.info ("UserService.test createUser with same studentId beendet");
});
//User mit gleicher email
test("UserService.test createUser with same email", async () => {
    logger.info ("UserService.test createUser with same email");
    try {
        const user = await UserService.createUser({
            name: "Neuer Benutzer",
            password: "test",
            studentId: "666222",
            email: "test@bht-berlin.de"
        })
        logger.error("UserService.test createUser with same email not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test createUser with same email working correctly");
    }

    logger.info ("UserService.test createUser with same email beendet");
});
//user mit leerem namen
test("UserService.test createUser with empty name", async () => {
    logger.info ("UserService.test createUser with empty name ");
    try {
        const user = await UserService.createUser({
            name: "",
            password: "test",
            studentId: "666222",
            email: "cuel@bht-berlin.de"
        })
        logger.error("UserService.test createUser with empty name not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test createUser with empty name working correctly");
    }
    logger.info("UserService.test createUser with empty name beendet");
});
//User updaten
test("UserService.test updateUser name", async () => {
    logger.info ("UserService.test updateUser ");
    const userToUpdate = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    expect(userToUpdate.name).toBe("Neuer Benutzer");
    const userUpdated = await UserService.updateUser({
        id: userToUpdate.id,
        name: "Neuer Name"
    })
    expect(userUpdated.name).toBe("Neuer Name");
    logger.info ("UserService.test updateUser beendet");

});
test("UserService.test updateUser name + password", async () => {
    logger.info ("UserService.test updateUser name + password");
    const userToUpdate = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    expect(userToUpdate.name).toBe("Neuer Benutzer");
    const userUpdated = await UserService.updateUser({
        id: userToUpdate.id,
        name: "Neuer Name",
        password: "test2"
    })

    expect(userUpdated.name).toBe("Neuer Name");
    //checl new password
    const pwCorrect = await login("666222", "test2");
    expect(pwCorrect).toBeTruthy();
    logger.info ("UserService.test updateUser beendet NAME + PASSWORD");

});
//User update mit leerem namen 
test("UserService.test updateUser with empty name", async () => {
    logger.info ("UserService.test updateUser with empty name ");
    const userToUpdate = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    try {
        const userUpdated = await UserService.updateUser({
            id: userToUpdate.id,
            name: ""
        })
        logger.error("UserService.test updateUser with empty name not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test updateUser with empty name working correctly");
    }

    logger.info ("UserService.test updateUser with empty name beendet");
});
//User wrong ID
test("UserService.test getUser with wrong studentID", async () => {
    logger.info("UserService.test getUser with wrong ID ");
    const fakeID = "999999";
    try {
        const user = await UserService.getOneUser({studentId: fakeID});
        logger.error("UserService.test getUser with wrong ID not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test getUser with wrong ID working correctly");
    }

});
//delete User not found
test("UserService.test deleteUser not found", async () => {
    logger.info("UserService.test deleteUser not found not implemented yet");
    const fakeMongoDBid =  "";
    try {
        await UserService.deleteUser(fakeMongoDBid);
        logger.error("UserService.test deleteUser not found not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test deleteUser not found working correctly");
    }

});
//getOne wihtout studentId and email
test("UserService.test getOneUser without studentId and email must fail", async () => {
    logger.info("UserService.test getOneUser without studentId and email must fail wird gestartet");
    try {
        await UserService.getOneUser({});
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("UserService.test getOneUser without studentId and email must fail wurde beendet");

})


test("UserService.test updateUser not found", async () => {
    logger.info("UserService.test updateUser not found not implemented yet");
    const user = await UserService.createUser({
        name: "Neuer Benutzer",
        password: "test",
        studentId: "666222",
        email: "cuel@bht-berlin.de"
    })
    const findUser = await User.findOne({ studentId: 666222 });
    await UserService.deleteUser(findUser!.id);
    try {
        await UserService.updateUser({
            id: user.id}
        );
        logger.error("UserService.test updateUser not found not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test updateUser not found working correctly");
    }

})

//delete user user not fopund
test("UserService.test deleteUser not found", async () => {
    logger.info("UserService.test deleteUser not found");
    try {
        await UserService.deleteUser("");
        logger.error("UserService.test deleteUser not found not working correctly");
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("UserService.test deleteUser not found working correctly");
    }
})