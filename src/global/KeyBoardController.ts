export class KeyBoardController {
  public _keys: { [key: string]: boolean } = {};
  constructor() {
    this.init();
    console.log("KeyBoardController initialized");
  }

  public init() {
    window.addEventListener("keydown", (event) => {
      this._keys[event.key] = true;
      //console.log("keydown :" + event.key);
    });

    window.addEventListener("keyup", (event) => {
      this._keys[event.key] = false;
      //console.log("keyup :" + event.key);
    });
  }
}
