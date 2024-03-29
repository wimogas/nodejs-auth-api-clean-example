import container from '../../../di'
import {IController, IHTTPRequest} from "../../../application/interfaces";
import {Permission} from "../../../application/common/security";
import {authorize} from "../../../infrastructure/security";
import {logger} from "../../../infrastructure/services";
import {DeleteRoleCommandHandler, DeleteRoleCommand} from "../../../application/roles";

export class DeleteRoleController implements IController {

    @authorize(Permission.Admin)
    @logger
    public async execute(request: IHTTPRequest): Promise<void>{

        const createPermissionCommandHandler = container.resolve(DeleteRoleCommandHandler)

        const createPermissionCommand = new DeleteRoleCommand(
            request.params.id
        )

        await createPermissionCommandHandler.execute(createPermissionCommand)
    }
}

