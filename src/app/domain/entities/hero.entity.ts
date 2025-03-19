export class HeroEntity {
  constructor(
    public name: string,
    public gender: string,
    public citizenship: string,
    public skills: string,
    public occupation: string,
    public memberOf: string,
    public creator: string
  ) {}
}
