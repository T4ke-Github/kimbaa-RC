import { logger } from "../../src/logger/testLogger";
import { User } from "../../src/model/UserModel";



test("UserModel.test createUser", async () => {
    logger.info("UserModel.test createUser wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user.save();
    expect(user.id).toBeDefined();
    expect(user.name).toBe("test");
    expect(user.admin).toBe(false);
    expect(user.studentId).toBe(123456);
    expect(user.email).toBe("test@bht-berlin.de");
    expect(user.department).toBe("test");

    logger.info("UserModel.test createUser wurde beendet");
}); 

test("UserModel.test createUser twice same name", async () => {
    logger.info("UserModel.test createUser twice wird gestartet");
    
    const user1 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: 666456,
        email: "test@bht-berlin.de",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    const user2 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test2@bht-berlin.de",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user1.save();
    await user2.save();
    //check names
    expect(user1.name).toBe("DerOtto");
    expect(user2.name).toBe("DerOtto");
    logger.info("UserModel.test createUser twice wurde beendet");
});

test("UserModel.test createUser twice same studentId must fail", async () => {
    logger.info("UserModel.test createUser twice same studentId wird gestartet");
    const user1 = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    const user2 = new User({
        name: "test2",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test",
        department: "test",
        enrolledSince: new Date(), 
        CreditPoints: 0,
        phone: 123
    });
    await user1.save();
    try {
        await user2.save();
    } catch (error) {
        expect(error).toBeDefined();
    }
    logger.info("UserModel.test createUser twice same studentId wurde beendet");
})

test("UserModel.test createUser without password must fail", async () => {
    logger.info("UserModel.test createUser without password wird gestartet");
    const user = new User({
        name: "test",
        admin: false,
        studentId: 123456,
        email: "test",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    try {
        await user.save();
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }   
    logger.info("UserModel.test createUser without password wurde beendet");
})
test("UserModel.test find user by name", async () => {
    logger.info("UserModel.test find user wird gestartet");
    await User.create({
        name: "test",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        failedLoginCount: 0,
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    })
    const user = await User.findOne({ name: "test" });
    expect(user?.name).toBe("test");
    logger.info("UserModel.test find user wurde beendet");
})
test("UserModel.test studentId must min 6 chars", async () => {
    logger.info("UserModel.test studentId must min 6 chars wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: 12345,
        email: "test",
        failedLoginCount: 0,
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    try {
        await user.save();
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }   
    logger.info("UserModel.test studentId must min 6 chars wurde beendet");
})
test("UserModel.test change name without studentId must fail", async () => {
    logger.info("UserModel.test change name without studentId must fail wird gestartet");
    const user = new User({
        name: "irgendeinOtto",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
        enrolledSince: new Date(),
        CreditPoints: 0,
        phone: 123
    });
    await user.save();
    try {
        let updateUser = await User.findOneAndUpdate({ name: "irgendeinOtto" }, { name: "newname" }, { new: true });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }   
    logger.info("UserModel.test change name without studentId must fail wurde beendet");
    
})
test("UserModel.test change name with findOneandUpdate", async () => {
    logger.info("UserModel.test change name with findOneandUpdate wird gestartet");
    const user = new User({
        name: "oldname",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        department: "test",
        CreditPoints: 0,
    })
    await user.save();
    expect(user?.name).toBe("oldname");
    
   
    let updateUser = await User.findOneAndUpdate({ studentId: "123456" }, { name: "newname" }, { new: true });
    
    if(updateUser) {
        expect(updateUser?.name).toBe("newname");
    }else{
        logger.error("UserModel.test change name with findOneandUpdate failed");
    }
    logger.info("UserModel.test change name with findOneandUpdate wurde beendet");
})
//UpdateOne
test("UserModel.test change name with updateOne", async () => {
    logger.info("UserModel.test change name with updateOne wird gestartet");
    const user = new User({
        name: "oldname",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        failedLoginCount: 0,
        department: "test",
        CreditPoints: 0,
    })
    await user.save();
    expect(user?.name).toBe("oldname");
    await User.updateOne({ studentId: "123456" }, { name: "newname" });
    let updateUser = await User.findOne({ studentId: "123456" });
    
    expect(updateUser!.name).toBe("newname");
    
    logger.info("UserModel.test change name with updateOne wurde beendet");
})
//update one without studentId
test("UserModel.test change name without studentId with updateOne must fail", async () => {
    logger.info("UserModel.test change name without studentId with updateOne wird gestartet");
    let user = new User({
        name: "oldname",
        password: "test",
        admin: false,
        studentId: 123456,
        email: "test@bht-berlin.de",
        failedLoginCount: 0,
        department: "test",
        CreditPoints: 0,
    })
    await user.save();
    try {
        await User.updateOne({ name: "oldname" }, { name: "newname" });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }
    logger.info("UserModel.test change name without studentId with updateOne wurde beendet");
})

test("UserModel.test Create User with minimal data", async () => {
    logger.info("UserModel.test Create User with minimal data wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        studentId: 123456,
        email: "test@bht-berlin.de",
    });
    await user.save();
    expect(user?.name).toBe("test");
    expect(user?.studentId).toBe(123456);
    logger.info("UserModel.test Create User with minimal data wurde beendet");
})

//let fail isCorrect passwort

