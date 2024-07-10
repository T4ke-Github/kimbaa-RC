import dotenv from "dotenv";
dotenv.config();
import supertest from "supertest";
import app from "../../src/app";
import { ModulResource } from "../../src/Resources";
import * as userService from "../../src/services/UserService";
import * as modulService from "../../src/services/ModulService";
import { User } from "../../src/model/UserModel";
import { performAuthentication, supertestWithAuth } from "../supertestWithAuth";

let user;

beforeEach(async () => {
    await User.deleteMany({});
    user = await userService.createUser({
        name: "Tim",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    });

    await performAuthentication("666456", "test");
});

// Test zum Abrufen aller Module
test("/api/modul getAlleModule", async () => {
    const testee = supertestWithAuth(app);

    // Hier sollten Sie Code hinzufügen, um einige Module für den Benutzer zu erstellen
    await modulService.createModul({
        creator: user.id,
        modulname: "Mathematik I",
        solved: true
    });
    await modulService.createModul({
        creator: user.id,
        modulname: "Grundlagen der Theoretischen Informatik",
        solved: true
    });
    await modulService.createModul({
        creator: user.id,
        modulname: "Mathematik II",
        solved: true
    });

    const response = await testee.get(`/api/modul/alle/${user.studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(2); // Ändern Sie dies entsprechend der Anzahl der erstellten Module
});

// Test zum Aktualisieren von Modulen anhand des Modulnamens und der Benutzer-ID
test("/api/modul updateModulesByModuleNameAndUserId", async () => {
    const testee = supertestWithAuth(app);
    const modules: ModulResource[] = [
        {
            creator: user.id,
            modulname: "Mathematik I",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Grundlagen der Theoretischen Informatik",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Mathematik II",
            solved: true
        }
    ];
    const response = await testee.put("/api/modul/update").send({ modules });
    expect(response.status).toBe(200);
});

// Test zum Abrufen der Modulzusammenfassung
test("/api/modul calculateModuleSummary", async () => {
    const testee = supertestWithAuth(app);
    const modules: ModulResource[] = [
        {
            creator: user.id,
            modulname: "Mathematik I",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Grundlagen der Theoretischen Informatik",
            solved: true
        },
        {
            creator: user.id,
            modulname: "Mathematik II",
            solved: true
        }
    ];

    await modulService.createModul(modules[0]);
    await modulService.createModul(modules[1]);
    await modulService.createModul(modules[2]);

    const responseUpdate = await testee.put("/api/modul/update").send({ modules });
    expect(responseUpdate.status).toBe(200);

    const response = await testee.get(`/api/modul/summary/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body.credits).toBe(15); // Beispielwert, ändern Sie dies entsprechend Ihrer Berechnungslogik
    expect(response.body.allrequired).toBe(false); // Beispielwert, ändern Sie dies entsprechend Ihrer Berechnungslogik
    expect(response.body.minreqCredits).toBe(false); // Beispielwert, ändern Sie dies entsprechend Ihrer Berechnungslogik
    expect(response.body.credits).toBeGreaterThan(0);
});
