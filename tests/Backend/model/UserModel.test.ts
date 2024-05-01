import { User, IUser } from "../../../src/backend/model/UserModel";
import { logger } from "../../../src/backend/backlogger";



beforeEach(async () => {
    await User.deleteMany({});
});

test("createUser", async () => {
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        matrikelnummer: 123,
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
    expect(user.matrikelnummer).toBe(123);
    expect(user.email).toBe("test");
    expect(user.ersteAnmeldung).toBeDefined();
    expect(user.letzteAnmeldung).toBeDefined();
    expect(user.pwAnderungDatum).toBeDefined();
    expect(user.fehlerhafteAnmeldeversuche).toBe(0);
    expect(user.fachbereich).toBe("test");
    expect(user.immatrikuliertSeit).toBeDefined();
    expect(user.CreditPoints).toBe(0);
    expect(user.telefon).toBe(123);

}); 
