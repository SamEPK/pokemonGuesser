export class Pokemon {
    id: number;
    name: string;
    type?: number;
    type1?: string;
    type2?: string;
    height?: number;
    weight?: number;
    malePct?: number;
    femalePct?: number;
    captRate?: number;
    expPoints?: number;
    expSpeed?: string;
    baseTotal?: number;
    hp?: number;
    attack?: number;
    defense?: number;
    special?: number;
    speed?: number;
    normalDmg?: number;
    fireDmg?: number;
    waterDmg?: number;
    electricDmg?: number;
    grassDmg?: number;
    iceDmg?: number;
    fightDmg?: number;
    poisonDmg?: number;
    groundDmg?: number;
    flyingDmg?: number;
    psychicDmg?: number;
    bugDmg?: number;
    rockDmg?: number;
    ghostDmg?: number;
    dragonDmg?: number;
    evolution?: number;
    legendary?: boolean;
  
    constructor() {
      this.id = -1;
      this.name = "";
    }
  }
  