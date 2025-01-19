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

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post("login")
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
