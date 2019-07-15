# markpoint1

# Packager for MAC OS X 

So lets go ahead and install it. Run these commands in the terminal in the app folder:

        npm install electron-packager -g
        npm install --save-dev electron

## MacOS

Now you can run this command from the terminal to build a package for mac:

    electron-packager ./ markpoint --overwrite 

# Grunt 快速入门

Grunt 是JS的任务自动化工具。假设我们使用它来做js文件的混淆，我们需要如下组件：

    grunt-cli 命令行
    grunt     grunt组件
    grunt-contrib-uglify-es 代码混淆组件

首先安装在继续学习前，你需要先将Grunt命令行（CLI）安装到全局环境中，把另外两个加入到本地开发依赖中：

    npm install -g grunt-cli
    npm install grunt  --save-dev
    npm install grunt-contrib-uglify-es --save-dev

## 项目练手

假定你有一个项目，应该有一个配置好`package.json`，我们可以使用如下命令生成此文件：

    npm init -y

假设一个`action.js`文件，我们就是生成此文件的对应压缩文件。内容如下：

    console.log(`42`)

## Gruntfile文件案例

想要把任务自动化跑起来，还需要一个Grunt配置文件：

    touch Gruntfile.js

Grunt 配置中， grunt-contrib-uglify 插件中的uglify 任务:

    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: 'action.js',
                    dest: 'action.min.js'
                }
            }
        });
        // 加载包含 "uglify" 任务的插件。
        grunt.loadNpmTasks('grunt-contrib-uglify-es');
        // 默认被执行的任务列表。
        grunt.registerTask('default', ['uglify']);
    };

前面已经向你展示了整个 Gruntfile，接下来将详细解释其中的每一部分。

现在可以指定grunt命令了：

    grunt

你可以在当前目录内发现生成的`action.min.js`文件。它是`action.js`的混淆版本。你可以试试：

    node action.min.js
和：
    node action.js

你会发现它们的执行效果是一样的。


### 包装函数

你所书写的作为配置的代码，都必须放在此函数内：

    module.exports = function(grunt) {
        // 你的代码
    };

###项目和任务配置

如果任务需要引用`package.json`的话，可以使用：

    grunt.file.readJSON('package.json')

将存储在package.json文件中配置引入进来。然后就可以通过形如`<% %>`的模板字符串来引用配置属性：

    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'

与大多数task一样，grunt-contrib-uglify-es 插件中的uglify 任务要求它的配置被指定在一个同名属性中。也就是`uglify`内

        build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
`build`内的`src`指定了`uglify`任务的源文件，`dest`指定`uglify`的目的文件。

### 加载 Grunt 插件和任务

只要在 package.json 文件中被列为依赖包，并通过npm install安装之后，都可以在Gruntfile中以简单命令的形式使用：

    // 加载能够提供"uglify"任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify-es');


### 自定义任务

通过定义 default 任务，可以让Grunt默认执行一个或多个任务:

    // Default task(s).
    grunt.registerTask('default', ['uglify']);


### 更多插件

类似`grunt-contrib-uglify`这些常用的任务，都已经以grunt插件的形式被开发出来了：

    concatenation 文件连接工具
    minification  文件压缩工具
    linting       代码规范工具

用法都是类似的。

