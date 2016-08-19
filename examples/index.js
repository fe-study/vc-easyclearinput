import Vue from 'vue'
import vcEasyclearinput from '../dist/build.js'

new Vue({
	el: '#app',
	data () {
		return {
            bools: {
                'true': true,
                'false': false
            },
            label: 'label',
            type: "text",
            autofocus: true,
            value: 'content',
            placeholder: 'placeholder',
            onInput: function () {
                console.log('onInput')
            },
            onChange: function (e) {
                console.log('onChange', e)
            },
            onClear: function () {
                console.log('onClear')
            },
            onFocus: function (e) {
                console.log('onFocus', e)
            },
            onBlur: function (e) {
                console.log('onBlur', e)
            }
		}
	},
	components: {
        vcEasyclearinput
	}
})
