import jwt, {JwtPayload} from 'jsonwebtoken'
import {ITokenService} from "../../../application/common/interfaces/authentication/ITokenService";
import User from "../../../domain/entities/User";

export class JwtTokenService implements ITokenService {

    private secret = process.env.JWT_SECRET

    public generateToken(id: string, user: User): string {
        return jwt.sign({
            id,
            name: user.getName,
            email: user.getEmail
        }, this.secret, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}