import { Predmet } from "./predmet";
import { Ucesnik } from "./ucesnik";

export class Rociste{
  id!: number;
  datum_rocista!: Date;
  sudnica!: string;
  ucesnik!:Ucesnik;
  predmet!:Predmet;
}
