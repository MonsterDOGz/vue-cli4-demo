<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
    };
  },
  created () {
    // this.axios.get('/yifdApi/v1/api/enumUtil/region').then(res => {
    //   console.log(res);
    // });
  }
};
</script>
