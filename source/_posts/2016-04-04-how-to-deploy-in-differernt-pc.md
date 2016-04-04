---
title: hexo中如何在多台PC中部署
date: 2016-04-04 14:38:40
tags: blog
categories: hexo
---
最近几天把博客进行了重构，之前在阿里云部署的thinkjs+easyou博客很不友好，各种`bug`，尤其是对代码支持和blog文章的格式。Bolg选择了流行的hexo+jacman，并最后优雅的使用了Markdown，真是爽极了。
# 如何安装使用hexo+jacman #
关于如何安装，由于hexo是基于nodejs，速度很快。用的很多，安装首先安装`nodejs`，然后依次安装`npm`和`hexo`。至于步骤网上已经很多了。这里附上一个[如何使用jacman主题](http://wuchong.me/blog/2014/11/20/how-to-use-jacman/)。按照上面的步骤一步步走。这里就不多说了。

# 如何部署在多台电脑中deploy
## 利用git管理blog
网上有部分资源可以利用但是不是很全，这次学习了多篇大牛的博客才明白，中间出现过坑（PS：鄙人是初学者，大牛求轻拍！），不过度都解决了。  
 
按照jacman主题的安装，我们已经将Blog部署上去`github`上了, 当登录github时，发现，全部是渲染后的结果，不符合我们的预期。如何利用github管理博客源代码和渲染展示的博客。大致思路是利用repository中的username.github.io仓库，利用了两个分支，一个master分支，一个是source分支，一个放源代码一个放渲染。 
1. 我们在本地的bolg根目录下，利用`git init`命令进行初始化仓库。然后进行如下命令:  
```bash
$ git add .  ＃存到缓存区
$ git commit -am "commit blog" ＃提交
```

2. 建立source分支，并将源代码push到github。 
```bash	
$ git branch source ＃创建source     
$ git checkout source ＃切换到分支    
$ git remote -v ＃查看远程分支    
$ git push origin source
```
      
注意：在我们推之前我们首先要删除`theme/jacma`下的`.git`文件，该文件夹是隐藏的，显示隐藏后删除，不然push不上去。  
其实很多技术博客中需要修改blog根目录下的`.gitignore`文件，其实这与版本的不同有关系，我的版本中就不用修改，不过最好事先查看。需要添加`public/`和`.deploy*/` ，因为这两个文件每次部署时都会生成。没必要`push`上去，我的`.gitignore`文件：  
```bash
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

3.完成上去过程后，这就完成了github管理hexo源代码。如果我们想在另一台电脑写博客，比如刚刚我们在公司的电脑上部署好了，回家了突发灵感，要写，对于没有后台的hexo来说，就有点尴尬了，不过还好有强大的github。  
在新的电脑B中，我们也时先安装nodejs，npm，hexo，添加ssh，然后与远程的source分支进行绑定，这样子我们就完成了两台部署，第三台也是这样子。    
```bash
$ git clone -b source git@github.com:username/username.github.io.git
```
## 如何使用
在任何已经部署完成的电脑中，首先我们得pull最新的分支，master和source，然后push，这样子会有很多步骤需要做。如果玩过shell编程的都知道，把这些写成shell脚本，自动执行是不是很nice。  
编辑两个文件，一个fetch.sh,一个submit.sh。   
fetch文件：     
```bash
＃File Name:fetch.sh
＃!/bin/bash
git pull origin source
cd .deploy_git/
git pull
```


submit文件：
```bash     
＃File Name: submit.sh
＃!/bin/bash
hexo d -g
git add .
git commit -am "update blog source"
git push origin source
```     
每次编辑之前，先运行fetch.sh,执行代码`./fetch.sh`,编辑完结束，然后就运行`./submit.sh`,一切okay。中间如果出现有需要输入密码的情况，那是因为你在添加ssh key时设置了秘钥，其实无秘钥部署更nice，设置密码时直接回车两次就默认密码为空了，方便不少。  
如有问题G0oogle和issue。


