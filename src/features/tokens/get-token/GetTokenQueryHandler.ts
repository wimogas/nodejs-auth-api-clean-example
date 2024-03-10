import {inject, singleton} from "tsyringe";
import {GetTokenQuery} from "./GetTokenQuery";
import {Email, User} from "../../../domain/user";
import {UnauthorizedError} from "../../../domain/common/errors";
import {IUserRepository} from "../../../database/interfaces/IUserRepository";
import {ICryptoService} from "../../../services/ICryptoService";
import {ITokenProvider} from "../../../services/ITokenProvider";


@singleton()
export class GetTokenQueryHandler {

    public constructor(
        @inject("userRepository") private _userRepository: IUserRepository,
        @inject("cryptoService") private _cryptoService: ICryptoService,
        @inject("tokenProvider") private _tokenProvider: ITokenProvider
    ) {}

    public async execute(request: GetTokenQuery): Promise<string> {

        const email = Email.create(request.email)

        const foundUser = await this._userRepository.getUserByEmail(email.value)

        if (!foundUser) {
            throw new UnauthorizedError("Invalid credentials.")
        }

        const isCorrectPassword = await this._cryptoService.handleCompare(request.password, foundUser.password)

        if (!isCorrectPassword) {
            throw new UnauthorizedError("Invalid credentials.")
        }

        // get permissions for user
        const permissions = []

        // create new Domain User
        const user = await User.create({
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
            permissions
        })

        try {
            return this._tokenProvider.generateToken(user)
        } catch (error) {
            throw error
        }
    }
}