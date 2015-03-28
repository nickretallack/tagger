/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Route, container, cortex, current_component, routes;

	if ((typeof ENTRY_POINT !== "undefined" && ENTRY_POINT !== null) && ENTRY_POINT === 'tag-file') {
	  cortex = new Cortex({
	    thing_tags: {},
	    file_details: {},
	    search_results: SEARCH_RESULTS
	  });
	  Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;
	  routes = [
	    React.createElement(DefaultRoute, {
	      "name": "file list",
	      "handler": __webpack_require__(3)
	    }), React.createElement(Route, {
	      "name": "file show",
	      "path": 'file/:file_id',
	      "handler": __webpack_require__(4)
	    })
	  ];
	  container = document.getElementById("react-image-tagger");
	  current_component = null;
	  ReactRouter.run(routes, function(Handler) {
	    var element;
	    element = React.createElement(Handler, {
	      "cortex": cortex
	    });
	    return current_component = React.render(element, container);
	  });
	  cortex.on("update", function(data) {
	    return current_component.setProps({
	      cortex: data
	    });
	  });
	}


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Route, RouteHandler, ThumbnailList;

	RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	ThumbnailList = __webpack_require__(8);

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement(ThumbnailList, {
	      "files": this.props.cortex.search_results
	    });
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Route, RouteHandler;

	RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	module.exports = React.createClass({
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getId: function() {
	    return this.context.router.getCurrentParams().file_id;
	  },
	  ready: function() {
	    return this.props.cortex.search_results.val() != null;
	  },
	  getSummary: function() {
	    return this.props.cortex.search_results.find(function(item) {
	      return item.id.val() === this.getId();
	    });
	  },
	  getDetails: function() {
	    return this.props.cortex.file_details[this.getId()];
	  },
	  render: function() {
	    return React.createElement("div", null, "show file ", this.getId());
	  }
	});


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Link;

	Link = ReactRouter.Link;

	module.exports = React.createClass({
	  render: function() {
	    var thumbs;
	    thumbs = this.props.files.map(function(file) {
	      return React.createElement(Link, {
	        "className": "file thumbnail",
	        "to": "file show",
	        "params": {
	          file_id: file.id.val()
	        },
	        "style": {
	          backgroundImage: "url('" + (file.image_url.val()) + "')"
	        }
	      });
	    });
	    return React.createElement("div", null, thumbs);
	  }
	});


/***/ }
/******/ ]);