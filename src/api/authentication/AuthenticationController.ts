import LoginCommand from "../../application/authentication/commands/LoginCommand";
import {IAuthRepository} from "../../application/common/interfaces/persistance/IAuthRepository";
import {IPresenter} from "../../application/common/interfaces/IPresenter";
import {IOutput} from "../../infrastructure/web/frameworks/express/outputs/interfaces/IOutput";
import {IHTTPRequest} from "../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import IValidator from "../../application/common/interfaces/IValidator";
import {TokenService} from "../../infrastructure/security/TokenService";
import {ILoginRequest} from "../../contracts/authentication/ILoginRequest";
import Presenter from "../Presenter";
import {IRegisterRequest} from "../../contracts/authentication/IRegisterRequest";
import RegisterCommand from "../../application/authentication/commands/RegisterCommand";
import {CryptoService} from "../../infrastructure/security/CryptoService";
import {IdGenerator} from "../../infrastructure/database/mongodb/IdGenerator";
import {ITokenService} from "../../application/common/interfaces/authentication/ITokenService";
import {ICryptoService} from "../../application/common/interfaces/authentication/ICryptoService";
import {IIdGenerator} from "../../application/common/interfaces/persistance/IIdGenerator";

export default class AuthenticationController {

    private readonly _authRepository: IAuthRepository;
    private readonly _presenter: IPresenter;
    private readonly _validator: IValidator;
    private readonly _tokenGenerator: ITokenService = new TokenService()
    private readonly _crypto: ICryptoService = new CryptoService()
    private readonly _idGenerator: IIdGenerator = new IdGenerator()

    public constructor(
        authRepository: IAuthRepository,
        response: IOutput,
        validator: IValidator,
    ) {
        this._authRepository = authRepository
        this._presenter = new Presenter(response)
        this._validator = validator

    }

    public async Login(req: IHTTPRequest): Promise<void>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw {
                statusCode: 400,
                message: error,
            }
        }

        const mappedRequest: ILoginRequest = {
            email: req.body.email,
            password: req.body.password
        }

        const loginCommand = new LoginCommand(
            this._authRepository,
            this._presenter,
            this._tokenGenerator,
            this._crypto
        )

        await loginCommand.execute(mappedRequest)
    }

    public async Register(req: IHTTPRequest): Promise<void>{

        const error = this._validator.validate(req.body)

        if (error) {
            throw {
                statusCode: 400,
                message: error,
            }
        }

        const mappedRequest: IRegisterRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const registerCommand: RegisterCommand = new RegisterCommand(
            this._authRepository,
            this._presenter,
            this._tokenGenerator,
            this._crypto,
            this._idGenerator
        )

        await registerCommand.execute(mappedRequest)
    }
}