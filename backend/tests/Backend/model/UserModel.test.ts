import { User, IUser } from "../../../../backend/model/UserModel";
import { logger } from "../../../../backend/backlogger";



beforeEach(async () => {
    await User.deleteMany({});
});

test("UserModel.test createUser", async () => {
    logger.info("UserModel.test createUser wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    await user.save();
    expect(user.id).toBeDefined();
    expect(user.name).toBe("test");
    expect(user.admin).toBe(false);
    expect(user.matrikelnummer).toBe(123456);
    expect(user.email).toBe("test");
    expect(user.ersteAnmeldung).toBeDefined();
    expect(user.letzteAnmeldung).toBeDefined();
    expect(user.pwAnderungDatum).toBeDefined();
    expect(user.fehlerhafteAnmeldeversuche).toBe(0);
    expect(user.fachbereich).toBe("test");
    expect(user.immatrikuliertSeit).toBeDefined();
    expect(user.CreditPoints).toBe(0);
    expect(user.telefon).toBe(123);
    logger.info("UserModel.test createUser wurde beendet");
}); 

test("UserModel.test createUser twice same name", async () => {
    logger.info("UserModel.test createUser twice wird gestartet");
    
    const user1 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        matrikelnummer: 666456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    const user2 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    await user1.save();
    await user2.save();
    //check names
    expect(user1.name).toBe("DerOtto");
    expect(user2.name).toBe("DerOtto");
    logger.info("UserModel.test createUser twice wurde beendet");
});

test("UserModel.test createUser twice same matrikelnummer must fail", async () => {
    logger.info("UserModel.test createUser twice same matrikelnummer wird gestartet");
    const user1 = new User({
        name: "test",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    const user2 = new User({
        name: "test2",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(), 
        CreditPoints: 0,
        telefon: 123
    });
    await user1.save();
    try {
        await user2.save();
    } catch (error) {
        expect(error).toBeDefined();
    }
    logger.info("UserModel.test createUser twice same matrikelnummer wurde beendet");
})

test("UserModel.test createUser without password must fail", async () => {
    logger.info("UserModel.test createUser without password wird gestartet");
    const user = new User({
        name: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
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
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    })
    const user = await User.findOne({ name: "test" });
    expect(user?.name).toBe("test");
    logger.info("UserModel.test find user wurde beendet");
})
test("UserModel.test matrikelnummer must min 6 chars", async () => {
    logger.info("UserModel.test matrikelnummer must min 6 chars wird gestartet");
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        matrikelnummer: 12345,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    try {
        await user.save();
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }   
    logger.info("UserModel.test matrikelnummer must min 6 chars wurde beendet");
})
test("UserModel.test change name without matrikelnummer must fail", async () => {
    logger.info("UserModel.test change name without matrikelnummer must fail wird gestartet");
    const user = new User({
        name: "irgendeinOtto",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    });
    await user.save();
    try {
        let updateUser = await User.findOneAndUpdate({ name: "irgendeinOtto" }, { name: "newname" }, { new: true });
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
    }   
    logger.info("UserModel.test change name without matrikelnummer must fail wurde beendet");
    
})
test("UserModel.test change name with findOneandUpdate", async () => {
    logger.info("UserModel.test change name with findOneandUpdate wird gestartet");
    let user = new User({
        name: "oldname",
        password: "test",
        admin: false,
        matrikelnummer: 123456,
        email: "test",
        ersteAnmeldung: new Date(),
        letzteAnmeldung: new Date(),
        pwAnderungDatum: new Date(),
        fehlerhafteAnmeldeversuche: 0,
        fachbereich: "test",
        immatrikuliertSeit: new Date(),
        CreditPoints: 0,
        telefon: 123
    })
    await user.save();
    expect(user?.name).toBe("oldname");
    
   
    let updateUser = await User.findOneAndUpdate({ matrikelnummer: "123456" }, { name: "newname" }, { new: true });
    
    if(updateUser) {
        expect(updateUser?.name).toBe("newname");
    }else{
        logger.error("UserModel.test change name with findOneandUpdate failed");
    }
    logger.info("UserModel.test change name with findOneandUpdate wurde beendet");
})

