export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isManager?: boolean;
  department?: string;
  location?: string;
  permissions?: string;
  status?: boolean;
}
