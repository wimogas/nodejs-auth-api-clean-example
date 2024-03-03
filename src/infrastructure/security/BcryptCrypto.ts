import bcrypt from "bcrypt";
import {ICrypto} from "../../application/authentication/interfaces/ICrypto";

export class BcryptCrypto implements ICrypto {
    public async handleHash(password: string, salt: number): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    public async handleCompare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}