(function () {
  const StaticDBSearchModule = function() {};

  StaticDBSearchModule.id = "static";


  StaticDBSearchModule.prototype.id = StaticDBSearchModule.id;

  StaticDBSearchModule.prototype.search = function(query) {
    let images = DATA.staticImagesDb
      .filter(image => image.title.includes(query))
      .map(image => ({
        id: image.id,
        url: image.url,
        title: image.title
      }));

    return Promise.resolve(images);
  };


  window.CLASSES.StaticDBSearchModule = StaticDBSearchModule;
})();