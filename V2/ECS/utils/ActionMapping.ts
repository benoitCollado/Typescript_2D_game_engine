export default class ActionMapping {
  // Map <key, action>
  public actionMapping: Map<
    string,
    { action: string; status: "justPressed" | "pressed" | "justRelease" }
  > = new Map();

  constructor(actions: {
    [key: string]: {
      action: string;
      status: "justPressed" | "pressed" | "justRelease";
    };
  }) {
    for (const [key, action] of Object.entries(actions)) {
      this.actionMapping.set(key, action);
    }
  }
}
