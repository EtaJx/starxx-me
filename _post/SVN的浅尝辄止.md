```yaml
title: SVN的浅尝辄止
date: 2016-03-15 21:43:58
tags:
- SVN
categories:
- SVN
```

#### SVN的创建以及合并分支（windows命令行(ಥ _ ಥ)）


* 合并总是在工作副本中进行的。如果想要合并修改到分支，必须检出该分支的工作副本，并且从这个工作副本使用TortoiseSVN-merge来调用合并导向

* 在没有修改的工作副本上执行合并是一个好想法。如果在工作副本上做了修改，先提交。如果合并没有如期的执行，可能需要测小这些修改，用还原会丢弃包含在执行合并之前的所有修改

* 分支的创建
`Svn copy http://example.com/repos/myproject/trunk  http://example.com/repos/myproject/branches/releaseForAug -m 'create branch for release on now'`为myproject创建了一个分支叫做releaseForAug，使用-m来加入描述信息，之后可以通过`svn checkout http://example.com/repos/myproject/releaseForAug`来迁出你的branche源文件。在上面进行修改和提交

* 合并
1. 保证当前branch分支是clean的，即使用svn status看不到任何的本地修改
2. 命令行下切换到Trunk目录中，使用`Svn merge http://example.com/repos/myproject/branches/releaseForAug`来讲Branch分支上的改动merge回Trunk下
3. 如果出现merge冲突则进行解决，然后执行`Svn ci -m 'description'来提交变动`

* 在merge的时候也可以指定分支上的哪些变更可以合并到Trunk中，命令如下`svn merge http://example.com/repos/myproject/branches/releaseForAug -r150:HEAD`表示将分支的版本从150到当前版本的所有搞懂合并到trunk中

* 查看当前branch和trunk的合并情况，可以使用 `svn mergeinfo branchUrl` 来查看merge情况
* 目前就这些吧

