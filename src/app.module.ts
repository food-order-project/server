import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RolesModule } from "./modules/roles/roles.module";
import { ConfigModule } from "@nestjs/config";
import { MealsModule } from "./modules/meals/meals.module";
import { EnumsModule } from "./config/enums/enums.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DATABASE,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    MealsModule,
    EnumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
