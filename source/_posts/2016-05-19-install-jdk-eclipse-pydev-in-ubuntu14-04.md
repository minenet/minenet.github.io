---
title: Ubuntu14.04安装JDK+Eclipse+Pydev
date: 2016-05-19 10:33:13
categories: Linux
tags: ubuntu
---
昨天花了几个小时的时间安装了一个ubuntu虚拟机，配环境，主要是网速太慢。整个安装过程也是出现很多坑，网上的很多配置方法参差不齐，不好使，好在万能的谷歌帮我解决了所有的坑。有必要记录下。
## Environment
VMware workshop Pro + ubuntu keylin14.04  
安装虚拟机的过程so easy忽略。
## Vim install
初次使用Vim真心不适应，尤其ubuntu自带的tiny版的，所以鄙人进行了卸载，重新安装。   
```bash  
sudo apt-get remove vim-remove # 卸载
sudo apt-get install vim  # install full vim
```
## Root autologin
ubuntu keylin14.04默认登录不是root，可能是为了安全起见。最简单的判断，命令终端符号是`$`,而不是`#`。  
首次使用`sudo su`命令切换到`root`，但是每次这样子切换不方便，作为个人本地的虚拟机玩耍，要方便。
   
```bash
vim /usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf #没有就新建 
```

50-ubuntu.conf文件
```bash
[seatDefaults]
user-session=ubuntu
autologin-user=root
greeter-session=unity-greete
greeter-show-manual-login=true
allow-guest=false
```
重启生效！
## JDK install
http：//www.oracle.com/technnetwork/java/javase/downloads  
我选择64位`jdk-8u91-linux-x64.tar.gz`
```bash
tar -zxvf jdk-8u91-linux-x64.tar.gz #解压
cp -R jdk1.8.0_91/ /usr/local/   #copy
vim ~/.bashrc #配置环境变量
添加：
export JAVA_HOME=/usr/local/jdk1.8.0_91
export JAVA_BIN=$JAVA_HOME/bin
export JAVA_LIB=$JAVA_HOME/lib 
export CLASSPATH=.:$JAVA_LIB/tools.jar:$JAVA_LIB/dt.jar
export PATH=$JAVA_BIN:$PATH

source ~/.bashrc # 生效环境变量
java -version #查看是否出现java版本
javac 
```

## Eclipse install
http://www.eclipse.org/downloads/   
选择了`eclipse-jee-mars-2-linux-gtk-x86_64.tar.gz` 版本, 解压就可以用。
```bash
tar -zxvf eclipse-jee-mars-2-linux-gtk-x86_64.tar.gz
cp -R eclipse /usr/local/

```
 但是每次启动不方便，需要建立一个桌面快捷键图标。
```bash
vim /usr/share/applications/eclipse.desktop
添加：
[Desktop Entry]
Name=Eclipse
Comment=Eclipse SDK
Encoding=UTF-8
Exec=/usr/local/eclipse/eclipse
Icon=/usr/local/eclipse/icon.xpm
Terminal=false
StartupNotify=true
Type=Application
Categories=Application;Development;
```
完成后可以在Application下看到eclipse图标，双击启动，发现`No java virtual machine`等相关字眼。原因是没有eclipse下jre。 进入eclipse安装目录。
```bash
mkdir jre
cd jre
ln -s /usr/local/jdk1.8.0_91/bin bin
```
再次双击发现启动了，copy图标到桌面或拉到任务栏上，方便。
## Pydev install
启动eclipse。
`help` -> `Install New Software` -> `add`
Name:Pydev    
locations: http://pydev.org/updates
然后一路`next`。  

然后配置解析器  
`Window` -> `Preferences` 你可以看到`Pydev` 。  
`Interpreter` -> `Python Interpreter` -> `New`  
Interpreter Name:Python 
Interpreter Executable:/usr/local/python2.7 (ubuntu默认路径，重新安装者找对应路径)
至此安装了。


  