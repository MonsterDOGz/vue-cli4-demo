<template>
  <!-- 自定义按钮 -->
  <span class="btn" @click="$_click">
    <slot></slot>
  </span>
</template>

<script>
export default {
  methods: {
    $_click () {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  padding: 0 24px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid rgba(188,188,188,1);
  border-radius: 15px;
  font-size: 14px;
  font-family: "PingFang SC", Helvetica, Arial, sans-serif;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(180deg, rgba(255,255,255,1), rgba(192,192,192,.3));
  &:hover {
    background: linear-gradient(180deg, rgba(251,251,251,1), rgba(160,160,160,.3));
  }
}
.btn + .btn {
  margin-left: 20px;
}
</style>
