import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { Role } from "../roles/schemas/role.schema";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<Role>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    this.logger.log(createUserDto);
    const userRole = await this.roleModel.findOne({ name: "USER" }).exec();
    if (!userRole) {
      throw new NotFoundException("Default USER role not found");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      roles: [userRole._id],
      roleName: userRole.name,
    });

    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel
      .find()

      .exec();

    return users.map((user) => ({
      id: user._id,
      email: user.email,
      roleName: user.roleName,
      name: user.name,
      password: user.password,
    }));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      id: user._id,
      email: user.email,
      roleName: user.roleName,
      name: user.name,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updates = { ...updateUserDto };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    this.logger.log(updates);

    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return existingUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
