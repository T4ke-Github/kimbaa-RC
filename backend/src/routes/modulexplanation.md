# Managing a User's Modules

This entry explains how to use functions to manage a user's modules.

## Automatic Loading of `MedieninformatikModule.json`

When a user is created with the field "course": "Medieninformatik", the MedieninformatikModule.json is automatically loaded in the backend. This file contains information about whether the module is in the 1st-3rd semester (field: required) and how many credits can be earned by completing the module.

```typescript

//Wie ein User angelegt wird das automatisch die Modulliste geladen wird.
    const user = await userService.createUser({
        name: "Tim", 
        password: "test",
        admin: false,
        studentId: "666456",
        email: "test@bht-berlin.de",
        course: "Medieninformatik",
    });

```


```json
//Aufbau der Module in der MedienInformatikModule.json
{
    "Modulnummer": "10985_106565",
    "modulname": "Algorithmen und Datenstrukturen",
    "creditPoints": 5,
    "solved": "false",
    "required": "true"
}
```

## Retrieving the Module List

To retrieve a complete list of a user's modules, the following route can be used:

```typescript

modulRouter.get("/alle/:studentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId;
        const modules = await modulService.getAlleModule(studentId);
        res.status(200).send(modules);
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
```

The modules contain the following fields:

```typescript
{
    id: string; // Die ID des Moduls
    creator: string; // Die ID des Benutzers, der das Modul erstellt hat
    modulList: string; // Die ID der Modulliste, zu der das Modul gehört
    modulnumber: string; // Die Modulnummer
    modulname: string; // Der Name des Moduls
    creditPoints: number; // Die Anzahl der Credits, die das Modul bringt
    solved: boolean; // Gibt an, ob das Modul abgeschlossen wurde
    required: boolean; // Gibt an, ob das Modul im 1-3. Semester benötigt wird
}
```

## Updating Modules

To update one or more modules, an array of ModulResource objects can be sent to the following route:

```typescript
modulRouter.put("/update", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modules: ModulResource[] = req.body.modules;
        await modulService.updateModulesByModuleNameAndUserId(modules);
        res.status(200).send({ message: "Module erfolgreich aktualisiert" });
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
```

A module update looks as follows:

```json
{
    "creator": "user.id",
    "modulname": "Mathematik I",
    "solved": true
}
```

This sets the module "Mathematik I" of the user "user.id" to completed (solved: true). Any number of modules can be updated at once.

## Evaluating Modules

Modules can be evaluated via the user ID:

```typescript
modulRouter.get("/summary/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await modulService.calculateModuleSummary(req.params.userId);
        res.status(200).send(summary);
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
});
```

Hier bekommt man drei Werte zurück:

- `response.body.credits`: Alle berechneten Credits aus Modulen, die `solved` sind.
- `response.body.allrequired`: `true`, wenn alle 1-3. Semester Module `solved` sind.
- `response.body.minreqCredits`: `true`, wenn mindestens 155 Credits erreicht sind.

## Modul Endpoints

| Route | Method | Request-Body / JSON Instance | Response-Body, JSON Instance |
|:------|:-------|:----------------------------:|:----------------------------:|
| `/api/modul/alle/:studentId` | GET | - | Array of `ModulResource` |
| `/api/modul/update` | PUT | `{ "modules": [ { "creator": "string", "modulname": "string", "solved": "boolean" }, ... ] }` | `{ "message": "Module erfolgreich aktualisiert" }` |
| `/api/modul/summary/:userId` | GET | - | `{ "credits": number, "allrequired": boolean, "minreqCredits": boolean }` |


