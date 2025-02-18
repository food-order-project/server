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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new user" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "name"],
      properties: {
        email: {
          type: "string",
          example: "newuser@example.com",
          description: "User email address",
        },
        name: {
          type: "string",
          example: "John Doe",
          description: "User full name",
        },
        password: {
          type: "string",
          example: "123456",
          description: "User password (optional, defaults to 123456)",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
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
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Return all users.",
    type: [UserDto],
  })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by id" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the user",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiResponse({ status: 200, description: "Return the user.", type: UserDto })
  @ApiResponse({ status: 404, description: "User not found." })
  findOne(@Param("id") id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the user to update",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "updated@example.com",
          description: "Updated email address",
        },
        name: {
          type: "string",
          example: "Updated Name",
          description: "Updated full name",
        },
        password: {
          type: "string",
          example: "newpassword123",
          description: "New password",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
    type: User,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a user" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID of the user to delete",
    example: "507f1f77bcf86cd799439011",
  })
  @ApiResponse({
    status: 204,
    description: "The user has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async delete(@Param("id") id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
