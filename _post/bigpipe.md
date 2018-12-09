```yaml
title: bigpipe
date: 2017-04-01 15:51:30
tags:
- bigpipe
```

#### bigpipe原理小记

In the traditional model, the life cycle of a user request is the following:

- Browser sends an HTTP request to web server.
- Web server parses the request, pulls data from storage tier then formulates an HTML document and sends it to the client in an HTTP response. 
- HTTP response is transferred over the Internet to browser. 
- Browser parses the response from web server, constructs a DOM tree representation of the HTML document, and downloads CSS and JavaScript resources referenced by the document. 
- After downloading CSS resources, browser parses them and applies them to the DOM tree.
- After downloading JavaScript resources, browser parses and executes them.

在传统的模式中，一个用户请求的生命周期如下：

- 浏览器向服务器发送一个请求
- 服务器解析请求，从数据层拉取数据然后构建HTML文档，然后在响应中返回这个文档
- HTTP响应通过互联网向浏览器传输。
- 浏览器解析从服务器得到的响应，构建一个描述HTML文档的DOM树，然后从文档中的引用中下载css和JavaScript资源
- 下载完css后，浏览器解析css并应用到DOM树上
- 下载完成JavaScript后，浏览器解析JavaScript并执行它们

Just as a [pipelining microprocessor](https://en.wikipedia.org/wiki/Instruction_pipelining) divides an instruction’s life cycle into multiple stages (such as “instruction fetch”, “instruction decode”, “execution”, “register write back” etc.), BigPipe breaks the page generation process into several stages:

Request parsing: web server parses and sanity checks the HTTP request. 
Data fetching: web server fetches data from storage tier.
Markup generation: web server generates HTML markup for the response. 
Network transport: the response is transferred from web server to browser.
CSS downloading: browser downloads CSS required by the page.
DOM tree construction and CSS styling: browser constructs DOM tree of the document, and then applies CSS rules on it. 
JavaScript downloading: browser downloads JavaScript resources referenced by the page.
JavaScript execution: browser executes JavaScript code of the page.

就像一个[流水线微处理器](https://en.wikipedia.org/wiki/Instruction_pipelining)一样，将一个指令的生命周期分成几个状态（比如指令的fetch，指令的decode，执行，注册回写（register write back）等等），bigpipe就将页面的生成过程分成几个状态：

- Request parsing：服务器解析并全面检查HTTP请求
- Data fetching: 服务器从数据层抓取数据
- Markup generation: 服务器为响应生成HTML标记
- Network transport：服务器向浏览器传输响应内容
- CSS downloading：浏览器下载页面需要的CSS
- DOM tree construction add css styling: 浏览器构建文档的DOM树，然后应用CSS规则
- JavaScript downloading：浏览器下载页面引用的JavaScript 资源
- JavaScript execution：浏览器执行页面的JavaScript 代码。

以上内容摘抄自[BigPipe: Pipelining web pages for high performance](https://www.facebook.com/notes/facebook-engineering/bigpipe-pipelining-web-pages-for-high-performance/389414033919/)，然后下面我自己翻译的。这里做个记录，算一个知识点，具体实现的话，各个语言基本都能实现。在NODEJS的实现中，个人的理解为：以前使用AJAX请求数据渲染模板，分为：全部（或者大部分）模板一次请求完成，然后请求接口获取数据，最后拼接HTML字符串进行渲染，bigpipe的话，模板部分分成了小块，最开始的请求当中只返回模板的一个简单的骨架，然后在后端获取该小块的数据后，使用`response.write`（简单实现的话）返回一段JavaScript代码来加载已经完成数据请求的模板。