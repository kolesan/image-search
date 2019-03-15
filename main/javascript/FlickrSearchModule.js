(function () {
  const FlickrSearchModule = function() {};

  FlickrSearchModule.id = "flickr";


  FlickrSearchModule.prototype.id = FlickrSearchModule.id;

  FlickrSearchModule.prototype.search = function(query) {
    return searchFlickr(query)
      .then(response => response.data.photos.photo)
      .then(flickrPhotos => flickrPhotos.map(toPhotoObject))
      .catch(error => console.log("Error occurred while retrieving data from flickr api", error));
  };

  function searchFlickr(query) {
    return axios.get(noSpaces(`https://api.flickr.com/services/rest/?
      method=flickr.photos.search&
      api_key=b394136d5dde8d9d0d4f8fc6685386e2&
      text=${query}&
      extras=url_m&
      per_page=100&
      page=0&
      format=json&
      nojsoncallback=1
    `));
  }

  function noSpaces(s) {
    if (typeof s !== "string") {
      return;
    }
    return s.replace(/\s/g, "");
  }

  function toPhotoObject(flickrPhotoData) {
    return {
      id: flickrPhotoData.id,
      url: flickrPhotoData.url_m,
      title: flickrPhotoData.title
    }
  }

  window.CLASSES.FlickrSearchModule = FlickrSearchModule;
})();