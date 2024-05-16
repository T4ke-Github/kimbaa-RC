import supertest from "supertest";
import app from "../../src/app";
import { User } from "../../src/model/UserModel";
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
});

test("/api/login login with correct credentials", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Tim");

    const response2 = await testee.post("/api/login/login").send({ studentId: 666456, password: "test" });

    expect(response2.status).toBe(200);
    //login role

    expect(response2.body.role).toBe("u");
    //true or false
});

test("/api/login login with wrong credentials", async () => {
    const testee = supertest(app);
    const response = await testee.post("/api/login/login").send({ studentId: 666456, password: "test2" });
    expect(response.status).toBe(401);
});