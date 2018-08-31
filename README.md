# Auto-Refresher
A repository which can open and refresh your bowser when your file update

一个可以 可以在文件更新时自动刷新浏览器的小脚本



### 前言

习惯了现代化的web开发方式（webpack热刷新）， 再做传统项目就有点不习惯。 传统web项目，有着多样的文件（php， html 等）， 多种技术选型（iframe ， 单页应用 等），对每个项目进行webpack 配置也是一件十分耗费精力的事情， 毕竟开发环境下加载本地文件也不消耗网络带宽， 浏览器刷新是一件十分廉价的事情。而且最近笔者的 **F5 刷新键被按坏了**， 在此背景下， 笔者再也不想在手动刷新浏览器来看效果了，那就借助node 的文件检测机制 和 chromix 来写一个自动刷新浏览器的小脚本吧 



