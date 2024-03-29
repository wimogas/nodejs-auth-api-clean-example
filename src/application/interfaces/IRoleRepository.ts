import {Role} from "../../domain/role/Role";

export interface IRoleRepository {
    addRole(role: Role): Promise<void>
    updateRole(roleId: string, changes: any): Promise<any>
    getRoleById(id: string): Promise<any>
    getRoleByName(name: string): Promise<any>
    getRoles(limit: number, skip: number): Promise<any>
    getRolePermissions(id: string): Promise<any>
    deleteRole(id: string): Promise<void>
}