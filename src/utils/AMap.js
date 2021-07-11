/*
 * @Author: MonsterDOG
 * @Date: 2021-04-15 09:44:46
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-04-15 10:54:28
 * @FilePath: /vue-cli4-demo/src/utils/AMap.js
 * @Description: 【描述】
 */
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://webapi.amap.com/maps?v=1.4.15&key=4f37ea5de0ca67ed673427e38a784ba4&plugin=AMap.Geocoder&callback=initAMap';
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}
