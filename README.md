# Localizer

## Installation

### Install via NPM

Available through npm as `vue-localizer`.
```
npm install --save vue-localizer
```

## Usage
You can set the locales globally or.. into each component separately!

- Firsty it checks about the given path into the component's locales.
- If it exist, returns the specified text.
- Otherwise it checks into the global locales and if it does not exist, it returns the path.

#### Create a new Localizer instance
```js
import VueLocalizer from 'vue-localizer'

// Install with options object: 
// - options.locales (default: {})
// - options.lang (default: 'en')
Vue.use(VueLocalizer, options)
```

#### Add locales to your components if you want
```js
export default {
  data: {..},

  locales: {
    en: {
      name: {
        first: 'Pantelis',
        last: '{0}'
        full: '{first} {last}',
      }
    },
    el: {..},
    ..
  },

  methods: {..}
}
```

#### You can add before/after change hooks in your component
```js
this.$lang.beforeChange((lang) => {})
this.$lang.afterChange((lang) => {})
```

#### Change the language
```js
this.$lang.change('el') // call it from a vue instance
```

#### Template
```html
<!-- plain text -->
<span>{{ $lang('name.first') }}</span>

<!-- with indexed replacements -->
<span>{{ $lang('name.last', ['Peslis']) }}</span>

<!-- with associative replacements -->
<span>{{ $lang('name.full', {first:'Pantelis',last:'Peslis'}) }}</span>
```

## License
Localizer is released under the MIT License. See the bundled LICENSE file for details.
