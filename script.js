const Comments = {
    template: `
    <div>
        <h3>Comments</h3>
        <ul>
            <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
        </ul>
        <input v-model="newComment" placeholder="Add comments" />
        <button @click="submitComment"> Send</button>
    </div>
    `,
    props: {
        comments: Array,
    },
    data() {
        return {
            newComment: '',
        };
    },
    methods: {
        submitComment() {
            if (this.newComment) {
                this.$emit('add-comment', this.newComment);
                this.newComment = '';
            }
        },
    },
};

const Post = {
    template: `
    <div class="post">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <p>Number of comments: {{ commentsCount }}</p>
        <Comments @add-comment="addComment" :comments="comments" />
    </div>
    `,
    components: {
        Comments,
    },
    props: {
        title: String,
        content: String,
    },
    data() {
        return {
            comments: [],
        };
    },
    computed: {
        commentsCount() {
            return this.comments.length;
        },
    },
    methods: {
        addComment(comment) {
            this.comments.push(comment);
        },
    },
};

const TodoItem = {
    template: `
    <div class="todo-item">
        <input type="checkbox" v-model="item.completed" />
        <span :class="{ completed: item.completed }">{{ item.text }}</span>
        <button @click="remove">Remove</button>
    </div>
    `,
    props: ['item'],
    methods: {
        remove() {
            this.$emit('remove', this.item.id);
        }
    }
};

const TodoList = {
    template: `
    <div>
        <h2>Tasks</h2>
        <div v-for="item in items" :key="item.id">
            <TodoItem :item="item" @remove="removeItem"></TodoItem>
        </div>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" />
    </div>
    `,
    components: {
        TodoItem
    },
    props: ['items'],
    data() {
        return {
            newTodo: ''
        };
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim()) {
                const newItem = {
                    id: Date.now(),
                    text: this.newTodo,
                    completed: false
                };
                this.$emit('add', newItem);
                this.newTodo = '';
            }
        },
        removeItem(id) {
            this.$emit('remove', id);
        }
    }
};

const App = {
    template: `
    <div>
        <TodoList :items="todos" @add="addTodo" @remove="removeTodo"></TodoList>
        <Post title="The first entry" content="This is the content of the first entry." />
    </div>
    `,
    components: {
        TodoList,
        Post
    },
    data() {
        return {
            todos: []
        };
    },
    methods: {
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        }
    }
};

Vue.createApp(App).mount('#app');