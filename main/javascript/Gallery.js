(function () {
  /**
   * @constructor
   * @param {ImageFinder} imageFinder
   */
  var Gallery = window.CLASSES.Gallery = function (imageFinder){
    this.lastRequestId = 0;
    this._imageFinder = imageFinder;
    this._createInterface();
    this._setFunctionality();
  };

  /**
   * start a new search
   * @param {String} query - search term to look for
   * @param {String} searchModuleId - id of the search module that wil be used with provided query
   */
  Gallery.prototype.doSearch = function (query, searchModuleId) {
    let requestId = ++this.lastRequestId;

    this._imageFinder.search(query, searchModuleId)
      .then(results => {
        if (requestId == this.lastRequestId) {
          this._onSearchResultReady(results);
        }
      });
  };

  /**
   * Handle search button clicks
   */
  Gallery.prototype._onSearchButtonClick = function (e) {
    var query = this._queryInputNode.value;
    var moduleId = this._moduleDropdownNode.value;
    this.doSearch(query, moduleId);
  };

  /**
   * update gallery content with search results
   * @param {query:String{images:[{id:String, url:string, title:string}]}} searchResult - results object for gallery update
   */
  Gallery.prototype._onSearchResultReady = function (searchResult) {
    this._resultsNode.innerHTML = '';
    var imagesData = searchResult.images;
    for(var i = 0; i < imagesData.length; ++i){
      var imgNode = document.createElement('img');
      imgNode.setAttribute('src', imagesData[i].url);
      this._resultsNode.appendChild(imgNode);
    }
  };

  /**
   * adds gallery main view node as child node
   * @param {htmlElement} node - html element to append to
   */
  Gallery.prototype.addToNode = function (node) {
    node.appendChild(this._viewNode);
  };

  /**
   * add search functionality to gallery
   */
  Gallery.prototype._setFunctionality = function () {
    // Bind function to instance
    var that = this;
    var originalOnSearchButtonClick = that._onSearchButtonClick;
    this._onSearchButtonClick = function(){ originalOnSearchButtonClick.apply(that, arguments); };
    this._searchBtnNode.addEventListener('click', this._onSearchButtonClick);
  };

  /**
   * creates gallery view, inner structure and ui
   */
  Gallery.prototype._createInterface = function () {
    this._viewNode = document.createElement('div');
    this._viewNode.classList.add('gallery');

    this._resultsNode = document.createElement('div');
    this._resultsNode.classList.add('galleryItems');
    this._viewNode.appendChild(this._resultsNode);

    this._controlsNode = document.createElement('div');
    this._controlsNode.classList.add('galleryControls');
    this._viewNode.appendChild(this._controlsNode);

    this._queryInputNode = document.createElement('input');
    this._controlsNode.appendChild(this._queryInputNode);

    this._searchBtnNode = document.createElement('button');
    this._searchBtnNode.innerHTML = 'search';
    this._controlsNode.appendChild(this._searchBtnNode);

    this._moduleDropdownNode = document.createElement('select');
    this._staticOptionNode = document.createElement('option');
    this._staticOptionNode.setAttribute("value", "static");
    this._staticOptionNode.innerHTML = 'static';
    this._flickrOptionNode = document.createElement('option');
    this._flickrOptionNode.setAttribute("value", "flickr");
    this._flickrOptionNode.innerHTML = 'flickr';

    this._moduleDropdownNode.appendChild(this._staticOptionNode);
    this._moduleDropdownNode.appendChild(this._flickrOptionNode);

    this._controlsNode.appendChild(this._moduleDropdownNode);
  };

})();