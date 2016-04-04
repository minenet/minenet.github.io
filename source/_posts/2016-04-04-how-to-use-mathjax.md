---
title: 如何优雅的写数学公式（MathJax）
date: 2016-04-04 21:25:08
categories: Math
tags: mathjs
mathjax: true
toc: false
---
# 什么是Mathjs
对于一个工科生难免的会面临数学公式的书写，常常我们使用的mathtype，但是这个是写好后一图片形式粘贴上去，及其low。不可能每个数学公式都从别的地方粘贴过来，再说了图片的东西打印出来那真是一个模糊，难免让你的作品（论文和文章）让人看起来像copy。最近学院某大牛教授，跟学院的学生讲解了两个半天的如何使用Latex，可惜的是鄙人没能去听，事后看了看PPT还是很nice的，Latex有软件，在里面软件进行论文的排版更好。今天我想在网页上如何使用嵌入数学公式，一个强大的插件出现——mathJax，它允许你在你的网页中书写公式，无论你是使用Latex还是MathML或者AsciiMath符号，这些mathjax都可以帮你实现，便捷轻松。直接上码：  
```
\begin{equation}x^{y^z}=(1+{\rm e}^x{-2xy^w})\label{1}\end{equation}
```
上面的公式代码展示如下：  
\begin{equation}x^{y^z}=(1+{\rm e}^x{-2xy^w})\label{1}\end{equation}
效果不用说,再来个复杂点的数学公式：   
```
\begin{equation}\frac{\partial u}{\partial t} = \left(\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)\label{2}\end{equation}
```
\begin{equation} \frac{\partial u}{\partial t} =  \left( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right) \label{2} \end{equation}

感觉很炫！老师再也不用担心我写不好数学公式了。而且还很优雅的在公式末尾使用了公式的编号，加编号是为了更好的引用，比如说我们要使用`（1）`公式，没必要重新写，使用`$\eqref{1}$`即可。example: 例如我们使用公式$\eqref{1}$去……  
怎么实现自动加编号，只需要加一段js代码即可：  
```
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  TeX: {equationNumbers: { autoNumber: "AMS" } }
});
</script>
```
当你本页面的公式鼠标右键可以展示公式代码。将代码复制到word里面也能实现公式。

# 参考学习
[MathJax使用LaTeX语法编写数学公式教程](http://iori.sinaapp.com/17.html/comment-page-1?replytocom=2)  
有时间一定好好翻译一下[MathJaxDocumentation](http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm)
