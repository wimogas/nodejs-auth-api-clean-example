import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {authorize} from "../../../infrastructure/security";
import {Permission} from "../../../application/common/security";
import {logger} from "../../../infrastructure/services";
import {UpdateUserCommandHandler, UpdateUserCommand} from "../../../application/users";

export class UpdateUserController implements IController {

    @authorize(Permission.EditUser)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{
        const updateUserCommandHandler = container.resolve(UpdateUserCommandHandler)
        const updateUserCommand = new UpdateUserCommand(
            request.params.id,
            request.body.email,
            request.body.password
        )
        await updateUserCommandHandler.execute(updateUserCommand)
    }
}