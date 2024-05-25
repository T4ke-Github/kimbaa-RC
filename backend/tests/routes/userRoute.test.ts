import supertest from "supertest";

import { UserResource } from "../../src/Resources";
import app from "../../src/app";
import { User } from "../../src/model/UserModel";
import * as userService from "../../src/services/UserService";
import { logger } from "../../src/logger";

let Elsa: UserResource;
//Create some USER
beforeEach(async () => {
    Elsa = await userService.createUser({
        name: "Elsa",
        password: "test",
        admin: false,
        studentId: 133769,
        email: "elza@bht-berlin.de",
        department: "6",
    })
    const user1 = new User({
        name: "Tim",
        password: "test",
        admin: false,
        studentId: 666456,
        email: "test@bht-berlin.de",
        department: "6",
    });
    await user1.save();
    const user2 = new User({
        name: "Tom",
        password: "test",
        admin: false,
        studentId: 666995,
        email: "test2@bht-berlin.de",
        department: "6",
    });
    await user2.save();
    const user3 = new User({
        name: "Jerry",
        password: "test",
        admin: false,
        studentId: 666999,
        email: "test3@bht-berlin.de",
        department: "6",
    });
    await user3.save();
});

test("/api/user getAlleUser", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[1].name).toBe("Tim");
    expect(response.body[2].name).toBe("Tom");
    expect(response.body[3].name).toBe("Jerry");
});

test("/api/user/ get by studID", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/666456");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe(666456);
    expect(response.body.email).toBe("test@bht-berlin.de");
})
//getOne by id id not found
test("/api/user/ get by id not found", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/999999");
    expect(response.status).toBe(400);
})
//getOne by email
test("/api/user/ get by email", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/test@bht-berlin.de");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe(666456);
    expect(response.body.email).toBe("test@bht-berlin.de");
})
//get fail
test("/api/user/:identifier error handling", async () => {
    const testee = supertest(app);
    // Hier simulieren wir eine Situation, in der ein Fehler auftritt, indem wir eine ungültige Identifier-Parameter anfordern
    const response = await testee.get("/api/user/blalba");
    // Überprüfen des Statuscodes
    expect(response.statusCode).toBe(400);
    
});
test("/api/user/", async () => {
    const testee = supertest(app);

    // Testbenutzer-Objekt
    const userResource: UserResource = {
        name: "uniqueUser 3000",
        password: "test",
        studentId: 696969,
        email: "uniqueUserEmail@bht-berlin.de",
    };

    // Anfrage zur Erstellung des Benutzers
    const response = await testee.post("/api/user/").send(userResource);

    // Überprüfen des Statuscodes und der Antwortdaten
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("uniqueUser 3000");
    expect(response.body.studentId).toBe(696969);
    expect(response.body.email).toBe("uniqueUserEmail@bht-berlin.de");

});
test("/api/user/:id create User fail", async () => {
    const testee = supertest(app);
    const response = await testee.post("/api/user/").send(Elsa)
    expect(response.statusCode).toBe(400);
});

test("/api/user/:id update User", async () => {
    const testee = supertest(app);
    const user = await userService.createUser({
        name: "Cageolas Nice",
        password: "geheim",
        admin: false,
        studentId: 999999,
        email: "cage@bht-berlin.de",
    })
    const userResource: UserResource = {
        id: user.id,
        name: "Nicolas Cage",
        password: "geheim",
        admin: false,
        studentId: 999999,
        email: "nicolas@bht-berlin.de",
    };
    let response = await testee.put(`/api/user/${userResource.id}`).send(userResource);
    logger.info("Attempted to update user:");
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Nicolas Cage");
});

test("/api/user/:id update User id not found", async () => {
    const testee = supertest(app);
    const fakeId = "609c5da71c9e985a2806981d";
    const userResource: UserResource = {
        id: fakeId,
        name: "Nicolas Cage",
        password: "geheim",
        admin: false,
        studentId: 999999,
        email: "nicolas@bht-berlin.de",
    };
    let response = await testee.put(`/api/user/${fakeId}`).send(userResource);
    logger.info("Attempted to update non-existent user:", response.body);
    expect(response.statusCode).toBe(400);
});

test("/api/user/:id delete User", async () => {
    const testee = supertest(app);
    const user = await User.create({
        name: "Cageolas Nice",
        password: "geheim",
        admin: false,
        studentId: 999999,
        email: "cage@bht-berlin.de",
    });
    logger.info("User created for delete test:", user);
    let response = await testee.delete(`/api/user/${user.id}`);
    logger.info("User delete response:", response.body);
    expect(response.statusCode).toBe(200);
    const deletedUser = await User.findById(user.id).exec();
    expect(deletedUser).toBe(null);
});
test("/api/user/:id delete User id not found", async () => {
    const testee = supertest(app);
    const fakeId = "609c5da71c9e985a2806981d";
    let response = await testee.delete(`/api/user/${fakeId}`);
    logger.info("Attempted to delete non-existent user:", response.body);
    expect(response.statusCode).toBe(400);
});