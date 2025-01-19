import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    if (!createUserDto.password) {
      createUserDto.password = "123456";
    }
    const user = await this.usersService.create(createUserDto);

    const userDto: UserDto = {
      id: user._id,
      name: user.name,
      email: user.email,
      roleName: user.roleName,
      roles: user.roles,
    };

    return userDto;
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
