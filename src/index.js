import { translate } from './translator'

let Plugin = {};

let data = {
    _lang: { value: '' },

    locales: {},

    _before(lang) {},

    _after(lang) {},

    change(lang) {
        if (this._lang.value === lang) return;

        this._before && this._before(this._lang.value)

        this._lang.value = lang;

        this._after && this._after(this._lang.value)

    },

    get lang () {
        return this._lang.value
    },

    set lang (value) {
        this._lang.value = value
    }
};

let $lang = function (path, repls) {
    // search for the path 'locally'
    return translate(this.$options.locales, data.lang, path, repls)
        // search for the path 'globally'
        || translate(data.locales, data.lang, path, repls)
        // if the path does not exist, return the path
        || path
};

let mergeStrategy = function (mixinLocales, vmLocales) {
    if (!mixinLocales) {
        return vmLocales
    }

    if (!vmLocales) {
        return mixinLocales
    }

    let locales = {};

    const languages = Object.keys(vmLocales);
    for (let lang of languages) {
        if (mixinLocales[lang]) {
            locales[lang] = { ...mixinLocales[lang], ...vmLocales[lang] }
        } else {
            locales[lang] = vmLocales[lang];
        }
    }

    return locales;

}


Object.assign($lang, {
    change: data.change.bind(data),
    beforeChange (fn) {
        data._before = fn
    },
    afterChange (fn) {
        data._after = fn
    },
    get: () => data.lang
});

Plugin.install = (Vue, options) => {
    data.lang = options.lang || 'en';
    data.locales = options.locales || {};
    Vue.util.defineReactive({}, null, data._lang);
    Vue.prototype.$lang = $lang;
    Vue.config.optionMergeStrategies.locales = mergeStrategy;
};

export default Plugin
