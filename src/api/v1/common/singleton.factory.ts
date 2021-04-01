class SingletonFactory {
  static createSingleton(_class: any) {
    return {
      instance: new _class(),
    };
  }
}

export { SingletonFactory };
