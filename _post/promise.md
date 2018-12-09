```yaml
title: Promise的初体验
date: 2016-08-09 23:02:22
tag:
- promise
categories:
- promise
```
#### Promise是什么？
Promise对象在不久的将来可能会是一个代理完整异步操作的值......好吧，英语确实不是很好，原话就是：
> Proxy for a value that may be known in the future after an asynchronous operation completes

在JavaScript的异步处理中，以jQuery为例，通过调用回调函数来处理请求返回的数据或者失败的请求，简单的如下的代码(jQuery):
```javascript
    $.get('url',{data:data},function(json){
        //the things you'll do
    },'JSON');
```

而在Promise这是把上述的操作规范化，按照统一的接口来进行编写。下面是一个简单的例子：
```javascript
    var promise = new Promise(function(resolve,reject){
        //here,you can transfer the callback function resolve & reject to do what you want to do
    });
    promise().then(function(value){
        console.log(value);
    },function(error){
        console.log(error);
    });
```

在上面简单的栗子中，then()中的两个回调函数分别用来处理当请求完成是成功和失败的操作，其中上面的代码，在处理失败的使用可以用catch()来操作，代码如下：
```javascript
    var promise = new Promise(function(resolve,reject){
        //here,you can transfer the callback function resolve & reject to do what you want to do
    });
    promise().then(function(value){
        console.log(value);
    }).catch(function(error){
        console.log(error);
    });
```
catch()就是专门用来处理操作失败时候的函数。

#### Promise的三种状态
在Promise中除了resolve和reject两种调用，即除了fullFilled和rejected两种状态外，还存在一个pending的状态，改状态表示在Promise对象刚被创建初始化后的初始化状态或者其他状态，只要Promise的状态是fullFilled或者rejected，那么就不会返回到pending状态。

#### Promise的简单编写

编写Promise的过程简单可以描述如下
1. 创建Promise(fn)对象
2. 等待fn中的异步处理完成
3. 如果成功，调用resolve(data)函数，其中data为处理成功的返回值
4. 如果失败，调用reject(error)函数

代码示例如下：
```javascript
    function asyncOperation(url){
        return new Promise(function(resolve,reject){
            var req = new XMLHttpRequest();
            req.open('GET',url,true);
            req.onload = function(){
                if(req.status === 200){
                    resolve(req.responseText);
                }else{
                    reject(new Error(req.statusText);
                }
            };
            req.onerror = function(){
                reject(new Error(req.statusText);
            };
            req.send();
         });
    }

    var url = 'youtesturl.com';
    asyncOperation(url).them(function onFullfilled(value){
        console.log(value);
    }).catch(function onRejected(error){
       console.log(error);
    });
```

当然这里使用：
```javascript
    then(function(value){
        //TODO
    },function(error){
        //TODO
    });
```
也是一样的效果。

#### 可能是个小结
深知自己确实比较笨，有些东西不能深刻理解就是不能运用自如，而且感觉自己的思维确实和常规的有些偏差。第一次开始学Promise，不仅是一个新的API，更是一种编程的思想。当然这篇文章也是用vim写的，感觉熟练多了，这两天断网了，还没修好，着实有点难受。
