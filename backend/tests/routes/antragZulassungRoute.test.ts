import supertest from "supertest";
import app from "../../src/app";
import * as userService from "../../src/services/UserService";
import * as antragZulassungService from "../../src/services/AntragZulassungService";
import { User } from '../../src/model/UserModel';
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
    const user2 = new User({
        name: "DerOtto",
        password: "test",
        admin: false,
        studentId: "999999",
        email: "test2@bht-berlin.de",
        course: "6",
    });
    await user.save();
    const application = await antragZulassungService.createApplication({
        creator: user2.id,
        studentid: user2.studentId,
        userDetails: {
            lastName: "Mustermann",
            firstName: "Max",
            street: "Musterstraße 1",
            city: "Berlin",
            postalCode: "12345",
            country: "Deutschland",
            phone: "0123456789",
        },
    });
});
// Test: Es existiert kein Antrag, also sind noch keine UserDetails eingetragen und es werden Antragsdaten gesendet.
test("PUT /antragzulassung/:identifier - success with no existing application", async () => {
    const testee = supertest(app);
    const user = await userService.getOneUser({ studentId: "666456" });

    // Stellen Sie sicher, dass kein Antrag für diesen Benutzer existiert
    let application = await antragZulassungService.getApplicationById(user.id!);
    expect(application).toBeNull();

    const newApplicationResource = {
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
    };

    const res = await testee.put("/api/antragzulassung/666456").send(newApplicationResource);

    expect(res.status).toBe(200);

    // Überprüfen Sie, ob jetzt ein Antrag für diesen Benutzer existiert
    application = await antragZulassungService.getApplicationById(user.id!);
    expect(application).not.toBeNull();
    // Hier können Sie weitere Überprüfungen hinzufügen, um sicherzustellen, dass die Antragsdaten korrekt gespeichert wurden
});

// Test: Es existieren schon eingetragene UserDetails und es werden Antragsdaten ausgefüllt und gesendet.
test("PUT /antragzulassung/:identifier - success with existing application", async () => {
    const testee = supertest(app);
    const user2 = await userService.getOneUser({ studentId: "666456" });


    const newApplicationResource = {
            department: "Informatik",
            bachelor: true,
            master: false,
            internshipCompleted: false,
            recognitionApplied: false,
            internshipCompletedFrom: new Date(), // Praxisphase abgeleistet von
            internshipCompletedTo: new Date(), // Praxisphase abgeleistet bis
            modulesCompleted: false,
            modulesPending: true,
            attachment2Included: false,
            topicSuggestion: false,
            date: new Date(),
        
    };

    const res = await testee.put("/api/antragzulassung/666456").send(newApplicationResource);

    expect(res.status).toBe(200);

    // Überprüfen Sie, ob der Antrag aktualisiert wurde
    const application = await antragZulassungService.getApplicationById(user2.id!);
    expect(application?.department).toBe("Informatik");
    expect(application?.bachelor).toBe(true);
    expect(application?.master).toBe(false);
    expect(application?.internshipCompleted).toBe(false);
    expect(application?.recognitionApplied).toBe(false);
    expect(application?.internshipCompletedFrom).toBeTruthy;
    expect(application?.internshipCompletedTo).toBeTruthy;
    expect(application?.modulesCompleted).toBe(false);
    expect(application?.modulesPending).toBe(true);
    expect(application?.attachment2Included).toBe(false);
    expect(application?.topicSuggestion).toBe(false);
    expect(application?.date).toBeTruthy;
    // Hier können Sie weitere Überprüfungen hinzufügen, um sicherzustellen, dass die Antragsdaten korrekt aktualisiert wurden
});

// Test: Es wird mit GET Antragsinformationen abgerufen
test("GET /antragzulassung/:identifier - success", async () => {
    const testee = supertest(app);
    const user = await userService.getOneUser({ studentId: "666456" });
    const applicationnew = await antragZulassungService.createApplication({
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
        internshipCompletedFrom: new Date(), // Praxisphase abgeleistet von
        internshipCompletedTo: new Date(), // Praxisphase abgeleistet bis
        modulesCompleted: false,
        modulesPending: true,
        attachment2Included: false,
        topicSuggestion: false,
        date: new Date(),
    });
    
    // Stellen Sie sicher, dass ein Antrag für diesen Benutzer existiert
    const application = await antragZulassungService.getApplicationById(user.id!);
    expect(application).not.toBeNull();

    const res = await testee.get("/api/antragzulassung/666456");

    expect(res.status).toBe(200);
    expect(applicationnew?.department).toBe("Informatik");
    expect(applicationnew?.bachelor).toBe(true);
    expect(applicationnew?.master).toBe(false);
    expect(applicationnew?.internshipCompleted).toBe(false);
    expect(applicationnew?.recognitionApplied).toBe(false);
    expect(applicationnew?.internshipCompletedFrom).toBeTruthy;
    expect(applicationnew?.internshipCompletedTo).toBeTruthy;
    expect(applicationnew?.modulesCompleted).toBe(false);
    expect(applicationnew?.modulesPending).toBe(true);
    expect(applicationnew?.attachment2Included).toBe(false);
    expect(applicationnew?.topicSuggestion).toBe(false);
    expect(applicationnew?.date).toBeTruthy;

    // Hier können Sie weitere Überprüfungen hinzufügen, um sicherzustellen, dass die Antragsinformationen korrekt abgerufen wurden
});
