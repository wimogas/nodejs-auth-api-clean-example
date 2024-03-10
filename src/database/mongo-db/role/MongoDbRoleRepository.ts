import RoleModel from "./models/RoleModel";
import {IRoleRepository} from "../../interfaces/IRoleRepository";
import {Role} from "../../../domain/role/Role";

export class MongoDbRoleRepository implements IRoleRepository {

    public async addRole(role: Role): Promise<void> {
        await RoleModel.create({
            _id: role.id.value,
            name: role.name
        })
    }

    public async updateRole(roleId: string, changes: any): Promise<any> {
        return RoleModel.findOneAndUpdate({_id: roleId},{
            name: changes.name,
            permissions: changes.permissions
        })

    }

    public async getRoleById(id: string): Promise<any> {
        return await RoleModel.findOne({_id: id}).populate('permissions').exec()
    }

    public async getRoleByName(name: string): Promise<any> {
        return await RoleModel.findOne({name}).exec()
    }

    public async getRolePermissions(id: string): Promise<any> {
        return await RoleModel.findOne({_id: id})
            .populate('permissions').exec()
    }

    public async deleteRole(id: string): Promise<void> {
        await RoleModel.deleteOne({_id: id});
    }

}