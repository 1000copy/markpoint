# markpoint

# Packager for MAC OS X 

So lets go ahead and install it. Run these commands in the terminal in the app folder:

        npm install electron-packager -g
        npm install --save-dev electron

## MacOS

Now you can run this command from the terminal to build a package for mac:

    electron-packager ./ markpoint --overwrite 

# Grunt 快速入门

Grunt和 Grunt 插件是通过 npm 安装并管理的。

## 安装 CLI

在继续学习前，你需要先将Grunt命令行（CLI）安装到全局环境中：

    npm install -g grunt-cli

上述命令执行完后，grunt 命令就被加入到你的系统路径中了，以后就可以在任何目录下执行此命令了。

## 项目练手

假定你有一个项目，应该有一个配置好
    
    package.json 
    
再创建Grunt配置文件：

    touch Gruntfile

转到项目的根目录下。执行命令安装项目依赖的库：


    npm install grunt grunt-contrib-uglify --save-dev
    
执行 grunt 命令。

## Gruntfile文件案例

Grunt 配置中， grunt-contrib-uglify 插件中的uglify 任务（task）被配置为压缩（minify）源码文件:

    module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                build: {
                    src: 'asset/action.js',
                    dest: 'asset/action.min.js'
                }
            }
        });
        // 加载包含 "uglify" 任务的插件。
        grunt.loadNpmTasks('grunt-contrib-uglify');
        // 默认被执行的任务列表。
        grunt.registerTask('default', ['uglify']);
    };

前面已经向你展示了整个 Gruntfile，接下来将详细解释其中的每一部分。

### "wrapper" 函数

每一份 Gruntfile （和grunt插件）都遵循同样的格式，你所书写的Grunt代码必须放在此函数内：

    module.exports = function(grunt) {
        // Do grunt-related things in here
    };

###项目和任务配置

大部分的Grunt任务都依赖某些配置数据，这些数据被定义在一个object内，并传递给grunt.initConfig 方法。

在下面的案例中，`grunt.file.readJSON('package.json')` 将存储在package.json文件中的JSON元数据引入到grunt config中。 

由于`<% %>`模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作。

由于这本身就是JavaScript，你不仅限于使用JSON；你可以在这里使用任意的有效的JS代码。如果有必要，你甚至可以以编程的方式生成配置。

与大多数task一样，grunt-contrib-uglify 插件中的uglify 任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个banner选项(用于在文件顶部生成一个注释)，紧接着是一个单一的名为build的uglify目标，用于将一个js文件压缩为一个目标文件。

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

### 加载 Grunt 插件和任务

类似这些常用的任务，都已经以grunt插件的形式被开发出来了：

    concatenation
    minification
    grunt-contrib-uglify 
    linting

只要在 package.json 文件中被列为依赖包，并通过npm install安装之后，都可以在Gruntfile中以简单命令的形式使用：

    // 加载能够提供"uglify"任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

注意： grunt --help 命令将列出所有可用的任务。

### 自定义任务

通过定义 default 任务，可以让Grunt默认执行一个或多个任务。在下面的这个案例中，执行 grunt 命令时如果不指定一个任务的话，将会执行uglify任务。这和执行grunt uglify 或者 grunt default的效果一样。default任务列表数组中可以指定任意数目的任务（可以带参数）。

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
