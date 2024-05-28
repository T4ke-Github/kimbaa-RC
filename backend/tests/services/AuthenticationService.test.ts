import { User } from "../../src/model/UserModel";
import { login } from "../../src/services/AuthenticationService";

beforeEach(async () => {
    const user = new User({ name: "user1", 
        password: "test1", 
        
        studentId: "666456",
        email: "test@bht-berlin.de",
        });
    await user.save();
    
    
})

test("AuthenticationService.test Loggin Password correct", async () => {
    const user = await User.findOne({ studentId: "666456" }).exec();
    const pwCorrect = await login("666456", "test1");
    expect(pwCorrect).toBeTruthy();
    expect(pwCorrect).toEqual({ id: user!.id, role: "u", success: true });
})

test("AuthenticationService.test Loggin Password not correct", async () => {
    const user = await User.findOne({ studentId: "666456" }).exec();
    const pwCorrect = await login("666456", "test2");
    expect(pwCorrect).toBe(false);
})

test("AuthenticationService.test Loggin User not found", async () => {
    const pwCorrect = await login("666666", "test1");
    expect(pwCorrect).toBe(false);
})

test("AuthenticationService.test Loggin Password not found", async () => {
    const user = await User.findOne({ studentId: "666456" }).exec();
    const pwCorrect = await login("666451", "test1");
    expect(pwCorrect).toBe(false);
})

test("AuthenticationService.test Loggin Admin", async () => {
    const user = new User({ name: "user1", 
        password: "admin", 
        admin: true,
        studentId: "100000",
        email: "admin@bht-berlin.de",
        });
    await user.save();
    const admin = await User.findOne({ studentId: "100000" }).exec();
    const pwCorrect = await login("100000", "admin");
    expect(pwCorrect).toBeTruthy();
    expect(pwCorrect).toEqual({ id: admin!.id, role: "a", success: true });
})
test("AuthenticationService.test Loggin User", async () => {
    const user = await User.findOne({ studentId: "666456" }).exec();
    const pwCorrect = await login("666456", "test1");
    expect(pwCorrect).toBeTruthy();
    expect(pwCorrect).toEqual({ id: user!.id, role: "u", success: true });
})
test("AuthenticationService.test Loggin Default", async () => {
    const user = await User.findOne({ studentId: "666456" }).exec();
    const pwCorrect = await login("666456", "test1");
    expect(pwCorrect).toBeTruthy();
    expect(pwCorrect).toEqual({ id: user!.id, role: "u", success: true });
})
