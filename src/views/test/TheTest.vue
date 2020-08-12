<template>
  <div class="test">
    <el-button @click="visibleDialog = !visibleDialog">按钮</el-button>
    <app-dialog
      title="提示"
      :visible.sync="visibleDialog"
      @confirm="$_handleConfirm"
      @cancel="$_handleCancel"
      >这是一段内容</app-dialog
    >
    <app-btn @click="b">上一步</app-btn>
    <app-btn @click="a">下一步</app-btn>
    <!-- ---------------插槽--------------- -->
    <the-test-one-room>
      <template #todo="{ todo }">
        <span v-if="todo.isComplete">(OK)</span>
        {{ todo.text }}
      </template>
    </the-test-one-room>
    <!-- 自定义指令 -->
    <div class="test_box" v-cLoading="cLoading"></div>
  </div>
</template>

<script>
import TheTestOneRoom from './TheTestOneRoom';
export default {
  components: {
    TheTestOneRoom
  },

  data() {
    return {
      visibleDialog: false,
      loading: false,
      cLoading: false
    };
  },

  created() {
    this.add();
  },

  pageVisible() {
    console.log('页面显示出来了');
  },

  pageHidden() {
    console.log('页面隐藏了');
  },

  methods: {
    a() {
      this.cLoading = true;
      setTimeout(() => {
        this.cLoading = false;
      }, 3000);
    },

    b() {
      this.loading = this.$cLoading({ text: '正在加载中...' });
      setTimeout(() => {
        this.loading.close();
      }, 3000);
    },

    $_handleConfirm() {
      this.visibleDialog = !this.visibleDialog;
    },

    $_handleCancel() {
      this.visibleDialog = !this.visibleDialog;
    },

    asyncAdd(a, b, callback) {
      setTimeout(function() {
        callback(null, a + b);
      }, 1000);
    },

    async sum(...rest) {
      if (rest.length <= 1) {
        return rest[0] || 0;
      }
      let promises = [];
      for (let i = 0; i < rest.length; i += 2) {
        promises.push(
          new Promise(resolve => {
            if (rest[i + 1] === undefined) {
              resolve(rest[i]);
            } else {
              this.asyncAdd(rest[i], rest[i + 1], (_, res) => {
                resolve(res);
              });
            }
          })
        );
      }
      const result = await Promise.all(promises);
      // eslint-disable-next-line no-return-await
      return await this.sum(...result);
    },

    add() {
      let start = window.performance.now();
      this.sum(1, 2, 3, 4, 5, 6).then(res => {
        // 请保证在调用sum方法之后，返回结果21
        console.log(res);
        console.log(`程序执行共耗时: ${window.performance.now() - start}`);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  .btn + .btn {
    margin-left: 40px;
  }
  .test_box {
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
