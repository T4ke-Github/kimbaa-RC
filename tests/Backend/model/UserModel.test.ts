import { User, IUser } from "../../../src/backend/model/UserModel";
import { logger } from "../../../src/backend/backlogger";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";



logger.info("UserModel.test wird gestartet");

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
    await User.save();
})