<template>
    <div class="vc-easyclearinput-component form-group">
        <label for="">{{ label }}</label>
        <div class="input-box">
            <input v-el:input :type="type" class="form-control" v-model="value" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur" @change="onChange" @input="onInput" />
            <span class="clear-it glyphicon glyphicon-remove-circle" aria-hidden="true" @click="handleClear"></span>
        </div>
    </div>
</template>

<style lang="less">
// container
.vc-easyclearinput-component {

    .input-box {
        display: inline-block;
        position: relative;

        &:hover {
            .clear-it {
                visibility: visible;
            }
        }

        .clear-it {
            visibility: hidden;
            position: absolute;
            top: 50%;
            right: 6px;
            // css3 it more flexible
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            opacity: .3;
        }
    }

} // end of container
</style>

<script>
const EVENT_DELAY = 128

export default {
    props: {
        value: {
            twoWay: true,
        },
        label: String,
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        onInput: {
            type: Function,
            default: function () {}
        },
        onChange: {
            type: Function,
            default: function () {}
        },
        onFocus: {
            type: Function,
            default: function () {}
        },
        onBlur: {
            type: Function,
            default: function () {}
        },
        onClear: {
            type: Function,
            default: function () {}
        }
    },
    data: function () {
        return {
            isClear: false 
        }
    },
    created: function () {

    },
    ready: function () {
        if (this.autofocus) {
            this.focusInput()
        }
    },
    computed: {

    },
    watch: {
        autofocus (val) {
            if (val) {
                this.focusInput()
            }
        }
    },
    methods: {
        /**
         * 点击清除按钮
         * 1. blur 2. clear 3.focus again
         * 事件修正，使得小叉号成为类似系统原生的和input一体的控件，
         * 点击小叉号不应该带来input的失焦还有相应事件的响应
         */
        focusInput: function () { // 工具方法
            this.$els.input && this.$els.input.focus()
        },
        handleBlur: function (e) {
            // console.log(1)
            setTimeout(() => {
                if (!this.isClear) {
                    this.onBlur(e)
                } else {
                    setTimeout(() => {
                        this.focusInput()
                    }, 0)
                }
                // this.isClear = false
            }, EVENT_DELAY)
        },
        handleClear: function () {
            // console.log(2)
            this.isClear = true
            this.value = ''
            this.onClear()
            this.focusInput()
        },
        handleFocus: function (e) {
            // console.log(3)
            setTimeout(() => {
                if (!this.isClear) {
                    this.onFocus(e)
                }
                this.isClear = false
            }, EVENT_DELAY + 10)
        }
    },
    beforeDestroy: function () {

    },
    destroy: function () {

    }
}
</script>
