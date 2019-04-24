```yaml
title: smarty
date: 2016-03-10 22:18:48
tags:
- smarty
categories:
- smarty
```

#### smarty的进阶之路（可能会用到的更完了(●˘◡˘●)）

- smarty中的定界符恰好也是{}，在JavaScript中也是，所以在smarty中{}两边是空格的时候，将会被自动忽略解析，这种特性可以通过设置smarty的$auto_literal为false来关闭
- {literal}…{/literal}可以让中间的内容忽略smarty的解析
- 必须使用双引号才能正常使用变量，单引号是不行的，如果在变量中存在 .则必须将该变量在双引号中庸单引号括起来
- 页面的请求变量，例如$_GET,$POST,$_COOKIE,$_SERVER,$_ENV,$_SESSION等可以通过
比如通过get方法请求地址为`http://www.examole.com/index/?page=1`,$smarty.get.page其他同理:
>$smarty.post.page,
$smarty.cookies.username
$smarty.server.SERVER_NAME
$smarty.env.PATH
$smarty.session.id
$smarty.request.username
- $smarty.now 当前的时间戳，从1970年1月1日计算到当前的秒数可以使用$smarty.now|date_format'%Y-%m-%d %H:%M:%S'来格式化显示
> $smarty.template返回当前的模板名称（不带目录名）;
> $smarty.block.child 返回子模版提供的区块代码;
> $smarty.block.parent 返回父模板提供的区块代码;

- 变量修饰符
> 用于变量，自定义函数或者字符串，使用的时候需要在变量后面加上|(竖线)并跟着修饰符名称
Smarty3存在的默认行为，在smarty2.X的版本中，需要在数组后加上@标识符来使用修饰器，例如{$articleTitle|@count}，smarty3则不再需要使用@，它会被忽略

- 学习到一个新的姿势啊，关于github，一个远程仓库上，如果直接clone，会拉去所有的commit，但是有可能我们并不需要，所以在拉取的时候可以添加 `--depth=1`，其中1表示最近一次的提交，即拉取最近的一次即可~

* 接着上面的

* |count_characters计算变量内容有多少个字符
* |default为变量设置默认值，当变量是unset或者empty的字符串时，默认值将显示。必须有一个参数
`{$articleTitle|default:'no title'}`

* 输出
`no title`

* |indent 缩进每一行的字符串，默认是缩进四个空格，参数可设置缩进的空格数量，第二个可选参数设置缩进使用的字符，例如使用'\t'来代替空格缩进
`{$articleTitle|indent:1:"\t"}`


* 原来{ $var=…}是{assign}函数的缩写，可以在模版内对变量进行赋值
属性:
> scope 作用范围可以是：'parent','root','global'
>nocache:对复制操作不进行缓存

* {append}可以在运行时为数组变量增加或者创建值。
属性：
> var 赋值的变量名称
> value 赋予的值
> index 数组元素的新索引，如果没有此参数，则附加的值会加到数组最后
> Scope 赋值变量的访问范围 'parent','root','global'

* {assign}在调用的模版内的作用范围，在包含的模版内赋值的变量，在包含模版内可见

* {block}可以在模板上定义一块区域进行模板继承。子模版中的{block}区域代码，将会替换父模板对应的区域代码。
* 这里不是很明白：另外，{block}可以设置车合并父子模板的相应区域。在子模版的{block}中定义append或prepend，可以使子模版附加在父模板{block}区域的后面或前面

* 在{block}内容中使用{$smarty.block.parent}，可以让父模板的区域代码放到子模版{block}内的任意位置

* {blocks}可以嵌套使用
> 属性：name（模板区域的名称）
> 可选属性：append，prepend，hide，nocache

* {call}可以调用一个通过{function}标签来定义的模板函数，如同调用插件函数一样。
> Note:模板函数是全局定义的。因为Smarty编译器是一个单次的编译器，所以{call}标签调用的函数，无比定义在当前模板之外的位置。或者可以直接通过{funcname ….}的方式来使用该函数。
{call}必须设置name属性，标识要调用的模板函数的名称。
可以按照属性的方式来给函数传递参数。
属性：
> name 模板函数的名称
> assign 将函数的返回内容赋值到指定变量
> [var …]传递给模板函数的默认参数

* {capture}：可以捕获标记范围内的输出内容，存到变量中而不现显示。
在{capture name='foo'}{/capture}之间的内容会被捕获到变量，变量名可以通过name属性来指定，然后拿出来显示。

* {extends}，模板继承中，你可以在子模版内使用{extends}标签来扩展父模板。
{extends}必须放在模板的第一行。
如果子模版都需要{extends}来扩展父模板，那么它只能有{block}的区域，任何其他的模板内容都会被忽略。

* for指定步长的循环
属性： max 循环的次数

`<ul>
{for $foo=1 to 3}
	<li>{$foo}</li>
{/for>
</ul>`

* {foreach}{/foreach}
属性：@index,@iteration,@first,@last,@show,@total
语法命令：{break},{continue}
代替指定key变量，通过{$item@key}来使用循环的当前key。
其中@index为当前数组索引，从0开始计算
@iteration是当前循环的次数，从1开始计数，可以使用 is div by,is even/odd by来做一些特殊的判断

* show属性是在{foreach}循环执行之后，检测循环是是否显示数据的判断,show是一个布尔值.

	```php
	{function}
	{function name=menu level=0}
	{function menu level=0}
		<ul class="level{$level}">
			{foreach $data as $entry}
				{if is_array($entry)}
					<li>{$entry@key}</li>
					{menu data=$entry level=$level+1}
				{else}
					<li>{$entry}</li>
				{/if}
			{/foreach}
		</ul>
	{/function}
	```

* 调用函数{menu data=$menu}

* {if}{elseif}{/if}空变量的处理：使用默认值来代替空变量，使用default修饰器来处理

* 看完这排版，我倒吸一口凉气，怎么这么烂，markdown自以为回了其实还没仔仔细细看的看过，这里也是今后的一个学习点。




