import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { Role } from "../roles/schemas/role.schema";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private getRoleName(role: Types.ObjectId | Role | string): string {
    if (typeof role === "string") {
      return role;
    }
    if (role && typeof role === "object" && "name" in role) {
      return role.name;
    }
    return "USER";
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      this.logger.debug(`User found: ${user}`);
      if (!user) {
        return null;
      }

      console.log(user);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      const { password: _, ...result } = user.toObject();
      return {
        ...result,
        role: this.getRoleName(result.role),
      };
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.validateUser(email, password);
      this.logger.debug(`User validated: ${user}`);
      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const payload = {
        email: user.email,
        sub: user._id,
        role: this.getRoleName(user.roleName),
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          email: user.email,
          id: user._id,
          name: user.name,
          role: this.getRoleName(user.roleName),
          roles: user.roles,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException("Email already exists");
      }

      const user = await this.usersService.create({
        email,
        password,
        name,
      });

      const userObject = {
        email: user.email,
        id: user._id,
        name: user.name,
        roleName: this.getRoleName(user.roleName),
      };

      const payload = {
        email: user.email,
        sub: user._id,
        roleName: this.getRoleName(user.roleName),
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: userObject,
      };
    } catch (error) {
      throw error;
    }
  }

  async me(token: string) {
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const decoded = this.jwtService.verify(token);
      if (!decoded || !decoded.sub) {
        throw new UnauthorizedException("Invalid token format");
      }

      const userProfile = await this.usersService.findById(decoded.sub);
      if (!userProfile) {
        throw new NotFoundException("User not found");
      }

      return {
        access_token: token,
        user: {
          email: userProfile.email,
          id: userProfile._id,
          name: userProfile.name,
          roleName: this.getRoleName(userProfile.roleName),
          roles: userProfile.roles,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException("Invalid token");
    }
  }
}
