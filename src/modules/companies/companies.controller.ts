import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Companies")
@ApiBearerAuth()
@Controller("companies")
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new company" })
  @ApiResponse({
    status: 201,
    description: "The company has been successfully created.",
    type: CreateCompanyDto,
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({
    status: 200,
    description: "Return all companies.",
    isArray: true,
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a company by id" })
  @ApiResponse({
    status: 200,
    description: "Return the company.",
  })
  @ApiResponse({ status: 404, description: "Company not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findOne(@Param("id") id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a company" })
  @ApiResponse({
    status: 200,
    description: "The company has been successfully updated.",
    type: UpdateCompanyDto,
  })
  @ApiResponse({ status: 404, description: "Company not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a company" })
  @ApiResponse({
    status: 200,
    description: "The company has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Company not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  remove(@Param("id") id: string) {
    return this.companiesService.remove(id);
  }
}
