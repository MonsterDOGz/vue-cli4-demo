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
    <the-test-attrs label="label" value="value" ok="ok" v-bind.sync="obj">
      <template #default="scopedInfo">
        {{ scopedInfo.info.sex }}
      </template>
    </the-test-attrs>
    <app-btn @click="shuffle">Shuffle</app-btn>
    <app-btn @click="addNum">add</app-btn>
    <app-btn @click="remove">remove</app-btn>
    <transition-group name="list-complete" tag="p">
      <span v-for="item of arr" :key="item" class="list-complete-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import TheTestOneRoom from './TheTestOneRoom';
export default {
  components: {
    TheTestOneRoom,
    TheTestAttrs: {
      template: `<div @click="$emit('update:a', 3)">
      {{ label }}
      {{ a }}
      <slot name="default" :info="info"></slot>
      <TheTestAttrsTwo v-bind="$attrs" />
      </div>`,
      inheritAttrs: false,
      props: {
        label: {
          type: String
        },
        a: {
          type: Number
        }
      },
      components: {
        TheTestAttrsTwo: {
          template: `<div>{{ $attrs }}</div>`
        }
      },
      data() {
        return {
          info: {
            name: 'zhou',
            sex: '男'
          }
        };
      },
      created() {
        console.log(this.a);
      }
    }
  },

  data() {
    return {
      visibleDialog: false,
      loading: false,
      cLoading: false,
      obj: {
        a: 1,
        b: 2
      },
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    };
  },

  created() {
    this.add();
    const numbers = [];
    const proxy = new Proxy(numbers, {
      set(target, key, value) {
        if (value < 0) {
          value = 0;
        } else if (value > 100) {
          value = 100;
        }
        target[key] = value;
        // 对于set 来说，如果操作成功必须返回true, 否则会被视为失败
        return true;
      }
    });

    proxy.push(1);
    proxy.push(101);
    proxy.push(-10);
    // 输出 [1, 100, 0]
    console.log(numbers);
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
      console.log(rest);
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
      var result = await Promise.all(promises);
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
    },

    addNum() {
      this.arr.splice(this.randomIndex(), 0, this.nextNum++);
    },

    remove: function() {
      this.arr.splice(this.randomIndex(), 1);
    },

    randomIndex: function() {
      return Math.floor(Math.random() * this.arr.length);
    },

    shuffle: function() {
      this.arr = _.shuffle(this.arr);
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
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
}
</style>
