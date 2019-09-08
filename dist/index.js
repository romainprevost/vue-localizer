'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _translator = require('./translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = {};

var data = {
    _lang: { value: '' },

    locales: {},

    _before: function _before(lang) {},
    _after: function _after(lang) {},
    change: function change(lang) {
        if (this._lang.value === lang) return;

        this._before && this._before(this._lang.value);

        this._lang.value = lang;

        this._after && this._after(this._lang.value);
    },


    get lang() {
        return this._lang.value;
    },

    set lang(value) {
        this._lang.value = value;
    }
};

var $lang = function $lang(path, repls) {
    return (0, _translator.translate)(this.$options.locales, data.lang, path, repls) || (0, _translator.translate)(data.locales, data.lang, path, repls) || path;
};

var mergeStrategy = function mergeStrategy(mixinLocales, vmLocales) {
    if (!mixinLocales) {
        return vmLocales;
    }

    if (!vmLocales) {
        return mixinLocales;
    }

    var locales = {};

    var languages = (0, _keys2.default)(vmLocales);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(languages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var lang = _step.value;

            if (mixinLocales[lang]) {
                locales[lang] = (0, _extends3.default)({}, mixinLocales[lang], vmLocales[lang]);
            } else {
                locales[lang] = vmLocales[lang];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return locales;
};

(0, _assign2.default)($lang, {
    change: data.change.bind(data),
    beforeChange: function beforeChange(fn) {
        data._before = fn;
    },
    afterChange: function afterChange(fn) {
        data._after = fn;
    },

    get: function get() {
        return data.lang;
    }
});

Plugin.install = function (Vue, options) {
    data.lang = options.lang || 'en';
    data.locales = options.locales || {};
    Vue.util.defineReactive({}, null, data._lang);
    Vue.prototype.$lang = $lang;
    Vue.config.optionMergeStrategies.locales = mergeStrategy;
};

exports.default = Plugin;