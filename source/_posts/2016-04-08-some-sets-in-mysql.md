---
title: Mysql的几个常见设置
date: 2015-11-17 23:56:38
categories: Database
tags: mysql
toc: false
---
最近忙着处理一个文本数据集，数据不算大，1600万多条论文数据，需要从txt文档中挑选出来合法(合乎我们的要求)的文本数据，剔除的思想不复杂，100行代码足以，用php实现了数据挑选，合法的数据26万条，并插入mysql数据库，并选择了wampserver集成的服务器，简单实用。很有兴致地完成了数据的插入，发现有些数据乱码了，尤其是涉及到作者的名字和发表期刊，带有声调的那种符号，悲剧啊！初期挑选的算法设计的不完善，可是花了近一天时间。由于后期要做推荐，必须使字符合法并不乱码。只有默默地重新做。在设置mysql过程中，发现了个大坑。不多说贴代码：  
```sql
mysql> show variables like 'character%';
+--------------------------+-----------------------------------------------+
| Variable_name            | Value                                         |
+--------------------------+-----------------------------------------------+
| character_set_client     | utf8                                          |
| character_set_connection | utf8                                          |
| character_set_database   | utf8                                          |
| character_set_filesystem | binary                                        |
| character_set_results    | utf8                                          |
| character_set_server     | lanti1                                        |
| character_set_system     | utf8                                          |
| character_sets_dir       | d:\wamp\bin\mysql\mysql5.6.17\share\charsets\ |
+--------------------------+-----------------------------------------------+
8 rows in set
```
问题来了，character_set_server | lanti1，如果想改成万能的utf8，发现通过网上的各种方式都改变不了，后来google出来了，现在记录一下。对于不同版本的mysql有不同的修改方式，老版本是在my.ini中 找到mysqld项，追加default_character_set=utf8即可，但是在5.4版本的mysql中就发现不行，就得追加character-set-server=utf8就okay了。重启mysql，show。 
```sql
mysql> show variables like 'character%';
+--------------------------+-----------------------------------------------+
| Variable_name            | Value                                         |
+--------------------------+-----------------------------------------------+
| character_set_client     | utf8                                          |
| character_set_connection | utf8                                          |
| character_set_database   | utf8                                          |
| character_set_filesystem | binary                                        |
| character_set_results    | utf8                                          |
| character_set_server     | utf8                                          |
| character_set_system     | utf8                                          |
| character_sets_dir       | d:\wamp\bin\mysql\mysql5.6.17\share\charsets\ |
+--------------------------+-----------------------------------------------+
8 rows in set
```

最好都设置utf8，包括字段的字符集和排序，不然后期会出现很多你臆想不到的问题。不知道为什么mysql不默认设置成utf8，如果建立数据库时不修改默认，mysql居然默认是lanti1。简直是一个大深坑。对于大数据的时代的到来，还是学学Nosql吧。
  
一直没太关心mysql的转义字符的处理，结果处理完发现就悲剧了，mysql中入库时必须转义存储，否则插入不进去数据库，一旦入库了，取出来就不带有反斜杠\ 了，我在处理论文数据集需要拆分表，就忽略了这个问题，导致很多前期处理白费了，取出来后如果想再次入库，必须得再进行转义处理，不同的语言有不同的处理函数，mysql自带的也有，这里就不贴方法了，去google。