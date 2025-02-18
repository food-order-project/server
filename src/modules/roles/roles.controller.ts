import { Controller, Get, Post, Body } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./schemas/role.schema";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { RoleType } from "./enums/role.enum";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new role" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["name", "description"],
      properties: {
        name: {
          type: "string",
          example: RoleType.USER,
          description: "Role name (from RoleType enum)",
          enum: Object.values(RoleType),
        },
        description: {
          type: "string",
          example: "Regular user with basic access",
          description: "Role description",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "The role has been successfully created.",
    type: Role,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all roles" })
  @ApiResponse({ status: 200, description: "Return all roles.", type: [Role] })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
}
