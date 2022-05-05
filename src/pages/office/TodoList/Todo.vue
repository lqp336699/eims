<template>
  <li :class="{ completed: todo.Done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.Done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <label
        @dblclick="editing = true"
        @click="selectTodo(todo)"
        v-text="todo.Topic"
      />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.Topic"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script>

export default {
  name: "Todo",
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus();
        });
      }
    },
  },
  props: {
    todo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    deleteTodo(todo) {
      this.$emit("deleteTodo", todo);
    },
    editTodo({ todo, value }) {
      this.$emit("editTodo", { todo, value });
    },
    toggleTodo(todo) {
      this.$emit("toggleTodo", todo);
    },
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.deleteTodo({
          todo,
        });
      } else if (this.editing) {
        this.editTodo({
          todo,
          value,
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.Topic;
      this.editing = false;
    },
    selectTodo(todo) {
      //console.log(todo)
      this.$emit("selectTodo", todo);
    },
  },
};
</script>
