import { HydratedDocument } from "mongoose";
import { logger } from "../../src/logger/testLogger";
import { IUser, User } from "../../src/model/UserModel";
import { Application } from "../../src/model/AntragZulassungModel";
import * as UserService from "../../src/services/UserService";
import * as AntragZulassungService from "../../src/services/AntragZulassungService";
import { ApplicationResource } from "../../src/Resources";



beforeEach(async () => {
    const user = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "6",
    });
    await user.save();
});

test("AntragZulassungService.test createApplication", async () => {
    logger.info("AntragZulassungService.test createApplication wird gestartet");
    const user = await UserService.getOneUser({ studentId: "666456" });
    const application = await AntragZulassungService.createApplication({
        creator: user.id,
        studentid: user.studentId,
        department: "Informatik",
        bachelor: true,
        master: false,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 1",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789",
        },
        internshipCompleted: false,
        recognitionApplied: false,
        modulesCompleted: false,
        modulesPending: true,
        attachment2Included: false,
        topicSuggestion: false,
        date: new Date(),
    });
    const neuErstellterAntrag = await Application.findOne({ studentid: user.studentId });

    expect(neuErstellterAntrag!.studentid).toBe(user.studentId); // Überprüfen Sie, ob der Antrag korrekt erstellt wurde
    logger.info("AntragZulassungService.test createApplication wurde beendet");
});

test("AntragZulassungService.test updateApplication", async () => {
    logger.info("AntragZulassungService.test updateApplication wird gestartet");

    const user = await UserService.getOneUser({ studentId: "666456" });
    const application = await AntragZulassungService.createApplication({
        creator: user.id,
        studentid: user.studentId,
        department: "Informatik",
        bachelor: true,
        master: false,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 1",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789",
        },
        internshipCompleted: false,
        recognitionApplied: false,
        modulesCompleted: false,
        modulesPending: true,
        attachment2Included: false,
        topicSuggestion: false,
        date: new Date(),
    });

    const updatedApplication = await AntragZulassungService.updateApplication({
        id: application.id,
        department: "Maschinenbau",
        userDetails: {
            lastName: "Neumann",
            firstName: "Maximillian",
        }
    });

    expect(updatedApplication.department).toBe("Maschinenbau");
    expect(updatedApplication!.userDetails!.lastName).toBe("Neumann");
    expect(updatedApplication!.userDetails!.firstName).toBe("Maximillian");
    logger.info("AntragZulassungService.test updateApplication wurde beendet");
});

// Test für getApplicationById
test("AntragZulassungService.test getApplicationById", async () => {
    logger.info("AntragZulassungService.test getApplicationById wird gestartet");

    const user = await UserService.getOneUser({ studentId: "666456" });
    const application = await AntragZulassungService.createApplication({
        creator: user.id,
        studentid: user.studentId,
        department: "Informatik",
        bachelor: true,
        master: false,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 1",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789",
        },
        internshipCompleted: false,
        recognitionApplied: false,
        modulesCompleted: false,
        modulesPending: true,
        attachment2Included: false,
        topicSuggestion: false,
        date: new Date(),
    });


    const fetchedApplication = await AntragZulassungService.getApplicationById(user!.id!);

    expect(fetchedApplication!.id!).toBe(application.id); // Überprüfen Sie, ob der richtige Antrag abgerufen wurde
    logger.info("AntragZulassungService.test getApplicationById wurde beendet");
});

// Test für deleteApplication
test("AntragZulassungService.test deleteApplication", async () => {
    logger.info("AntragZulassungService.test deleteApplication wird gestartet");
    const user = await UserService.getOneUser({ studentId: "666456" });
    const application = await AntragZulassungService.createApplication({
        creator: user.id,
        studentid: user.studentId,
        department: "Informatik",
        bachelor: true,
        master: false,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 1",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789",
        },
        internshipCompleted: false,
        recognitionApplied: false,
        modulesCompleted: false,
        modulesPending: true,
        attachment2Included: false,
        topicSuggestion: false,
        date: new Date(),
    });

    await AntragZulassungService.deleteApplication(application!.id!);

    try {
        await AntragZulassungService.getApplicationById(application!.id!);
        expect(true).toBe(false);
    } catch (error) {
        expect(error).toBeInstanceOf(Error);
        logger.info("AntragZulassungService.test deleteApplication wurde beendet");
    }
    logger.info("AntragZulassungService.test deleteApplication wurde beendet");
});
