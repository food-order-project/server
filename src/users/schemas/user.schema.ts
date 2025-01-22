import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Role } from "../../roles/schemas/role.schema";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })  
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ type: Types.ObjectId, ref: "Role", required: true })
  roleName: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Role" }] })
  roles: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
