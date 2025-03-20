import { Vector2D } from "./vector2D";

export default function GJK(shapeA: Vector2D[], shapeB: Vector2D[]):boolean{
  // Direction initiale arbitraire
  let direction = new Vector2D(1,0);

  //premier point du simplex 
  let simplex : Vector2D[] = [support(shapeA, shapeB, direction)];

  //nouvelle direction vers l'origine
  direction = simplex[0].neg();

  while(true){
    //ajout du nouveau point au simplex
    let newPoint = support(shapeA, shapeB, direction);

    //verification si le nouveau poirn converge vers l'origine
    if(newPoint.dot(direction) <= 0){
      return false;
    }

    simplex.push(newPoint);

    if(handleSimplex(simplex, direction)){
      return true;
    }
  }
}



function support(shapeA: Vector2D[], shapeB: Vector2D[], direction: Vector2D){
  let farthestA = shapeA.reduce((best, v) => (v.dot(direction) > best.dot(direction) ? v : best));
  let farthestB = shapeB.reduce((best, v) => (v.dot(direction)> best.dot(direction) ? v : best));
  return farthestA.substract(farthestB);
}


function handleSimplex(simplex: Vector2D[], direction: Vector2D): boolean{
  if(simplex.length === 2){
    let a = simplex[1]; // dernier point ajouté
    let b = simplex[0];

    
    let ab = b.substract(a); //vecteur AB
    let ao = a.neg(); // vecteur AO vers l'origine


    // si la perpendiculaire du vecteur AB se dirgie vers l'origine alors nouvelle direction sinon sa négation.
    direction.set(ab.perp().dot(ao) > 0 ? ab.perp() :ab.perp().neg());
  }else if(simplex.length === 3){
    let a = simplex[2];
    let b = simplex[1];
    let c = simplex[0];

    let ab = b.substract(a);
    let ac = c.substract(a);
    let ao = a.neg();

    let abPerp = ab.perp().dot(ao) > 0 ? ab.perp() : ab.perp().neg();
    let acPerp = ac.perp().dot(ao) > 0 ? ac.perp() : ac.perp().neg();

    if( abPerp.dot(ao)  > 0 ){
      simplex.splice(0,1);
      direction.set(abPerp);
    }else if(acPerp.dot(ao) > 0){
      simplex.splice(1,1);
      direction.set(acPerp);
    }else{
      return true; // l'origine est comprise dans le simplex
    }  
  }
    return false;
}

