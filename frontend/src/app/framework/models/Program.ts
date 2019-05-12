import { User } from 'src/app/framework/models/user';
export class Program {
  public id: number;
  public name: string;
  public description: string;
  public users: User[];
  public admin: number;
  constructor() {
  }
}
