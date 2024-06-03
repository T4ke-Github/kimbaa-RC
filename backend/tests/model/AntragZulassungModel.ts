import { logger } from "../../src/logger/testLogger";
import * as AntragZulassungModel from "../../src/model/AntragZulassungModel";

test("AntragZulassungModel.test createAntragZulassung", async () => {
    logger.info("AntragZulassungModel.test createAntragZulassung wird gestartet");
    const antrag = new AntragZulassungModel.Application({
        creator: "60d0fe4f5311236168a109ca",
        attach1id: "60d0fe4f5311236168a109cb",
        attach2id: "60d0fe4f5311236168a109cc",
        matriculationNumber: "12345678",
        department: "Informatik",
        course: "Software Engineering",
        bachelor: true,
        master: false,
        userData: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 123",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            email: "mustermann@bht-berlin.de",
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
    expect(antrag.creator).toBe("60d0fe4f5311236168a109ca");
    expect(antrag.attach1id).toBe("60d0fe4f5311236168a109cb");
    expect(antrag.attach2id).toBe("60d0fe4f5311236168a109cc");
    expect(antrag.matriculationNumber).toBe("12345678");
    expect(antrag.department).toBe("Informatik");
    expect(antrag.course).toBe("Software Engineering");
    expect(antrag.bachelor).toBe(true);
    expect(antrag.master).toBe(false);
    expect(antrag.userData.lastName).toBe("Mustermann");
    expect(antrag.userData.firstName).toBe("Max");
    expect(antrag.userData.street).toBe("Musterstraße 123");
    expect(antrag.userData.city).toBe("Berlin");
    expect(antrag.userData.postalCode).toBe("12345");
    expect(antrag.userData.country).toBe("Deutschland");
    expect(antrag.userData.email).toBe("mustermann@bht-berlin.de");
    expect(antrag.userData.phone).toBe("0123456789");
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

// Weitere Tests hinzufügen...
