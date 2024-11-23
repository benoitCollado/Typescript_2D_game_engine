export class KeyBoardController {
  public _keys: { [key: string]: boolean } = {};
  constructor() {
    this.init();
    console.log("KeyBoardController initialized");
  }

  public init() {
    window.addEventListener("keydown", (event) => {
      this._keys[event.key] = true;
      this._keys[event.code] = true;
      console.log(event.code);
    });

    window.addEventListener("keyup", (event) => {
      this._keys[event.code] = false;
      this._keys[event.key] = false;
      console.log(event.code);
    });
  }
}
