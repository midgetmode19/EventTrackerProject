export class Entry {
  id: number;
  miles: number;
  fuelCost: number;
  gallonsPerFill: number;
  refuelDate: string;

  constructor(
    id?: number,
    miles?: number,
    fuelCost?: number,
    gallonsPerFill?: number,
    refuelDate?: string
  ) {
    this.id = id;
    this.miles = miles;
    this.fuelCost = fuelCost;
    this.gallonsPerFill = gallonsPerFill;
    this.refuelDate = refuelDate;
  }
}
