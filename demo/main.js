import Vue from 'vue/dist/vue.common'
import VueLocalizer from '../src/index'
import NProgress from 'nprogress'
import filters from './filters'
import Child from './child.vue'

// global locales
let locales = {
    en: {
        name: {
            first: 'Pantelis',
            last: 'Peslis'
        },
        color: 'Blue'
    },
    el: {
        name: {
            first: 'Παντελής',
            last: 'Πεσλής'
        },
        color: 'Μπλε'
    }
};

let lang = 'en';

// install
Vue.use(VueLocalizer, { locales, lang });

new Vue({
    mixins: [filters],
    created() {
        // add hooks
        this.$lang.beforeChange(NProgress.start);
        this.$lang.afterChange(NProgress.done);
    },
  data: {
    selected: 'en',
    globalLocales: locales
  },
  components: {
    Child
  },
  locales: {
    en: {
      color: 'Yellow',
      number: {
        list: 'Numbers: {0} 2 {1} 4'
      }
    },
    el: {
      color: 'Κίτρινο',
      number: {
        list: 'Αριθμοί: {0} 2 {1} 4'
      }
    }
  },
  methods: {
    change (lang) {
        this.$lang.change(lang)
        this.selected = lang
    },
    isSelected (lang) {
      return {
        'is-info': this.$lang.get() === lang
      }
    }
  }
}).$mount('#app');
