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
	      "removeAppearance": this.removeappearance,
	      "selectThing": this.selectThing
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

	V = __webpack_require__(4);

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

	AutocompleteTagger = __webpack_require__(5);

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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var ReactTagsInput;

	ReactTagsInput = __webpack_require__(7);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Tagger;

	Tagger = __webpack_require__(5);

	module.exports = React.createClass({
	  getInitialState: function() {
	    return {
	      thing_tags: []
	    };
	  },
	  removeAppearance: function() {
	    return this.props.removeAppearance(this.props.id);
	  },
	  selectThing: function(name) {
	    $.get("/api/thing/" + name + "/tag", (function(_this) {
	      return function(response) {
	        return _this.setState({
	          thing_tags: response.items
	        });
	      };
	    })(this));
	    return this.props.selectThing(name);
	  },
	  mixedTags: function() {
	    return _.union(this.state.thing_tags, this.props.tags);
	  },
	  render: function() {
	    return React.createElement("div", null, React.createElement("h3", null, "Tag This Appearance"), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Recurring character or object?"), React.createElement(Tagger, {
	      "tags": this.props.tags,
	      "possible_tags": THING_NAMES,
	      "onTagAdd": this.selectThing
	    })), React.createElement("div", {
	      "className": "form-group"
	    }, React.createElement("label", null, "Edit this appearance"), React.createElement(Tagger, {
	      "tags": this.mixedTags(),
	      "possible_tags": TAG_NAMES
	    }), React.createElement("p", {
	      "className": "help-block"
	    }, "Does this thing appear differently in this picture from how it usually does?  Edit the tags for this particular appearance here.")), React.createElement("p", null, "\t\t\tdebug:", this.props.id, this.props.tags), React.createElement("button", {
	      "className": "btn btn-danger",
	      "onClick": this.removeAppearance
	    }, "Remove Appearance"));
	  }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Input, Tag;

	Input = React.createClass({
	  render: function() {
	    var inputClass, ns;
	    ns = this.props.ns;
	    inputClass = ns + 'tagsinput-input ' + (this.props.invalid ? ns + 'tagsinput-invalid' : '');
	    return React.createElement("input", React.__spread({}, this.props, {
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
	      this.props.onChange(this.state.tags);
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
	    if (remove && this.state.tags.length > 0 && this.state.tag === '') {
	      this.removeTag(this.state.tags[this.state.tags.length - 1]);
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
	    var _this;
	    _this = this;
	    if (!this.props.addOnBlur) {
	      this.props.onBlur(this.state.tags);
	      return;
	    }
	    if (this.state.tag !== '' && !this.state.invalid) {
	      return this.addTag(this.state.tag.trim(), function() {
	        _this.props.onBlur(_this.state.tags);
	      });
	    }
	    _this.props.onBlur(_this.state.tags);
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