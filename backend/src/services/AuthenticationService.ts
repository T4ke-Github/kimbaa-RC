import * as bcrypt from "bcryptjs";
import { logger } from "../logger/authenticationLogger";
import { User } from "../model/UserModel";

/**

Checks the name and password; if successful, returns success as true
along with the id and role ("u" for user or "a" for admin) of the caregiver.
If no user with the given name exists or the password is incorrect, only
false is returned. For security reasons, no additional information is provided.
*/
export async function login(studentId: string, password: string): Promise<{ id: string, role: "a" | "u", success: true } | false> {
    const user = await User.findOne({ studentId }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
        logger.info("Login failed" + user);
        return false;
        
    }else{
        logger.info("Login success" + user);
        const status: "a" | "u" = user.admin ? "a" : "u";
        return { id: user.id, role: status, success: true };
    }
}