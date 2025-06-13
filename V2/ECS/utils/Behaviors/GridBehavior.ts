import { EntityId } from "../../EntityManager";
import Behavior from "./Behavior";

export default class GridBehavior extends Behavior{
  entity: EntityId;
  actions = ["left", "right", "up", "down"];

  constructor(entity: EntityId){
    super();
    this.entity = entity;
  }
  update(deltatTime: number): void {
  }
  
}