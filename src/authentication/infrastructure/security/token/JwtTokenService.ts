import jwt from 'jsonwebtoken'
import {ITokenService} from "../../../application/common/security/ITokenService";

export class JwtTokenService implements ITokenService {

    private secret = process.env.JWT_SECRET

    public generateToken(id: string, user: any): string {
        return jwt.sign({
            id,
            email: user.email
        }, this.secret, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}