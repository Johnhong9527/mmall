/*
 * @Author: Johnhong9527
 * @Date:   2019-05-26 06:52:34
 * @Last Modified by:   Johnhong9527
 * @Last Modified time: 2019-05-26 09:55:03
 */

'use strict';
/*


    "admintest.happymmall.com",
    "adminv2.happymmall.com"


 */

const chalk = require('chalk');
/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
  {
    envName: 'dev',
    dirName: 'dev',
    baseUrl: 'http://adminv2.happymmall.com',
    assetsPublicPath: './'
  },
  {
    envName: 'test',
    dirName: 'test',
    baseUrl: 'http://192.168.xx.xx:8000/',
    assetsPublicPath: './'
  },
  {
    envName: 'pro',
    dirName: 'pro',
    baseUrl: 'http://webapi.xxx.com/',
    assetsPublicPath: './'
  }
];

//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv;
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/gi, '') : '';
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[0];
// 把环境常量挂载到process.env.HOST_ENV方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl;
// log选中的变量
console.log(chalk.green('当前环境常量：'));
console.log(HOST_CONF);

module.exports.HOST_CONF = HOST_CONF;
module.exports.ENV_LIST = ENV_LIST;
