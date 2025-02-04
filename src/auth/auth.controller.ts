import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          example: "user@example.com",
          description: "User email address",
        },
        password: {
          type: "string",
          example: "123456",
          description: "User password",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "User successfully logged in.",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            roleName: { type: "string" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials.",
  })
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      this.logger.debug(`Login attempt for email: ${loginDto.email}`);
      this.logger.debug(`Login attempt for password: ${loginDto.password}`);
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password
      );
      this.logger.debug("Login successful");
      return result;
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      throw new HttpException(
        error.message || "Login failed",
        error.status || HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password", "name"],
      properties: {
        email: {
          type: "string",
          example: "newuser@example.com",
          description: "User email address",
        },
        password: {
          type: "string",
          example: "123456",
          description: "User password",
        },
        name: {
          type: "string",
          example: "John Doe",
          description: "User full name",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered.",
    schema: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            roleName: { type: "string" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request - Invalid data or email already exists.",
  })
  async register(
    @Body() registerDto: { email: string; password: string; name: string }
  ) {
    try {
      this.logger.debug(`Registration attempt for email: ${registerDto.email}`);
      const result = await this.authService.register(
        registerDto.email,
        registerDto.password,
        registerDto.name
      );
      this.logger.debug("Registration successful");
      return result;
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw new HttpException(
        error.message || "Registration failed",
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({
    status: 200,
    description: "Returns current user profile.",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        roleName: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing token.",
  })
  async me(@Request() req) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new HttpException("No token provided", HttpStatus.UNAUTHORIZED);
      }
      this.logger.debug("Attempting to fetch user profile");
      const result = await this.authService.me(token);
      this.logger.debug("Profile fetch successful");
      return result;
    } catch (error) {
      this.logger.error(`Profile fetch failed: ${error.message}`);
      throw new HttpException(
        error.message || "Profile fetch failed",
        error.status || HttpStatus.UNAUTHORIZED
      );
    }
  }
}
