(function () {

  var ImageFinder = window.CLASSES.ImageFinder = function () {};

  ImageFinder.prototype.search = function (query) {
    let images = DATA.staticImagesDb
      .filter(image => image.title.includes(query))
      .map(image => ({
        id: image.id,
        url: image.url,
        title: image.title
      }));

    return {
      query,
      images
    };
  }

})();