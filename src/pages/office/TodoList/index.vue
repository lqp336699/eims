<template>
  <div class="layout">
    <div class="layout-side" style="width: 700px">
      <div class="todoapp">
        <!-- header -->
        <header class="header">
          <input
            class="new-todo"
            autocomplete="off"
            placeholder="新增任务，回车确认..."
            @keyup.enter="addTodo"
          />
        </header>
        <!-- main section -->
        <section v-show="todos.length" class="main">
          <input
            id="toggle-all"
            :checked="allChecked"
            class="toggle-all"
            type="checkbox"
            @change="toggleAll({ done: !allChecked })"
          />
          <label for="toggle-all" />
          <ul class="todo-list">
            <todo
              v-for="(todo, index) in filteredTodos"
              :key="index"
              :todo="todo"
              @toggleTodo="toggleTodo"
              @editTodo="editTodo"
              @deleteTodo="deleteTodo"
              @selectTodo="selectTodo"
            />
          </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
          <span class="todo-count">
            剩余：
            <strong>{{ remaining }}</strong>
            {{ remaining | pluralize("项") }}
          </span>
          <ul class="filters">
            <li v-for="(val, key) in filters" :key="key">
              <a
                :class="{ selected: visibility === key }"
                @click.prevent="visibility = key"
                >{{ key | capitalize }}</a
              >
            </li>
          </ul>
          <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
              Clear completed
            </button> -->
        </footer>
      </div>
    </div>
    <div class="layout-content" style="padding: 50px;">
      <el-form ref="form" :model="actRow" label-width="120px">
        <el-form-item label="主题">
          <el-input v-model="actRow.Topic"></el-input>
        </el-form-item>
        <el-form-item label="任务内容">
          <markdown-editor ref="markdownEditor" v-model="actRow.Detail" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="400px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTodo">保存更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import { toList } from "@/utils/";
import MarkdownEditor from '@/components/MarkdownEditor'
//import BaseUrl from "@/utils/global.js";

const STORAGE_KEY = "todos";
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.Done),
  completed: (todos) => todos.filter((todo) => todo.Done),
};
export default {
  components: { Todo, MarkdownEditor },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  },
  data() {
    return {
      visibility: "all",
      filters,
      //
      todos: [],
      total: 0,
      qry: {
        query: {
          userId: sessionStorage.userId,
        },
        page: { index: 1, size: 30 },
        cols: "Id,Topic,Done",
      },
      actRow: {},
    };
  },
  computed: {
    allChecked() {
      return this.todos.filter((todo) => todo.Done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter((todo) => !todo.Done).length;
    },
  },
  methods: {
    loadData() {
      // console.log(" this.qry", this.qry);
      this.$axios.post("api/oa/todo/list", this.qry).then((rsp) => {
        // console.log("todo", rsp);
        const { success, result, total } = rsp;
        if (success) {
          this.todos = result ? toList(result) : [];
          this.total = total;
        }
      });
    },
    // setLocalStorage() {
    //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    // },
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        let row = {
          Topic: text,
          Done: false,
        };
        //保存
        this.$axios.post("api/oa/todo/save", row).then((rsp) => {
          const { success, result, msg } = rsp;
          if (success) {
            row.Id = result;
            this.todos.push(row);
          } else {
            Message.warning(msg);
          }
        });
        //this.setLocalStorage();
      }
      e.target.value = "";
    },
    toggleTodo(val) {
      //完成标记
      this.$axios
        .post("api/oa/todo/done", { id: val.Id, done: !val.Done })
        .then((rsp) => {
          const { success, msg } = rsp;
          if (success) {
            val.Done = !val.Done;
          } else {
            this.$message.warning(msg);
          }
        });
    },
    deleteTodo(todo) {
      this.$axios.get("api/oa/todo/del/" + todo.Id).then((rsp) => {
        const { success, msg } = rsp;
        if (success) {
          this.todos.splice(this.todos.indexOf(todo), 1);
        } else {
          this.$message.warning(msg);
        }
      });
      //this.setLocalStorage();
    },
    selectTodo(todo) {
      //console.log('选择', todo)
      this.actRow = todo;
      if (this.actRow.Content) {
        //已有内容
      } else {
        this.$axios.get("api/oa/todo/" + todo.Id).then((rsp) => {
          const { success, result, msg } = rsp;
          if (success) {
            this.actRow = result;
            todo.Content = this.actRow.Content;
          } else {
            this.$message.warning(msg);
          }
        });
      }
    },
    editTodo({ todo, value }) {
      todo.Topic = value;
      this.$axios.post("api/oa/todo/save", todo).then((rsp) => {
        const { success, msg } = rsp;
        if (success) {
          this.$message.success("更新成功");
        } else {
          this.$message.warning(msg);
        }
      });
    },
    saveTodo() {
       this.$axios.post("api/oa/todo/save", this.actRow).then((rsp) => {
        const { success, msg } = rsp;
        if (success) {
          this.$message.success("更新成功");
        } else {
          this.$message.warning(msg);
        }
      });
    },
    clearCompleted() {
      // 清除已完成的任务
      this.$axios.get("api/oa/todo/clear").then((rsp) => {
        const { success, result, msg } = rsp;
        if (success) {
          this.$message.success("清理成功");
          //重新加载
          this.loadData();
        } else {
          this.$message.warning(msg);
        }
      });
      // this.todos = this.todos.filter((todo) => !todo.Done);
      // this.setLocalStorage();
    },
    toggleAll({ done }) {
      //切换所有
      let ids = [];
      for (let i = 0; i < thids.todos.length; i++) {
        ids.push(thids.todos[i].Id);
      }
      this.$axios
        .post("api/oa/todo/done", { ids: ids, done: done })
        .then((rsp) => {
          const { success, msg } = rsp;
          if (success) {
            Message.success("更新成功");
            this.todos.forEach((todo) => {
              todo.Done = done;
              this.setLocalStorage();
            });
          } else {
            Message.warning(msg);
          }
        });
      // this.todos.forEach((todo) => {
      //   todo.Done = done;
      //   this.setLocalStorage();
      // });
    },
  },
  mounted() {
    //console.log('userId', this.$store.state.user.userId)
    //console.log('userId_session', sessionStorage.userId)
    this.loadData();
  },
};
</script>

<style lang="scss">
@import "./index.scss";

.layout {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: calc(100vh - 84px);
  min-height: 50px;
  flex-wrap: nowrap;
}

.layout-v {
  flex-flow: column;
}

.layout-side {
  flex-shrink: 0;
  flex-grow: 0;
}

.layout-content {
  flex-grow: 1;
  overflow: hidden;
}
</style>
