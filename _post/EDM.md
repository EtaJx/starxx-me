```yaml
title: 记录一次EDM编码
date: 2016-09-29 16:18:13
tags: 
- EDM
- rule
```
看[《你不知道的JavaScript》](https://github.com/getify/You-Dont-Know-JS)的时候，作者老是重复一句话：知其然还要知其所以然，所以我们先看看EDM是啥？
> EDM,Email Direct Marketing的缩写，翻译过来就是电子邮件营销，是一种利用电子邮件为其传递商业活着募款消息到其听众的直销形式。就广义来说，每封电子邮件发送到潜在活着现行客户都可视为电子邮件营销。——摘自维基百科

更专业一点的叫法叫做HTML Email，虽然也是html，但是在我们用浏览器上使用的html是不同的，不仅是在安全问题上，在标签的使用以及内容的处理上都有差异。营销邮件不外乎有很多敏感词汇，比如：发票、发财、商机、支付什么的，同时如果这封邮件不请自来，那么邮件的服务器设置都会以为这是垃圾邮件然后过滤掉，借用一篇文章里面的一句话，
> EDM可能让你感觉很困难，非常难搞。

这里有一个拓展阅读，[怎么样才能让自己服务器发出的邮件不被 Gmail、Hotmail、163、QQ 等邮箱放入垃圾箱？](https://www.zhihu.com/question/19574247)，博大精深，反正我是没怎么看懂。一开始觉得EDM，很快嘛，分分钟弄好，现在看来，好像真的有点难搞。我上一次第一次做的那个EDM就是一个反面教材。下面就综合一下我所了解到的东西。

#### Doctype
既然是html，就得声明文档类型，在HTML Email中，需要再html模版中声明文档类型，来通知邮件客户端来读这一段html模版的代码。但是有些客户端会删掉你写的客户端来换上自己的，从目前收集到的信息来看，兼容性最好的还是XHTML 1.0 transitional，总之不要使用使用html5的文档类型声明
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>HTML Email编写指南</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
</html>
```
同时也就意味着不能使用HTML5语法。

#### 布局
HTML Email是无法支持W3C标准的，在解析`div`、`section` or `article` 等标签的时候各个客户端是不一样的，代替它们的方法就是使用`table`，但是同时`table`中不支持`colspan`和`rowspan`属性，其中table一定要写的几个属性又`cellpadding`、`cellspacing`、`border`，不同的客户端对着几个解析是不同的，所以我们要设定自己的值，也可能会发生table嵌套多个table的情况，不要慌，这是正常的。我们经常使用`h1`、`h2`、`h3` or `p`等，都不建议使用，不然会产生大麻烦（虽然我也不知道什么麻烦，可能就是在邮件客户端渲染时会发生问题），再HTML Email里面几乎只有`table` `tr` `td` `span` `img` `a`这几个标签。（这个说法我也不确定，但是在EDM里面能使用的标签是少之又少）

#### 样式
几乎再所有编写EDM的建议中都有这么一条：
> 务必最好的方式是使用內联样式

不要放在头部，因为一些邮件客户端很可能读html的时候会把body甚至table以外的内容删掉，那么写在头部的样式自然就没有了，同时再书写css的时候，不要采用简写模式，有些客户端不支持（什么奇葩的客户端🙄）。
```html
    /*如果想表达*/
    <p style="margin:1em 0;"></p>
    /*得写成*/
    <p style="margin-top:1em;margin-bottom:1em;margin-left:0;margin-right:0;"></p>
    /*连颜色也不能简写，如#999，得写成下面这种完成的*/
    <p style="color:#999999;"></p>
```

继承虽然再EDM还能使用，但是还是尽量不要使用，因为多数的邮件的客户端都有自己的一套规则。

#### 图片
图片是唯一能引用的外部资源，但是有一些邮件客户端再接收非通讯录里面的联系人邮件时，会自动将图片屏蔽掉，所以alt，width，height这三个属性是不能少的，方便在被屏蔽时显示内容以及撑开排版，另外还有两条建议
- 把仅包含图片的td的`line-height`设置为0，以防止产生间隙，据说在图片并列的时候尤为明显（这里就是没有实践的装逼了，具体情况我也没遇到过）；
- 一些邮件客户端会默认为图片加上边框，所以要把border设置为0；
- 切图的时候不要直接把整个psd切成图片导出（上回我做的反面教材就是这里，直接全部图片），这样有可能让有些客户端直接认定为垃圾邮件（😑）
- 控制大小，据说标准是不超过250kb，太大的话加载时间过长会直接导致加载失败

#### 小结
以上这些就是在制作EDM中要注意的事情，但是看到的一些资料比较老，都是13年较多，也有15年的，web的发展是飞快的，可能现在邮箱客户端开放了一些限制，但是还是遵守规则来制作比较好，不然被过滤为垃圾邮件就比较尴尬了。

#### 相关阅读
[邮件客户端CSS支持查询](https://www.campaignmonitor.com/css/)
[HTML Email 编写指南——阮一峰](http://www.ruanyifeng.com/blog/2013/06/html_email.html)（大师有个地方写错了🙂）
[推荐的DOCTYPE声明列表](https://www.w3.org/QA/2002/04/valid-dtd-list.html)



