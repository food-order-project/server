import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RoleDocument } from "./schemas/role.schema";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async onModuleInit() {
    await this.ensureDefaultRoles();
  }

  private async ensureDefaultRoles() {
    try {
      await (this.roleModel as any).ensureDefaultRoles();
    } catch (error) {
      console.error("Error ensuring default roles:", error);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findByName(name: string): Promise<Role> {
    return this.roleModel.findOne({ name }).exec();
  }
}
