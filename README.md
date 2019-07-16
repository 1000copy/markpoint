# markpoint1

# Packager for MAC OS X 

So lets go ahead and install it. Run these commands in the terminal in the app folder:

        npm install electron-packager -g
        npm install --save-dev electron

## MacOS

Now you can run this command from the terminal to build a package for mac:

    electron-packager ./ markpoint --overwrite 

## 有一个文件之前在git内，但是当前快照内找不到了，怎么办？

首先看看历史上是否曾经有过：

    git log --all --full-history -- **/thefile.*

如果你知道具体的目录和名字，可以这样：

    git log --all --full-history -- <path-to-file>

This should show a list of commits in all branches which touched that file. Then, you can find the version of the file you want, and display it with...

    git show <SHA> -- <path-to-file>

Or restore it into your working copy with:

    git checkout <SHA>^ -- <path-to-file>

Note the caret symbol (^), which gets the checkout prior to the one identified, because at the moment of <SHA> commit the file is deleted, we need to look at the previous commit to get the deleted file's contents

## 具体案例

有一个文件叫做main.js ，在根目录下，当前快照找不到了，那么

    git log --all --full-history -- **/main.js

显示是这样的：

    commit dcc39fb8ddf4e69a511ec938b0be670a442f2141
    Author: 1000copy <1000copy@gmail.com>
    Date:   Sat Jun 29 18:40:44 2019 +0800

        move reveal.js down

然后显示具体版本历史的文件：

    $ git show dcc39fb8ddf4e69a511ec938b0be670a442f2141 -- main.js

输出是：

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

记忆是没有错的，找到了它，下一步是把它拿出来：

    git checkout dcc39fb8ddf4e69a511ec938b0be670a442f2141^ -- main.js
