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

/* test("/api/user/getOne", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/getOne/666456");
   // expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe(666456);
    expect(response.body.email).toBe("test@bht-berlin.de");
    expect(response.body.department).toBe("6");
    expect(response.body.enrolledSince).toBeDefined();
    expect(response.body.CreditPoints).toBe(0);
    expect(response.body.phone).toBe(123);
}) */
//Create test

test("/api/user/create", async () => {
    const testee = supertest(app);

    // Testbenutzer-Objekt
    const userResource: UserResource = {
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
        enrolledSince: new Date,
        CreditPoints: 0,
        phone: 123
    };

    // Anfrage zur Erstellung des Benutzers
    const response = await testee.post("/api/user/create").send(userResource);

    // Überprüfen des Statuscodes und der Antwortdaten
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("test");
    expect(response.body.studentId).toBe(123456);
    expect(response.body.email).toBe("test@bht-berlin.de");

    // Optional: Überprüfen, ob der Benutzer tatsächlich in der Datenbank gespeichert wurde
    // Dies erfordert, dass Sie auf Ihre Datenbank zugreifen und den neuen Benutzer abfragen
    const createdUser = await User.findOne(response.body.id);  // Passen Sie diese Funktion entsprechend an
    expect(createdUser).toBeDefined();
    expect(createdUser!.name).toBe("test");
    expect(createdUser!.studentId).toBe(123456);
    expect(createdUser!.email).toBe("test@bht-berlin.de");
});

