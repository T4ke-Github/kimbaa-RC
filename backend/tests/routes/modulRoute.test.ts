import supertest from "supertest";
import app from "../../src/app";
import { ModulResource } from "../../src/Resources";
import * as userService from "../../src/services/UserService";
import * as modulService from "../../src/services/ModulService";
import { User } from "../../src/model/UserModel";

// ...

let user: typeof User;

beforeEach(async () => {
    
})

// Test zum Abrufen aller Module
test("/api/modul getAlleModule", async () => {
    const testee = supertest(app);
    const user = await userService.createUser({
        name: "Tim",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    });
    // Hier sollten Sie Code hinzufügen, um einige Module für den Benutzer zu erstellen
    const response = await testee.get(`/api/modul/alle/${user.studentId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(54); // Ändern Sie dies entsprechend der Anzahl der erstellten Module
});
// Test zum Aktualisieren von Modulen anhand des Modulnamens und der Benutzer-ID
test("/api/modul updateModulesByModuleNameAndUserId", async () => {
    const user = await userService.createUser({
        name: "Tim",
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    });
    const testee = supertest(app);
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
    const user = await userService.createUser({
        name: "Tim", 
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    });
    const testee = supertest(app);
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
    /* credits: totalCredits,
    allrequired: allRequired,
    minreqCredits: minReqCredits */
    const responseupdate = await testee.put("/api/modul/update").send({ modules });
    expect(responseupdate.status).toBe(200);
    const response = await testee.get(`/api/modul/summary/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body.credits).toBe(15);
    expect(response.body.allrequired).toBe(false);
    expect(response.body.minreqCredits).toBe(false);
    expect(response.body.credits).toBeGreaterThan(0);
});
