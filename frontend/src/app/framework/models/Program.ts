import { Mentor } from './Mentor';
import { Trainee } from './Trainee';

export class Program {
  public id: number;
  public name: string;
  public description: string;
  public mentors: Mentor[];
  public trainees: Trainee[];
  constructor() {
  }
}
