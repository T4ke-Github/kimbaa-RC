import { User } from "../model/UserModel";
import * as bcrypt from "bcryptjs";
import { logger } from "../logger";

/**

Checks the name and password; if successful, returns success as true
along with the id and role ("u" for user or "a" for admin) of the caregiver.
If no user with the given name exists or the password is incorrect, only
false is returned. For security reasons, no additional information is provided.
*/
export async function login(studentId: number, password: string): Promise<{ id: string, role: "a" | "u", success: boolean } | {success: false}> {
    const user = await User.findOne({ studentId }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false };
    }else{
        const status: "a" | "u" = user.admin ? "a" : "u";
        return { id: user.id, role: status, success: true };
    }
}