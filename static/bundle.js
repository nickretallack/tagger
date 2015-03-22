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

	window.TaggingActivity = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var FileTagDetails, ImageTagger, random_integer;

	ImageTagger = __webpack_require__(2);

	FileTagDetails = __webpack_require__(3);

	random_integer = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	module.exports = React.createClass({
	  getInitialState: function() {
	    return {
	      appearances: {},
	      selected_appearance: null
	    };
	  },
	  unSelectAppearance: function() {
	    return this.setState({
	      selected_appearance: null
	    });
	  },
	  selectAppearance: function(id) {
	    return this.setState({
	      selected_appearance: id
	    });
	  },
	  removeAppearance: function(id) {
	    delete this.state.appearances[id];
	    return this.setState({
	      appearances: this.state.appearances
	    });
	  },
	  createAppearance: function(location) {
	    var appearance, id;
	    appearance = location;
	    appearance.tags = [];
	    id = random_integer(0, Math.pow(2, 31));
	    appearance.id = "new-" + id;
	    this.state.appearances[appearance.id] = appearance;
	    return this.setState({
	      appearances: this.state.appearances,
	      selected_appearance: appearance.id
	    });
	  },
	  render: function() {
	    return React.createElement("div", {
	      "className": "row"
	    }, React.createElement("div", {
	      "className": "col-sm-4 col-md-3 col-lg-2"
	    }, React.createElement(FileTagDetails, {
	      "selected_appearance": this.state.appearances[this.state.selected_appearance],
	      "unSelectAppearance": this.unSelectAppearance,
	      "removeAppearance": this.removeappearance
	    })), React.createElement("div", {
	      "className": "col-sm-8 col-md-9 col-lg-10"
	    }, React.createElement(ImageTagger, {
	      "src": IMAGE_URL,
	      "selectAppearance": this.selectAppearance,
	      "createAppearance": this.createAppearance,
	      "appearances": this.state.appearances
	    })));
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceOverlay, V, vector_prop_shape;

	V = __webpack_require__(6);

	vector_prop_shape = {
	  x: React.PropTypes.number,
	  y: React.PropTypes.number
	};

	AppearanceOverlay = React.createClass({
	  propTypes: {
	    position: React.PropTypes.shape(vector_prop_shape),
	    size: React.PropTypes.shape(vector_prop_shape)
	  },
	  onClick: function(event) {
	    return this.props.selectAppearance(this.props.id);
	  },
	  render: function() {
	    return React.createElement("div", {
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

	module.exports = React.createClass({
	  getInitialState: function() {
	    return {
	      creating_overlay: null
	    };
	  },
	  onClickImage: function(event) {
	    var location, mouse_position, offsetX, offsetY, position, size, _ref;
	    _ref = event.nativeEvent, offsetX = _ref.offsetX, offsetY = _ref.offsetY;
	    mouse_position = V(offsetX, offsetY);
	    size = V(150, 150);
	    position = mouse_position.subtract(size.scale(0.5));
	    location = {
	      size: size,
	      position: position
	    };
	    return this.props.createAppearance(location);
	  },
	  render: function() {
	    var appearance, appearances, id;
	    appearances = (function() {
	      var _ref, _results;
	      _ref = this.props.appearances;
	      _results = [];
	      for (id in _ref) {
	        appearance = _ref[id];
	        _results.push(React.createElement(AppearanceOverlay, React.__spread({
	          "key": appearance.id,
	          "selectAppearance": this.props.selectAppearance
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AppearanceEditor, AutocompleteTagger;

	AutocompleteTagger = __webpack_require__(4);

	AppearanceEditor = __webpack_require__(5);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	  add: function() {
	    this.setState({
	      completions: []
	    });
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger;

	Tagger = __webpack_require__(4);

	module.exports = React.createClass({
	  removeAppearance: function() {
	    return this.props.removeAppearance(this.props.id);
	  },
	  render: function() {
	    return React.createElement("div", null, React.createElement("h3", null, "Tag This Appearance"), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Recurring character or object?"), React.createElement(Tagger, {
	      "tags": this.props.tags,
	      "possible_tags": THING_NAMES
	    })), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Edit this appearance"), React.createElement(Tagger, {
	      "tags": this.props.tags,
	      "possible_tags": TAG_NAMES
	    }), React.createElement("p", {
	      "class": "help-block"
	    }, "Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.")), React.createElement("p", null, "\t\t\tdebug:", this.props.id, this.props.tags), React.createElement("button", {
	      "className": "btn btn-danger",
	      "onClick": this.removeAppearance
	    }, "Remove Appearance"));
	  }
	});


/***/ },
/* 6 */
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


/***/ }
/******/ ]);