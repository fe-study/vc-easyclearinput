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
            noSlot: true,
            label: 'label',
            type: "text",
            autofocus: true,
            disabled: false,
            readOnly: false,
            value: 'content',
            placeholder: 'placeholder',
            infoText: '请输入正确的用户名',
            status: '',
            width: '400',
            icon: false,
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
    methods: {
        commonFn () {
            this.readOnly = false
            this.disabled = false
            this.noSlot = true
            this.status = ''
            this.icon = false
            this.infoText = ''
        },
        successIconFn () {
            this.readOnly = false
            this.disabled = false
            this.icon = true
            this.noSlot = true
            this.status = 'success'
        },
        emailFn () {
            this.readOnly = false
            this.disabled = false
            this.icon = true
            this.status = 'error'
            this.infoText = '请输入正确的邮箱'
            this.noSlot = false
        },
        disabledFn () {
            this.readOnly = false
            this.disabled = true
        },
        readOnlyFn () {
            this.disabled = false
            this.readOnly = true
        }
    },
    components: {
        vcEasyclearinput
    }
})
