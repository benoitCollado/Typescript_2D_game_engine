/*import { ColliderComponent } from "./ECS/ColliderComponent";
export class Collision {
  public static AABB(
    colliderA: ColliderComponent,
    colliderB: ColliderComponent,
  ): [boolean, boolean] {
    if (
      colliderB._colliderRect.x >=
        colliderA._colliderRect.x + colliderA._colliderRect.w ||
      colliderB._colliderRect.x + colliderB._colliderRect.w <=
        colliderA._colliderRect.x ||
      colliderB._colliderRect.y >=
        colliderA._colliderRect.y + colliderA._colliderRect.h ||
      colliderB._colliderRect.y + colliderB._colliderRect.h <=
        colliderA._colliderRect.y
    ) {
      return [false, false];
    }

    //console.log(colliderA._colliderTag + " collides with " + colliderB._colliderTag);
    let solid = false;
    if (colliderA._solid && colliderB._solid) {
      solid = true;
      //console.log("solid");
    }
    return [true, solid];
  }
}
*/