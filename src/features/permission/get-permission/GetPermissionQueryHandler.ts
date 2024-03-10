import {inject, singleton} from "tsyringe";
import {IRoleRepository} from "../../../database/interfaces/IRoleRepository";
import {Permission} from "../../../domain/permission/Permission";
import {IPermissionRepository} from "../../../database/interfaces/IPermissionRepository";
import {NotFoundError} from "../../../domain/common/errors";

@singleton()
export class GetPermissionQueryHandler {

    public constructor(
        @inject("permissionRepository") private _permissionRepository: IPermissionRepository,
    ) {}

    public async execute(request: any): Promise<any> {
        const foundRole = await this._permissionRepository.getPermissionById(request.id)

        if (!foundRole) {
            throw new NotFoundError()
        }

        try {
            return {
                id: foundRole._id,
                name: foundRole.name,
            }
        } catch (error) {
            throw error
        }
    }
}