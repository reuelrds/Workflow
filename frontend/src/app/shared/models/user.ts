export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  manager?: string;
  department?: string;
  location?: string;
}
