(function () {
  const StaticDBSearchModule = function() {};

  StaticDBSearchModule.id = "static";


  StaticDBSearchModule.prototype.id = StaticDBSearchModule.id;

  StaticDBSearchModule.prototype.search = function(query) {
    return DATA.staticImagesDb
      .filter(image => image.title.includes(query))
      .map(image => ({
        id: image.id,
        url: image.url,
        title: image.title
      }));
  };


  window.CLASSES.StaticDBSearchModule = StaticDBSearchModule;
})();