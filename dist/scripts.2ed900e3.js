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
})({"scripts/main.ts":[function(require,module,exports) {
"use strict";

var tabletWidth = 1023,
    blocks = document.querySelector(".blocks"),
    messageBlockContent = document.querySelector(".messageBlock .block__content"),
    contactsButton = document.querySelector(".contactsBtn"),
    fontButtons = document.querySelectorAll(".mainNav__font"),
    closeContactsButton = document.querySelector(".contactsBlock__close");
var messagePaddingBottom = window.getComputedStyle(messageBlockContent, null).getPropertyValue('padding-bottom').split('px')[0]; // Events

contactsButton.addEventListener("click", setBlocksHeight);
closeContactsButton.addEventListener("click", setBlocksHeight);
fontButtons.forEach(function (font) {
  font.addEventListener("click", setBlocksHeight);
}); // Functions

if (window.innerWidth > 1023) {
  blocks.style.height = messageBlockContent.scrollHeight + "px";
}

function setBlocksHeight() {
  if (window.innerWidth < tabletWidth) return;
  setTimeout(function () {
    blocks.style.height = messageBlockContent.scrollHeight + "px";
  }, 300);
}

function refreshOnResize() {
  if ("ontouchstart" in document.documentElement) return;

  window.onresize = function () {
    setTimeout(function () {
      location.reload();
    }, 800);
  };
}

refreshOnResize();
},{}],"scripts/components/themes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Variables
var COLOR_THEME_OPTIONS = ["gra-01", "gra-02", "gra-03", "gra-04", "gra-05", "gra-06"],
    SELECTED_BUTTON = "selected",
    DARK_MODE = "dark",
    RANDOM_THEME = "random",
    TURN_ON_DARK_MODE = "on",
    STORAGE_DARK_MODE = "themeModeDark",
    STORAGE_COLOR_THEME = "themeColor";
var html = document.querySelector("html");
var body = document.querySelector("body");
var randomColor = COLOR_THEME_OPTIONS[Math.floor(Math.random() * COLOR_THEME_OPTIONS.length)];
var toggleButton = document.querySelector(".mainNav__toggle");
var randomButton = document.querySelector("button[data-theme-color='random']");
var colorButtons = document.querySelectorAll(".mainNav__color");
var fontButtons = document.querySelectorAll(".mainNav__font");
var getThemeColor = body.getAttribute('data-theme-color');
var getThemeRandom = body.getAttribute('data-theme-random');
var getFontSize = html.getAttribute('data-font-size');
var getStorageMode = localStorage.getItem(STORAGE_DARK_MODE);
var getStorageColor = localStorage.getItem(STORAGE_COLOR_THEME); // Events

colorButtons.forEach(function (color) {
  color.addEventListener("click", selectColorTheme);
});
fontButtons.forEach(function (font) {
  font.addEventListener("click", selectFontSize);
});
toggleButton.addEventListener("click", setDarkMode); // Functions

function selectColorTheme(e) {
  var selectedColor = e.currentTarget.dataset.themeColor;
  colorButtons.forEach(function (color) {
    color.classList.remove(SELECTED_BUTTON);
  });
  e.currentTarget.classList.add(SELECTED_BUTTON);
  changeColorTheme(e, selectedColor);
  localStorage.setItem(STORAGE_COLOR_THEME, selectedColor);
}

function changeColorTheme(e, selectedColor) {
  if (e.currentTarget.dataset.themeColor !== RANDOM_THEME) {
    body.dataset.themeColor = selectedColor;
    body.dataset.themeRandom = "false";
  } else {
    body.dataset.themeRandom = "true";
  }
}

function setRandomThemeOnLoad() {
  if (getThemeRandom === "true") {
    getThemeColor === randomColor;
    body.dataset.themeColor = randomColor;
    randomButton.classList.add(SELECTED_BUTTON);
  }
}

function darkModeStorage() {
  if (getStorageMode != "false") {
    body.dataset.themeMode = DARK_MODE;
    toggleButton.classList.add(TURN_ON_DARK_MODE);
    localStorage.setItem(STORAGE_DARK_MODE, "true");
  }

  ;
}

function colorThemeStorage() {
  body.dataset.themeColor = getStorageColor;
  var selectedButton = Array.from(colorButtons).find(function (item) {
    return getStorageColor != "random" && String(item.dataset.themeColor) == String(getStorageColor);
  });
  colorButtons.forEach(function (color) {
    color.classList.remove(SELECTED_BUTTON);
  });

  if (selectedButton) {
    selectedButton === null || selectedButton === void 0 ? void 0 : selectedButton.classList.add(SELECTED_BUTTON);
  } else {
    setRandomThemeOnLoad();
  }
}

function setDarkMode() {
  getStorageMode = localStorage.getItem(STORAGE_DARK_MODE);

  if (getStorageMode == "false") {
    body.dataset.themeMode = DARK_MODE;
    toggleButton.classList.add(TURN_ON_DARK_MODE);
    getStorageMode = localStorage.setItem(STORAGE_DARK_MODE, "true");
  } else {
    body.dataset.themeMode = "";
    toggleButton.classList.remove(TURN_ON_DARK_MODE);
    getStorageMode = localStorage.setItem(STORAGE_DARK_MODE, "false");
  }
}

function selectFontSize(e) {
  var selectedFont = e.currentTarget.dataset.fontSize;
  fontButtons.forEach(function (font) {
    font.classList.remove(SELECTED_BUTTON);
  });
  e.currentTarget.classList.add(SELECTED_BUTTON);
  changeFontSize(e, selectedFont);
}

function changeFontSize(e, selectedFont) {
  if (e.currentTarget.dataset.fontSize !== "normal") {
    html.dataset.fontSize = selectedFont;
  } else {
    html.dataset.fontSize = "normal";
  }
}

setRandomThemeOnLoad();
darkModeStorage();
colorThemeStorage();
},{}],"scripts/components/forms.ts":[function(require,module,exports) {
"use strict"; // Variables

var ERROR_INPUT = "error",
    FORMS_INPUT_SELECTOR = ".forms__input",
    FORMS_MESSAGE_SELECTOR = ".forms__message";
var btnSend = document.querySelector(".forms__buttonSend"),
    inputs = document.querySelectorAll(FORMS_INPUT_SELECTOR),
    requiredInputs = document.querySelectorAll(".forms__input.required"),
    inputName = document.querySelector(".forms__input--name input"),
    inputEmail = document.querySelector(".forms__input--email input"),
    inputTextArea = document.querySelector(".forms__input--textArea textarea"); // Events

inputs.forEach(function (input) {
  var _a;

  (_a = input.querySelector('input')) === null || _a === void 0 ? void 0 : _a.addEventListener("blur", checkFilledInput);
});
requiredInputs.forEach(function (input) {
  input.addEventListener("keyup", hideError);
  input.addEventListener("click", hideError);
});
btnSend.addEventListener("click", sendEmail); // Functions 

function checkFilledInput(_ref) {
  var target = _ref.target,
      currentTarget = _ref.currentTarget;
  var inputValue = target.value;
  var inputParent = currentTarget.closest(FORMS_INPUT_SELECTOR),
      inputMessage = inputParent.querySelector(FORMS_MESSAGE_SELECTOR);

  if (inputValue && inputMessage) {
    validateInputText(inputValue, target);
  } else if (inputMessage) {
    inputParent.classList.remove(ERROR_INPUT);
    inputMessage.innerHTML = "";
  }
}

function validateInputText(inputValue, target) {
  var inputParent = target.closest(FORMS_INPUT_SELECTOR),
      validationRegex = new RegExp(inputParent.dataset.validate),
      inputMessage = inputParent.querySelector(FORMS_MESSAGE_SELECTOR),
      errorMessage = inputParent.dataset.error;
  if (inputParent.dataset.validate == "undefined") return;

  if (inputValue.match(validationRegex) && inputMessage) {
    inputParent.classList.remove(ERROR_INPUT);
    inputMessage.innerHTML = "";
  } else {
    inputParent.classList.add(ERROR_INPUT);
    inputMessage.innerHTML = errorMessage;
  }
} // function checkInputValue(input) {
//     return !input;
// }
// function checkCheckbox(input) {
//     return !input.checked;
// }


function error(el) {
  var message = el.querySelector(FORMS_MESSAGE_SELECTOR);
  el.classList.add("error");
  if (message) message.innerText = el.dataset.required;
}

function hideError(e) {
  // if (e.currentTarget.querySelector('input')?.value == "" || e.currentTarget.querySelector('textarea')?.value == "") return;
  e.currentTarget.classList.remove("error");
}

function validateForm() {
  var isValid = true;
  requiredInputs.forEach(function (input) {
    var inputField = input.querySelector('input'),
        textAreaField = input.querySelector('textarea'),
        checkboxField = input.querySelector('#checkbox');

    if ((inputField === null || inputField === void 0 ? void 0 : inputField.value) == "" || (textAreaField === null || textAreaField === void 0 ? void 0 : textAreaField.value) == "" || (checkboxField === null || checkboxField === void 0 ? void 0 : checkboxField.checked) == false) {
      isValid = false;
      error(input);
      console.log("cenas2");
      return isValid;
    }
  });
  return isValid;
}

function sendEmail() {
  if (!validateForm()) return; // Change all values to your own

  var params = {
    user_id: 'P1UL7nDGfY25g6qyU',
    service_id: 'service_8ee5gmd',
    template_id: 'template_ope8bod',
    template_params: {
      'from_name': inputName.value,
      'from_email': inputEmail.value,
      'message': inputTextArea.value
    }
  };
  var headers = {
    'Content-type': 'application/json'
  };
  var options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params)
  };
  fetch('https://api.emailjs.com/api/v1.0/email/send', options).then(function (httpResponse) {
    if (httpResponse.ok) {
      console.log('Success');
    } else {
      return httpResponse.text().then(function (text) {
        return Promise.reject(text);
      });
    }
  }).catch(function (error) {
    console.log('Oops... ' + error);
  });
}
},{}],"scripts/content/categories.json":[function(require,module,exports) {
module.exports = [{
  "category": "Amizade",
  "messages": ["Em nome da nossa amizade, se tu caires eu ajudo-te a levantar, mas só depois de eu parar de rir.", "Todos temos aquele amigo antibiótico que só responde de 8 em 8 horas", "Há 2 espécies de chatos: os chatos propriamente ditos e os amigos, que são os nossos chatos prediletos.", "Todos temos um amigo idiota... Se não tens nenhum amigo idiota então lamento informar, mas o amigo idiota és tu!", "Queridos amigos, é tão difícil achar um amigo lindo, engraçado, inteligente e humilde. Por isso, não me percam!", "Friends é a série mais mentirosa que existe. Como é possível 6 amigos reunirem-se sempre? Vocês já tentaram marcar de sair com mais de 3 pessoas?"]
}, {
  "category": "Aniversário",
  "messages": ["Que neste dia todas as alegrias do mundo sejam tuas! Parabéns.", "Desejo-te um dia cheio de momentos agradáveis e alegres!", "Neste teu dia especial, quero aproveitar a oportunidade para te agradecer por tudo o que fizeste por mim. Muitos parabéns!", "Parabéns! Que este seja o melhor aniversário da tua vida!", "Parabéns pelo teu aniversário! Desejo-te um dia verdadeiramente fabuloso.", "Feliz aniversário! Agradeço a tua amizade e todos os bons momentos que passámos juntos este ano."]
}, {
  "category": "Boas festas",
  "messages": ["Esta mensagem é uma caixinha cheia de alegria, amor e paz, embrulhada com muito carinho, selada com um sorriso e enviada com um beijo. Feliz Natal e um ótimo ano novo!", "Natal é tempo de alegria, paz, felicidade e muito amor. Que possas viver todos esses bons momentos, todos os dias do Ano Novo! Boas Festas!", "Que este Natal seja um momento de harmonia e paz, que te faça acreditar num Ano Novo cheio de felicidades e conquistas. Boas Festas!", "Querido amigo, desejo-te um Feliz Natal e um Ano Novo cheio de paz, saúde e prosperidade!", "Que o Pai Natal te traga os principais presentes: Alegria todos os dias, sonhos realizados, queridos amigos, prosperidade, paz e harmonia, muito amor e uma vida repleta de felicidades. Boas Festas!", "O mundo está nas tuas mãos. Que tenhas a coragem e a determinação para transformar momentos difíceis em grandes desafios, sempre rumo a dias melhores. Que este Natal seja pleno em felicidade e amor. Feliz Natal e um próspero Ano Novo!", "Que as alegrias e sorrisos deste Natal perdurem durante todo o ano que se inicia. Boas Festas!"]
}, {
  "category": "Mendes morning inspo",
  "messages": ["\"Ter problemas na vida \xE9 inevit\xE1vel. Ser derrotado por eles \xE9 opcional, uma atitude vitoriosa e positiva \xE9 meio caminho andado para o sucesso.\"", "\"O talento vence jogos, mas s\xF3 o trabalho em equipe vence campeonatos.\"", "\"O sonho \xE9 um esbo\xE7o... motiva\xE7\xE3o a estrutura... a persist\xEAncia \xE9 a realidade.\"", "\" N\xE3o \xE9 a dist\xE2ncia que nos separa, \xE9 a vontade que nos une!\" ", "\"Por detras do sucesso existe sempre uma grande equipa.\"", "\"A verdadeira motiva\xE7\xE3o vem da realiza\xE7\xE3o nas dificuldades da vida.\"", "\"Inspira\xE7\xE3o vem do mundo e de outras grandes pessoas. Mas a motiva\xE7\xE3o vem de dentro de n\xF3s.\""]
}, {
  "category": "Sucesso Profissional",
  "messages": ["Muitos parabéns! Sei que vai ser mais um desafio ultrapassado, mas, mesmo assim, não posso deixar de te desejar muitas felicidades e muito sucesso! ", "É uma grande alegria ver pessoas que se esforçam, como tu, serem recompensadas por todo o seu esforço! Muitos parabéns!", "Era só uma questão de tempo até veres o teu talento reconhecido. Parabéns! Well done! Muito sucesso!", "Grande desafio! Só para os bons, mesmo! Muita sorte e muitas felicidades no novo desafio! Vais superar as expectativas, já sei!", "Parabéns pela promoção! Muito merecida e já vem tarde! Sei que vais estar à altura do desafio! Break a leg!!"]
}];
},{}],"scripts/components/accordion.ts":[function(require,module,exports) {
"use strict";

var _categories = _interopRequireDefault(require("../content/categories.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

// Variables
var OPEN_ACCORDION = "open",
    SHOW_CATEGORIES = "show",
    CONTAINER_FADE_BOTTOM = "fadeBottom";
var tablet = 1023;
var accordionButton;
var categoryBlock = document.querySelector(".categoryBlock");
var categoryList = document.querySelector(".categoryBlock__list");
var categoryBlockContent = document.querySelector(".categoryBlock .block__content");
var paddingBottom = window.getComputedStyle(categoryBlockContent, null).getPropertyValue('padding-bottom').split('px')[0];
var expandButton = document.querySelector(".categoryBlock__expandBtn");
var changeFontBtn = document.querySelectorAll(".mainNav__font");
var contactsButton = document.querySelector(".contactsBtn"); // Variable after Loading the Accordion Templates

getCategories();
var categoryListHeight = categoryList.scrollHeight;
accordionButton = document.querySelectorAll(".accordion__button");
var accordions = document.querySelectorAll(".accordion");
var accordionLists = document.querySelectorAll(".accordion__list");

var useDelay = function useDelay() {
  return function (ms) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
  };
}; // Events


accordionButton.forEach(function (button) {
  button.addEventListener("click", openAccordion);
});
categoryBlockContent.addEventListener("scroll", addFadeOnScroll);
expandButton.addEventListener("click", expandListOnMobile);
changeFontBtn.forEach(function (font) {
  font.addEventListener("click", updateAccordionHeight);
});
contactsButton.addEventListener("click", updateAccordionHeight); // Functions

function getCategories() {
  _categories.default.forEach(function (item, index) {
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

  if (currentAccordion.classList.contains(OPEN_ACCORDION)) {
    currentAccordion.classList.remove(OPEN_ACCORDION);
    currentList.style.maxHeight = "0";
    scrollToItem(currentAccordion);

    if (window.innerWidth < tablet) {
      categoryList.style.height = categoryList.scrollHeight - currentAccordion.scrollHeight + 40 + "px";
    }
  } else {
    currentAccordion.classList.add(OPEN_ACCORDION);
    currentList.style.maxHeight = currentList.scrollHeight + "px";
    categoryList.style.height = categoryList.scrollHeight + currentList.scrollHeight + "px";
    scrollToItem(currentAccordion);
  }

  addFadeOnclick(currentList);
}

function addFadeOnclick(currentList) {
  if (categoryBlockContent.scrollHeight + currentList.scrollHeight > categoryBlockContent.clientHeight) {
    categoryBlock.classList.add(CONTAINER_FADE_BOTTOM);
  } else {
    categoryBlock.classList.remove(CONTAINER_FADE_BOTTOM);
  }
}

function addFadeOnScroll() {
  if (categoryBlockContent.scrollHeight - categoryBlockContent.clientHeight <= categoryBlockContent.scrollTop + Number(paddingBottom)) {
    categoryBlock.classList.remove(CONTAINER_FADE_BOTTOM);
  } else {
    categoryBlock.classList.add(CONTAINER_FADE_BOTTOM);
  }
}

function expandListOnMobile() {
  if (window.innerWidth > tablet) return;

  if (categoryBlock.classList.contains(SHOW_CATEGORIES)) {
    categoryBlock.classList.remove(SHOW_CATEGORIES);
    categoryList.style.height = "0"; // When Collapse the list, remove all open accordions and reset heights

    accordions.forEach(function (accordion) {
      accordion.classList.remove(OPEN_ACCORDION);
    });
    accordionLists.forEach(function (list) {
      list.style.maxHeight = "0";
    });
  } else {
    categoryBlock.classList.add(SHOW_CATEGORIES);
    categoryList.style.height = categoryList.scrollHeight + "px";
  }
}

function scrollToItem(currentAccordion) {
  // if (window.innerWidth < tablet) return
  setTimeout(function () {
    currentAccordion.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
      inline: 'end'
    });
  }, 200);
}

function updateAccordionHeight() {
  var _this = this;

  var sumHeight = 0;
  var isDesktop = window.innerWidth > tablet;
  var delay = useDelay();

  var isAccordionsOpen = _toConsumableArray(accordions).find(function (item) {
    return item.classList.contains(OPEN_ACCORDION);
  });

  if (!isAccordionsOpen) return;
  accordions.forEach(function (item) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var accordionList;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              accordionList = item.querySelector('.accordion__list');

              if (!item.classList.contains(OPEN_ACCORDION)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return delay(450);

            case 4:
              accordionList.style.maxHeight = accordionList.scrollHeight + "px";

            case 5:
              if (!isDesktop) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return");

            case 7:
              _context2.next = 9;
              return delay(450);

            case 9:
              sumHeight += item.scrollHeight;
              _context2.next = 12;
              return delay(450);

            case 12:
              categoryList.style.height = sumHeight + "px";

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  });
}
},{"../content/categories.json":"scripts/content/categories.json"}],"scripts/modules/mainNav.ts":[function(require,module,exports) {
"use strict"; // Variables

var OPEN_SETTINGS = "open",
    STICKY_NAV = "sticky";
var openSettingsBtn = document.querySelector('.mainNav__settingsBtn');
var closeSettingsBtn = document.querySelector('.mainNav__settingsBtn--close');
var settingsMobile = document.querySelector('.mainNav__settings');
var mainNav = document.querySelector('.mainNav');
var mainNavTop = mainNav.offsetTop; // Events

openSettingsBtn.addEventListener("click", openSettingsMobile);
closeSettingsBtn.addEventListener("click", closeSettingsMobile);

window.onscroll = function () {
  stickyNav();
}; // Functions


function openSettingsMobile() {
  settingsMobile.classList.add(OPEN_SETTINGS);
}

function closeSettingsMobile() {
  settingsMobile.classList.remove(OPEN_SETTINGS);
}

function stickyNav() {
  if (window.pageYOffset >= mainNavTop + 2) {
    mainNav.classList.add(STICKY_NAV);
  } else {
    mainNav.classList.remove(STICKY_NAV);
  }
}
},{}],"scripts/modules/categoryBlock.ts":[function(require,module,exports) {
"use strict"; // Variables

var SELECTED_MESSAGE = "selected",
    SHOW_FORM_ERROR = "error",
    SHOW_NOTIFICATION = "show",
    HIDE_NOTIFICATION = "hide";
var messageItem = document.querySelectorAll(".accordion__listItem"),
    textArea = document.querySelector(".forms__input--textArea textarea"),
    notificationBar = document.querySelector(".notificationBar"); // Events

messageItem.forEach(function (message) {
  message.addEventListener("click", selectMessage);
}); // Functions

function selectMessage(e) {
  var _a;

  var selectedMessage = e.currentTarget,
      isSelected = selectedMessage.classList.contains(SELECTED_MESSAGE),
      messageText = selectedMessage.innerText;
  messageItem.forEach(function (message) {
    message.classList.remove(SELECTED_MESSAGE);
  });

  if (isSelected) {
    selectedMessage.classList.remove(SELECTED_MESSAGE);
    notificationBar.classList.remove(SHOW_NOTIFICATION);
    textArea.value = "";
  } else {
    e.currentTarget.classList.add(SELECTED_MESSAGE);
    textArea.value = messageText;
    (_a = textArea.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove(SHOW_FORM_ERROR);
    notificationBar.classList.add(SHOW_NOTIFICATION);
    setTimeout(function () {
      notificationBar.classList.add(HIDE_NOTIFICATION);
    }, 2500);
    setTimeout(function () {
      notificationBar.classList.remove(HIDE_NOTIFICATION);
      notificationBar.classList.remove(SHOW_NOTIFICATION);
    }, 2800);
  }
} // function blabla() {
//     const request = new Request(`https://zenquotes.io/api/quotes`, {
//         method: 'GET',
//     });
//     fetch(request)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (result) {
//             console.log(result)
//             // const item = result.Search;
//             // let movies = document.querySelector('.movies');
//             // if (item) {
//             //     item.forEach(el => {
//             //         let title = el.Title,
//             //             poster = el.Poster != "N/A" ? el.Poster : "assets/defaultimg.svg",
//             //             year = el.Year,
//             //             link = el.imdbID,
//             //             type = el.Type;
//             //         const template = `
//             //     <a class="item" data-type="${type}" href="https://imdb.com/title/${link}" target="_blank">
//             //     <article class="item__content">
//             //     <div class="item__text">
//             //     <small class="item__year">${year}</small>
//             //     <p  class="item__title">${title}</p>
//             //     </div>
//             //     <button class="item__view">view info</button>
//             //     </article>
//             //     <div class="item__image"><img src="${poster}"></div>
//             //     </a>`;
//         })
// }
// blabla()
},{}],"scripts/content/contacts.json":[function(require,module,exports) {
module.exports = [{
  "name": "Teste",
  "email": "rafaela.lucas@fullsix.pt"
}, {
  "name": "André Bernardes",
  "email": "andre.bernardes@fullsix.pt"
}, {
  "name": "Berenice Vieira",
  "email": "berenice.vieira@fullsix.pt"
}, {
  "name": "Camila Abreu",
  "email": "camila.abreu@fullsix.pt"
}, {
  "name": "Diana Ramalho",
  "email": "diana.ramalho@fullsix.pt"
}, {
  "name": "Fábio Henriques",
  "email": "fabio.henriques@fullsix.pt"
}, {
  "name": "João Borges",
  "email": "joao.borges@fullsix.pt"
}, {
  "name": "Jorge Chagas",
  "email": "jorge.chagas@fullsix.pt"
}, {
  "name": "Luís Ferreira",
  "email": "luis.ferreira@fullsix.pt"
}, {
  "name": "Manoel Regadas",
  "email": "manoel.regadas@fullsix.pt"
}, {
  "name": "Nuno Mendes",
  "email": "nuno.mendes@fullsix.pt"
}, {
  "name": "Pedro Duarte",
  "email": "pedro.duarte@fullsix.pt"
}, {
  "name": "Rafaela Lucas",
  "email": "rafaela.lucas@fullsix.pt"
}, {
  "name": "Ricardo Melo",
  "email": "ricardo.melo@fullsix.pt"
}, {
  "name": "Sergio Louro",
  "email": "sergio.louro@fullsix.pt"
}, {
  "name": "Vitor Pimenta",
  "email": "vitor.pimenta@fullsix.pt"
}];
},{}],"scripts/modules/contactsBlock.ts":[function(require,module,exports) {
"use strict";

var _contacts = _interopRequireDefault(require("../content/contacts.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SHOW_CONTACTS_BLOCK = "show",
    HIDE_CONTACT = "hide",
    SELECTED_CONTACT = "selected",
    SHOW_NO_RESULTS = "show";
var tablet = 1023,
    body = document.querySelector("body"),
    contactsBlock = document.querySelector(".contactsBlock"),
    contactsList = document.querySelector(".contactsBlock__list"),
    contactsBtn = document.querySelector(".contactsBtn"),
    closeContactsBtn = document.querySelector(".contactsBlock__close"),
    emailInput = document.querySelector(".forms__input--email input"),
    searchInput = document.querySelector(".forms__input--search input"),
    noResults = document.querySelector(".contactsBlock__noResults"); // Variable after Loading the Contacts Template

getContacts();
var contactItem = document.querySelectorAll(".contactsBlock__contact"); // Events

contactsBtn.addEventListener("click", showContactsBlock);
closeContactsBtn.addEventListener("click", hideContactsBlock);
contactItem.forEach(function (contact) {
  contact.addEventListener("click", selectContact);
});
emailInput.addEventListener("blur", checkEmailInputValue);
searchInput.addEventListener("input", searchContacts); // Functions

function showContactsBlock() {
  contactsBlock.classList.add(SHOW_CONTACTS_BLOCK);

  if (window.innerWidth < tablet) {
    body.style.overflow = "hidden";
  }
}

function hideContactsBlock() {
  contactsBlock.classList.remove(SHOW_CONTACTS_BLOCK);
  searchInput.value = "";
  contactItem.forEach(function (contact) {
    contact.classList.remove(HIDE_CONTACT);
  });
  noResults.classList.remove(SHOW_NO_RESULTS);

  if (window.innerWidth < tablet) {
    body.style.overflow = "initial";
  }
}

function getContacts() {
  _contacts.default.forEach(function (item) {
    var templateContacts = "\n        <li class=\"contactsBlock__listItem\">\n            <button class=\"contactsBlock__contact\" data-email=\"".concat(item.email, "\">").concat(item.name, "</button>\n        </li>");
    contactsList.insertAdjacentHTML("beforeend", templateContacts);
  });
}

function selectContact(e) {
  var isSelected = e.currentTarget.classList.contains(SELECTED_CONTACT);
  contactItem.forEach(function (contact) {
    contact.classList.remove(SELECTED_CONTACT);
  });

  if (isSelected) {
    e.currentTarget.classList.remove(SELECTED_CONTACT);
    emailInput.value = "";
  } else {
    e.currentTarget.classList.add(SELECTED_CONTACT);
    emailInput.value = e.currentTarget.dataset.email;
  }
}

function checkEmailInputValue() {
  if (emailInput.value == "") {
    contactItem.forEach(function (contact) {
      contact.classList.remove(SELECTED_CONTACT);
    });
  }
}

function searchContacts(e) {
  var value = e.currentTarget.value.toLowerCase();

  var filteredContacts = _toConsumableArray(contactItem).filter(function (contact) {
    return contact.innerText.toLowerCase().includes(value);
  });

  contactItem.forEach(function (contact) {
    var _a;

    (_a = contact.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add(HIDE_CONTACT);
    noResults.classList.add(SHOW_NO_RESULTS);
  });
  filteredContacts.forEach(function (contact) {
    var _a;

    (_a = contact.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove(HIDE_CONTACT);
    noResults.classList.remove(SHOW_NO_RESULTS);
  });
}
},{"../content/contacts.json":"scripts/content/contacts.json"}],"scripts/index.ts":[function(require,module,exports) {
"use strict";

require("./main");

require("./components/themes");

require("./components/forms");

require("./components/accordion");

require("./modules/mainNav");

require("./modules/categoryBlock");

require("./modules/contactsBlock");
},{"./main":"scripts/main.ts","./components/themes":"scripts/components/themes.ts","./components/forms":"scripts/components/forms.ts","./components/accordion":"scripts/components/accordion.ts","./modules/mainNav":"scripts/modules/mainNav.ts","./modules/categoryBlock":"scripts/modules/categoryBlock.ts","./modules/contactsBlock":"scripts/modules/contactsBlock.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61457" + '/');

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
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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