```yaml
title: 藏在'=='中的秘密
date: 2019-01-14 23:25:03
tags:
- JavaScript
```
复习基础的时候看见一道比较题：
```JavaScript
[]  == ![]
```
赫然发现自己竟然没有好好捋一捋这点基础知识。写代码的时候经常用到`==`，那么这个过程中道理发生了什么，我们先看[规范](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)：

### The Abstract Equality Comparison Algorithm
The comparion x == y,where x and y are values, produces **true** or **false**. Such a comparison is perfomed as follows:
1. If Type(x) is the same as Type(y), then
   - If Type(x) is Undefined, return **true**
   - If Type(x) is Null, return **true**
   - If Type(x) is Number, then
     - If x is **NaN**, return **false**
     - If y is **NaN**, return **false**
     - If x is the same Number value as y, return **true**
     - If x is **+0** and y is **-0**, return **true**
     - If x is **-0** and y is **+0**, return **true**
     - Return **false**
   - If Type(x) is String, then return **true** if x and y are exactly the same sequence of characters (same length and same characters in corresponding positons). Otherwise, return **false**
   - If Type(x) is **Boolean**, return **true** if x and y are both **true** or both **false**. Otherwise, return **false**
   - Return **true** if x and y refer to the same object. Otherwise, return **false**
2. If x is **null** and y is **undefined**, return **true**
3. If x is **undefined** and y is **null**, return **true**
4. If Type(x) is Number and Type(y) is String, return the result of the comparison `x == ToNumber(y)`
5. If Type(x) is String and Type(y) is Number, return the result of the comparison `ToNumber(x) == y`
6. If Type(x) is Boolean, return the result of the comparison to `ToNumber(x) == y`
7. If Type(y) is Boolean, return the result of the comparison `x == ToNumber(y)`
8. If Type(x) is either String or Number and Type(y) is Object, return the result of the comparison `x == ToPrimitive(y)`
9. If Type(x) is Object and Type(y) is either String or Number, return the result of the comparison `ToPrimitive(x) == y`
10. Return **false**

然后我们再看一个东西，[JavaScript运算符优先权](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)。

结合以上所有，我们开始比较`[] == ![]`:

1. 在JavaScript中，只有`"", null, undefined, 0, false, NaN`这几个值是false，同时JavaScript元算符`!`的优先权高于`==`，所有`[] == ![]`，相当于`[] == false`
2. 这个时候可以对应规范第7条，那么`[] ==false`，就相当于`[] == 0`
3. 那么这个时候就对应规范第9条，那么`'' == 0`
4. 这个对应规范第5条`Number('') == 0`，即`0 == 0`

所以`[] == ![]`的比较结果为`true`。