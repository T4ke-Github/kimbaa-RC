import supertest from "supertest";
import app from "../../src/app";
import { User } from "../../src/model/UserModel";

beforeEach(async () => {
    const user1 = new User({
        name: "Tim",
        password: "1234abcdABCD..;,.",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "6",
        
    });
    await user1.save();
});

test("/api/login login with correct credentials", async () => {
    const testee = supertest(app);
    
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Tim");

    const response2 = await testee.post("/api/login").send({ studentId: "666456", password: "1234abcdABCD..;,." });

    console.log(response2.body);  // Fügen Sie dies zur Debugging-Ausgabe hinzu

    expect(response2.status).toBe(200);
    const { user, jwt } = response2.body;

    expect(user.name).toBe("Tim");
    expect(user.studentId).toBe("666456");
    expect(user.email).toBe("test@bht-berlin.de");
    expect(user.course).toBe("6");
});

test("/api/login login with wrong credentials", async () => {
    const testee = supertest(app);
    const response = await testee.post("/api/login/").send({ studentId: "666456", password: "test2" });

    expect(response.status).toBe(401);
});

//Login min date
test("/api/login login min date", async () => {
    const user1 = new User({
        name: "Tim",
        password: "1234abcdABCD..;,.",
        studentId: "111111",
        email: "test55@bht-berlin.de",
        
    });
    await user1.save();
    const testee = supertest(app);
    
    const response = await testee.get("/api/user/alle");
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe("Tim");

    const response2 = await testee.post("/api/login/").send({ studentId: "111111", password: "test" });

    //cascading login infos
    const { user, loginResult } = response2.body;


    expect(response2.status).toBe(200);

})