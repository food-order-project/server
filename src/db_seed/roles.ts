import { RoleType } from "../roles/enums/role.enum";

export const roles = [
  {
    name: RoleType.ADMIN,
    description: "Administrator with full access",
    createdAt: new Date(),
  },
  {
    name: RoleType.USER,
    description: "Regular user with basic access",
    createdAt: new Date(),
  },
  {
    name: RoleType.MANAGER,
    description: "Moderator with elevated access",
    createdAt: new Date(),
  },
  {
    name: RoleType.SUPER_ADMIN,
    description: "Super admin with full access",
    createdAt: new Date(),
  },
  {
    name: RoleType.CUSTOMER_PARENT,
    description: "Customer with basic access",
    createdAt: new Date(),
  },
  {
    name: RoleType.CUSTOMER_STUDENT,
    description: "Customer with basic access",
    createdAt: new Date(),
  },
];
