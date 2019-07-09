```yaml
title: 算法基础之大O表示法
date: 2019-7-3 12:18:21
```

### 什么是算法？

> 编写一段计算机程序一般都是实现一种已有的`方法`来解决某个问题。这种方法大多和使用的编程语言无关——它适用于各种计算机以及编程语言。是这种方法而非计算机程序本身描述了解决问题的步骤。我们用`算法`这个词来描述一种有限、确定、有效的并适合用计算机程序来实现的解决问题的方法。

### 大O表示法是什么？

量化线性查找效率的更准确的方式应该是：**对于具有N个元素的数组，线性查找最多需要N步。**

> **大O符号**，又称为渐进符号，是用于描述函数渐近行为的数学符号。更确切地说，他是用另一个（通常更简单的）函数来描述一个函数数量级的渐近上界。在计算机科学中，它在分析算法复杂性的方面非常有用 。——摘自[维基百科](https://zh.wikipedia.org/wiki/大O符号)


简单来说，大O表示法是一种特殊的表示法，指出了算法的速度有多快。例如，假设列表含有n个元素。简单查找需要检查每个元素，因此需要执行n次操作。使用大O表示法，这个运行时间O(n)。但是实际上大O表示法指的并非以秒为单位的速度。**大O表示法让你能够比较操作数，它指出了算法运行时间的增速**。简单了来说就是执行这个算法，需要进行多少次的操作。

通常大O表示法描述的在最糟糕情况下的运行时间。比如在一本电话簿中查找某人的电话。最好的情况，是在第一次寻找的时候就能找到，但是最坏的情况，你需要查找电话簿中每一条电话才能找到，这个时候，对应的运行时间则为O(n)。

一些常见的大O运行时间

- O(log n)，对数时间，算法包括二分算法
- O(n)，线性时间，包括简单查找
- O(n * log n)，快排
- O(n2)，选择排序
- O(n!)

**解释O(log n)**：当说到O(log n)时，实际指的是O(log2 N)，简单可以解释为N除以多少次2才能得到1

### 简单举例🌰

```javascript
const a = [1, 2, 3, 4];
for(let i = 0; i < a.length; i++){
    console.log(a[i]);
}
```
如何用大O表示法来表述上面代码的效率呢？上面代码的核心问题打印数组`a`中的每个元素，算法是在`for`使用`console`，整个`for`循环会走4步，那么这个算法的效率就为O(4)（常数时间）
