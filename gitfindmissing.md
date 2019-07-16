# 找到Git内某天被删除的文件的方法

曾经有一个文件，之前在git内，但是我没有珍惜它，现在却找不到了，你说着急不？

具体说，你知道文件的名字，但是不知道它的具体目录，也不知道哪个版本被删除。能不能找回？

有办法。也不太麻烦。按照我说的步骤，就可以寻回你的真爱。

首先首先看看历史上是否曾经有过：

    git log --all --full-history -- **/mylove.*

`**`表示任何目录，`mylove.*`这里可使用任何通配符，这里的意思是扩展名任意的，名为thefile的文件。

如果你知道具体的目录和名字，可以这样，做起来更加高效：

    git log --all --full-history -- <path-to-file>

这个命令会显示一组提交，这些提交也包括了所有接触过此文件的Git分支，然后你会发先你的文件的某个版本，你可以通过查看对于的版本的文件，了解到是否是你需要的文件版本：

    git show <SHA> -- <path-to-file>

文件版本对了的话，把这个版本的文件给释放出来：

    git checkout <SHA>^ -- <path-to-file>

注意这里有一个`^`,表示的是指定`<SHA>`版本的前一个版本，因为此`<SHA>`发现的文件活动是被删除了的。因此必须到前一个版本去释放它出来。

## 具体案例

今天我发现有一个文件叫做main.js 找不到了，我只知道它一定是有的，因为代码执行报错就是缺少这个文件。但是记不得我什么时候删过它，这个仓库我有日子没有用过了。那么：

    git log --all --full-history -- **/main.js

显示是这样的：

    commit dcc39fb8ddf4e69a511ec938b0be670a442f2141
    Author: 1000copy <1000copy@gmail.com>
    Date:   Sat Jun 29 18:40:44 2019 +0800

        move reveal.js down

然后显示具体版本历史的文件：

    $ git show dcc39fb8ddf4e69a511ec938b0be670a442f2141 -- main.js

输出大概是这样的（为了看着方便，去掉一些无关的细节输出：

    commit dcc39fb8ddf4e69a511ec938b0be670a442f2141
    Author: 1000copy <1000copy@gmail.com>
    Date:   Sat Jun 29 18:40:44 2019 +0800

        move reveal.js down

    diff --git a/main.js b/main.js
    -function createWindow () {
    -  // Create the browser window.
    -  let win = new BrowserWindow({
    -    width: 800,
    ...

对对对，就是这个文件，内容也是不错的。既然现在找到了它，下一步是把它拿出来：

    git checkout dcc39fb8ddf4e69a511ec938b0be670a442f2141^ -- main.js


