import * as bcrypt from "bcryptjs";
import { logger } from "../../src/logger/testLogger";
import { User } from "../../src/model/UserModel";

beforeEach(async () => {
  const user1 = new User({
    name: "DerOtto",
    password: "test",
    admin: false,
    studentId: "666456",
    email: "test@bht-berlin.de",
    department: "6",

  });
  await user1.save();

})


logger.info("UserHash.test.js wird gestartet");
test("UserHash.test. Passwort wird korrekt gehasht", async () => {
  logger.info("Passwort wird gehasht gestartet");

  const foundUser = await User.findOne({ name: "DerOtto" });
  if (foundUser) {
    const isMatch = await bcrypt.compare("test", foundUser.password);
    if (isMatch) {
      logger.info("Passwort wurde gehasht und korrekt");
    }
    expect(isMatch).toBe(true);
    expect(foundUser.password).not.toBe("plaintext");
  } else {
    logger.error("User wurde nicht gefunden, Passwort wird gehasht");
    throw new Error("User wurde nicht gefunden");
  }

  logger.info("Passwort wird gehasht beendet");
})


test("UserHash.test.js Passwort Änderung", async () => {
  logger.info("UserHash.test.js  Passwort Änderung wird gestartet");
  const user = await User.create({
    name: "User1",
    password: "unchangedpassword",
    admin: false,
    studentId: "133799",
    email: "test2@bht-berlin.de",
    firstLogin: new Date(),
    lastLogin: new Date(),
    pwChangeDate: new Date(),
    failedLoginCount: 0,
    department: "6",
    enrolledSince: new Date(),
    CreditPoints: 0,
    phone: 123
  });
  await user.save();
  user.password = "newpassword";
  await user.save();
  const foundUser = await User.findOne({ studentId: "133799" });
  if (foundUser) {
    const isMatch = await bcrypt.compare("newpassword", user.password);
    if (!isMatch) {
      logger.error("isCorrectPasswort wurde geändert: Das gehashte Passwort stimmt nicht mit dem erwarteten Wert überein.");
      throw new Error("isCorrectPasswort wurde geändert: Das neue gehashte Passwort ist nicht korrekt.");
    }
    logger.info("isCorrectPasswort wurde geändert: Das gehashte Passwort stimmt mit dem erwarteten Wert überein.");
    expect(isMatch).toBe(true);
    expect(foundUser.password).not.toBe("newpassword");
  } else {
    logger.error("isCorrectPasswort Änderung: User wurde nicht gefunden Passwort änderung");
    throw new Error("isCorrectPasswort Änderung: User wurde nicht gefunden");
  }
  logger.info("UserHash.test.js Passwort Änderung wird beendet");
})

test("UserHash.test.js Passwort bleibt unverändert, wenn nicht geändert", async () => {
  logger.info("UserHash.test.js Passwort bleibt unverändert, wenn nicht geändert wird gestartet");
  const user = await User.create({
    name: "User1",
    password: "unchangedpassword",
    admin: false,
    studentId: "133799",
    email: "test100@bht-berlin.de",
    firstLogin: new Date(),
    lastLogin: new Date(),
    pwChangeDate: new Date(),
    failedLoginCount: 0,
    department: "6",
    enrolledSince: new Date(),
    CreditPoints: 0,
    phone: 123
  });
  await user.save();
  //hashwwert speichern
  const originalHash = user.password;

  user.name = "User1";
  await user.save();

  const foundUser = await User.findOne({ name: "User1" });
  if (foundUser) {
    if (foundUser.password !== originalHash) {
      logger.error("UserHash.test.js Passwort wurde geändert, obwohl es nicht sollte");
      throw new Error("UserHash.test.js Passwort wurde unerwartet geändert");
    }
    logger.info("UserHash.test.js Passwort bleibt unverändert: Passwort bleibt unverändert");
    expect(foundUser.password).toBe(originalHash);
  } else {
    logger.error("UserHash.test.js Passwort bleibt unverändert: User wurde nicht gefunden passwort bleibt unverändert wenn nicht geändert");
    throw new Error("UserHash.test.js User wurde nicht gefunden");
  }

  logger.info("UserHash.test.js Passwort bleibt unverändert, wenn nicht geändert wird beendet");
});

test("UserHash.test.js isCorrectPassword gibt true für korrektes Passwort", async () => {
  logger.info("UserHash.test.js isCorrectPassword gibt true für korrektes Passwort wird gestartet");
  /*   const user = new User({ name: "User1", password: "password", admin: false });
    await user.save(); */
  let user1 = await User.findOne({ studentId: "666456" });
  const isCorrect = await user1!.isCorrectPassword("test");
  expect(isCorrect).toBe(true);
  logger.info("UserHash.test.js isCorrectPassword gibt true für korrektes Passwort wird beendet");
});

test("UserHash.test.js isCorrectPassword gibt false für ungültiges Passwort", async () => {
  logger.info("isCorrectPassword gibt false für ungültiges Passwort wird gestartet");
  const user = await User.findOne({ studentId: "666456" });

  const isCorrect = await user!.isCorrectPassword("wrongpassword");
  if (isCorrect) {
    logger.error("UserHash.test.js is Correct Password: Ein ungültiges Passwort hat korrekt einen fehler ausgelösst.");
    throw new Error("UserHash.test.js Ein ungültiges Passwort hat korrekt einen fehler ausgelösst.");
  } else {
    logger.info("UserHash.test.js is Correct Password: Ein ungültiges Passwort hat nicht korrekt einen fehler ausgelösst.");

  }
  expect(isCorrect).toBe(false);
  logger.info("isCorrectPassword gibt false für ungültiges Passwort wird beendet");
})
test("UserHash.test.js User kann nicht mit leerem Passwort erstellt werden", async () => {
  logger.info("UserHash.test.js User kann nicht mit leerem Passwort erstellt werden wird gestartet");
  try {
    await User.create({ name: "invalidUser", password: "", admin: false });
    throw new Error("UserHash.test.js Der User sollte nicht erstellt werden können" + logger.error("UserHash.test.js Pleger kann nicht mit leerem Passwort erstellt werden: User wurd fehlerhaft erstellt"));
  } catch (err) {
    logger.info("UserHash.test.js Pleger kann nicht mit leerem Passwort erstellt werden: User wurde korrekt nicht erstellt");
    expect(err).toBeInstanceOf(Error);
  }

  logger.info("UserHash.test.js User kann nicht mit leerem Passwort erstellt werden wird beendet");
});

test("UserHash.test.js isCorrectPassword gibt false wenn falsches Passwort bei gespeichertem User eingegeben wird", async () => {
  logger.info("isCorrectPassword gibt false wenn falsches Passwort bei gespeichertem User eingegeben wird wird gestartet");
  const user = await User.findOne({ studentId: "666456" });
  const isCorrect = await user!.isCorrectPassword("wrongpassword");
  expect(isCorrect).toBe(false);
  logger.info("isCorrectPassword gibt false wenn falsches Passwort bei gespeichertem User eingegeben wird wird beendet");
});
test("UserHash.test.js isCorrectPassword gibt false wenn der Passworthash bei gespeichertem User eingegeben wird", async () => {
  logger.info("isCorrectPassword gibt false wenn der Passworthash bei gespeichertem User eingegeben wird wird gestartet");
  const user = await User.findOne({ studentId: "666456" });
  const isCorrect = await user!.isCorrectPassword(user!.password);
  expect(isCorrect).toBe(false);
  logger.info("isCorrectPassword gibt false wenn der Passworthash bei gespeichertem User eingegeben wird wird beendet");
});
test("UserHash.test.js isCorrectPassword gibt fehler wenn der Passwortänderung nicht gespeichert wird", async () => {
  logger.info("isCorrectPassword gibt fehler wenn der Passwort Änderung nicht gespeichert wird wird gestartet");
  const user = await User.findOne({ studentId: "666456" });
  const isCorrect = await user!.isCorrectPassword("newpassword");
  if (isCorrect) {
    logger.error("is Correct Password: Ein ungültiges Passwort hat korrekt einen fehler ausgelösst.");
    throw new Error("Ein ungültiges Passwort hat korrekt einen fehler ausgelösst.");
  } else {
    logger.info("is Correct Password: Ein ungültiges Passwort hat nicht korrekt einen fehler ausgelösst.");
  }
  expect(isCorrect).toBe(false);
  logger.info("isCorrectPassword gibt fehler wenn der Passwort Änderung nicht gespeichert wird wird beendet");
});
//Test compare no passwort with no passwort
test("UserHash.test.js isCorrectPassword gibt false wenn kein Passwort und kein Passwort eingegeben wird", async () => {
  logger.info("isCorrectPassword gibt false wenn kein Passwort und kein Passwort eingegeben wird wird gestartet");
  const user = await User.findOne({ studentId: "666456" });
  try {
    const isCorrect = await user!.isCorrectPassword("");
    expect(isCorrect).toBe(false);
  } catch (error) {
    logger.info("isCorrectPassword gibt false wenn kein Passwort und kein Passwort eingegeben wird, wird korrekt beendet");
  }
  logger.info("isCorrectPassword gibt false wenn kein Passwort und kein Passwort eingegeben wird wird beendet");
});

logger.info("UserHash.test.ts wird beendet");