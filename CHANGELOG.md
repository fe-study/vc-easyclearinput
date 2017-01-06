<h1 align="center">vc-easyclearinput - @changelog</h1>

## 0.4.0

`2017-01-06`

- 新增默认slot
- 想要使用bootstrap addon class，必须使用具名slot来获得正确的输入框圆角处理

## 0.3.3

` 2016-10-21`

- 小清除按钮只有在 `value` 有值时才hover出现

## 0.3.2

`2016-10-09`

- es6化，去除 `name`

## 0.3.1

`2016-09-09`

- 新增 `textarea` type类型，支持textarea

## 0.3.0

`2016-08-29`

- 去除 `@input`, `@change` 等预埋在模板里的事件，直接在自定义组件上使用
- `onFocus`, `onBlur` 等已经被hack的事件还需使用回调传递进来
  - 外界直接使用会被内部覆盖
  - 组件会检测外界是否以 `@focus`, `@blur` 的形式传入了事件，如果是, 给出warn并提示使用 `相应的props回调`
- update demo

## 0.2.0 `tag - v0.2.0`

`2016-08-26`

- 新增 `width`, `disabled`, `readOnly`, `icon`, `status`, `infoText` 等
- 设置默认宽度为`220px`
- 确定不增加value校验功能，交给父组件或专业的第三方插件
- 更新demo

## 0.1.2

`2016-08-24`

- 修正 `autofocus` 功能

## 0.0.9 `prerelease`

`2016-08-18`

- 重构 增加`type`, `autofocus` 属性 增加或重命名 `onBlur`, `onFocus`, `onChange`, `onInput`, `onClear` 等回调`props`
- 修正事件系统，让小叉号控件和input一同成为"原生"控件，修正事件执行顺序，时机 
- 小叉号点击不应该让input失焦，也不应该触发相应回调

## 0.0.2

`2016-07-28`

- 增加 `blur`, `clear` 等callback

## 0.0.1

`2016-07-28`

- init

