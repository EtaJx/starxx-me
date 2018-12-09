```yaml
title: Go基础
date: 2018-07-02 22:36:43
tags:
- Go
- 基础
categories:
- Go
```

### 前言

初探Go，做一些感觉比较重要的笔记，可能不会很深入，但至少会有一个概念。

### Go的runtime

Go编译器产生的是本地可执行代码，但是这些代码仍然运行在Go的runtime（可在package runtime中找到）。这个runtime类似Java和.NET的虚拟机，它主要负责***管理包括内存分配、垃圾回收、栈处理、goroutine、channel、切片(slice，这里嘀咕一句：类比JavaScript的数组？)、map和反射(reflection)等等***。总的来说`Go的runtime`是调度器和GC。

（以下内容一知半解，先做好笔记）

#### Scheduler(调度器)

Go牛逼，语言级别实现了并发，原因就在于Go有自己的scheduler。

> 现在都有自己的信号掩码，context上下文环境以及何种控制信息等，但是Go程序本身并不context上下文切换的耗时费时费力费资源，更重要的原因是GC(垃圾回收机制)。Go的垃圾回收需要`stop the world`，所有的`goroutine`停止，才能使得内存保持在一个一直的状态。垃圾回收的时间会根据内存情况变化是不确定的，如果没有自己scheduler而是交给OS的scheduler，那么我们就会失去控制，并且会有大量的线程需要停止工作。所有Go需要自己大度的开发一个自己使用的调度器，能够自己管理goruntines，并且知道在什么时候内存状态是一致的，也就是说，对于OS而言运行时只需要为当时正在CPU核上运行的那个线程等待即可，而不是等待所有的线程。

#### 垃圾回收器

Go拥有最简单却高效的***标记-清除回收器***(没记错的话，JavaScript也是使用的***标记清除算法***)，不做过多介绍，一句带过。

### 疑惑解答

- 经常看`goroutine`、`线程`、`进程`。学习Go初期始终不知道`goroutine`是个啥，同时作为一个前端开发人员对于`线程`、`进程`更是一知半解，那么，Google一下吧。

关于回答，找到一篇阮老师写的很浅显易懂的文章[进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)，简单总结一下个人理解：

1. 一个CPU在同一时间只能处理一个任务，即只有一个进程 

   > 是具有一定独立功能的程序、它是系统进行资源分配和调度的一个独立单位，重点在系统调度和单独的单位，也就是说进程是可以独 立运行的一段程序。

2. 一进程里面会包含多个线程，来完成这个进程

   > 线程进程的一个实体，是CPU调度和分派的基本单位，他是比进程更小的能独立运行的基本单位，线程自己基本上不拥有系统资源。

那么`goruntine`是什么？简单来说就是Go的协程，那么协程又是什么？这里引用一段话：

> 对于 **协程**(用户级线程)，这是对内核透明的，也就是系统并不知道有协程的存在，是完全由用户自己的程序进行调度的，因为是由用户程序自己控制，那么就很难像抢占式调度那样做到强制的 CPU 控制权切换到其他进程/线程，通常只能进行 **协作式调度**，需要协程自己主动把控制权转让出去之后，其他协程才能被执行到。

但是`goruntine`又不一样，golang语言作者Rob Pike说过，“***Goroutine是一个与其他goroutines 并发运行在同一地址空间的Go函数或方法。一个运行的程序由一个或更多个goroutine组成。它与线程、协程、进程等不同。它是一个goroutine***“。

> Golang 在 runtime、系统调用等多方面对 goroutine 调度进行了封装和处理，也就是Golang 有自己的调度器，工作方式基本上是协作式，而不是抢占式，但也不是完全的协作式调度，例如在系统调用的函数入口处会有抢占。当遇到长时间执行或者进行系统调用时，会主动把当前 goroutine 的CPU (P) 转让出去，让其他 goroutine 能被调度并执行，也就是我们为什么说 Golang 从语言层面支持了协程。**简单的说就是golang自己实现了协程并叫做goruntine**。

### 后记

虽然有一些理论暂时无法理解，但是至少建立了一个概念。以后遇到相关的东西可以往这方面思考。

### 参考文献

- [进程、线程、协程与goruntine](https://zhuanlan.zhihu.com/p/27245377)
- [Golang 之协程详解](https://www.cnblogs.com/liang1101/p/7285955.html)
- [进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)
- [进程和线程有什么区别？]( https://www.zhihu.com/question/21535820/answer/22915780)
- [golang的垃圾回收（GC）机制](https://studygolang.com/articles/9004)
- [Go入门指南](https://github.com/Unknwon/the-way-to-go_ZH_CN)