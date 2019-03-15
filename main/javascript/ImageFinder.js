(function () {

  const ImageFinder = function(initialModules) {
    this.modules = new Map();
    initialModules.forEach(this.addModule.bind(this));
  };

  ImageFinder.prototype.search = function(query, searchModuleId) {
    let module = getModule.call(this, searchModuleId);
    if (!module) {
      throw Error(`Module with id '${searchModuleId}' not found`);
    }

    return {
      query,
      images: module.search(query)
    };
  };

  ImageFinder.prototype.addModule = function(module) {
    this.modules.set(module.id, module);
    return this;
  };

  function getModule(id) {
    return this.modules.get(id);
  }

  window.CLASSES.ImageFinder = ImageFinder;
})();