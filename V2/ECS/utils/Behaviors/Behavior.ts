import { EntityId } from "../../EntityManager";

export default abstract class Behavior {
  abstract entity : EntityId;
  abstract actions: string[];
  abstract update(deltatTime: number):void;
}