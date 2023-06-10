class MyEventEmitter {
  private eventMap: Record<string, Array<() => void>> = {};

  registerHandler(eventName: string, handler: () => void): void {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = [];
    }
    this.eventMap[eventName].push(handler);
  }

  emitEvent(eventName: string): void {
    if (this.eventMap[eventName]) {
      for (const handler of this.eventMap[eventName]) {
        handler();
      }
    }
  }
}

const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () =>
  console.log("Обліковий запис користувача оновлено")
);
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
