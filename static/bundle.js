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

	var DefaultRoute, Route, container, cortex, current_component, routes, todo;

	todo = React.createClass({
	  render: function() {
	    return React.createElement("div", null, "todo");
	  }
	});

	if ((typeof ENTRY_POINT !== "undefined" && ENTRY_POINT !== null) && ENTRY_POINT === 'tag-file') {
	  cortex = new Cortex({
	    thing_tags: {},
	    server_file_details: {},
	    file_comments: {},
	    file_details: {},
	    search_results: SEARCH_RESULTS
	  });
	  Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;
	  routes = [
	    React.createElement(DefaultRoute, {
	      "name": "file list",
	      "handler": __webpack_require__(5)
	    }), React.createElement(Route, {
	      "name": "file show",
	      "path": 'file/:file_id',
	      "handler": __webpack_require__(6)
	    }, React.createElement(DefaultRoute, {
	      "name": "file overview",
	      "handler": __webpack_require__(1)
	    }), React.createElement(Route, {
	      "name": "file appearances",
	      "path": 'appearances',
	      "handler": __webpack_require__(2)
	    }, React.createElement(DefaultRoute, {
	      "name": "file appearance overview",
	      "handler": __webpack_require__(3)
	    }), React.createElement(Route, {
	      "name": "file appearance",
	      "path": ':appearance_id',
	      "handler": __webpack_require__(4)
	    })), React.createElement(Route, {
	      "name": "file classic",
	      "path": 'classic',
	      "handler": __webpack_require__(7)
	    }), React.createElement(Route, {
	      "name": "file comments",
	      "path": 'comments',
	      "handler": __webpack_require__(8)
	    }), React.createElement(Route, {
	      "name": "file details",
	      "path": 'details',
	      "handler": __webpack_require__(9)
	    }), React.createElement(Route, {
	      "name": "file tags",
	      "path": 'tags',
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
	    return React.createElement("div", {
	      "className": "main-image-container"
	    }, React.createElement("img", {
	      "className": "main-image",
	      "src": this.props.file_summary.image_url.val()
	    }));
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var RouteHandler;

	RouteHandler = ReactRouter.RouteHandler;

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement(RouteHandler, React.__spread({}, this.props));
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlayManager, FileView, file_details_loader;

	AppearanceOverlayManager = __webpack_require__(11);

	file_details_loader = __webpack_require__(12);

	FileView = __webpack_require__(1);

	module.exports = React.createClass({
	  mixins: [file_details_loader],
	  render: function() {
	    var _ref;
	    if (!this.detailsLoaded()) {
	      return React.createElement(FileView, React.__spread({}, this.props));
	    }
	    return React.createElement("div", {
	      "className": "main-image-container"
	    }, React.createElement(AppearanceOverlayManager, {
	      "src": this.props.file_summary.image_url.val(),
	      "appearances": ((_ref = this.getDetails()) != null ? _ref.appearances : void 0)
	    }));
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceEditor, AppearanceOverlayManager, FileView, Link, file_details_loader;

	Link = ReactRouter.Link;

	AppearanceEditor = __webpack_require__(10);

	AppearanceOverlayManager = __webpack_require__(11);

	file_details_loader = __webpack_require__(12);

	FileView = __webpack_require__(1);

	module.exports = React.createClass({
	  mixins: [file_details_loader],
	  currentAppearance: function() {
	    var result, _ref;
	    return result = (_ref = this.getDetails()) != null ? _ref.appearances[this.context.router.getCurrentParams().appearance_id] : void 0;
	  },
	  render: function() {
	    var current_appearance, image, src, _ref;
	    if (!this.detailsLoaded()) {
	      return React.createElement(FileView, React.__spread({}, this.props));
	    }
	    current_appearance = this.currentAppearance();
	    src = this.props.file_summary.image_url.val();
	    image = this.detailsLoaded() ? React.createElement(AppearanceOverlayManager, {
	      "src": src,
	      "appearances": ((_ref = this.getDetails()) != null ? _ref.appearances : void 0)
	    }) : React.createElement("div", {
	      "className": "main-image-container"
	    }, React.createElement("img", {
	      "className": "main-image",
	      "src": src
	    }));
	    if (current_appearance) {
	      return React.createElement("div", {
	        "className": "row"
	      }, React.createElement("div", {
	        "className": "col-sm-4 col-md-3 col-lg-2 sidebar"
	      }, React.createElement(AppearanceEditor, React.__spread({}, current_appearance, {
	        "appearance": current_appearance,
	        "cortex": this.props.cortex,
	        "save": this.saveDetails,
	        "ref": "editor"
	      }))), React.createElement("div", {
	        "className": "col-sm-8 col-md-9 col-lg-10"
	      }, image));
	    } else {
	      return image;
	    }
	  }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Route, RouteHandler, ThumbnailList;

	RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	ThumbnailList = __webpack_require__(14);

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement(ThumbnailList, {
	      "files": this.props.cortex.search_results
	    });
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultRoute, Link, Route, RouteHandler, ThingLink, file_id_mixin, intersperse;

	Link = ReactRouter.Link, RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	intersperse = __webpack_require__(13);

	file_id_mixin = __webpack_require__(15);

	ThingLink = React.createClass({
	  render: function() {
	    return React.createElement("a", {
	      "href": "/thing/" + this.props.name
	    }, this.props.name);
	  }
	});

	module.exports = React.createClass({
	  mixins: [file_id_mixin],
	  displayName: 'file-show',
	  render: function() {
	    var id, index, navigation, next_link, next_summary, previous_link, previous_summary, route, summary;
	    id = parseInt(this.getFileId());
	    index = this.props.cortex.search_results.findIndex((function(_this) {
	      return function(item) {
	        return item.id.val() === id;
	      };
	    })(this));
	    summary = this.props.cortex.search_results[index];
	    next_summary = this.props.cortex.search_results[index + 1];
	    previous_summary = this.props.cortex.search_results[index - 1];
	    route = this.context.router.getCurrentRoutes()[1].name;
	    next_link = next_summary ? React.createElement(Link, {
	      "className": "next-link",
	      "to": route,
	      "params": {
	        file_id: next_summary.id.val()
	      }
	    }, "Next \u2192") : void 0;
	    previous_link = previous_summary ? React.createElement(Link, {
	      "className": "previous-link",
	      "to": route,
	      "params": {
	        file_id: previous_summary.id.val()
	      }
	    }, "\u2190 Previous") : void 0;
	    navigation = [
	      React.createElement(Link, {
	        "key": "classic",
	        "to": "file classic",
	        "params": {
	          file_id: id
	        }
	      }, "classic"), React.createElement(Link, {
	        "key": "overview",
	        "to": "file overview",
	        "params": {
	          file_id: id
	        }
	      }, "image"), React.createElement(Link, {
	        "key": "details",
	        "to": "file details",
	        "params": {
	          file_id: id
	        }
	      }, "details"), React.createElement(Link, {
	        "key": "appearances",
	        "to": "file appearances",
	        "params": {
	          file_id: id
	        }
	      }, "appearances"), React.createElement(Link, {
	        "key": "comments",
	        "to": "file comments",
	        "params": {
	          file_id: id
	        }
	      }, "comments")
	    ];
	    navigation = intersperse(navigation, ' | ');
	    return React.createElement("div", null, React.createElement("div", {
	      "className": "next-prev-links"
	    }, previous_link, next_link, React.createElement("div", {
	      "className": "file-navigation"
	    }, navigation)), React.createElement("div", {
	      "style": {
	        position: 'relative',
	        marginTop: 10
	      }
	    }, React.createElement(RouteHandler, {
	      "file_summary": summary,
	      "cortex": this.props.cortex
	    })));
	  }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ClassicComments, comment_loader;

	ClassicComments = __webpack_require__(16);

	comment_loader = __webpack_require__(17);

	module.exports = React.createClass({
	  mixins: [comment_loader],
	  render: function() {
	    var comments, image, src;
	    src = this.props.file_summary.image_url.val();
	    image = React.createElement("div", {
	      "className": "main-image-container"
	    }, React.createElement("img", {
	      "className": "main-image",
	      "src": src
	    }));
	    comments = this.getComments();
	    return React.createElement("div", null, image, React.createElement(ClassicComments, {
	      "comments": comments
	    }));
	  }
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var CommentSidebar, comment_loader;

	CommentSidebar = __webpack_require__(16);

	comment_loader = __webpack_require__(17);

	module.exports = React.createClass({
	  mixins: [comment_loader],
	  render: function() {
	    var comments, image, src;
	    src = this.props.file_summary.image_url.val();
	    image = React.createElement("img", {
	      "className": "main-image",
	      "src": src
	    });
	    comments = this.getComments();
	    return React.createElement("div", {
	      "className": "row"
	    }, React.createElement("div", {
	      "className": "col-sm-4 col-md-3 col-lg-2 sidebar"
	    }, React.createElement(CommentSidebar, {
	      "comments": comments
	    })), React.createElement("div", {
	      "className": "col-sm-8 col-md-9 col-lg-10"
	    }, image));
	  }
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var FileDetailEditor;

	FileDetailEditor = __webpack_require__(18);

	module.exports = React.createClass({
	  render: function() {
	    var image, src;
	    src = this.props.file_summary.image_url.val();
	    image = React.createElement("img", {
	      "className": "main-image",
	      "src": src
	    });
	    return React.createElement("div", {
	      "className": "row"
	    }, React.createElement("div", {
	      "className": "col-sm-4 col-md-3 col-lg-2 sidebar"
	    }, React.createElement(FileDetailEditor, {
	      "cortex": this.props.cortex
	    })), React.createElement("div", {
	      "className": "col-sm-8 col-md-9 col-lg-10"
	    }, image));
	  }
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger,
	  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	Tagger = __webpack_require__(19);

	module.exports = React.createClass({
	  displayName: 'AppearanceEditor',
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  removeAppearance: function() {
	    this.props.appearance.remove();
	    this.context.router.transitionTo('file appearances', {
	      file_id: this.context.router.getCurrentParams().file_id
	    });
	    return setTimeout((function(_this) {
	      return function() {
	        return _this.props.save();
	      };
	    })(this));
	  },
	  fetchThingTags: function(name) {
	    if (name && !this.props.cortex.thing_tags.hasKey(name)) {
	      return $.ajax({
	        type: 'get',
	        url: "/api/thing/" + name + "/tag",
	        success: (function(_this) {
	          return function(response) {
	            console.log('loaded');
	            return _this.props.cortex.thing_tags.add(name, response.items);
	          };
	        })(this),
	        error: (function(_this) {
	          return function() {
	            return _this.props.cortex.thing_tags.add(name, []);
	          };
	        })(this)
	      });
	    }
	  },
	  fetchCurrentThingTags: function() {
	    var name;
	    name = this.props.thing_name.val();
	    return this.fetchThingTags(name);
	  },
	  selectThing: function(name) {
	    this.props.thing_name.set(name);
	    return this.fetchThingTags(name);
	  },
	  componentDidMount: function() {
	    return this.fetchCurrentThingTags();
	  },
	  componentWillReceiveProps: function(props) {
	    var name;
	    name = props.thing_name.val();
	    return this.fetchThingTags(name);
	  },
	  thingTagsLoading: function() {
	    try {
	      this.thingTags();
	      return false;
	    } catch (_error) {
	      return true;
	    }
	  },
	  unSelectThing: function() {
	    this.props.thing_name.set(null);
	    return this.props.negative_tags.set([]);
	  },
	  thingTags: function() {
	    var collection, key;
	    key = this.props.thing_name.val();
	    if (!key) {
	      return [];
	    }
	    collection = this.props.cortex.thing_tags;
	    if (!collection.hasKey(key)) {
	      throw 'loading';
	    }
	    return collection[key].val();
	  },
	  mixedTags: function() {
	    return _.difference(_.union(this.thingTags(), this.props.tags.getValue()), this.props.negative_tags.getValue());
	  },
	  thingNameTags: function() {
	    var name;
	    name = this.props.thing_name.getValue();
	    if (name) {
	      return [name];
	    } else {
	      return [];
	    }
	  },
	  addTag: function(name) {
	    var index;
	    index = this.props.negative_tags.findIndex(function(item) {
	      return item.val() === name;
	    });
	    if (index !== -1) {
	      return this.props.tags.removeAt(index);
	    } else if (__indexOf.call(this.thingTags(), name) < 0) {
	      return this.props.tags.push(name);
	    }
	  },
	  removeTag: function(name) {
	    var index;
	    index = this.props.tags.findIndex(function(item) {
	      return item.val() === name;
	    });
	    if (index !== -1) {
	      return this.props.tags.removeAt(index);
	    } else if (__indexOf.call(this.thingTags(), name) >= 0) {
	      return this.props.negative_tags.push(name);
	    }
	  },
	  render: function() {
	    var tagger;
	    tagger = !this.thingTagsLoading() ? React.createElement(Tagger, {
	      "ref": "tags",
	      "tags": this.mixedTags(),
	      "possible_tags": TAG_NAMES,
	      "onTagAdd": this.addTag,
	      "onTagRemove": this.removeTag
	    }) : React.createElement("div", null, "Loading...");
	    return React.createElement("div", null, React.createElement("h3", null, "Tag This Appearance"), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Recurring character or object?"), React.createElement(Tagger, {
	      "ref": "thing",
	      "tags": this.thingNameTags(),
	      "possible_tags": THING_NAMES,
	      "onTagAdd": this.selectThing,
	      "onTagRemove": this.unSelectThing
	    })), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Edit this appearance"), tagger, React.createElement("p", {
	      "className": "help-block"
	    }, "Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.")), React.createElement("div", {
	      "className": "btn-toolbar"
	    }, React.createElement("button", {
	      "className": "btn btn-primary",
	      "onClick": this.props.save
	    }, "Save"), React.createElement("button", {
	      "className": "btn btn-danger",
	      "onClick": this.removeAppearance
	    }, "Remove Appearance")));
	  }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlay, Navigation, V, random_integer;

	V = __webpack_require__(20);

	Navigation = ReactRouter.Navigation;

	AppearanceOverlay = __webpack_require__(21);

	random_integer = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	module.exports = React.createClass({
	  displayName: 'AppearanceOverlayManager',
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getInitialState: function() {
	    return {
	      creating_overlay: null,
	      touch_point: null
	    };
	  },
	  onClickImage: function(event) {
	    var appearance, dimensions, id, mouse_position, offsetX, offsetY, position, size, _ref;
	    _ref = event.nativeEvent, offsetX = _ref.offsetX, offsetY = _ref.offsetY;
	    mouse_position = V(offsetX, offsetY);
	    size = V(150, 150);
	    position = mouse_position.subtract(size.scale(0.5));
	    dimensions = {
	      position: {
	        x: position.x,
	        y: position.y
	      },
	      size: {
	        x: size.x,
	        y: size.y
	      }
	    };
	    id = "new-" + (random_integer(0, Math.pow(2, 31)));
	    appearance = {
	      id: id,
	      dimensions: dimensions,
	      tags: [],
	      negative_tags: [],
	      thing_name: null
	    };
	    this.props.appearances.add(appearance.id, appearance);
	    return this.context.router.transitionTo('file appearance', {
	      appearance_id: id,
	      file_id: this.context.router.getCurrentParams().file_id
	    });
	  },
	  startDrag: function(position, touch_point) {
	    return this.setState({
	      dragging: {
	        position: position,
	        touch_point: touch_point
	      }
	    });
	  },
	  onMouseMove: function(event) {
	    var offset, position, touch_point, _ref;
	    if (this.state.dragging) {
	      _ref = this.state.dragging, position = _ref.position, touch_point = _ref.touch_point;
	      event.preventDefault();
	      event.stopPropagation();
	      offset = $(this.refs.box.getDOMNode()).offset();
	      position.x.set(event.nativeEvent.clientX - touch_point.x - offset.left);
	      return position.y.set(event.nativeEvent.clientY - touch_point.y - offset.top);
	    }
	  },
	  componentDidMount: function() {
	    var handler;
	    handler = (function(_this) {
	      return function() {
	        if (_this.state.dragging) {
	          return _this.setState({
	            dragging: null
	          });
	        }
	      };
	    })(this);
	    this.setState({
	      handler: handler
	    });
	    return $(window).on('mouseup', handler);
	  },
	  componentWillUnmount: function() {
	    return $(window).off('mouseup', this.state.handler);
	  },
	  render: function() {
	    var appearances, _ref;
	    appearances = [];
	    if ((_ref = this.props.appearances) != null) {
	      _ref.forEach((function(_this) {
	        return function(id, appearance) {
	          return appearances.push(React.createElement(AppearanceOverlay, React.__spread({}, appearance, {
	            "key": appearance.id.val(),
	            "startDrag": _this.startDrag
	          })));
	        };
	      })(this));
	    }
	    return React.createElement("div", {
	      "style": {
	        position: 'relative'
	      },
	      "className": "main-image",
	      "onMouseMove": this.onMouseMove,
	      "onMouseUp": this.onMouseUp,
	      "ref": "box"
	    }, React.createElement("img", {
	      "src": this.props.src,
	      "onClick": this.onClickImage
	    }), React.createElement("div", {
	      "style": {
	        position: 'absolute',
	        zIndex: 2,
	        top: 0,
	        left: 0
	      }
	    }, appearances));
	  }
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var cortex_set_key, file_details_diff, file_id_mixin;

	file_id_mixin = __webpack_require__(15);

	cortex_set_key = __webpack_require__(22);

	file_details_diff = __webpack_require__(23);

	module.exports = {
	  mixins: [file_id_mixin],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getId: function() {
	    return this.getFileId();
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
	  detailsLoaded: function() {
	    return this.props.cortex.file_details.hasKey(this.getFileId());
	  },
	  componentDidMount: function() {
	    return this.loadDetails();
	  },
	  componentWillReceiveProps: function() {
	    return this.loadDetails();
	  },
	  loadDetails: function() {
	    if (!this.detailsLoaded()) {
	      return $.get(this.getSyncUrl(), (function(_this) {
	        return function(file_details) {
	          return _this.gotData(file_details);
	        };
	      })(this));
	    }
	  },
	  getDetails: function() {
	    if (this.detailsLoaded()) {
	      return this.props.cortex.file_details[this.getFileId()];
	    }
	  },
	  getInitialState: function() {
	    return {
	      saving: false,
	      error: false
	    };
	  },
	  getSyncUrl: function() {
	    return "/api/file/" + (this.getFileId()) + "/info";
	  },
	  gotData: function(file_details) {
	    var file_details_clone, id;
	    id = this.getId();
	    console.log("GOT DATA", file_details);
	    file_details_clone = $.extend(true, {}, file_details);
	    if (id in this.props.cortex.file_details) {
	      this.props.cortex.file_details[id].set(file_details);
	      return this.props.cortex.server_file_details[id].set(file_details_clone);
	    } else {
	      this.props.cortex.file_details.add(id, file_details);
	      return this.props.cortex.server_file_details.add(id, file_details_clone);
	    }
	  },
	  saveDetails: function() {
	    var id, message, server_state;
	    id = this.getId();
	    server_state = this.props.cortex.server_file_details[id].val();
	    message = file_details_diff(this.getDetails(), server_state);
	    this.setState({
	      saving: true,
	      error: false
	    });
	    return $.ajax({
	      type: 'post',
	      contentType: 'application/json',
	      dataType: 'json',
	      url: this.getSyncUrl(),
	      data: JSON.stringify(message),
	      success: (function(_this) {
	        return function(response) {
	          var appearance_id_map, current_id, file, new_id;
	          file = response.file, appearance_id_map = response.appearance_id_map;
	          current_id = _this.context.router.getCurrentParams().appearance_id;
	          if (current_id && current_id in appearance_id_map) {
	            new_id = appearance_id_map[current_id];
	            _this.context.router.transitionTo('file appearance show', {
	              appearance_id: new_id,
	              file_id: _this.getId()
	            });
	          }
	          _this.gotData(file);
	          return _this.setState({
	            saving: false
	          });
	        };
	      })(this),
	      error: (function(_this) {
	        return function() {
	          console.log(arguments, "ERROR");
	          return _this.setState({
	            saving: false,
	            error: true
	          });
	        };
	      })(this)
	    });
	  }
	};


/***/ },
/* 13 */
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

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getFileId: function() {
	    return this.context.router.getCurrentParams().file_id;
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var NewComment, SidebarComment;

	SidebarComment = __webpack_require__(24);

	NewComment = __webpack_require__(25);

	module.exports = React.createClass({
	  render: function() {
	    var comments;
	    comments = this.props.comments ? this.props.comments.map((function(_this) {
	      return function(comment) {
	        return React.createElement(SidebarComment, React.__spread({}, comment));
	      };
	    })(this)) : React.createElement("div", null, "Loading...");
	    return React.createElement("div", null, React.createElement(NewComment, {
	      "comments": this.props.comments
	    }), comments);
	  }
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var cortex_set_key, file_id_mixin;

	cortex_set_key = __webpack_require__(22);

	file_id_mixin = __webpack_require__(15);

	module.exports = {
	  mixins: [file_id_mixin],
	  commentsLoaded: function() {
	    return this.props.cortex.file_comments.hasKey(this.getFileId());
	  },
	  componentDidMount: function() {
	    return this.loadComments();
	  },
	  componentWillReceiveProps: function() {
	    return this.loadComments();
	  },
	  getComments: function() {
	    if (this.commentsLoaded()) {
	      return this.props.cortex.file_comments[this.getFileId()];
	    }
	  },
	  loadComments: function() {
	    var file_id;
	    file_id = this.getFileId();
	    if (!this.commentsLoaded()) {
	      return $.ajax({
	        type: 'get',
	        url: "/api/file/" + file_id + "/comments",
	        success: (function(_this) {
	          return function(response) {
	            return cortex_set_key(_this.props.cortex.file_comments, file_id, response.items);
	          };
	        })(this)
	      });
	    }
	  }
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var CortexTagger, file_details_loader;

	CortexTagger = __webpack_require__(26);

	file_details_loader = __webpack_require__(12);

	module.exports = React.createClass({
	  mixins: [file_details_loader],
	  render: function() {
	    if (!this.detailsLoaded()) {
	      return React.createElement("div", null, "Loading...");
	    }
	    return React.createElement("div", null, React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Scene Tags"), React.createElement(CortexTagger, {
	      "ref": "tags",
	      "tags": (this.getDetails().tags),
	      "possible_tags": TAG_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "What is happening in this picture?")), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Artists"), React.createElement(CortexTagger, {
	      "ref": "artists",
	      "tags": (this.getDetails().roles.artist),
	      "possible_tags": THING_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "Who made this?")), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Recipients"), React.createElement(CortexTagger, {
	      "ref": "recipients",
	      "tags": (this.getDetails().roles.recipient),
	      "possible_tags": THING_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "Who was this made for?")), React.createElement("button", {
	      "className": "btn btn-primary",
	      "onClick": this.saveDetails
	    }, "Save"));
	  }
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var ReactTagsInput;

	ReactTagsInput = __webpack_require__(28);

	module.exports = React.createClass({
	  displayName: 'AutoCompleteTagger',
	  propTypes: {
	    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	    possible_tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	    allow_new_tags: React.PropTypes.bool.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      tags: [],
	      possible_tags: [],
	      allow_new_tags: true
	    };
	  },
	  getInitialState: function() {
	    return {
	      completions: []
	    };
	  },
	  complete: function(value) {
	    if (value === '') {
	      return this.setState({
	        completions: []
	      });
	    }
	    this.setState({
	      completions: this.props.possible_tags.filter((function(comp) {
	        return comp.substr(0, value.length) === value && this.refs.tags.getTags().indexOf(comp) === -1;
	      }).bind(this))
	    });
	  },
	  beforeAdd: function(tag) {
	    if (this.props.possible_tags.indexOf(tag) !== -1) {
	      return true;
	    }
	    if (this.state.completions.length === 1) {
	      return this.state.completions[0];
	    }
	    return this.props.allow_new_tags;
	  },
	  add: function(tag) {
	    var _base;
	    this.setState({
	      completions: []
	    });
	    if (typeof (_base = this.props).onTagAdd === "function") {
	      _base.onTagAdd(tag);
	    }
	  },
	  render: function() {
	    var completionNodes, tagsInputProps;
	    completionNodes = this.state.completions.map((function(comp) {
	      var add;
	      add = (function(e) {
	        this.refs.tags.addTag(comp);
	      }).bind(this);
	      return React.createElement('span', {}, React.createElement('a', {
	        className: '',
	        onClick: add
	      }, comp), ' ');
	    }).bind(this));
	    tagsInputProps = {
	      ref: 'tags',
	      tags: this.props.tags,
	      onChangeInput: this.complete,
	      onTagAdd: this.add,
	      onTagRemove: this.props.onTagRemove,
	      onBeforeTagAdd: this.beforeAdd,
	      addOnBlur: false,
	      placeholder: ''
	    };
	    return React.createElement('div', null, React.createElement(ReactTagsInput, tagsInputProps), React.createElement('div', {
	      style: {
	        marginTop: '10px'
	      }
	    }, completionNodes));
	  }
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Vector, css_properties;

	css_properties = ['top', 'left'];

	Vector = (function() {
	  function Vector() {
	    var object;
	    if (typeof arguments[0] === 'object') {
	      object = arguments[0];
	      if ((object.x != null) && (object.y != null)) {
	        this.x = object.x, this.y = object.y;
	      } else if ((object.left != null) && (object.top != null)) {
	        this.x = object.left, this.y = object.top;
	      }
	    } else {
	      this.x = arguments[0], this.y = arguments[1];
	    }
	  }

	  Vector.prototype.components = function() {
	    return [this.x, this.y];
	  };

	  Vector.prototype.reduce = function(initial, action) {
	    return _.reduce(this.components(), action, initial);
	  };

	  Vector.prototype.fmap = function(action) {
	    return (function(func, args, ctor) {
	      ctor.prototype = func.prototype;
	      var child = new ctor, result = func.apply(child, args);
	      return Object(result) === result ? result : child;
	    })(Vector, _.map(this.components(), action), function(){});
	  };

	  Vector.prototype.vmap = function(vector, action) {
	    return (function(func, args, ctor) {
	      ctor.prototype = func.prototype;
	      var child = new ctor, result = func.apply(child, args);
	      return Object(result) === result ? result : child;
	    })(Vector, _.map(_.zip(this.components(), vector.components()), function(components) {
	      return action.apply(null, components);
	    }), function(){});
	  };

	  Vector.prototype.magnitude = function() {
	    return Math.sqrt(this.reduce(0, function(accumulator, component) {
	      return accumulator + component * component;
	    }));
	  };

	  Vector.prototype.scale = function(factor) {
	    return this.fmap(function(component) {
	      return component * factor;
	    });
	  };

	  Vector.prototype.invert = function() {
	    return this.scale(-1);
	  };

	  Vector.prototype.add = function(vector) {
	    return this.vmap(vector, function(c1, c2) {
	      return c1 + c2;
	    });
	  };

	  Vector.prototype.subtract = function(vector) {
	    return this.add(vector.invert());
	  };

	  Vector.prototype.as_css = function() {
	    return {
	      left: this.x,
	      top: this.y
	    };
	  };

	  Vector.prototype.equals = function(vector) {
	    return _.all(_.zip(this.components(), vector.components()), function(item) {
	      return item[0] === item[1];
	    });
	  };

	  Vector.prototype.distance = function(vector) {
	    return this.minus(vector).magnitude();
	  };

	  Vector.prototype.unit = function() {
	    return this.scale(1 / this.magnitude());
	  };

	  Vector.prototype.angle = function() {
	    return Math.atan2(this.y, this.x);
	  };

	  return Vector;

	})();

	Vector.prototype.plus = Vector.prototype.add;

	Vector.prototype.minus = Vector.prototype.subtract;

	module.exports = function() {
	  return (function(func, args, ctor) {
	    ctor.prototype = func.prototype;
	    var child = new ctor, result = func.apply(child, args);
	    return Object(result) === result ? result : child;
	  })(Vector, arguments, function(){});
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Link, Navigation, vector_prop_shape;

	Link = ReactRouter.Link, Navigation = ReactRouter.Navigation;

	vector_prop_shape = __webpack_require__(27);

	module.exports = React.createClass({
	  displayName: 'AppearanceOverlay',
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  onMouseDown: function(event) {
	    var touch_point;
	    event.preventDefault();
	    event.stopPropagation();
	    touch_point = {
	      x: event.nativeEvent.offsetX,
	      y: event.nativeEvent.offsetY
	    };
	    return this.props.startDrag(this.props.dimensions.position, touch_point);
	  },
	  render: function() {
	    return React.createElement(Link, {
	      "to": "file appearance",
	      "params": {
	        appearance_id: this.props.id.val(),
	        file_id: this.context.router.getCurrentParams().file_id
	      },
	      "className": "tagger-overlay",
	      "draggable": "true",
	      "onMouseDown": this.onMouseDown,
	      "style": {
	        position: 'absolute',
	        left: this.props.dimensions.position.x.val(),
	        top: this.props.dimensions.position.y.val(),
	        width: this.props.dimensions.size.x.val(),
	        height: this.props.dimensions.size.y.val(),
	        cursor: 'move'
	      }
	    });
	  }
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(object, key, value) {
	  if (object.hasKey(key)) {
	    return object[key].set(value);
	  } else {
	    return object.add(key, value);
	  }
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var tag_diff;

	tag_diff = function(new_tags, old_tags) {
	  return {
	    add: _.difference(new_tags, old_tags),
	    remove: _.difference(old_tags, new_tags)
	  };
	};

	module.exports = function(details, server_state) {
	  var message, new_appearances, removed_appearances, role, role_diffs, updated_appearances, _i, _len, _ref;
	  new_appearances = [];
	  updated_appearances = {};
	  details.appearances.forEach(function(key, appearance) {
	    var delta, new_thing_name, old_appearance;
	    appearance = appearance.val();
	    if (key.slice(0, 4) === 'new-') {
	      return new_appearances.push(appearance);
	    } else {
	      old_appearance = server_state.appearances[key];
	      if (_.isEqual(old_appearance, appearance)) {
	        return;
	      }
	      delta = {};
	      if (!_.isEqual(appearance.dimensions, old_appearance.dimensions)) {
	        delta.dimensions = appearance.dimensions;
	      }
	      new_thing_name = appearance.thing_name;
	      if (new_thing_name !== old_appearance.thing_name) {
	        delta.new_thing_name = new_thing_name;
	      }
	      delta.tags = tag_diff(appearance.tags, old_appearance.tags);
	      delta.negative_tags = tag_diff(appearance.negative_tags, old_appearance.negative_tags);
	      return updated_appearances[key] = delta;
	    }
	  });
	  removed_appearances = _.difference(_.keys(server_state.appearances), details.appearances.keys());
	  role_diffs = {};
	  _ref = ['artist', 'recipient'];
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    role = _ref[_i];
	    role_diffs[role] = tag_diff(details.roles[role].val(), server_state.roles[role]);
	  }
	  message = {
	    appearances: {
	      create: new_appearances,
	      "delete": removed_appearances,
	      update: updated_appearances
	    },
	    roles: role_diffs,
	    tags: tag_diff(details.tags.val(), server_state.tags)
	  };
	  return message;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement("div", {
	      "className": "media"
	    }, React.createElement("div", {
	      "className": "media-left"
	    }, React.createElement("a", null, React.createElement("img", {
	      "className": "media-object user-icon",
	      "src": "/static/images/anonymous-icon.png"
	    }))), React.createElement("div", {
	      "className": "media-body"
	    }, React.createElement("a", {
	      "className": "media-heading"
	    }, "Anonymous"), ": ", this.props.text.val()));
	  }
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getInitialState: function() {
	    return {
	      saving: false,
	      error: null
	    };
	  },
	  onPost: function() {
	    var file_id, input, text;
	    file_id = this.context.router.getCurrentParams().file_id;
	    input = this.refs.text.getDOMNode();
	    text = input.value;
	    this.setState({
	      saving: true
	    });
	    return $.ajax({
	      type: 'post',
	      url: "/api/file/" + file_id + "/comments",
	      data: {
	        text: text
	      },
	      success: (function(_this) {
	        return function(response) {
	          input.value = '';
	          _this.setState({
	            saving: false
	          });
	          return _this.props.comments.set(response.items);
	        };
	      })(this),
	      error: (function(_this) {
	        return function(error) {
	          return _this.setState({
	            saving: false,
	            error: "failed to comment"
	          });
	        };
	      })(this)
	    });
	  },
	  render: function() {
	    return React.createElement("div", null, React.createElement("div", {
	      "className": "media"
	    }, React.createElement("div", {
	      "className": "media-left"
	    }, React.createElement("a", null, React.createElement("img", {
	      "className": "media-object user-icon",
	      "src": "/static/images/anonymous-icon.png"
	    }))), React.createElement("div", {
	      "className": "media-body"
	    }, React.createElement("a", {
	      "className": "media-heading"
	    }, "Anonymous"), React.createElement("textarea", {
	      "className": "form-control",
	      "ref": "text"
	    }), React.createElement("button", {
	      "className": "btn btn-primary",
	      "onClick": this.onPost,
	      "disabled": this.state.saving,
	      "style": {
	        marginTop: 10
	      }
	    }, "Post Comment"), this.state.error)));
	  }
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger;

	Tagger = __webpack_require__(19);

	module.exports = React.createClass({
	  addTag: function(name) {
	    var item;
	    item = this.props.tags.find(function(item) {
	      return item.val() === name;
	    });
	    if (!item) {
	      return this.props.tags.push(name);
	    }
	  },
	  removeTag: function(name) {
	    var item;
	    item = this.props.tags.find(function(item) {
	      return item.val() === name;
	    });
	    return item.remove();
	  },
	  render: function() {
	    return React.createElement(Tagger, {
	      "tags": this.props.tags.val(),
	      "possible_tags": this.props.possible_tags,
	      "onTagAdd": this.addTag,
	      "onTagRemove": this.removeTag
	    });
	  }
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  x: React.PropTypes.number,
	  y: React.PropTypes.number
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Input, Tag;

	Input = React.createClass({
	  render: function() {
	    var inputClass, ns;
	    ns = this.props.ns;
	    inputClass = ns + 'tagsinput-input ' + (this.props.invalid ? ns + 'tagsinput-invalid' : '');
	    return React.createElement("input", React.__spread({
	      "ref": "input"
	    }, this.props, {
	      "type": "text",
	      "className": inputClass,
	      "placeholder": this.props.placeholder
	    }));
	  }
	});

	Tag = React.createClass({
	  render: function() {
	    return React.createElement('span', {
	      className: this.props.ns + 'tagsinput-tag'
	    }, this.props.tag + ' ', React.createElement('a', {
	      onClick: this.props.remove,
	      className: this.props.ns + 'tagsinput-remove'
	    }));
	  }
	});

	module.exports = React.createClass({
	  getDefaultProps: function() {
	    return {
	      tags: [],
	      placeholder: 'Add a tag',
	      validate: function(tag) {
	        return tag !== '';
	      },
	      addKeys: [13, 9],
	      removeKeys: [8],
	      onBeforeTagAdd: function() {
	        return true;
	      },
	      onBeforeTagRemove: function() {
	        return true;
	      },
	      onTagAdd: function() {},
	      onTagRemove: function() {},
	      onChange: function() {},
	      onChangeInput: function() {},
	      onBlur: function() {},
	      classNamespace: 'react',
	      addOnBlur: true
	    };
	  },
	  getInitialState: function() {
	    return {
	      tag: '',
	      invalid: false
	    };
	  },
	  clearInput: function() {
	    return this.setState({
	      tag: ''
	    });
	  },
	  getTags: function() {
	    return this.props.tags;
	  },
	  addTag: function(tag, cb) {
	    var before, valid;
	    before = this.props.onBeforeTagAdd(tag);
	    valid = !!before && this.props.validate(tag);
	    tag = typeof before === 'string' ? before : tag;
	    if (this.props.tags.indexOf(tag) !== -1 || !valid) {
	      return this.setState({
	        invalid: true
	      });
	    }
	    this.setState({
	      tag: '',
	      invalid: false
	    }, function() {
	      this.props.onTagAdd(tag);
	      this.inputFocus();
	      if (cb) {
	        return cb();
	      }
	    });
	  },
	  removeTag: function(tag) {
	    var i, tags, valid;
	    valid = this.props.onBeforeTagRemove(tag);
	    if (!valid) {
	      return;
	    }
	    tags = this.props.tags.slice(0);
	    i = tags.indexOf(tag);
	    tags.splice(i, 1);
	    this.setState({
	      tags: tags,
	      invalid: false
	    }, function() {
	      this.props.onTagRemove(tag);
	    });
	  },
	  onKeyDown: function(e) {
	    var add, remove;
	    add = this.props.addKeys.indexOf(e.keyCode) !== -1;
	    remove = this.props.removeKeys.indexOf(e.keyCode) !== -1;
	    if (add) {
	      e.preventDefault();
	      this.addTag(this.state.tag.trim());
	    }
	    if (remove && this.props.tags.length > 0 && this.state.tag === '') {
	      this.removeTag(this.props.tags[this.props.tags.length - 1]);
	    }
	  },
	  onChange: function(e) {
	    this.props.onChangeInput(e.target.value);
	    this.setState({
	      tag: e.target.value,
	      invalid: false
	    });
	  },
	  onBlur: function(e) {
	    if (!this.props.addOnBlur) {
	      this.props.onBlur(this.props.tags);
	      return;
	    }
	    if (this.state.tag !== '' && !this.state.invalid) {
	      return this.addTag(this.state.tag.trim(), (function(_this) {
	        return function() {
	          _this.props.onBlur(_this.props.tags);
	        };
	      })(this));
	    }
	    this.props.onBlur(this.props.tags);
	  },
	  inputFocus: function() {
	    this.refs.input.getDOMNode().focus();
	  },
	  render: function() {
	    var ns, tagNodes;
	    ns = this.props.classNamespace === '' ? '' : this.props.classNamespace + '-';
	    tagNodes = this.props.tags.map((function(tag, i) {
	      return React.createElement(Tag, {
	        key: i,
	        ns: ns,
	        tag: tag,
	        remove: this.removeTag.bind(null, tag)
	      });
	    }).bind(this));
	    return React.createElement("div", {
	      "className": "" + ns + "tagsinput"
	    }, tagNodes, React.createElement(Input, {
	      "ref": "input",
	      "ns": ns,
	      "placeholder": this.props.placeholder,
	      "value": this.state.tag,
	      "invalid": this.state.invalid,
	      "onKeyDown": this.onKeyDown,
	      "onChange": this.onChange,
	      "onBlur": this.onBlur
	    }));
	  }
	});


/***/ }
/******/ ]);