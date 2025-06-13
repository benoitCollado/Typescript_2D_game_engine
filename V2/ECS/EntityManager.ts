import ComponentManager from "./Components/ComponentManager";

export type EntityId = number;

//Gestionnaire d'entités
export class EntityManager{
  private nextEntityId: EntityId = 1;
  private entities: Set<EntityId> = new Set();

  createEntity() : EntityId{
    const id = this.nextEntityId++;
    this.entities.add(id);
    return id;
  }

  destroyEntity(entity: EntityId, componentManager: ComponentManager): void{
    this.entities.delete(entity);
    //informe le ComponentManager de supprimer tous les composants associées
    componentManager.removeAllComponents(entity);
  }

  getAllEntities(): EntityId[]{
    return Array.from(this.entities);
  }
}