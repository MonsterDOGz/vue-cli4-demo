<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 16:13:28
  * @Description: 用于签章pdf文件
-->
<template>
  <div class="pdf">
    <div class="pdfBox">
      <div class="ui-h100">
        <!-- 主体部分 -->
        <div class="sign_warp">
          <!-- 左边 -->
          <div class="sign_left">
            <h1 class="leftTitle">
              文件
              <span class="contractNum">（{{ docsList.length }}份）</span>
            </h1>
            <ul id="docsList" class="docsList">
              <li
                v-for="(item, index) of docsList"
                :key="index"
                :class="{ current: docsCurrentNumber === index }"
                @click="changeDocs($event, index)"
                :title="item.name"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <!-- 中间 -->
          <div class="sign-middle" id="signMiddle">
            <div class="middleTitle">
              <div class="middleTitleBox">
                <div class="tipBox"></div>
                <div class="operationBox">
                  <div class="sliderBox">
                    <span class="slider">
                      <el-slider
                        v-model="scale"
                        :min="0.5"
                        :max="3"
                        :step="0.25"
                        @change="changeSlider"
                      ></el-slider>
                    </span>
                    <span class="sliderNum">{{ scale * 100 }}%</span>
                  </div>
                  <div class="pageBox">
                    <el-input
                      v-model="nowPage"
                      class="nowPage"
                      @input="validationPage($event)"
                    ></el-input>
                    &nbsp;&nbsp;/&nbsp;{{ allPage }}
                    <span class="jumpPage" @click="jumpPage">跳转</span>
                  </div>
                </div>
                <div class="tipBox"></div>
              </div>
            </div>
            <div
              class="sign_content"
              id="signContainer"
              v-if="renderSuc"
              v-loading="pdfLoading"
              element-loading-text="拼命加载中..."
            >
              <div
                v-for="(item, index) of pdfNumPages"
                :key="index"
                :id="'pageView_' + item.num"
                class="pageView"
                @dragenter="ondragenter($event)"
                @dragover="ondragover($event)"
                @dragleave="ondragleave($event)"
                @drop="ondrop($event, item.num)"
              >
                <canvas :id="'pageCanvas_' + item.num" class="pageCanvas"></canvas>
              </div>
            </div>
            <div class="arrow">
              <i
                class="iconfont iconxiangshang iconArrow arrow-top"
                @click="rolling(0)"
                title="前往顶部"
              ></i>
              <i
                class="iconfont iconxiangxia iconArrow arrow-bottom"
                @click="rolling(docsHeight)"
                title="前往底部"
              ></i>
            </div>
          </div>
          <!-- 右边 -->
          <div class="sign_right">
            <h1 class="rightTitle">任务状态</h1>
            <!-- 签订前 -->
            <div
              class="signBefore"
              v-if="signRight && this.docsList[this.docsCurrentNumber].isCanSign === true"
            >
              <div id="signList" class="signList">
                <div
                  v-for="(item, index) of sealList"
                  :key="index"
                  class="sealItems"
                  :sealId="item.sealId"
                  draggable="true"
                  @dragstart="ondragstart($event, { sealImg: item.sealImg, sealId: item.sealId })"
                  @dragend="ondragend($event)"
                  :style="{ backgroundImage: `url(${item.sealImg})` }"
                ></div>
              </div>
              <p class="sealTip">提示：请先将印章拖动到需要盖章的位置，再点击确认签署按钮！</p>
              <div class="seal-btn-wrapper">
                <el-button type="primary" @click="submitSign()">确认签署</el-button>
              </div>
            </div>
            <!-- 签订后 -->
            <div
              class="signAfter"
              v-if="signRight && this.docsList[this.docsCurrentNumber].isCanSign === false"
            >
              <div class="sign-success">
                <i class="iconfont iconwancheng icon-suc"></i>
                <p>签署完成</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 关闭按钮 -->
        <div class="previewClose" @click="closePact">
          <i class="iconfont iconquxiao"></i>
        </div>
      </div>
    </div>
    <!-- 身份验证组件 -->
    <validation v-if="validationBox" v-on:toFatherValidation="closeValidation"></validation>
  </div>
</template>

<script>
import validation from '@/components/localComponents/validation.vue'; // 密码验证框弹框
import { pdfjsLib, CMAP_URL } from '@/common/utils/pdfjs.js';
export default {
  components: {
    validation
  },
  /**
   * 一个数组，从父组件获取的签章有关信息，必须包含以下字段
   * @param {Array} info
   * [{
   *    name: String, // 签章文件名称
   *    uploadId: Number, // 签章pdf文件的上传id
   *    isEncryption: Boolean, // 文件是否加密
   *    isCanSign: Boolean // 是否可以签章
   * }]
   */
  props: {
    info: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      docsList: [], // 文件数组
      sealList: [], // 印章数组
      docsCurrentNumber: 0, // 数组docsList下标（当前操作的pdf文件下标值）
      pdfNumPages: [], // 中间展示的多页pdf数组
      renderSuc: false, // 是否渲染中间pdf展示模块
      signRight: true, // 是否渲染右侧操作模块
      validationBox: false, // 身份验证框开关
      posBean: [], // 发送给后端的签章坐标页码等信息二维数组
      posX: null, // 当前文件印章x坐标（原点在每页左下角）
      posY: null, // 当前文件印章y坐标（原点在每页左下角）
      page: '', // 当前文件印章所属页码
      pdfLoading: '', // pdf加载Loading
      loading: '', // loading
      scale: 1, // 缩放比例（1为原始尺寸）
      loadingTask: '', // pdfjs解析出的pdf对象
      allPage: 1, // 当前文件总的页码数
      nowPage: 1, // 当前查看的页码
      docsHeight: '', // 文档总高度
      ratio: 1 // 浏览器缩放比例
    };
  },
  watch: {
    info: {
      handler() {
        this.getPdf(); // 获取传入的pdf文件信息
        this.getSeal(); // 获取用户章印
        this.init(); // 初始化
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // ---------------------------------------根据pdf文件uploadId，调用pdf文件接口，获取pdf文件url以及用户章印-----------------------------------
    // 获取传入的pdf文件信息
    getPdf() {
      console.log(this.info);
      this.docsList = this.info; // 获取父组件传入的所有文件信息
      this.docsList.forEach((item, index, arr) => {
        arr[index].loadType = 'byFilePath';
        arr[index].fileUrl = '';
      });
      this.getFileUrl(this.docsList[this.docsCurrentNumber]); // 获取第一个pdf文件的url，并解析pdf
    },
    // 获取用户章印
    getSeal() {
      this.sealList = [];
      this.$api.baseApi.apiESignatureSealData().then(res => {
        const { data } = res;
        if (data.code === 200) {
          this.sealList = [];
          var temp = {};
          temp.sealImg = 'data:image/png;base64,' + data.data;
          temp.sealId = '签署人标识';
          this.sealList.push(temp);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 根据传入的uploadId获取文件url
    getFileUrl(val) {
      this.renderSuc = false; // 销毁pdf盒子
      this.$api.baseApi
        .apiFileUrl({
          fileUploadId: val.uploadId, // 文件上传id
          isEncryption: val.isEncryption // 文件是否加密（默认为false不加密）
        })
        .then(res => {
          // 将文件url放入文件数组对象中
          this.docsList.forEach((item, index, arr) => {
            if (val.uploadId === item.uploadId) {
              arr[index].fileUrl = res.data;
              this.rendererPdf(this.docsCurrentNumber); // 解析pdf
              this.$nextTick(() => {
                this.renderSuc = true; // 重新渲染pdf盒子
              });
            }
          });
        });
    },
    // 确认签署按钮
    submitSign() {
      console.log(this.posBean);
      const _posBeanItem = this.posBean[this.docsCurrentNumber];
      // 确定签章数只能是一个
      if (_posBeanItem.length > 1 || _posBeanItem.length < 1) {
        this.$alert(
          _posBeanItem.length > 1
            ? '印章数只能是一个！'
            : '请先将印章拖动到需要盖章的位置，再点击确认签署按钮！',
          '提示',
          {
            confirmButtonText: '确定',
            callback: action => {}
          }
        );
        return;
      }
      // 如果当前文件只有1个签章，获取该签章的XY轴坐标和页码
      this.posX = _posBeanItem[0].posX;
      this.posY = _posBeanItem[0].posY;
      this.page = _posBeanItem[0].posPage;
      // 打开身份验证弹框
      this.validationBox = true;
    },
    // 身份验证弹框回调接收方法
    closeValidation(data) {
      this.validationBox = false;
      // 如果身份验证弹框有返回值，调用签章统一接口
      if (data) {
        this.getSealTheObject(data);
      } else {
        this.$message('已取消');
      }
    },
    // 调用统一签章接口
    getSealTheObject(data) {
      const _dosc = this.docsList[this.docsCurrentNumber];
      this.openFullScreen(); // loading
      var sealInfo = {};
      Object.assign(sealInfo, {
        fileUploadId: _dosc.uploadId, // 文件上传id
        posX: this.posX, // 签章x位置
        posY: this.posY, // 签章y位置
        page: this.page, // 签章页码
        status: data.status, // 状态
        pwd: data.pwd // 密钥
      });
      this.$api.baseApi.apiSealTheObject(sealInfo).then(res => {
        this.loading.close();
        const { data } = res;
        if (data.code === 200 && data.data.flag) {
          _dosc.isCanSign = false; // 签章完成
          // 重新渲染右侧模块
          this.signRight = false;
          this.$nextTick(() => {
            this.signRight = true;
          });
          this.$emit('toFatherClose', _dosc); // 去调用父页面的签章接口二（业务接口）,提示在业务接口成功之后
        } else {
          this.$message.error(data.data.msg);
        }
      });
    },
    // 关闭签章弹框
    closePact() {
      this.$emit('toFatherClose');
    },
    // loading效果
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$once('hook:beforeDestroy', () => {
        if (this.loading) {
          this.loading.close();
        }
      });
    },
    // 放大、缩小文件
    changeSlider() {
      this.renderer(); // 解析pdf
    },
    // 滚动
    rolling(scrollY) {
      const signContainer = document.getElementById('signContainer');
      if (!signContainer) {
        return;
      }
      signContainer.scrollTo(0, scrollY);
    },
    // 跳转页
    jumpPage() {
      const signContainer = document.getElementById('signContainer');
      if (!signContainer) {
        return;
      }
      const pageD = document.getElementById('pageView_' + this.nowPage);
      signContainer.scrollTo(0, pageD.offsetTop);
    },
    // 验证输入的页码
    validationPage(value) {
      const { allPage } = this;
      const reg = /^\+?[1-9][0-9]*$/;
      if (value && reg.test(value)) {
        if (value <= allPage) {
          if (!isNaN(parseInt(value))) {
            this.nowPage = parseInt(value);
          } else {
            this.nowPage = '';
          }
        } else {
          this.$message('输入页码过大！');
          this.nowPage = allPage;
        }
      } else {
        this.$message('请输入正确的页码！');
        this.nowPage = 1;
      }
    },
    // 计算文档总高度
    calculateDocs() {
      this.docsHeight = document.getElementById('signContainer').scrollHeight;
    },
    // 获取屏幕缩放比例
    detectZoom() {
      var ratio = 1;
      var screen = window.screen;
      var ua = navigator.userAgent.toLowerCase();
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
      }
      if (ratio) {
        // ratio = Math.round(ratio * 100)
        ratio = ratio / 2;
      }
      return ratio;
    },
    // ------------------------------------------渲染pdf、印章相关---------------------------------------------
    // 点击左侧切换文档
    changeDocs(event, docsNumber) {
      this.docsCurrentNumber = docsNumber; // 获取当前处于第几个文件的位置
      this.getFileUrl(this.docsList[docsNumber]); // 重新获取文件pdf
      this.init(); // 初始化
    },
    // 初始化
    init() {
      // 初始化 posBean
      this.posBean[this.docsCurrentNumber] = [];
      this.pdfNumPages = [];
      this.nowPage = 1;
      this.allPage = 1;
      this.scale = 1;
    },
    // 解析pdf
    rendererPdf(docsNumber) {
      this.pdfLoading = true; // 打开pdfLoading效果
      // 获取文档方式
      const loadType = this.docsList[docsNumber].loadType;
      // 获取文档值
      const docValue = this.docsList[docsNumber].fileUrl;
      // 获取文件base64码
      const base64Con = this.docsList[docsNumber].base64Con;
      // PDF文件
      var pdfValue = null;
      // 判断文件类型，如果是base64型需要先解析再处理；如果是url链接直接处理
      if (loadType === 'byBase64') {
        // 通过Base64获取PDF
        var pdfBase64 = base64Con;
        var pdfFileBinary = this.convertDataURIToBinary(pdfBase64);
        pdfValue = pdfFileBinary;
      } else {
        pdfValue = docValue;
      }
      console.log('pdfValue', pdfValue);
      // ---------------------------------------------------------------------
      var pdfInfo = {
        url: pdfValue,
        cMapUrl: CMAP_URL,
        cMapPacked: true
      };
      this.loadingTask = pdfjsLib.getDocument(pdfInfo);
      // ---------------------------------------------------------------------
      // 解析pdf
      this.renderer();
    },
    // 循环渲染 pages
    renderer() {
      if (!this.loadingTask) {
        return;
      }
      this.loadingTask.promise.then(
        pdf => {
          this.allPage = pdf.numPages; // 保存当前文件总的页码数
          for (let index = 1; index <= pdf.numPages; index++) {
            if (this.pdfNumPages.length < pdf.numPages) {
              this.pdfNumPages = this.pdfNumPages.concat({ num: index });
            }
            pdf &&
              pdf.getPage(index).then(page => {
                // pdf 解析的比例， 获取原始文档尺寸 scale = 1; 如果文档放大，印章x y 需要同比例缩放
                var scale = this.scale;
                var viewport = page.getViewport({ scale: scale });
                // Prepare canvas using PDF page dimensions
                // 遍历 pdf.numPages， 传递 不同的 Canvas ID
                var canvas = document.getElementById('pageCanvas_' + index);
                var context = canvas.getContext('2d');
                // 设置 canvas
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // 设置外层大小
                var pageView = document.getElementById('pageView_' + index);
                pageView.style.height = viewport.height + 'px';
                pageView.style.width = viewport.width + 'px';
                // Render PDF page into canvas context
                page
                  .render({
                    canvasContext: context,
                    viewport: viewport
                  })
                  .then(
                    () => {
                      this.pdfLoading = false; // pdf渲染完成，关闭pdfLoading效果
                      this.calculateDocs(); // 计算文档总高度
                      this.rendererSeal(index, pageView.offsetHeight); // 渲染印章
                    },
                    function err() {
                      console.log('Page error');
                    }
                  );
              });
          }
        },
        function (reason) {
          // PDF loading error
          console.error(reason);
        }
      );
    },
    // 缩放文件后，调整印章位置大小
    rendererSeal(pageNumber, pageViewOffsetHeight) {
      const _posBeanDosc = this.posBean[this.docsCurrentNumber];
      _posBeanDosc.length &&
        _posBeanDosc.forEach(item => {
          if (item.posPage === pageNumber) {
            var sealDom = document.getElementById('drag' + item.id);
            sealDom.style.cssText = this.changeSealStyle(item, pageViewOffsetHeight);
          }
        });
    },
    // 新增印章dom方法
    rendererSealTemplate(dragData, pageViewOffsetHeight) {
      const _posBeanDosc = this.posBean[this.docsCurrentNumber];
      var pageView_ = document.getElementById('pageView_' + dragData.posPage);
      // 创建一个印章
      var strongobj = document.createElement('div');
      strongobj.id = 'drag' + dragData.id;
      strongobj.className = 'sealView';
      strongobj.style.cssText = this.changeSealStyle(dragData, pageViewOffsetHeight);
      pageView_.appendChild(strongobj);
      // 创建一个删除按钮
      var seal = document.getElementById('drag' + dragData.id);
      var sealDel = document.createElement('p');
      sealDel.className = 'sealDel iconfont iconquxiao sealDelHover';
      // 绑定删除印章事件
      sealDel.addEventListener('click', () => {
        for (let index = 0; index < _posBeanDosc.length; index++) {
          if (_posBeanDosc[index].id === dragData.id) {
            _posBeanDosc.splice(index, 1);
            break;
          }
        }
        var drag = document.getElementById('drag' + dragData.id);
        drag.remove();
      });
      seal.appendChild(sealDel);
    },
    // 改变印章样式
    changeSealStyle(val, pageViewOffsetHeight) {
      const { scale } = this;
      return `width: ${val.width * scale}px;
      height: ${val.height * scale}px; left: ${val.posX * scale - (val.width * scale) / 2}px;
      top:${pageViewOffsetHeight - (val.height * scale) / 2 - val.posY * scale}px;
      background-image: url(${val.sealImg});`;
    },
    // 将encodeBase64解码
    convertDataURIToBinary(dataURI) {
      var raw = window.atob(dataURI);
      var rawLength = raw.length;
      // 转换成pdf.js能直接解析的Uint8Array类型,见pdf.js-4068
      var array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    },
    // -------------------------------------------拖拽事件---------------------------------------------
    // 用户开始拖动元素时触发
    ondragstart(event, sealData) {
      // this.ratio = this.detectZoom() // 获取浏览器缩放比例
      // console.log('start')
      // 或者通过获取 sealId 遍历检索相应的对象获取印章数据
      // console.log(event.target.getAttribute('sealId'))
      const pos = {
        posX: 0, // 签署位置横坐标
        posY: 0 // 签署位置纵坐标
      };
      const dragData = Object.assign(pos, sealData);
      event.dataTransfer.setData('Text', JSON.stringify(dragData));
      //  IE下没有 setDragImage 这个属性
      if (event.dataTransfer.setDragImage) {
        // 设置鼠标位置
        event.dataTransfer.setDragImage(event.target, 60, 60);
      }
    },
    // 用户完成元素拖动时触发
    ondragend(event) {
      // console.log('end')
    },
    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    ondragenter(event) {
      // console.log('enter')
    },
    // 当某被拖动的对象在另一对象容器内拖动时触发此事件
    ondragover(event) {
      event.preventDefault();
      event.stopPropagation();
      // console.log('over')
    },
    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    ondragleave(event) {
      // console.log('leave')
    },
    // 在一个拖动过程中，释放鼠标键时触发此事件
    ondrop(event, page) {
      // console.log('drop')
      const { scale } = this;
      const leftBlank = document.documentElement.clientWidth * 0.05; // 左侧空白部分
      const topBlank = document.documentElement.clientHeight * 0.05; // 上方空白部分
      var scrollTopDistance = 0; // 外部滚动条垂直方向滚动距离
      if (document.body && document.body.scrollTop) {
        scrollTopDistance = document.body.scrollTop;
      }
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTopDistance = document.documentElement.scrollTop;
      }
      event.preventDefault();
      event.stopPropagation();
      const dragData = JSON.parse(event.dataTransfer.getData('Text'));
      const pdf = document.getElementById('signMiddle');
      const signContainer = document.getElementById('signContainer');
      const pageView = document.getElementById('pageView_' + page);
      // 实际保存的X、Y轴坐标，都要按照原始尺寸的文件宽高算
      dragData.posX =
        (event.pageX -
          pdf.offsetLeft -
          pageView.offsetLeft -
          leftBlank +
          signContainer.scrollLeft) /
        scale;
      dragData.posY =
        (pageView.offsetHeight -
          (event.pageY -
            (pdf.offsetTop + pageView.offsetTop - signContainer.scrollTop) -
            topBlank -
            scrollTopDistance)) /
        scale;
      // 存储提交印章
      dragData.posPage = page;
      dragData.width = dragData.width || 120;
      dragData.height = dragData.height || 120;
      dragData.id = 'seal_' + Date.parse(new Date());
      this.posBean[this.docsCurrentNumber].push(dragData);
      // 直接组装dom，append 插入到 pageView_1
      this.rendererSealTemplate(dragData, pageView.offsetHeight);
    }
  }
};
</script>

<style lang="scss" scoped>
/* 必要 */
.pdf {
  width: 100%;
  height: 100%;
  background: rgba(16, 16, 16, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  text-align: left;
  overflow: hidden;

  .pdfBox {
    width: 90%;
    height: 90%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    overflow: hidden;

    .ui-h100 {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      // 主体部分
      .sign_warp {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 278px 0 200px;
        // width: 100%;
        height: 100%;
        background: #e4e9ee;

        // 左侧
        .sign_left {
          position: absolute;
          z-index: 200;
          width: 199px;
          top: 0;
          left: 0;
          height: 100%;
          background-color: #fff;
          border-right: 1px solid #e4e4e4;

          .leftTitle {
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            border-bottom: 1px solid #e4e4e4;

            .contractNum {
              font-size: 14px;
              color: #c0c4cc;
            }
          }

          .docsList {
            padding: 0;

            li {
              padding: 5px 15px;
              line-height: 30px;
              list-style: none;
              cursor: pointer;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .current {
              background-color: #e3f0fc;
              color: #0089ff;
            }
          }
        }

        // 中间
        .sign-middle {
          height: 100%;
          position: relative;

          .middleTitle {
            width: 100%;
            min-width: 595px;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #e4e4e4;
            background-color: #fff;

            .middleTitleBox {
              display: flex;
              justify-content: space-between;

              .tipBox {
                display: inline-block;
                height: 100%;
                min-width: 100px;
              }

              .operationBox {
                display: inline-block;
                min-width: 480px;
                height: 40px;

                .sliderBox {
                  display: inline-block;
                  width: 270px;
                  border-left: 1px solid #e4e4e4;
                  border-right: 1px solid #e4e4e4;
                  line-height: 0;

                  .slider {
                    display: inline-block;
                    width: 185px;
                    margin-left: 15px;

                    >>> .el-slider__button-wrapper {
                      z-index: 101;
                    }
                  }

                  .sliderNum {
                    vertical-align: top;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                  }
                }

                .pageBox {
                  display: inline-block;
                  width: 200px;
                  height: 40px;
                  vertical-align: top;
                  border-right: 1px solid #e4e4e4;
                  font-size: 16px;
                  position: relative;

                  .nowPage {
                    display: inline-block;
                    width: 30px;
                    text-align: center;
                    margin-left: 40px;
                    font-size: 14px;
                    line-height: 14px;
                    border-bottom: 1px solid #e4e4e4;

                    >>> .el-input__inner {
                      line-height: 20px;
                      height: 20px;
                      border: none;
                      padding: 0;
                      text-align: center;
                    }
                  }

                  .jumpPage {
                    display: inline-block;
                    cursor: pointer;
                    position: absolute;
                    right: 10px;
                  }
                }
              }
            }
          }

          .sign_content {
            overflow-y: scroll;
            overflow-x: scroll;
            height: calc(100% - 41px);
            line-height: 0em;

            .pageView {
              position: relative;
              line-height: 0em;
              margin: 10px auto;

              .pageCanvas {
                position: absolute;
                left: 0;
                top: 0;
              }

              .sealView {
                position: relative;

                &:hover {
                  border: 1px solid rgba(255, 64, 64, 1) !important;
                }
              }
            }
          }

          .arrow {
            position: absolute;
            bottom: 40px;
            right: 40px;

            .iconArrow {
              display: block;
              width: 35px;
              height: 35px;
              text-align: center;
              line-height: 35px;
              border-radius: 50%;
              background-color: #303133;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              transition: 0.2s;

              &:hover {
                background-color: rgba(0, 0, 0, 1);
              }
            }

            .arrow-top {
              margin-bottom: 20px;
            }
          }
        }

        // 右侧
        .sign_right {
          position: absolute;
          width: 278px;
          top: 0;
          right: 0;
          z-index: 200;
          height: 100%;
          background-color: #fff;
          border-left: 1px solid #e4e4e4;

          .rightTitle {
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            // border-left 1px solid #e4e4e4
            border-bottom: 1px solid #e4e4e4;
          }

          .signBefore {
            .signList {
              padding: 20px;
              height: calc(100% - 40px - 124px - 85px);
              overflow-y: auto;
              box-sizing: border-box;

              .sealItems {
                width: 120px;
                height: 120px;
                cursor: pointer;
                background-repeat: no-repeat;
                background-size: contain;
                margin: 0 auto;
                border: 1px dashed #ff4040;
                box-sizing: border-box;
              }

              .sealItems + .sealItems {
                margin-top: 20px;
              }
            }

            .sealTip {
              color: red;
              line-height: 22px;
              padding: 20px;
              position: absolute;
              bottom: 80px;
              background-color: #fff;
              height: 84px;
            }

            .seal-btn-wrapper {
              position: absolute;
              bottom: 0;
              right: 0;
              box-sizing: border-box;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: flex-end;
              align-content: flex-end;
              padding: 23px 20px;
              width: 100%;
              border-top: 1px solid #e9e9e9;
              background: #fff;
              height: 85px;
            }
          }

          .signAfter {
            height: calc(100% - 41px);

            .sign-success {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;

              .icon-suc {
                color: #409eff;
                font-size: 36px;
              }

              p {
                margin-top: 10px;
              }
            }
          }
        }
      }

      // 关闭按钮
      .previewClose {
        background-color: #303133;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        top: -40px;
        right: -40px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          background-color: rgba(0, 0, 0, 1);
        }

        i {
          font-size: 25px;
          position: absolute;
          bottom: 14%;
          left: 14%;
          color: #fff;
        }
      }
    }
  }
}

>>> .sealView {
  position: absolute;
  background-size: cover;
  border: 1px dashed rgba(255, 64, 64, 0);

  &:hover {
    border: 1px dashed rgba(255, 64, 64, 1);
  }
}

>>> .sealView&:hover .sealDelHover {
  display: inline-block;
}

>>> .sealDel {
  display: none;
  position: absolute;
  top: 0%;
  right: 0%;
  transform: translate(50%, -50%);
  background-color: #ff4040;
  color: #fff;
  line-height: 14px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
}
</style>
