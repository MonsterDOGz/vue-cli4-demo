<template>
  <div class="test">
    <div class="wrapper">
      <div class="item item1">1</div>
    </div>
    <el-button @click="clickBtn">{{num}}</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    };
  },
  methods: {
    clickBtn: _.debounce(
      function () {
        this.num++;
        console.log(this.num);
      }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.test {
  .wrapper {
    height: 500px;
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(5, 20%);
    .item {
      color: #fff;
      text-align: center;
      // border: 3px solid #fff;
      // line-height: 300px;
    }
    .item1 {
      background: rgba(255, 0, 0, .1);
      // grid-row: 1/-1;
      // grid-column: 2/span 2;
      grid-area: 1/4/6/5;
    }
  }
}
</style>
