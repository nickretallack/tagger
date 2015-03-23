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

	window.TaggingActivity = __webpack_require__(1);

	if ((typeof ENTRY_POINT !== "undefined" && ENTRY_POINT !== null) && ENTRY_POINT === 'tag-file') {
	  cortex = new Cortex({
	    appearances: {},
	    selected_appearance: null,
	    thing_tags: {}
	  });
	  Route = ReactRouter.Route, DefaultRoute = ReactRouter.DefaultRoute;
	  routes = React.createElement(Route, {
	    "handler": TaggingActivity
	  }, React.createElement(DefaultRoute, {
	    "name": "file details",
	    "handler": __webpack_require__(2)
	  }), React.createElement(Route, {
	    "name": "appearance",
	    "path": "appearance/:appearance_id",
	    "handler": __webpack_require__(3)
	  }));
	  container = document.getElementById("react-image-tagger");
	  current_component = null;
	  ReactRouter.run(routes, function(Handler) {
	    var element;
	    element = React.createElement(Handler, {
	      "image_url": IMAGE_URL,
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

	var AppearanceOverlayManager, FileTagDetails, Navigation, RouteHandler;

	AppearanceOverlayManager = __webpack_require__(11);

	FileTagDetails = __webpack_require__(5);

	RouteHandler = ReactRouter.RouteHandler, Navigation = ReactRouter.Navigation;

	module.exports = React.createClass({
	  mixins: [Navigation],
	  render: function() {
	    return React.createElement("div", {
	      "className": "row"
	    }, React.createElement("div", {
	      "className": "col-sm-4 col-md-3 col-lg-2"
	    }, React.createElement(RouteHandler, {
	      "cortex": this.props.cortex,
	      "key": (this.context.router.getCurrentParams().appearance_id),
	      "removeAppearance": this.removeAppearance
	    })), React.createElement("div", {
	      "className": "col-sm-8 col-md-9 col-lg-10"
	    }, React.createElement(AppearanceOverlayManager, {
	      "src": IMAGE_URL,
	      "createAppearance": this.createAppearance,
	      "appearances": this.props.cortex.appearances
	    })));
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({
	  render: function() {
	    return React.createElement("div", null, "Details");
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceEditor, FileDetailEditor, Link, Navigation, State;

	Link = ReactRouter.Link, State = ReactRouter.State, Navigation = ReactRouter.Navigation;

	AppearanceEditor = __webpack_require__(6);

	FileDetailEditor = __webpack_require__(2);

	module.exports = React.createClass({
	  mixins: [State, Navigation],
	  currentAppearance: function() {
	    var result;
	    return result = this.props.cortex.appearances[this.getParams().appearance_id];
	  },
	  render: function() {
	    var current_appearance;
	    current_appearance = this.currentAppearance();
	    if (current_appearance) {
	      return React.createElement("div", null, React.createElement(Link, {
	        "to": "file details"
	      }, "Back"), React.createElement(AppearanceEditor, React.__spread({}, current_appearance, {
	        "cortex": this.props.cortex,
	        "ref": "editor"
	      })));
	    } else {
	      return React.createElement(FileDetailEditor, null);
	    }
	  }
	});


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceEditor, AutocompleteTagger;

	AutocompleteTagger = __webpack_require__(7);

	AppearanceEditor = __webpack_require__(6);

	module.exports = React.createClass({
	  render: function() {
	    var main_content;
	    main_content = this.props.selected_appearance ? React.createElement("div", null, React.createElement("p", null, React.createElement("a", {
	      "onClick": this.props.unSelectAppearance
	    }, "\t\t\t\t\tBack")), React.createElement(AppearanceEditor, React.__spread({}, this.props.selected_appearance))) : React.createElement("div", null, "...");
	    return React.createElement("div", null, main_content);
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Navigation, Tagger,
	  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	Tagger = __webpack_require__(7);

	Navigation = ReactRouter.Navigation;

	module.exports = React.createClass({
	  mixins: [Navigation],
	  removeAppearance: function() {
	    this.props.cortex.appearances[this.props.id.val()].remove();
	    return this.context.router.transitionTo('file details');
	  },
	  selectThing: function(name) {
	    this.props.thing_name.set(name);
	    if (!this.props.cortex.thing_tags.hasKey(name)) {
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
	            return _this.props.cortex.thing_tags.add(name, null);
	          };
	        })(this)
	      });
	    }
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

	var ReactTagsInput;

	ReactTagsInput = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Link, Navigation, vector_prop_shape;

	Link = ReactRouter.Link, Navigation = ReactRouter.Navigation;

	vector_prop_shape = {
	  x: React.PropTypes.number,
	  y: React.PropTypes.number
	};

	module.exports = React.createClass({
	  propTypes: {
	    position: React.PropTypes.shape(vector_prop_shape),
	    size: React.PropTypes.shape(vector_prop_shape)
	  },
	  render: function() {
	    return React.createElement(Link, {
	      "to": "appearance",
	      "params": {
	        appearance_id: this.props.id
	      },
	      "className": "tagger-overlay",
	      "onClick": this.onClick,
	      "style": {
	        position: 'absolute',
	        left: this.props.position.x,
	        top: this.props.position.y,
	        width: this.props.size.x,
	        height: this.props.size.y
	      }
	    });
	  }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlay, Navigation, V, random_integer;

	V = __webpack_require__(9);

	Navigation = ReactRouter.Navigation;

	AppearanceOverlay = __webpack_require__(10);

	random_integer = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	module.exports = React.createClass({
	  mixins: [Navigation],
	  getInitialState: function() {
	    return {
	      creating_overlay: null
	    };
	  },
	  onClickImage: function(event) {
	    var appearance, id, mouse_position, offsetX, offsetY, position, size, _ref;
	    _ref = event.nativeEvent, offsetX = _ref.offsetX, offsetY = _ref.offsetY;
	    mouse_position = V(offsetX, offsetY);
	    size = V(150, 150);
	    position = mouse_position.subtract(size.scale(0.5));
	    id = "new-" + (random_integer(0, Math.pow(2, 31)));
	    appearance = {
	      id: id,
	      size: size,
	      position: position,
	      tags: [],
	      negative_tags: [],
	      thing_name: null
	    };
	    this.props.appearances.add(appearance.id, appearance);
	    return this.context.router.transitionTo('appearance', {
	      appearance_id: id
	    });
	  },
	  render: function() {
	    var appearance, appearances, id;
	    appearances = (function() {
	      var _ref, _results;
	      _ref = this.props.appearances.val();
	      _results = [];
	      for (id in _ref) {
	        appearance = _ref[id];
	        _results.push(React.createElement(AppearanceOverlay, React.__spread({
	          "key": appearance.id
	        }, appearance)));
	      }
	      return _results;
	    }).call(this);
	    return React.createElement("div", {
	      "style": {
	        position: 'relative'
	      }
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


/***/ }
/******/ ]);