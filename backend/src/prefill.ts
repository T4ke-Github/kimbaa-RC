// istanbul ignore file

/*Vorlagen .*/

import { UserResource} from "../src/Resources";
import { logger } from "./logger";

import { User } from "../src/model/UserModel";

import { createUser } from "../src/services/UserService";


/**
 * Erzeugt einen Benutzer "Behrens" und vom ihm angelegten antrag mit Einträgen.
 * Diese Funktion benötigen wir später zu Testzwecken im Frontend.
*/
export async function prefillDB(): Promise<{ heinz: UserResource}> {
    
    await User.syncIndexes();
    //antrag
    const UserResource: UserResource = {
        name: "Behrens",
        studentId: 123456,
        password: "123_abc_ABC",
        admin: true,
        email: "",
        department: "",
        CreditPoints: 0,
        phone: 0
    }
    const heinz = await createUser(UserResource);
    logger.info(`Prefill DB with test data, user: ${UserResource.name}, password 123_abc_ABC`);

    return { heinz };   
}
    /* const protokolle: ProtokollResource[] = [];
    
    const itemsPerList = [[1, 4, 2, 0], [3, 5, 7]];
    const patienten = ["Hans", "Clawdia"];
    const datumPostfix = [".10.1907", ".11.1907"];
    const publicValue = [true, false];
    const getraenke = ["Kaffee", "Tee", "Sekt", "Limo"];
    const mengen = [150, 180, 200, 300];
    
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < itemsPerList[k].length; i++) {
            const protokoll = await createProtokoll({ patient: patienten[k], datum: (i + 1) + datumPostfix[k], public: publicValue[k], ersteller: behrens.id!, closed: false })
            let gesamtMenge = 0;
            for (let m = 0; m < itemsPerList[k][i]; m++) {
                const eintrag = await createEintrag({
                    getraenk: getraenke[m % getraenke.length], menge: mengen[m % mengen.length],
                    protokoll: protokoll.id!, ersteller: behrens.id!
                })
                gesamtMenge += eintrag.menge;
            }
            protokolle.push({ ...protokoll, gesamtMenge: gesamtMenge });
        }
    }
    return { behrens, protokolle };
}
  */