export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  managerId?: string;
  isManager?: boolean;
  departmentId?: string;
  locationId?: string;
  groupId?: string;
  permissions?: string;
  status?: boolean;
}
