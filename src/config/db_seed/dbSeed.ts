import { connect, disconnect } from "mongoose";
import { config } from "dotenv";
import { roles } from "./roles";
import { users } from "./users";
import { companies } from "./companies";
import { meals } from "./meals";
import { mealPlanners } from "./meal-planners";
import { RoleSchema } from "../../modules/roles/schemas/role.schema";
import { CompanySchema } from "../../modules/companies/schemas/company.schema";
import { MealSchema } from "../../modules/meals/schemas/meal.schema";
import { MealPlannerSchema } from "../../modules/meal-planner/schemas/meal-planner.schema";
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
    const createdUsers = await User.insertMany(preparedUsers);
    console.log("✅ Users seeded successfully");
    return createdUsers;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
};

const seedCompanies = async (createdUsers: any[]) => {
  try {
    const connection = await connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/food"
    );
    const Company = connection.model("Company", CompanySchema);

    // Clear existing companies
    await Company.deleteMany({});

    // Find an admin user to set as creator
    const adminUser = createdUsers.find((user) => user.roleName === "ADMIN");
    if (!adminUser) {
      throw new Error("No admin user found to set as company creator");
    }

    // Prepare companies with creator
    const preparedCompanies = companies.map((company) => ({
      ...company,
      createdBy: adminUser._id,
    }));

    // Insert companies
    const createdCompanies = await Company.insertMany(preparedCompanies);
    console.log("✅ Companies seeded successfully");
    return createdCompanies;
  } catch (error) {
    console.error("❌ Error seeding companies:", error);
    throw error;
  }
};

const seedMeals = async () => {
  try {
    const connection = await connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/food"
    );
    const Meal = connection.model("Meal", MealSchema);

    // Clear existing meals
    await Meal.deleteMany({});

    // Insert meals
    const createdMeals = await Meal.insertMany(meals);
    console.log("✅ Meals seeded successfully");
    return createdMeals;
  } catch (error) {
    console.error("❌ Error seeding meals:", error);
    throw error;
  }
};

const seedMealPlanners = async (
  createdUsers: any[],
  createdCompanies: any[],
  createdMeals: any[]
) => {
  try {
    const connection = await connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/food"
    );
    const MealPlanner = connection.model("MealPlanner", MealPlannerSchema);

    // Clear existing meal planners
    await MealPlanner.deleteMany({});

    // Prepare meal planners with references
    const preparedMealPlanners = mealPlanners.map((planner, index) => ({
      ...planner,
      meals: [createdMeals[index % createdMeals.length]._id], // Assign meals in a round-robin fashion
      createdUserId: createdUsers[0]._id, // Assign the first user as creator
      companyId: createdCompanies[0]._id, // Assign the first company
    }));

    // Insert meal planners
    await MealPlanner.insertMany(preparedMealPlanners);
    console.log("✅ Meal planners seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding meal planners:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    // First seed roles and get the created role documents
    const createdRoles = await seedRoles();

    // Then seed users with the role IDs
    const createdUsers = await seedUsers(createdRoles);

    // Seed companies with admin user as creator
    const createdCompanies = await seedCompanies(createdUsers);

    // Seed meals
    const createdMeals = await seedMeals();

    // Finally seed meal planners with references to users, companies and meals
    await seedMealPlanners(createdUsers, createdCompanies, createdMeals);

    console.log("🌱 Database seeding completed successfully");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  } finally {
    await disconnect();
  }
};

// Run the seeding
seedDatabase();
