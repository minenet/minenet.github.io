---
title: Git command
date: 2016-04-07 22:14:02
categories: Linux
tags: git
---
# What's git ?
**Git**一种分布式版本控制系统，也是现今最流行的版本控制系统，使用于各大互联网公司。这是官方的介绍：
> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

# Git command
|comand|function|
|:------|:-----|
|$ git init| git初始化|
|$ git add .| 将修改增加到缓存区|
|$ git commit ""|将存到缓存区的内容提交到git|
|$ git log|查看历史操作记录|
|$ git status|查看当前状态|
|$ git reflog|查看历史命令|
|$ git log --pretty=oneline|横向显示历史记录（当记录比较多时）|
|$ git reset --hard HEAD^ |退回上一个版本，^^上上个版本，~10退回到第10个版本，filename把filename暂存区的修改回退到工作区|
|$ git diff filename|查看文件修改的记录|
|$ git checkout file|切换到分支|
|$ git checkout --"fielname"|撤销工作区的修改, 也可以用于误删文件，版本库替换工作区|
|$ rm filename|删除文件|
|$ git rm filename|从版本库中删除文件|
|$ git branch file|创建分支|
|$ git branch|查看当前分支|
|$ git merge file|合并指定分支到当前分支|
|$ git branch -d file|删除分支|
|$ git log --graph|查看合并分支图|