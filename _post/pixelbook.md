```yaml
title: Google Pixelbook 2017折腾小记
date: 2018-05-07 03:14:05
tags:
- pixelbook
- chromebook
- Google
categories:
- Google Pixelbook
```
刚入手了一台Google pixelbook，折腾了两天，总算弄好了。这里做一下总结，以防忘记。

#### 序
之前一不小心看到了google出品的chromebook，顿时无法自拔，这或许就是信仰的力量，随后淘了一个二手的chromebook pixel 2013，但是由于缺乏经验，到手之后才发现是企业邦定机，根本无法开启开发者模式，网上搜索一番发现可以通过拆机，ram放电来解决问题，但是经过一番折腾，机也拆了，但是我也没找到电池在哪里，不甘心，还没体验过呢，随后狠下心海淘了一台pixelbook2017,i5 8G 128G，六千软妹币，等了大半个月终于到了，开箱见面，满心欢喜。随后上手折腾，这一弄，就是两天。

#### 开机激活
首先一个梯子是必备的，就个人来说是自己买了一个vps自己搭建了ssr，所以不是什么问题，登录帐号，折腾开始。

#### 进入开发者模式
在未开启开发者模式之前，是无法在浏览器里面使用`ctrl+alt+t`进入chrome os的终端的。开启开发者模式，按住键盘`esc+fresh(刷新键)+power(电源键)`，注意进入开发者模式的时候会清空电脑，但是我新买的本直接用的，所以不存在什么，这里涉及到备份，可以另外google一下，这里就不赘述。按下组合键之后，电脑重启会提示系统损坏，这个时候按`ctrl+D`，然后重启之后会提醒关闭了验证，这个时候再次按`ctrl+D`，等待，最终进入系统，这个时候已经进入开发者模式。

#### 使用crouton安装ubuntu
终于进入重头戏，使用[crouton](https://github.com/dnschneid/crouton)，可以查看github上的详细描述，，一定要仔细看一遍，上面讲述了使用方法。首先进入系统的shell，然后下载crouton，下载的脚本在home目录下的Downloads文件夹下面。执行命令：
```bash
sudo sh -e ~/Downloads/crouton -r xenial -t keyboad,extension,cli-tra,audio,xorg,x11,unity
```
那么问题就来了，因为在安装ubuntu的时候，这个audio，是https://chromium.googlesource.com的资源，而且在chrome os使用了代理，在这一步的时候，已经进入到chroot的ubuntu系统里面，无法使用外部的代理，通过查找，可以使用另外一台连上vpn，然后共享wifi，进行安装，但是仍然不行。但是crouton命令行可以使用`-P`参数来使用代理，但是这个时候，在更新ubuntu的时候会直接报参数错误，经过查找好象是因为dns解析问题，但是这个时候ubuntu并没有安装好，无法进入系统，这一步确实卡了好久，经过不懈努力的google，终于找到了解决方案，原来国内大佬早就修改好了crouton的脚本，[crouton.proxy](https://github.com/angelfreedomv/echocrouton.proxy)，将其中要修改的地方，改成自己的代理地址，ok，安装顺利。

#### ubuntu环境构建
1. 成功安装Ubuntu过后，因为我选择的是unity图形桌面，所以得到了xterm这个终端，字太小，没高亮（或许是我没配）不好用，通过命令行安装 terminator代替，使用命令man terminator_config 查询终端配置
2. 安装chrome，自行google
3. 使系统支持中文
  a. 安装“language support”:
  ```bash
  sudo apt-get install language-selector-gnome
  ```
  b. 安装中文包
  ```bash
    sudo apt-get install language-pack-zh-hans
    sudo apt-get install language-pack-zh-hans-base
  ```
  c. 这个时候打开language support 会报错，提示一大堆没有安装，使用命令行安装完毕
  d. vim /etc/default/locale，将其中的内容改为
  ```bash
    LANG="zh_CN.UTF-8"
    LANGUAGE="zh_CN.UTF-8:zh:en_US:en"
  ```
  e. vim /etc/enviroment，在最后加入
  ```bash
    LANG="zh_CN.UTF-8"
    LANGUAGE="zh_CN:zh:en_US:en"
  ```

最后重启。
那么，到这里为止，一个基本的ubuntu子系统已经成功的装在了chrome os上面，此外还有其他工作的要做，比如安装xiwi等。弄好之后我再更新一篇。
