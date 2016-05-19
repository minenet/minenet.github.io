---
title: Shadowsocks的搭建
date: 2016-05-10 17:35:55
categories: Linux
tags: shadowsocks
---
# Shadowsocks
Shadowsocks一款代理开源的软件，速度快，多平台使用，灵活代理，国外走代理，国内直接访问。[Shadowsocks](https://shadowsocks.org/en/index.html)
> If you want to keep a secret, you must also hide it from yourself.

有关于科学上网的东西太多了，VPN、GoAgent、lantern等。相比下来，个人觉得还是SS好用，刚刚接触SS时还是使用了网上别人分享的账号，随着用的人多了，变成龟速（用的多就容易被GFW发现、限制网速，最后直接墙掉）。也用灵雀云的Docker部署SS，不过只能免费用一个月就跪了。今天试着用了几种方式去搭建SS节点，有必要记录下。
# 搬瓦工
搬瓦工[bandwagon](https://bandwagonhost.com)是美国一家卖VPS的站点，为什么这么火，原因有两点：因为便宜，支付方便，直接Alipay；因为傻瓜是操作部署节点，一键搞定；期初的搬瓦工和其他服务器商一样，但是由于其便宜，更多的人去购买VPS，而且更多的人买来搭建SS节点，这公司也很聪明，发现更多的人直接购买了，就开始制定一键生成节点，让更多的人（不会linux）人更方便，尤其是支持支付宝支付更加符合国人。 
 
注册账号就不说了，网上搜搜。购买直接进入Control Panel。
<img src = "http://minenet.me/image/banwagong1.png" class = "img-center">
一般个人用的话500G够用，网上很多比较便宜的100G都out of stock了。最便宜的是2.99刀/month,年付更划算，19.99刀/annual 可以跟换数据中心。选洛杉矶数据中心的比较好，延时少，速度快。新出来的费利蒙不知道怎样，尽管都在米国西海岸，而且便宜流量多，不可以更换数据中心（坑）。
<img src = "http://minenet.me/image/banwagong2.png" calss = "img-center">
# alpharacks
[alpharacks](https://www.alpharacks.com)也是美国一家VPS供应商，数据中心全部在洛杉矶，听说速度还可以，而且比较便宜，唯独不好的是，不像搬瓦工那么土豪使用SSD，选择了使用了HHD，不过好歹自己配置的，实用。整个购买过程也是蛋疼，不支持Alipay，需要使用信用卡或使用PayPal，鄙人逼格很low，信用卡一张都没有，学生党穷鬼。发现强大的Paypal支持国内的借记卡了，有幸试了把，估计也没钱海淘。[Paypal](https://www.paypal.com)  

注册alpharacks也是坑爹，必须填好国家，而且购买时，必须IP与你注册时国家一致，这个验证真是磨人。其实这个站点没有被墙，不走代理直接访问就好，不然就是Fraud了，无论你怎样购买，无法提交订单。鄙人选择了10美刀一年的，其实有个12美刀的好像更好，流量翻了4倍，内存三倍，反正自己去折腾吧。（鄙人也才开始用，不是做广告推销，有好的便宜的节点，请留言分享啦。谢谢！）
# 如何配置
鄙人选择了centos-6-64bit 系统作为测试配置，SS主要有Python、Go、nodejs、libev等版本，我选择了Python。 
远程使用xshell登录后。

```bash
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```  
中间依次要你输入SS密码，和端口，不输入就是默认。自动安装依赖。  
```bash
Congratulations, shadowsocks install completed!
Your Server IP:your_server_ip
Your Server Port:your_server_port
Your Password:your_password
Your Local IP:127.0.0.1
Your Local Port:1080
Your Encryption Method:aes-256-cfb

Welcome to visit:https://teddysun.com/342.html
Enjoy it!
```  
当然如果需要更改端口和密码。
```bash
vi /etc/shadowsocks.json  
```  
```bash
{
    "server":"0.0.0.0",
    "server_port":8989,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"yourpassword",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```  
多用户设置,直接改上面的json文件如下：  
```bash
{
    "server":"0.0.0.0",
    "local_address":"127.0.0.1",
    "local_port":1080,
    "port_password":{
         "8989":"password0",
         "9001":"password1",
         "9002":"password2",
         "9003":"password3",
         "9004":"password4"
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```  
相关命令：
```bash
/etc/init.d/shadowsocks start #开启
/etc/init.d/shadowsocks stop  #停止
/etc/init.d/shadowsocks restart #重启
/etc/init.d/shadowsocks status	#状态
./shadowsocks.sh uninstall #卸载
pip install -U shadowsocks #升级
```  
珍爱生命！远离百度！科学上网！  
<img src = "http://minenet.me/image/alpharacks.png" class = "img-center">
<img src = "http://minenet.me/image/google.png" class = "img-center">

----------
[CentOS下shadowsocks-libev一键安装脚本](https://teddysun.com/357.html)  






