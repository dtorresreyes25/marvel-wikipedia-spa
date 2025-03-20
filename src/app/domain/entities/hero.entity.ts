import { v4 as uuidv4 } from 'uuid';

export class HeroEntity {
  public readonly id: string;

  constructor(
    public readonly name: string,
    public readonly gender: string,
    public readonly citizenship: string,
    public readonly skills: string,
    public readonly occupation: string,
    public readonly memberOf: string,
    public readonly creator: string
  ) {
    this.id = uuidv4();
    this.validate();
  }

  private validate(): void {
    if (!this.name.trim()) {
      throw new Error('Hero name cannot be empty.');
    }
  }
}
