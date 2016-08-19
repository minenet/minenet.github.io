---
title: 解决CNAME和MX记录冲突
date: 2016-08-17 21:16:48
categories: Blog
tags: git
---
kloudsec由于公司资金原因关闭，加上证书的过期，维持不到半年的小绿锁突然消失了，第三方的转发缘故，网站也不能访问，需要重新设置解析。首先让网站能访问起来。
### 设置解析
域名购买和备案都在阿里云，在控制台重新设置解析时，又遇见问题，MX的记录和CNAME冲突（申请过免费的企业邮箱），免费的企业邮箱虽然没怎么用，但是还是想保留着。之前https属于转发，访问站点时，我的理解是先访问Kloudsec，然后Kloudsec的服务器访问github io,把消息反馈给服务器，然后加密处理呈现给用户。是一种伪证书，因为github pages是不支持上传个人证书的，尽管现在github pages全面支持https了，那只是针对`username.github.io`，如果是使用的是个性域名，则不能安全访问。由于博客属于静态页面，为了满足一点逼格，就利用免费的第三方（学生党，穷！）转发，选择cloudflare。    
回到问题的，如何解决冲突，搜了一下都好像没有一个比较明确的答案，很多答案是选择了第三方的DNS供应商。比如[DNSpod](https://www.dnspod.cn/)，可以共存，但是会提示你，邮件可能会丢失的风险，也就是说可能发的出去，但是收不到的情况。其实这是国际惯例，在RFC解析协议中，CNAME记录的优先级高于MX记录的优先级，且不能共存。为了解决这种风险，所采用的方式就是，先对WWW做CNAME记录，然后对@做A记录指向github page的ip，相当于做了一次跳转。
<img src="https://minenet.me/image/record.png" class="img-center">

然后就是等待DNS的刷新，稍后就可以访问了。
### cloudflare的申请
- [cloudflare](https://www.cloudflare.com)官网直接申请个账号。
- 添加域名，然后scan。
- 在域名供应商或第三方的DNS供应商那里修改成由clouudflare提供的DNS。
- 等待吧。。。（需要一段时间），就会出现久违的小绿锁。

