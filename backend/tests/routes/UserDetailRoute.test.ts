import supertest from "supertest";
import app from "../../src/app";
import express from 'express';
import { userDetailsRouter } from '../../src/routes/UserDetailsRoute';
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
});


test("GET /userdetails/:identifier - success", async () => {
    const testee = supertest(app);
    const user = await userService.getOneUser({ studentId: "666456" });
    const application = await antragZulassungService.createApplication({
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
    

    const res = await testee.get("/api/userdetails/666456");

    const userDetails = res.body.antragZulassungDetails;

    expect(res.status).toBe(200);
    expect(userDetails.lastName).toBe("Mustermann");
    expect(userDetails.firstName).toBe("Max");
    expect(userDetails.street).toBe("Musterstraße 1");
    expect(userDetails.city).toBe("Berlin");
    expect(userDetails.postalCode).toBe("12345");
    expect(userDetails.country).toBe("Deutschland");
    expect(userDetails.phone).toBe("0123456789");
    
})


test("PUT /userdetails/:identifier - success with no existing application", async () => {
    const testee = supertest(app);
    const user = await userService.getOneUser({ studentId: "666456" });
    
    // Stellen Sie sicher, dass kein Antrag für diesen Benutzer existiert


    const newUserDetails = {
        lastName: "Musterfrau",
        firstName: "Maria",
        street: "Musterstraße 2",
        city: "Berlin",
        postalCode: "12345",
        country: "Deutschland",
        phone: "0123456789",
    };

    const res = await testee.put("/api/userdetails/666456").send(newUserDetails);

    expect(res.status).toBe(200);
    expect(res.body.antragZulassungDetails.lastName).toEqual(newUserDetails.lastName);
    expect(res.body.antragZulassungDetails.firstName).toEqual(newUserDetails.firstName);
    // und so weiter für die anderen Attribute

    // Überprüfen Sie, ob jetzt ein Antrag für diesen Benutzer existiert
    const application = await antragZulassungService.getApplicationById(user.id!);
    expect(application).not.toBeNull();
    expect(application!.userDetails!.lastName).toEqual(newUserDetails.lastName);
    expect(application!.userDetails!.firstName).toEqual(newUserDetails.firstName);
    // und so weiter für die anderen Attribute
});

test("PUT /userdetails/:identifier - success with existing application", async () => {
    const testee = supertest(app);
    const user = await userService.getOneUser({ studentId: "666456" });
    const application = await antragZulassungService.createApplication({
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
    // Stellen Sie sicher, dass kein Antrag für diesen Benutzer existiert


    const newUserDetails = {
        lastName: "Musterfrau",
        firstName: "Maria",
        street: "Musterstraße 2",
        city: "Berlin",
        postalCode: "12345",
        country: "Deutschland",
        phone: "0123456789",
    };

    const res = await testee.put("/api/userdetails/666456").send(newUserDetails);

    expect(res.status).toBe(200);
    expect(res.body.antragZulassungDetails.lastName).toEqual(newUserDetails.lastName);
    expect(res.body.antragZulassungDetails.firstName).toEqual(newUserDetails.firstName);
    // und so weiter für die anderen Attribute

    // Überprüfen Sie, ob jetzt ein Antrag für diesen Benutzer existiert
    const foundapplication = await antragZulassungService.getApplicationById(user.id!);
    expect(foundapplication).not.toBeNull();
    expect(foundapplication!.userDetails!.lastName).toEqual(newUserDetails.lastName);
    expect(foundapplication!.userDetails!.firstName).toEqual(newUserDetails.firstName);
    // und so weiter für die anderen Attribute
});
