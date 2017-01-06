import Vue from 'vue'
import vcEasyclearinput from '../src'

new Vue({
    el: '#app',
    data () {
        return {
            bools: {
                'true': true,
                'false': false
            },
            slot: '',
            label: 'label：',
            type: "text",
            autofocus: true,
            disabled: false,
            readonly: false,
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
            this.slot = ''
            this.readonly = false
            this.disabled = false
            this.status = ''
            this.icon = false
            this.infoText = ''
        },
        successIconFn () {
            this.readonly = false
            this.disabled = false
            this.icon = true
            this.status = 'success'
        },
        emailFn () {
            this.readonly = false
            this.disabled = false
            this.icon = true
            this.status = 'error'
            this.infoText = '请输入正确的邮箱'
            this.slot = 'before'
        },
        percentFn () {
            this.readonly = false
            this.disabled = false
            this.icon = true
            this.status = 'info'
            this.infoText = '请输入输入数字，可保留两位小数'
            this.slot = 'after'
        },
        disabledFn () {
            this.readonly = false
            this.disabled = true
        },
        readonlyFn () {
            this.disabled = false
            this.readonly = true
        }
    },
    components: {
        vcEasyclearinput
    }
})
