```yaml
title: BEM
date: 2016-09-13 23:04:18
tags:
- BEM
```
#### 前话
拖延症简直太可怕了！！！这篇迟来的质量还不怎么好的翻译应该还会陆续修改。说说这大半个月的时间在干啥？修改了一个项目的小图标，改得我心力交瘁，其中还出了一些低级错误，实在是心态差点就放不正了。然后去参加了南京的JS.JSconf开发大会，收获也很多，但是和想象中的略有出入。后面会写一篇文章来说一下这次大会。然后就是这篇翻译，这篇翻译来自BEM的官方的文档，快速开始。BEM命名法来自俄罗斯的一个搜索网站，具体的可以google一下，我就不赘述了。内容比较简单，我的渣英语勉强应付得来，有些不知道怎么翻译的词和句我都直接写的原文，相信能意会的。其中可能还有不少错误，后面会陆续修正或者添加内容。（css代码无法高亮我也是醉了😑）

每个web开发者都会遇到相同的问题：
* How to reuse codebase?
* How to avoid copy/paste?
* How to reduce comlexity and simplify refactoring?
* How to get self-documented code?

> JUST USE BEM

#### 简介
BEM(Block,Element,Modifier)对与web开发来说一个组件化的方法。这个想法的背后是为了把用户界面划分到独立的块中。这样的话，就算是复杂的UI也能够简单快速的开发，并且能够不通过复制粘贴来复用代码。

#### Block
一个功能性独立页面组建能够被服用。在HTML里面，blocks通常相当于那些带有`class`属性的元素。

特性：
* `block`的名字是描述它的用途（“这是什么？”——`menu` or `button`），而不是它的状态（“它看起来是什么样子？”——`red` or `big`）。

举例
```javascript
<!-- Correct. the 'error' block is semantically meaningful -->
<div class="error"></div>

<!-- Incorrect. It describes the appearance -->
<div class="res-text"></div>
```

* block不应该影响它的环境，意味着你不应该为这个block设置额外的(geometry)`padding`，影响尺寸的边界或者位置属性。
* 当你使用BEM的时候也不能用CSS 标签或者ID选择器

以上的这些保证使得那些独立的block能够到处复用。

##### blocks使用指南
* 层叠嵌套(Nesting)
1. Blocks能够互相层叠嵌套
2. 你能够层叠嵌套任意层级

举例：
```css
<!-- 'header' block -->
<header class="header">
<!-- Nested 'logo' block -->
<div class="logo"></div>

<!-- nested 'search-form' block -->
<form class="search-form"></form>
</header>
```

#### Element
一个不能够分离出来的用来拼凑block的部分。
特性：
* element的名字描述它的用途（“这是什么”——`item` , `text` , etc.)，而不是它的状态（“这是什么类型？或者这看起来是什么样子？”——`red`,`big`,etc）。
* 一个`Element`的全称的结构是`block-name__element-name`。element的名字应该是从block的名字分离开来，并用双下划线(`__`)隔开。

举例：
```less
<!-- 'search-form` block-->
<form class="cearch-form">
    <!-- 'input' element in the 'search-form' block -->
    <input class="search-form__input">

    <!-- 'button' element in the 'search-form' block -->
    <button class="search-form__button">Search</button>
</form>
```

##### elements使用指南
* 层叠嵌套（nesting)
1. element能够互相层叠嵌套。
2. 能够层叠嵌套任意的层级。
3. 一个element总会是一个block的部分，而不可能是另外一个element的一部分。也就是说，element的名字不能用像`block_elem1_elem2`一个一个嵌套等级来命名。

举例：
```less
<!-- correct. The structure of the full element name follows the pattern:'block-name__element-name' -->
<form class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">

        <button class="search-form-button"></button>
    </div>
</form>

<!-- incorrect. the structure of the full element name doesn't follow the pattern:'block-name_element-name' -->
<form class="search-form">
    <div class="search-form__content">
        <!-- recommended:'search-form__imput' or 'search-form__content-input' -->
        <input class="search-form__content-input">

        <!-- recommended:'search-form__button' or 'search-form__content-input' -->
        <button class="search-form__content__button></button>
    </div>
</form>
```

block名字定义了命名空间，这个命名空间保证elements有依赖（`block_elem`）。
一个block能够又一个层叠嵌套的element结构的dom树：
```less
<div class="block">
    <div class="block_elem1"></div>
    <div class="block_elem2"></div>
    <div class="block_elem3"></div>
</div>
```
无论如何，在BEM方法里面，block的结构总是表现为一个平坦的element列表。
```less
.block{}
.block__elem1{}
.block__elem2{}
.block__elem3{}
```
这样能够使你在不用改变每个单独的element的代码的情况下改变block的dom结构。
```less
<div class="block">
    <div class="block__elem1"></div>
    <div class="block__elem2"></div>
</div>

<div class="block">
    <div class="block__elem3"></div>
</div>
```
就算blocks 的结构改变，但是对于elements的作用规则和命名仍然是一样的。

##### 关联(membership)
一个Element总是一个Block的一部分，并且你不能在该Block之外单独使用它。
```less
<!-- correct. elements are located inside the 'search-form' block -->
<!-- 'search-form' block -->
<form class="search-form">
    <!-- 'input' selement in the 'search-form' block -->
    <input class="search-form___input">

    <!-- 'button' element in the 'search-form' block -->
    <button class="search-form__button">search</button>
</form>

<!-- incorrect. elements are located outsde of the context of the 'search-form' block -->
<!-- 'search-form' block -->
<form class="search-form"></form>

<!-- 'input' element in the 'search-form' block -->
<input class="search-form_input">

<!-- 'button' element in the 'search-form' block -->
<button class="search-form__button">search</button>
```

##### Optionality
一个element是一个可选的块组件。并不是所有的blocks都拥有elements。
```less
<!-- 'search-form' block -->
<div class="search-form>
    <!-- 'input' block -->
    <input class="input">

    <!-- 'button' block -->
    <button class="button">search</button>
</div>
```

#### 我应该创建一个block或者element吗？
1. 如果一节代码将会被复用，并且不依赖于其他页面组件运行，那么你就应该创建一个block
2. 如果一节代码在没有parent entity的情况下不能被单独拿出来使用，那么通常情况下应该创建一个element

例外的情况就是elements必须拆分成更小的部分，子元素，以便更简明的开发。在BEM命名法里面，你不能够创建elemets的elements。在这种情况下，代替创建一个elements的更高方法就是创建一个service block。

#### 修饰器（Modifier）
一个用来定义block or element的是appearance，状态或者动作的实体（entity）。
特性：
* 修饰器的名字用来描述它的appearance（“尺寸是什么？”或者“是哪个主题？”等等——`size_s` or `theme_islands`），它的状态（“它为什么与其它的不同？”——`disabled`,`focused`,etc.）或者它的动作（“它的表现是什么？”或者“它是怎么样来相应用户的？”——比如`directions_left-top`）。
* 修饰器的名字使用下划线`_`来区分于block和element。

##### 修饰器的类型
Boolean
* 只有当the presence or absence of the modifier is important,并且它的值是无关紧要的时候才使用，比如`disabled`。如果一个布尔修饰器是存在的，并且假设它的值是`true`。
* 修饰器的全称的结构如下所示：
1. `block-name_modifier-name`
2. `block-name__element-name_modifier-name`

```less
<!-- The 'search-form' block has the 'focused' boolean modifier -->
<form class="search-form search-form_focused">
    <input class="search-form__input">

    <!-- the 'button' element has the 'disabled' boolean modifer -->
    <button class="search-form__button search-form__button_disabled">Search</button>
</form>
```

键值对
＊ 当修饰器的值是重要的时候使用，比如“一个带有`islands`设计主题的菜单“：`menu_theme_islands`
* 修饰器名字的全称结构如下所示：
1. `block-name_modifier-name_modifier-value`
2. `block-name__element-name-modifier-name_modifier-value`

```less
<!-- the 'search-form' block has the 'theme' modifier with the value 'islands' -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- the 'button' element has the 'size' modifier with the value 'm' -->
    <button class="search-form__button search-form__button-size_m">Search</button>
</form>

<!-- you cant use two identical modifiers with different values simultaneously -->
<form class="search-form search-form_theme_islands search-form_theme_lite">
    <input class="search-form__input">
    <button class="search-form__button search-form__button_size_s search-form__button_size_m">Search</button>
</form>
```

#### 附录
文章来源：https://en.bem.info/methodology/quick-start/