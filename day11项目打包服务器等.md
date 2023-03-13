## 6打包上线
6.1 打包 npm run build
项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。有了 map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。所以该文件如果项目不需要是可以去除掉需要在vue.config.js 配置productionSourceMap:false

## 6.2 购买云服务器
1: 阿里云 2:腾讯云

2: 设置安全组，让服务器一些端口号打开

3:利用xshe11工具登录服务器

登录服务器后操作

linux: /根目录
linux常用指令: cd 跳转目录 ls 查看
mkdir创建目录 pwd 查看绝对路径

## 6.3nginx配置:
1:xshel1进入根目录/etc
2:进入etc目录，这个目录下有一个nginx目录，进入到这个目录[已经安装过nginx: 如果没有安装过，四五个文件]
3:如果想安装nginx:yum install nginx
4:安装完nginx服务器以后，你会发现在nginx目录下，多了一个nginx.conf文件，在这个文件中进行配配置
5: vim nginx.conf进行编辑，主要添加如下两项
解决第一个问题:
location / {
    root  /root/jch/www/shangpinhui/dist;
    index  index.html:
    try_files $uri $uri/ /index.html;
}
//解决第二个问题
location /api {
  proxy _pass http://39.98.123.211
}
6:nginx服务器跑起来
service nginx start