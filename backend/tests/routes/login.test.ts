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
        department: "6",
        enrolledSince: new Date("04 / 04 / 2021"),
        CreditPoints: 0,
        phone: 123
    });
    await user1.save();
});

test("/api/login login with correct credentials", async () => {
    const testee = supertest(app);
    const testee23 = supertest(app);
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Tim");

    const response2 = await testee.post("/api/login/login").send({ studentId: 666456, password: "test" });

    //cascading login infos
    const { user, loginResult } = response2.body;


    expect(response2.status).toBe(200);
    //login role

    expect(loginResult.role).toBe("u");
    //true or false
    expect(loginResult.success).toBe(true);
    //Check userdata

    expect(user.name).toBe("Tim");
    expect(user.studentId).toBe(666456);
    expect(user.email).toBe("test@bht-berlin.de");
    expect(user.department).toBe("6");


});

test("/api/login login with wrong credentials", async () => {
    const testee = supertest(app);
    const response = await testee.post("/api/login/login").send({ studentId: 666456, password: "test2" });
    expect(response.body).toBe(false);
    expect(response.status).toBe(401);
});

//Login and check 