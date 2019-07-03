# NPM Script 快速入门

NPM也提供了自动化的工具，虽然有点初级，但是很多时候够用，并且不需要学习 Grunt 这样的任务自动化工具，减掉一个额外的学习负担。

假设我们使用它来做js文件的混淆，我们需要如下组件：

	uglify-es

首先安装在继续学习前，你需要先将它安装到环境中：

    npm install --save-dev uglify-es

## 项目练手

假定你有一个项目，应该有一个配置好`package.json`，我们可以使用如下命令生成此文件：

    npm init -y

NPM使用文件package.json内的script部分键来描述自动化工具执行，像是这样：

	"scripts": {
	  "mangle": "mkdir -p dist/js && uglifyjs src/*.js -m --mangle-props -c toplevel -o dist/app.js"
	}

我们生成一个测试用文件：

   touch src/action.js

我们就是生成此文件的对应压缩文件。内容如下：
	
	var x = {
	    baz_: 0,
	    foo_: 1,
	    calc: function() {
		        return this.foo_ + this.baz_;
	    }
	};
	x.bar_ = 2;
	x["baz_"] = 3;
	console.log(x.calc());


## 执行效果和分析说明

现在，你只需要执行如下命令，即可生产压缩的JS文件了：

  npm run mangle

你会发现此压缩文件已经放置到dist目录之内。可以使用任何文本工具查看文件内容，比如这样：

 	cat dist/app.js

输出是这样的：

	var x={o:0,t:1,_:function(){return this.t+this.o},i:2,o:3};console.log(x._())

在package.json内部的script指定的任何一个键（这里是mangle），都可以把它作为参数传递为npm run，作为一个命令使用。

	npm run mangle

内部执行其实是使用了连接符号&&连接起来的两个命令，&&表示前一个执行成功才会执行下一个命令，否则就停止继续执行。命令：

	mkdir -p dist

创建一个目录，参数-p说明没有没有的话就创建，有了就不必创建了。命令：

	uglifyjs src/*.js -m -c  -o dist/app.js

执行文件压缩。参数-m表示压扁 -c表示压缩，-o指定目标文件。

## 使用场景

NPM script可以在不少批处理场合使用，比如：

1. 压缩JS文件
2. 自动化构建过程
3. 对你的代码做优良风格的检查
4. 压缩图片
5. 和工具 BrowserSync 集成

等等。

ref: 
1. https://www.npmjs.com/package/uglify-es
2. https://medium.com/@maxsilvauk/npm-scripts-who-needs-grunt-or-gulp-77572da16022
3. https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/

