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
	      "handler": __webpack_require__(2)
	    }), React.createElement(Route, {
	      "name": "file show",
	      "path": 'file/:file_id',
	      "handler": __webpack_require__(3)
	    }, React.createElement(DefaultRoute, {
	      "name": "file show basic",
	      "handler": __webpack_require__(1)
	    }))
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Link;

	Link = ReactRouter.Link;

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement("div", null, React.createElement("img", {
	      "src": this.props.file_summary.image_url
	    }));
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Route, RouteHandler, ThumbnailList;

	RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	ThumbnailList = __webpack_require__(4);

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement(ThumbnailList, {
	      "files": this.props.cortex.search_results
	    });
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Link, Route, RouteHandler, ThingLink, intersperse;

	Link = ReactRouter.Link, RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	ThingLink = React.createClass({
	  render: function() {
	    return React.createElement("a", {
	      "href": "/thing/" + this.props.name
	    }, this.props.name);
	  }
	});

	intersperse = __webpack_require__(5);

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
	    var id;
	    id = this.getId();
	    return this.props.cortex.search_results.find((function(_this) {
	      return function(item) {
	        return item.id.val() === id;
	      };
	    })(this));
	  },
	  getDetails: function() {
	    var details, id;
	    id = this.getId();
	    details = this.props.cortex.file_details[id];
	    if (!details) {
	      $.get("/api/file/" + id + "/info", (function(_this) {
	        return function(result) {
	          return _this.props.cortex.file_details.add(id, result);
	        };
	      })(this));
	    }
	    return details;
	  },
	  render: function() {
	    var appearances, artists, details, details_node, id, index, next_link, next_summary, previous_link, previous_summary, recipients, role_nodes, summary;
	    id = parseInt(this.getId());
	    index = this.props.cortex.search_results.findIndex((function(_this) {
	      return function(item) {
	        return item.id.val() === id;
	      };
	    })(this));
	    summary = this.props.cortex.search_results[index];
	    next_summary = this.props.cortex.search_results[index + 1];
	    previous_summary = this.props.cortex.search_results[index - 1];
	    next_link = next_summary ? React.createElement(Link, {
	      "className": "next-link",
	      "to": "file show basic",
	      "params": {
	        file_id: next_summary.id.val()
	      }
	    }, "Next \u2192") : void 0;
	    previous_link = previous_summary ? React.createElement(Link, {
	      "className": "previous-link",
	      "to": "file show basic",
	      "params": {
	        file_id: previous_summary.id.val()
	      }
	    }, "\u2190 Previous") : void 0;
	    details = this.getDetails();
	    details_node = details ? (artists = details.roles.artist.map((function(_this) {
	      return function(thing) {
	        return React.createElement(ThingLink, {
	          "name": thing.val()
	        });
	      };
	    })(this)), artists = intersperse(artists, ', '), recipients = details.roles.recipient.map((function(_this) {
	      return function(thing) {
	        return React.createElement(ThingLink, {
	          "name": thing.val()
	        });
	      };
	    })(this)), recipients = intersperse(recipients, ', '), appearances = [], details.appearances.forEach((function(_this) {
	      return function(id, appearance) {
	        var name;
	        name = appearance.thing_name.val();
	        if (name) {
	          return appearances.push(React.createElement(ThingLink, {
	            "name": name
	          }));
	        }
	      };
	    })(this)), appearances = intersperse(appearances, ', '), role_nodes = [], artists.length ? role_nodes.push(React.createElement("div", {
	      "style": {
	        display: 'inline'
	      }
	    }, "by ", artists)) : void 0, recipients.length ? role_nodes.push(React.createElement("div", {
	      "style": {
	        display: 'inline'
	      }
	    }, "for ", recipients)) : void 0, appearances.length ? role_nodes.push(React.createElement("div", {
	      "style": {
	        display: 'inline'
	      }
	    }, "featuring ", appearances)) : void 0, role_nodes = intersperse(role_nodes, ', '), React.createElement("div", {
	      "style": {
	        textAlign: 'center',
	        position: 'absolute',
	        left: 0,
	        top: 0,
	        right: 0
	      }
	    }, role_nodes)) : void 0;
	    return React.createElement("div", null, React.createElement("div", {
	      "className": "next-prev-links"
	    }, previous_link, next_link, details_node), React.createElement("div", {
	      "style": {
	        position: 'relative',
	        marginTop: 10
	      }
	    }, React.createElement("img", {
	      "className": "main-image",
	      "src": summary.image_url.val()
	    })));
	  }
	});


/***/ },
/* 4 */
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* intersperse: Return an array with the separator interspersed between
	 * each element of the input array.
	 *
	 * > _([1,2,3]).intersperse(0)
	 * [1,0,2,0,3]
	 */
	function intersperse(arr, sep) {
	    if (arr.length === 0) {
	        return [];
	    }

	    return arr.slice(1).reduce(function(xs, x, i) {
	        return xs.concat([sep, x]);
	    }, [arr[0]]);
	}

	module.exports = intersperse

/***/ }
/******/ ]);