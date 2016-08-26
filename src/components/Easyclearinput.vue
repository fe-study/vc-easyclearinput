<template>
    <div class="vc-easyclearinput-component form-group" :class="[statusClass, { 'has-feedback': icon }]" :style="{ 'width': optionalWidth }">
        <label class="label-item">{{ label }}&nbsp;:</label>
        <div :class="{ 'input-box': true, 'input-group': hasSlot }">
            <slot name="input-before"></slot>
            <span v-if="!hasSlot" style="width: 1%;display: table-cell">&nbsp;</span><!-- 占位元素，用于撑开宽度，原因未知 -->
            <span v-if="icon" class="glyphicon form-control-feedback" :class="iconClass" aria-hidden="true"></span>
            <span class="clear-it glyphicon glyphicon-remove-circle" :class="{ 'has-icon': icon, 'hide': disabled || readOnly }" aria-hidden="true" @click="handleClear"></span>
            <div class="info-text" :class="infoTextClass">{{ infoText }}</div>
            <input v-el:input :type="type" class="form-control" :disabled="disabled" :readOnly="readOnly" v-model="value" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur" @change="onChange" @input="onInput" />
        </div>
    </div>
</template>

<style lang="less">
// container
.vc-easyclearinput-component {

    .label-item {
        font-weight: normal;
        margin-right: 5px;
        display: table;
        vertical-align: bottom;
        float: left;
        height: 34px;
        line-height: 34px;
    }

    .glyphicon {
        z-index: 9;
    }

    .input-box {
        display: table;
        position: relative;

        .form-control {
            width: 100%;
        }
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

            &.has-icon {
                right: 28px;
            }
        }
    }

    @success: #87d068;
    @warning: #fa0;
    @error: #f50;
    .info-text {
        position: absolute;
        top: -22px;

        &.with-success {
            color: @success;
        }
        &.with-warning {
            color: @warning;
        }
        &.with-error {
            color: @error;
        }
    }

} // end of container
</style>

<script>
const EVENT_DELAY = 128

export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            twoWay: true,
        },
        label: String,
        placeholder: String,
        infoText: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: '250' 
        },
        icon: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: ''
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
            isClear: false,
            hasSlot: true 
        }
    },
    created: function () {

    },
    ready: function () {
        if (this.autofocus) {
            this.focusInput()
        }
        var keys = Object.keys(this._slotContents)
        this.hasSlot = keys.some((item, index) => {
            return item === 'input-before'
        })
    },
    computed: {
        optionalWidth () {
            if (this.width == null || this.width === '') {
                return null
            }
            if (Number.isInteger(+this.width)) {
                return this.width + 'px'
            }
            return this.width
        },
        statusClass () {
            return 'has-' + this.status
        },
        infoTextClass () {
            return 'with-' + this.status
        },
        iconClass () {
            if (this.status === 'success') {
                return 'glyphicon-ok'
            }
            if (this.status === 'warning') {
                return 'glyphicon-warning-sign'
            }
            if (this.status === 'error') {
                return 'glyphicon-remove'
            }
        }
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
            // 可编辑状态下
            if (!this.disabled && !this.readOnly) {
                this.isClear = true
                this.value = ''
                this.onClear()
                this.focusInput()
            }
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
