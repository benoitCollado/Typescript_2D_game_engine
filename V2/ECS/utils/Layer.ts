export default class Layer{
  public map : number[][] = [];
  public blocking : boolean = false;

  constructor(map : number[][] = [], blocking: boolean = false){
    this.map = map;
    this.blocking = blocking;
  }
  
}