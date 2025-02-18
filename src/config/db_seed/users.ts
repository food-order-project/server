import { RoleType } from "../../modules/roles/enums/role.enum";

export const users = [
  {
    name: "Super Admin",
    email: "superadmin@example.com",
    password: "123456",
    roleName: RoleType.SUPER_ADMIN,
    roles: [],
    createdAt: new Date(),
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    roleName: RoleType.ADMIN,
    roles: [],
    createdAt: new Date(),
  },
  {
    name: "Manager User",
    email: "manager@example.com",
    password: "123456",
    roleName: RoleType.MANAGER,
    roles: [],
    createdAt: new Date(),
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: "123456",
    roleName: RoleType.USER,
    roles: [],
    createdAt: new Date(),
  },
  {
    name: "Parent User",
    email: "parent@example.com",
    password: "123456",
    roleName: RoleType.CUSTOMER_PARENT,
    roles: [],
    createdAt: new Date(),
  },
  {
    name: "Student User",
    email: "student@example.com",
    password: "123456",
    roleName: RoleType.CUSTOMER_STUDENT,
    roles: [],
    createdAt: new Date(),
  },
];
