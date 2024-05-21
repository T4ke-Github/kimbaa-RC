import supertest from "supertest";

import app from "../../src/app";
import * as UserService from "../../src/services/UserService";
import { UserResource } from "../../src/Resources";
import { User } from "../../src/model/UserModel";
import { dateToString } from "../../src/services/ServiceHelper";

//Create some USER
beforeEach(async () => {
    const user1 = new User({
        name: "Tim",
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
        name: "Tom",
        password: "test",
        admin: false,
        studentId: 666995,
        email: "test2@bht-berlin.de",
        department: "6",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user2.save();
    const user3 = new User({
        name: "Jerry",
        password: "test",
        admin: false,
        studentId: 666999,
        email: "test3@bht-berlin.de",
        department: "6",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user3.save();
});

test("/api/user getAlleUser", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe("Tim");
    expect(response.body[1].name).toBe("Tom");
    expect(response.body[2].name).toBe("Jerry");
});

test("/api/user/getOneId", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/getOneId/666456");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe(666456);
    expect(response.body.email).toBe("test@bht-berlin.de");
})
//getOne by email
test("/api/user/getOneEmail", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/getOneEmail/test@bht-berlin.de");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe(666456);
    expect(response.body.email).toBe("test@bht-berlin.de");
})
//Create test

test("/api/user/create", async () => {
    const testee = supertest(app);

    // Testbenutzer-Objekt
    const userResource: UserResource = {
        name: "uniqueUser 3000",
        password: "test",
        studentId: 696969,
        email: "uniqueUserEmail@bht-berlin.de",
    };

    // Anfrage zur Erstellung des Benutzers
    const response = await testee.post("/api/user/create").send(userResource);

    // Überprüfen des Statuscodes und der Antwortdaten
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("uniqueUser 3000");
    expect(response.body.studentId).toBe(696969);
    expect(response.body.email).toBe("uniqueUserEmail@bht-berlin.de");

});

