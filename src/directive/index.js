/*
 * @Author: MonsterDOG
 * @Date: 2021-04-16 15:55:24
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-07-13 14:43:03
 * @FilePath: \vue-cli4-demo\src\directive\index.js
 * @Description: 【描述】
 */
import Vue from 'vue';

// 图片懒加载自定义指令
const lazyLoad = function(Vue) {
  var img = document.getElementsByTagName('img');
  function lazyload() {
    console.log('滚动lazy');
    // 监听页面滚动事件
    var seeHeight = window.innerHeight; // 可见区域高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条距离顶部高度
    for (var i = 0; i < img.length; i++) {
      if (img[i].getAttribute('data-image-show')) {
        continue;
      }
      if (img[i].offsetTop < seeHeight + scrollTop) {
        console.log(img[i].offsetTop, seeHeight, scrollTop);
        if (img[i].getAttribute('src') === Vue.$vuiLazyLoad.img) {
          img[i].src = img[i].getAttribute('data-src');
          img[i].setAttribute('data-image-show', 'true');
        }
      }
    }
  }
  Vue.$vuiLazyLoad = {
    img: '@/assets/backgroundImg.png',
    imgLength: 0
  };

  var lazyImageObserver, evenFunction;

  if (IntersectionObserver) {
    lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        let lazyImage = entry.target;
        // 如果元素可见
        if (entry.intersectionRatio > 0) {
          if (lazyImage.getAttribute('src') === Vue.$vuiLazyLoad.img) {
            lazyImage.src = lazyImage.getAttribute('data-src');
          }
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
  } else {
    lazyload(); // 页面载入完毕加载可是区域内的图片
    evenFunction = debounce(lazyload, 800);
    window.removeEventListener('scroll', evenFunction);
    window.addEventListener('scroll', evenFunction);
  }
  return {
    name: 'lazy',
    bind(el, binding) {
      el.setAttribute('src', Vue.$vuiLazyLoad.img);
      el.setAttribute('data-src', binding.value);
      Vue.$vuiLazyLoad.imgLength++;
    },
    inserted(el) {
      if (IntersectionObserver) {
        lazyImageObserver.observe(el);
      }
    },
    unbind() {
      Vue.$vuiLazyLoad.imgLength--;
      if (!Vue.$vuiLazyLoad.imgLength && evenFunction) {
        window.removeEventListener('scroll', evenFunction);
      }
    }
  };
};

function debounce(event, time) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      event.apply(this, args);
    }, time);
  };
}

Vue.directive('show-tips', {
  // el {element} 当前元素
  bind(el) {
    const curStyle = window.getComputedStyle(el, ''); // 获取当前元素的style
    const textSpan = document.createElement('span'); // 创建一个容器来记录文字的width
    // 设置新容器的字体样式，确保与当前需要隐藏的样式相同
    textSpan.style.fontSize = curStyle.fontSize;
    textSpan.style.fontWeight = curStyle.fontWeight;
    textSpan.style.fontFamily = curStyle.fontFamily;
    // 将容器插入body，如果不插入，offsetWidth为0
    document.body.appendChild(textSpan);
    // 设置新容器的文字
    textSpan.innerHTML = el.innerText;
    // 如果字体元素大于当前元素，则需要隐藏
    if (textSpan.offsetWidth > el.offsetWidth) {
      // 给当前元素设置超出隐藏
      el.style.overflow = 'hidden';
      el.style.textOverflow = 'ellipsis';
      el.style.whiteSpace = 'nowrap';
      // 鼠标移入
      el.onmouseenter = function(e) {
        // 创建浮层元素并设置样式
        const vcTooltipDom = document.createElement('div');
        vcTooltipDom.style.cssText = `
          max-width:400px;
          max-height: 400px;
          overflow: auto;
          position:absolute;
          top:${e.clientY + 5}px;
          left:${e.clientX}px;
          background: rgba(0, 0 , 0, .6);
          color:#fff;
          border-radius:5px;
          padding:10px;
          display:inline-block;
          font-size:12px;
          z-index:19999
        `;
        // 设置id方便寻找
        vcTooltipDom.setAttribute('id', 'vc-tooltip');
        // 将浮层插入到body中
        document.body.appendChild(vcTooltipDom);
        // 浮层中的文字
        document.getElementById('vc-tooltip').innerHTML = el.innerText;
      };
      // 鼠标移出
      el.onmouseleave = function() {
        // 找到浮层元素并移出
        const vcTooltipDom = document.getElementById('vc-tooltip');
        vcTooltipDom && document.body.removeChild(vcTooltipDom);
      };
    }
    // 记得移除刚刚创建的记录文字的容器
    document.body.removeChild(textSpan);
  },
  // 指令与元素解绑时
  unbind() {
    // 找到浮层元素并移除
    const vcTooltipDom = document.getElementById('vc-tooltip');
    vcTooltipDom && document.body.removeChild(vcTooltipDom);
  }
});

Vue.directive('lazy', lazyLoad);
