export class Pokemon{
    id : number
    name:string
    type:number
    type1:string
    type2:string
    height:number
    weight:number
    malePct:number
    femalePct:number
    captRate:number
    expPoints:number
    expSpeed:string
    baseTotal:number
    hp:number
    attack:number
    defense:number
    special:number
    speed:number
    normalDmg:number
    fireDmg:number
    waterDmg:number
    electricDmg:number
    grassDmg:number
    iceDmg:number
    fightDmg:number
    poisonDmg:number
    groundDmg:number
    fyingDmg:number
    flyingDmg:number
    psychicDmg:number
    bugDmg:number
    rockDmg:number
    ghostDmg:number
    dragonDmg:number
    evolution:number
    legendary:boolean

    constructor(){
        this.id = -1
        this.name = ""
        this.type = 0
        this.type1 = ""
        this.type2 = ""
        this.height = 0
        this.weight = 0
        this.malePct = 0
        this.femalePct = 0
        this.captRate = 0
        this.expPoints = 0
        this.expSpeed = ""
        this.baseTotal = 0
        this.hp = 0
        this.attack = 0
        this.defense = 0
        this.special = 0
        this.speed = 0
        this.normalDmg = 0
        this.fireDmg = 0
        this.waterDmg = 0
        this.electricDmg = 0
        this.grassDmg = 0
        this.iceDmg = 0
        this.fightDmg = 0
        this.poisonDmg = 0
        this.groundDmg = 0
        this.fyingDmg = 0
        this.flyingDmg = 0
        this.psychicDmg = 0
        this.bugDmg = 0
        this.rockDmg = 0
        this.ghostDmg = 0
        this.dragonDmg = 0
        this.evolution = 0
        this.legendary = false
    }
}