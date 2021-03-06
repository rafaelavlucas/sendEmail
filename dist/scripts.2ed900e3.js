// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/components/themes.ts":[function(require,module,exports) {
"use strict";

var colors = ["gra-01", "gra-02", "gra-03", "gra-04", "gra-05", "gra-06"];
var color = colors[Math.floor(Math.random() * colors.length)];
var body = document.querySelector("body");
var colorButtons = document.querySelectorAll(".mainNav__color");
var randomButton = document.querySelector("[data-color='random']");
var dataColor = body.getAttribute('data-color');
var dataRandomAttr = body.getAttribute('data-random');
var dataRandomBoolean = Boolean(dataRandomAttr); // Events

colorButtons.forEach(function (color) {
  color.addEventListener("click", changeTheme);
});

function changeTheme(e) {
  var selectedColor = e.currentTarget.dataset.color;
  colorButtons.forEach(function (color) {
    color.classList.remove("selected");
  });
  e.currentTarget.classList.add("selected");

  if (e.currentTarget.dataset.color !== "random") {
    body.dataset.color = selectedColor;
    body.dataset.random = "false";
  } else {
    body.dataset.random = "true";
  }
}

function setRandomTheme() {
  if (dataRandomAttr === "true") {
    dataColor === color;
    body.dataset.color = color;
    randomButton.classList.add("selected");
  }
}

setRandomTheme();
},{}],"scripts/components/mainNav.ts":[function(require,module,exports) {
"use strict";
},{}],"scripts/components/forms.ts":[function(require,module,exports) {
"use strict";

var inputs = document.querySelectorAll('.forms__input');
inputs.forEach(function (input) {
  var _a;

  (_a = input.querySelector('input')) === null || _a === void 0 ? void 0 : _a.addEventListener("blur", checkFilled);
});

function checkFilled(_ref) {
  var target = _ref.target,
      currentTarget = _ref.currentTarget;
  var textVal = target.value;
  var parent = currentTarget.closest(".forms__input"),
      parentError = parent.querySelector(".forms__message");

  if (textVal != "") {
    // parent.classList.add("filled");
    validateText(textVal, target);
  } else {
    parent.classList.remove("error");
    parentError.innerHTML = "";
  }
}

function validateText(text, target) {
  var parent = target.closest(".forms__input"),
      regex = new RegExp(parent.dataset.validate),
      parentError = parent.querySelector(".forms__message"),
      errorMessage = parent.dataset.error;
  if (parent.dataset.validate == "undefined") return;

  if (text.match(regex)) {
    //if ok
    parent.classList.remove("error");
    parentError.innerHTML = "";
  } //if error
  else {
    parent.classList.add("error");
    parentError.innerHTML = errorMessage;
  }
}
},{}],"scripts/components/accordion.ts":[function(require,module,exports) {
"use strict";

var categories = [{
  category: "Categoria 1",
  messages: ["Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated", "Far far away, behind the world mountains, far from the countries Vokalia!", "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."]
}, {
  category: "Categoria 2",
  messages: ["Far far away, behind the world mountains, far from the countries Vokalia!"]
}, {
  category: "Categoria 3",
  messages: ["Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated", "Far far away, behind the world mountains, far from the countries Vokalia!", "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."]
}, {
  category: "Categoria 4",
  messages: ["Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Separated", "Far far away, behind the world mountains, far from the countries Vokalia!", "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts. Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts."]
}]; // Variables

var tablet = 1023;
var accordionButton;
var categoryBlock = document.querySelector(".categoryBlock");
var categoryList = document.querySelector(".categoryBlock__list");
var categoryBlockContent = document.querySelector(".categoryBlock .block__content");
var expandButton = document.querySelector(".categoryBlock__expandBtn"); // Variable after Loading the Accordion Templates

getCategories();
var categoryListHeight = categoryList.scrollHeight;
accordionButton = document.querySelectorAll(".accordion__button");
var accordions = document.querySelectorAll(".accordion");
var accordionLists = document.querySelectorAll(".accordion__list"); // Events

accordionButton.forEach(function (button) {
  button.addEventListener("click", openAccordion);
});
categoryBlockContent.addEventListener("scroll", addFadeOnScroll);
expandButton.addEventListener("click", expandListOnMobile); // Functions

function getCategories() {
  categories.forEach(function (item, index) {
    var templateCategory = "\n         <li class=\"accordion\">\n             <button class=\"accordion__button\">\n             ".concat(item.category, "\n             </button>\n             <ul class=\"accordion__list\">\n             </ul>\n         </li>");
    categoryList.insertAdjacentHTML("beforeend", templateCategory);
    item.messages.forEach(function (el) {
      var templateMessages = "<li class=\"accordion__listItem\">".concat(el, "</li>");
      document.querySelectorAll(".accordion__list")[index].insertAdjacentHTML("beforeend", templateMessages);
    });
  });
}

function openAccordion(e) {
  var currentAccordion = e.currentTarget.parentElement,
      currentList = currentAccordion.querySelector(".accordion__list");

  if (currentAccordion.classList.contains("open")) {
    currentAccordion.classList.remove("open");
    currentList.style.maxHeight = "0";
    categoryBlock.style.height = "auto";
    categoryList.style.height = categoryListHeight + "px";
  } else {
    currentAccordion.classList.add("open");
    currentList.style.maxHeight = currentList.scrollHeight + "px";
    categoryList.style.height = categoryList.scrollHeight + currentList.scrollHeight + "px";
  }

  addFadeOnclick(currentList);
}

function addFadeOnclick(currentList) {
  if (categoryBlockContent.scrollHeight + currentList.scrollHeight > categoryBlockContent.clientHeight) {
    categoryBlock.classList.add("fadeBottom");
  } else {
    categoryBlock.classList.remove("fadeBottom");
  }
}

function addFadeOnScroll() {
  var paddingBottom = window.getComputedStyle(categoryBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];

  if (categoryBlockContent.scrollHeight - categoryBlockContent.clientHeight <= categoryBlockContent.scrollTop + Number(paddingBottom)) {
    categoryBlock.classList.remove("fadeBottom");
  } else {
    categoryBlock.classList.add("fadeBottom");
  }
}

function expandListOnMobile() {
  if (window.innerWidth > tablet) return;

  if (categoryBlock.classList.contains("show")) {
    categoryBlock.classList.remove("show");
    categoryList.style.height = "0"; // When Collapse the list, remove all open accordions and reset heights

    accordions.forEach(function (accordion) {
      accordion.classList.remove("open");
    });
    accordionLists.forEach(function (list) {
      list.style.maxHeight = "0";
    });
  } else {
    categoryBlock.classList.add("show");
    categoryList.style.height = categoryList.scrollHeight + "px";
  }
}
},{}],"scripts/main.ts":[function(require,module,exports) {
"use strict";

var blocks = document.querySelector(".blocks");
var messageBlock = document.querySelector(".messageBlock");

if (window.innerWidth > 1023) {
  blocks.style.maxHeight = messageBlock.scrollHeight + "px";
}
},{}],"scripts/index.ts":[function(require,module,exports) {
"use strict";

require("./components/themes");

require("./components/mainNav");

require("./components/forms");

require("./components/accordion");

require("./main");
},{"./components/themes":"scripts/components/themes.ts","./components/mainNav":"scripts/components/mainNav.ts","./components/forms":"scripts/components/forms.ts","./components/accordion":"scripts/components/accordion.ts","./main":"scripts/main.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56174" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.ts"], null)
//# sourceMappingURL=/scripts.2ed900e3.js.map