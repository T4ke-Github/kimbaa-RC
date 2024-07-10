// @ts-nocheck
import dotenv from "dotenv";
dotenv.config();
import "restmatcher";
import supertest from "supertest";
import app from "../../src/app";
import { User } from "../../src/model/UserModel";
import { verifyPasswordAndCreateJWT } from "../../src/services/JWTService";
import { UserResource } from "../../src/Resources";

let logintoken: string;

beforeEach(async () => {
    await User.deleteMany({});
    const user1 = new User({
        name: "Tim",
        password: "1234abcdABCD..;,.",
        admin: true,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "6",
    });
    await user1.save();
    const user2 = new User({
        name: "Tom",
        password: "1234abcdABCD..;,.",
        admin: false,
        studentId: "666995",
        email: "test2@bht-berlin.de",
        course: "6",
    });
    await user2.save();
    const user3 = new User({
        name: "Jerry",
        password: "1234abcdABCD..;,.",
        admin: false,
        studentId: "666999",
        email: "test3@bht-berlin.de",
        course: "6",
    });
    await user3.save();

    logintoken = await verifyPasswordAndCreateJWT("666456", "1234abcdABCD..;,.");
});

test("/api/user getAlleUser", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/alle").set("Cookie", `access_token=${logintoken}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe("Tim");
    expect(response.body[1].name).toBe("Tom");
    expect(response.body[2].name).toBe("Jerry");
});

test("/api/user/ get by studID", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/666456").set("Cookie", `access_token=${logintoken}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe("666456");
    expect(response.body.email).toBe("test@bht-berlin.de");
});

test("/api/user/ get by id not found", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/999999").set("Cookie", `access_token=${logintoken}`);
    expect(response.status).toBe(400);
});

test("/api/user/ get by email", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/test@bht-berlin.de").set("Cookie", `access_token=${logintoken}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Tim");
    expect(response.body.studentId).toBe("666456");
    expect(response.body.email).toBe("test@bht-berlin.de");
});

test("/api/user/:identifier error handling", async () => {
    const testee = supertest(app);
    const response = await testee.get("/api/user/blalba").set("Cookie", `access_token=${logintoken}`);
    expect(response.statusCode).toBe(400);
});

test("/api/user/", async () => {
    const testee = supertest(app);

    const userResource: UserResource = {
        name: "uniqueUser 3000",
        password: "1234abcdABCD..;,.",
        studentId: "333999",
        email: "uniqueUserEmail@bht-berlin.de",
    };

    const response = await testee.post("/api/user/").set("Cookie", `access_token=${logintoken}`).send(userResource);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("uniqueUser 3000");
    expect(response.body.studentId).toBe("333999");
    expect(response.body.email).toBe("uniqueUserEmail@bht-berlin.de");
});

test("/api/user/:id create User fail", async () => {
    const testee = supertest(app);
    const Elsa: UserResource;
    const response = await testee.post("/api/user/").set("Cookie", `access_token=${logintoken}`).send(Elsa);
    expect(response.statusCode).toBe(400);
});

test("/api/user/:id update User", async () => {
    const testee = supertest(app);
    const user = await userService.createUser({
        name: "Cageolas Nice",
        password: "geheim",
        admin: false,
        studentId: "999999",
        email: "cage@bht-berlin.de",
    });
    const userResource: UserResource = {
        id: user.id,
        name: "Nicolas Cage",
        password: "geheim",
        admin: false,
        studentId: "999999",
        email: "nicolas@bht-berlin.de",
    };
    let response = await testee.put(`/api/user/${userResource.id}`).set("Cookie", `access_token=${logintoken}`).send(userResource);
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
        studentId: "999999",
        email: "nicolas@bht-berlin.de",
    };
    let response = await testee.put(`/api/user/${fakeId}`).set("Cookie", `access_token=${logintoken}`).send(userResource);
    logger.info("Attempted to update non-existent user:", response.body);
    expect(response.statusCode).toBe(400);
});

test("/api/user/:id delete User", async () => {
    const testee = supertest(app);
    const user = await User.create({
        name: "Cageolas Nice",
        password: "geheim",
        admin: false,
        studentId: "999999",
        email: "cage@bht-berlin.de",
    });
    logger.info("User created for delete test:", user);
    let response = await testee.delete(`/api/user/${user.id}`).set("Cookie", `access_token=${logintoken}`);
    logger.info("User delete response:", response.body);
    expect(response.statusCode).toBe(200);
    const deletedUser = await User.findById(user.id).exec();
    expect(deletedUser).toBe(null);
});

test("/api/user/:id delete User id not found", async () => {
    const testee = supertest(app);
    const fakeId = "609c5da71c9e985a2806981d";
    let response = await testee.delete(`/api/user/${fakeId}`).set("Cookie", `access_token=${logintoken}`);
    logger.info("Attempted to delete non-existent user:", response.body);
    expect(response.statusCode).toBe(400);
});

test("/api/user/ create User Medieninformatik and test for moduls", async () => {
    const testee = supertest(app);

    const userResource: UserResource = {
        name: "Nicolas Cage",
        password: "geheim",
        admin: false,
        studentId: "999999",
        email: "nicolas@bht-berlin.de",
        course: "Medieninformatik",
    };
    const studentID = "999999";
    let response = await testee.post(`/api/user/`).set("Cookie", `access_token=${logintoken}`).send(userResource);
    logger.info("Attempted to create user:", response.body);
    expect(response.statusCode).toBe(201);
    const user = await User.findById(response.body.id).exec();
    expect(user).not.toBeNull();
    expect(user!.course).toBe("Medieninformatik");

    const modulList = await ModulList.findOne({ creator: response.body.id });
    const alleEintraege = await ModulService.getAlleModule(studentID);
    expect(alleEintraege.length).toBe(55);
});
