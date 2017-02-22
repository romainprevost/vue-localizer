'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
    data.lang = options.lang;
    data.locales = options.locales;
    Vue.util.defineReactive({}, null, data._lang);
    Vue.prototype.$lang = $lang;
};

exports.default = Plugin;