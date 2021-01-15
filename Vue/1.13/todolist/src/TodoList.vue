<template>
  <div id="todolist">
    <input v-model="inputValue" />
    <span>{{ inputValue }}</span>
    <button @click="addItem">Add</button>
    <ul>
      <TodoItem v-for="(item,index) in todoList" :key="index" :content="item" :index="index" @delete="deleteItem(index)"></TodoItem>
    </ul>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem'

export default {
  components: { TodoItem },
  data () {
    return {
      inputValue: '',
      todoList: []
    }
  },
  methods: {
    addItem () {
      this.todoList.push(this.inputValue)
      this.inputValue = ''
    },
    deleteItem (index) {
      this.todoList.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
