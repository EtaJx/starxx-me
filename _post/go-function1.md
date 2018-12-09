```yaml
title: go函数(2)
date: 2018-09-14 00:46:39
tags:
- GO
categories:
- GO
```

### defer

关键词`defer`允许我们推迟函数返回值（或任意位置执行return语句之后）一刻才执行某个语句或函数，简单的理解一下就是在函数执行完的前一刻执行`defer`位置的函数

```go
package main
import "fmt"

func main() {
	function1()
}

func function1() {
	fmt.Printf("In function1 at the top \n")
	defer function2()
	fmt.Printf("In function1 at the bottom \n")
}

func function2() {
	fmt.Printf("Function2: Deferred until the end of the calling function!")
}
```

以上代码将会打印：

```bash
In function1 at the top
In function1 at the bottom
Function2: Deferred until the end of the calling function!%
```

***当有多个`defer`行为被注册时，它们会以逆序执行。（类似栈，先进后出）***

### 使用`defer`语句实现代码追踪

一个基础但十分有用的实现代码执行追踪的方案就是在进入和离开某个函数打印相关的消息。

```go
package main
import "fmt"

func trace(s string) {
  fmt.Println("entering:", s)
}
func untrace(s string) {
  fmt.Println("leaving:", s)
}

func a() {
  trace("a")
  defer untrace("a") // 离开函数时，untrace
  fmt.Println("in a")
}

func b() {
  trace("b") // 进入函数b开始追踪
  defer untrace("b") // 离开函数时，untrace
  fmt.Println("in b")
  a()
}
func main() {
  b()
}
```

### 递归函数

当一个函数在其函数体内屌用自身，则称之为递归。

计算斐波那契数列，即前两个数为1，从第三个数开始每个数均为前两个数之和。

```go
package main
import "fmt"
func main() {
  result := 0
  for i:=0; i<=10; i++ {
    result = fibonacci(i)
    fmt.Printf("finonacci(%d) is : %d\n", i, result)
  }
}

func fibonacci(n int) (res int) {
  if n <= 1{
    res = 1
  } else {
    res = fibonacci(n-1) + fibonacci(n-2)
  }
  return
}
```

快速排序算法也能用递归来优雅的解决

### 闭包

（区别JavaScript的闭包），Go语言中的闭包即为匿名函数。如`func(x, y int) int { return x + y }`。

匿名函数不能都独立存在，但是可被赋值于某个变量，然后用过变量名对函数进行调用。

可以直接对匿名函数进行调用：

```go
func(x, y init) init {
  return x + y
}(3, 4)
```

查看一下函数：

```go
func() {
  sum := 0
  for i := 1; i <= 1e6; i++ {
    sum += 1
  }
}()
```

函数的的第一对`()`必须紧跟挨着关键字`func`，因为匿名函数没有名称。花括号`{}`涵盖函数体，最后一对括号表示对该匿名函数的调用。

定义：匿名函数即闭包：它们被允许调用定义在其他环境下的变量。闭包可以使得某个函数捕捉到一些外部状态。从另一方面来说：一个闭包继承了函数所声明时的作用于。这种状态（作用域内的变量）都被共享到闭包的环境中，因此这些变量可以在闭包中被操作，直到被销毁。