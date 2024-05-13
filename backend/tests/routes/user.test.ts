import supertest from "supertest";

import app from "../../src/app";
import * as UserService from "../../src/services/UserService";
import { UserResource } from "../../src/Resources";
import { User } from "../../src/model/UserModel";

//Create some USER

let Tim: UserResource
let Tom: UserResource
let Jerry: UserResource


beforeEach(async () => {
    const user1 = new User({
        name: "Tim",
        password: "test",
        admin: false,
        studentId: 666456,
        email: "test@bht-berlin.de",
        firstLogin: new Date(),
        lastLogin: new Date(),
        pwChangeDate: new Date(),
        failedLoginCount: 0,
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
        firstLogin: new Date(),
        lastLogin: new Date(),
        pwChangeDate: new Date(),
        failedLoginCount: 0,
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
        firstLogin: new Date(),
        lastLogin: new Date(),
        pwChangeDate: new Date(),
        failedLoginCount: 0,
        department: "6",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user3.save();
    Tim = user1
    Tom = user2
    Jerry = user3
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
