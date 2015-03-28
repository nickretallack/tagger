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

	window.TaggingActivityWrapper = __webpack_require__(1);

	if ((typeof ENTRY_POINT !== "undefined" && ENTRY_POINT !== null) && ENTRY_POINT === 'tag-file') {
	  cortex = new Cortex({
	    file_editor: void 0,
	    thing_tags: {}
	  });
	  Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;
	  routes = React.createElement(Route, {
	    "handler": TaggingActivityWrapper
	  }, TaggingActivityWrapper.routes);
	  container = document.getElementById("react-image-tagger");
	  current_component = null;
	  ReactRouter.run(routes, function(Handler) {
	    var element;
	    element = React.createElement(Handler, {
	      "image_url": IMAGE_URL,
	      "sync_url": SYNC_URL,
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

	var DefaultRoute, Route, RouteHandler, TaggingActivity;

	RouteHandler = ReactRouter.RouteHandler, Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;

	TaggingActivity = __webpack_require__(2);

	module.exports = React.createClass({
	  statics: {
	    routes: [
	      React.createElement(DefaultRoute, {
	        "key": "file details",
	        "name": "file details",
	        "handler": __webpack_require__(3)
	      }), React.createElement(Route, {
	        "key": "appearance",
	        "name": "appearance",
	        "path": "appearance/:appearance_id",
	        "handler": __webpack_require__(4)
	      })
	    ]
	  },
	  render: function() {
	    return React.createElement(TaggingActivity, React.__spread({}, this.props, {
	      "file": this.props.cortex.file_editor,
	      "cortex": this.props.cortex
	    }));
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlayManager, RouteHandler, tag_diff;

	AppearanceOverlayManager = __webpack_require__(5);

	RouteHandler = ReactRouter.RouteHandler;

	tag_diff = function(new_tags, old_tags) {
	  return {
	    add: _.difference(new_tags, old_tags),
	    remove: _.difference(old_tags, new_tags)
	  };
	};

	module.exports = React.createClass({
	  displayName: 'TaggingActivity',
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  getInitialState: function() {
	    return {
	      saving: false,
	      error: false
	    };
	  },
	  componentDidMount: function() {
	    console.log("GETTING");
	    return $.ajax({
	      type: 'get',
	      dataType: 'json',
	      url: this.props.sync_url,
	      success: (function(_this) {
	        return function(file_data) {
	          return _this.gotData(file_data);
	        };
	      })(this),
	      error: (function(_this) {
	        return function() {
	          return console.log("ERROR", arguments);
	        };
	      })(this)
	    });
	  },
	  gotData: function(file_data) {
	    console.log("GOT DATA", file_data);
	    this.props.file.set(file_data);
	    return this.setState({
	      server_state: $.extend(true, {}, file_data),
	      saving: false
	    });
	  },
	  save: function() {
	    var message, new_appearances, removed_appearances, role, role_diffs, server_state, updated_appearances, _i, _len, _ref;
	    server_state = this.state.server_state;
	    new_appearances = [];
	    updated_appearances = {};
	    this.props.file.appearances.forEach(function(key, appearance) {
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
	    removed_appearances = _.difference(_.keys(server_state.appearances), this.props.file.appearances.keys());
	    role_diffs = {};
	    _ref = ['artist', 'recipient'];
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      role = _ref[_i];
	      role_diffs[role] = tag_diff(this.props.file.roles[role].val(), server_state.roles[role]);
	    }
	    message = {
	      appearances: {
	        create: new_appearances,
	        "delete": removed_appearances,
	        update: updated_appearances
	      },
	      roles: role_diffs,
	      tags: tag_diff(this.props.file.tags.val(), server_state.tags)
	    };
	    this.setState({
	      saving: true,
	      error: false
	    });
	    return $.ajax({
	      type: 'post',
	      contentType: 'application/json',
	      dataType: 'json',
	      url: this.props.sync_url,
	      data: JSON.stringify(message),
	      success: (function(_this) {
	        return function(response) {
	          var appearance_id_map, current_id, file, new_id;
	          file = response.file, appearance_id_map = response.appearance_id_map;
	          current_id = _this.context.router.getCurrentParams().appearance_id;
	          if (current_id && current_id in appearance_id_map) {
	            new_id = appearance_id_map[current_id];
	            _this.context.router.transitionTo('appearance', {
	              appearance_id: new_id
	            });
	          }
	          return _this.gotData(file);
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
	  },
	  render: function() {
	    var error;
	    if (!this.props.file.val()) {
	      return React.createElement("div", null, "Loading...");
	    }
	    error = this.state.error ? React.createElement("div", null, "Failed to save.  Try again?") : void 0;
	    return React.createElement("div", {
	      "className": "row"
	    }, React.createElement("div", {
	      "className": "col-sm-4 col-md-3 col-lg-2"
	    }, React.createElement("h3", null, "File Details"), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("button", {
	      "disabled": this.state.saving,
	      "onClick": this.save,
	      "className": "btn btn-primary",
	      "style": {
	        marginBottom: 15
	      }
	    }, "Save All Changes and Reload"), error), React.createElement(RouteHandler, {
	      "cortex": this.props.cortex,
	      "file": this.props.file,
	      "appearances": this.props.file.appearances,
	      "key": (this.context.router.getCurrentParams().appearance_id),
	      "removeAppearance": this.removeAppearance
	    })), React.createElement("div", {
	      "className": "col-sm-8 col-md-9 col-lg-10"
	    }, React.createElement(AppearanceOverlayManager, {
	      "src": IMAGE_URL,
	      "createAppearance": this.createAppearance,
	      "appearances": this.props.file.appearances
	    })));
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CortexTagger;

	CortexTagger = __webpack_require__(12);

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement("div", null, React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Scene Tags"), React.createElement(CortexTagger, {
	      "ref": "tags",
	      "tags": this.props.file.tags,
	      "possible_tags": TAG_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "What is happening in this picture?")), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Artists"), React.createElement(CortexTagger, {
	      "ref": "artists",
	      "tags": this.props.file.roles.artist,
	      "possible_tags": THING_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "Who made this?")), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Recipients"), React.createElement(CortexTagger, {
	      "ref": "recipients",
	      "tags": this.props.file.roles.recipient,
	      "possible_tags": THING_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "Who was this made for?")));
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceEditor, FileDetailEditor, Link;

	Link = ReactRouter.Link;

	AppearanceEditor = __webpack_require__(6);

	FileDetailEditor = __webpack_require__(3);

	module.exports = React.createClass({
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  currentAppearance: function() {
	    var result;
	    return result = this.props.appearances[this.context.router.getCurrentParams().appearance_id];
	  },
	  render: function() {
	    var current_appearance;
	    current_appearance = this.currentAppearance();
	    if (current_appearance) {
	      return React.createElement("div", null, React.createElement(Link, {
	        "to": "file details"
	      }, "\u2190 Edit General Details"), React.createElement(AppearanceEditor, React.__spread({}, current_appearance, {
	        "appearance": current_appearance,
	        "cortex": this.props.cortex,
	        "ref": "editor"
	      })));
	    } else {
	      return React.createElement(FileDetailEditor, null);
	    }
	  }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlay, Navigation, V, random_integer;

	V = __webpack_require__(7);

	Navigation = ReactRouter.Navigation;

	AppearanceOverlay = __webpack_require__(8);

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
	    return this.context.router.transitionTo('appearance', {
	      appearance_id: id
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
	    var appearances;
	    appearances = [];
	    this.props.appearances.forEach((function(_this) {
	      return function(id, appearance) {
	        return appearances.push(React.createElement(AppearanceOverlay, React.__spread({}, appearance, {
	          "key": appearance.id.val(),
	          "startDrag": _this.startDrag
	        })));
	      };
	    })(this));
	    return React.createElement("div", {
	      "style": {
	        position: 'relative'
	      },
	      "onMouseMove": this.onMouseMove,
	      "onMouseUp": this.onMouseUp,
	      "ref": "box"
	    }, React.createElement("img", {
	      "src": this.props.src,
	      "style": {
	        position: 'absolute',
	        zIndex: 1
	      },
	      "onClick": this.onClickImage
	    }), React.createElement("div", {
	      "style": {
	        position: 'absolute',
	        zIndex: 2
	      }
	    }, appearances));
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger,
	  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	Tagger = __webpack_require__(9);

	module.exports = React.createClass({
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },
	  removeAppearance: function() {
	    this.props.appearance.remove();
	    return this.context.router.transitionTo('file details');
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
	  selectThing: function(name) {
	    this.props.thing_name.set(name);
	    return this.fetchThingTags(name);
	  },
	  componentDidMount: function() {
	    var name;
	    name = this.props.thing_name.val();
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
	    }, "Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.")), React.createElement("button", {
	      "className": "btn btn-danger",
	      "onClick": this.removeAppearance
	    }, "Remove Appearance"));
	  }
	});


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Link, Navigation, vector_prop_shape;

	Link = ReactRouter.Link, Navigation = ReactRouter.Navigation;

	vector_prop_shape = __webpack_require__(10);

	module.exports = React.createClass({
	  displayName: 'AppearanceOverlay',
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
	      "to": "appearance",
	      "params": {
	        appearance_id: this.props.id.val()
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var ReactTagsInput;

	ReactTagsInput = __webpack_require__(11);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  x: React.PropTypes.number,
	  y: React.PropTypes.number
	};


/***/ },
/* 11 */
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger;

	Tagger = __webpack_require__(9);

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


/***/ }
/******/ ]);