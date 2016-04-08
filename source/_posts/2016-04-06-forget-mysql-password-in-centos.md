---
title: 忘记Mysql密码的解决办法
date: 2016-01-02 15:34:32
categories: Database
tags: [mysql,centos]
---
# 问题来源
前天服务器被整挂了，昨天花了一天的时间来修复。从整个修复过程来看，linux感觉还是处于起步阶段。博客访问不了，是最揪心的事情了。上午发现用navicate远程登录mysql时，发现总是报错啊。  
错误如下：  
```shell
1045 access denied for user 'root'@'localhost' using password yes
```
# 解决办法
最后重新设置密码，结果发现密码忘记了（其实blog配置中有），只有重置了，重置的过程中也是各种问题，最后找到一种比较靠谱的办法。  
```shell
# /etc/init.d/mysqld stop 
# mysql_safe --user=mysql --skip-grant-tables --skip-networking & 
# mysql -u root mysql 
mysql> UPDATE user SET Password=PASSWORD('newpassword’) where USER='root';
mysql> FLUSH PRIVILEGES; 
mysql> quit 
# /etc/init.d/mysql restart 
# mysql -uroot -p 
Enter password: <newpassword> 
mysql>
```

newpassword就是重置后的密码，设置成自己想要的即可。然后重启okay。  
站点部署在阿里云上，属于本地远程连接云端服务器的数据库，默认的mysql是远程连接是关闭的。需要更改设置才能远程连接访问。密码和和账户对应上即可。  
```shell
mysql>grant all privileges on *.*  to  'root'@'%'  identified by 'youpassword'  with grant option;
mysql>flush privileges;
```
