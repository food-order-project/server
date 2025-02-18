import { connect, disconnect } from "mongoose";
import { config } from "dotenv";
import { roles } from "./roles";
import { users } from "./users";
import { RoleSchema } from "../../modules/roles/schemas/role.schema";
import { hash } from "bcrypt";
import { Schema } from "mongoose";

// Load environment variables
config();

const seedRoles = async () => {
  try {
    // Connect to MongoDB
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/food";
    const connection = await connect(mongoUri);

    // Get the Role model
    const Role = connection.model("Role", RoleSchema);

    // Clear existing roles
    await Role.deleteMany({});

    // Insert new roles
    const createdRoles = await Role.insertMany(roles);

    console.log("✅ Roles seeded successfully");
    return createdRoles;
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    throw error;
  }
};

const seedUsers = async (createdRoles: any[]) => {
  try {
    const connection = await connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/food"
    );

    // Create User Schema
    const UserSchema = new Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      roleName: String,
      roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
      createdAt: Date,
    });

    const User = connection.model("User", UserSchema);

    // Clear existing users
    await User.deleteMany({});

    // Prepare users with hashed passwords and proper role IDs
    const preparedUsers = await Promise.all(
      users.map(async (user) => {
        // Find the corresponding role document
        const role = createdRoles.find((r) => r.name === user.roleName);
        if (!role) {
          throw new Error(`Role ${user.roleName} not found`);
        }

        // Hash the password
        const hashedPassword = await hash(user.password, 10);

        return {
          ...user,
          password: hashedPassword,
          roles: [role._id], // Assign the actual role ID
        };
      })
    );

    // Insert users
    await User.insertMany(preparedUsers);
    console.log("✅ Users seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    // First seed roles and get the created role documents
    const createdRoles = await seedRoles();

    // Then seed users with the role IDs
    await seedUsers(createdRoles);

    // Finally seed allergens

    console.log("🌱 Database seeding completed successfully");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  } finally {
    await disconnect();
  }
};

// Run the seeding
seedDatabase();
