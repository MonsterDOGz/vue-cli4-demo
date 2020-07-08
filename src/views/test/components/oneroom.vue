<template>
  <ul>
    <li v-for="(todo, index) of todolist" :key="index">
      <slot name="todo" :todo="todo">
        {{todo.text}}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      todolist: [
        {
          text: 'a',
          isComplete: true
        },
        {
          text: 'b',
          isComplete: false
        },
        {
          text: 'c',
          isComplete: true
        }
      ]
    };
  }
};
</script>

<style>

</style>
