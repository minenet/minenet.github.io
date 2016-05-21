---
title: Win7下安装MongoDB
date: 2016-05-22 1:06:41 
categories: Database
tags: MongoDB
---
# Environment
OS：win7 os x64  
MongoDB version : [mongodb-win32-x86_64-2008plus-ssl-3.2.6-signed.msi](http://www.mongodb.org/downloads)  
# Install and create DB
安装直接点击`next` 即可，我选择安装的路径为`E:\mongodb`。创建数据库存储路径目录`F`盘。    
```cmd
mkdir data
cd data
mkdir db
cd db
```  
创建存储路径为`f:\data\db`。当然可以直接在对应目录手动创建。
启动MongoDB服务器，需要进入到MongoDB安装路径的`bin`下。我的是`e:\mongodb\bin`    
```cmd
mongod.exe --dbpath f:\data\db
```  
执行成功后可以看到一个waiting for connections on port 27017。就说明成功了直接访问localhost:27017,可以看到如下  
```cmd
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```  
但是，这样子每次进入需要进入到安装目录启动MongoDB，太麻烦了，可以直接把MongoDB当做系统的服务运行即可，我们顺便可以写两个小脚本运行，开启和关闭。  
首次我们在E:\mongodb下新建logs文件夹，并随后在logs新建文件mongodb.log,即e:\mongodb\logs\mongodb.log
还是进入到`bin`目录。   
```cmd
mongod.exe --logpath e:\mongodb\logs\mongodb.log --logappend --dbpath f:\data\db --serviceName MongoDB --install  # 配置成服务
net start MongoDB # 启动
```  
<img src = "http://minenet.me/image/installMongDB_1.png" class = "img-center">
cmd执行`services.msc`可以看到。
<img src = "http://minenet.me/image/installMongoDB_2.png" class = "img-center">
# MongoDB mange
首先开启MongoDB`net start MongoDB`  
cmd中进入到`e:\mongodb\bin`  
```cmd
mongo.exe
1+1     # 2
db      # test 默认连接test数据库
db.runoob.insert({x:10})      # WriteResult({ "nInserted" : 1 }) 数字 10 插入到 runoob 集合的 x 字段中
db.runoob.find()     # { "_id" : ObjectId("5604ff74a274a611b0c990aa"), "x" : 10 } 查找
```  
<img src = "http://minenet.me/image/installMongoDB_3.png" class = "img-center">
# Start & Stop
新建两个txt文件，分别命名为startMongoDB和stopMongoDB，里面分别写入
```cmd
net start MongoDB
```   
```cmd
net stop MongoDB
``` 
保存后，修改txt文件后缀名为`bat`成为批处理文件，每次直接双击就行（有的需要在‘管理员身份’运行），自由进行MongoDB开启和关闭。  
开始玩耍MongoDB吧！
（tips：推荐一本MongoDB入门实践书籍[大数据存储MongoDB实战指南](https://book.douban.com/subject/26333934/) 老乡威哥的书籍，支持！）