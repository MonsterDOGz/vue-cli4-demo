/*
 * @Author: MonsterDOG
 * @Date: 2021-02-26 15:29:20
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-17 13:24:26
 * @FilePath: /vue-cli4-demo/src/utils/pdfjs.js
 * @Description: 【描述】pdfjs 插件配置
 */
import pdfjsLib from 'pdfjs-dist';
const version = '2.2.228';
// const pdfjsLib = require('../../../static/pdf/build/pdf.js');
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;
const CMAP_URL = `https://unpkg.com/pdfjs-dist@${version}/cmaps/`;

export { pdfjsLib, CMAP_URL };
