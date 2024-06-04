import { logger } from "../../src/logger/testLogger";
import * as AntragZulassungModel from "../../src/model/AntragZulassungModel";
import { User } from "../../src/model/UserModel";
import { ApplicationResource } from "../../src/Resources";

let userID = "";
beforeAll(async () => {
    const user = new User({
        name: "test",
        password: "test",
        admin: false,
        studentId: "123456",
        email: "test@bht-berlin.de",
        course: "test",
        enrolledSince: new Date(),
        creditPoints: 0,
        phone: 123
    });
    await user.save();

    userID = user.id;
})
test("AntragZulassungModel.test createAntragZulassung", async () => {
    logger.info("AntragZulassungModel.test createAntragZulassung wird gestartet");
    const user = await User.findById(userID).exec();
    const antrag = new AntragZulassungModel.Application({
        creator: user?.id ? user.id.toString() : "",
        studentid: "12345678",
        department: "Informatik",
        course: "Software Engineering",
        bachelor: true,
        master: false,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 123",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789"
        },
        internshipCompleted: true,
        recognitionApplied: false,
        internshipCompletedFrom: new Date("2024-03-01"),
        internshipCompletedTo: new Date("2024-08-31"),
        modulesCompleted: true,
        modulesPending: false,
        attachment2Included: true,
        topicSuggestion: false,
        date: new Date(),
    });
    await antrag.save();
    expect(antrag.id).toBeDefined();
    expect(antrag.creator).toBeDefined();
    expect(antrag.studentid).toBe("12345678");
    expect(antrag.department).toBe("Informatik");
    expect(antrag.course).toBe("Software Engineering");
    expect(antrag.bachelor).toBe(true);
    expect(antrag.master).toBe(false);
    expect(antrag.userDetails!.lastName).toBe("Mustermann");
    expect(antrag.userDetails!.firstName).toBe("Max");
    expect(antrag.userDetails!.street).toBe("Musterstraße 123");
    expect(antrag.userDetails!.city).toBe("Berlin");
    expect(antrag.userDetails!.postalCode).toBe("12345");
    expect(antrag.userDetails!.country).toBe("Deutschland");
    expect(antrag.userDetails!.phone).toBe("0123456789");
    expect(antrag.internshipCompleted).toBe(true);
    expect(antrag.recognitionApplied).toBe(false);
    expect(antrag.internshipCompletedFrom).toEqual(new Date("2024-03-01"));
    expect(antrag.internshipCompletedTo).toEqual(new Date("2024-08-31"));
    expect(antrag.modulesCompleted).toBe(true);
    expect(antrag.modulesPending).toBe(false);
    expect(antrag.attachment2Included).toBe(true);
    expect(antrag.topicSuggestion).toBe(false);
    logger.info("AntragZulassungModel.test createAntragZulassung wurde beendet");
}); 


