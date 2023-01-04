<template>
  <div>
    <div hidden>
      The flag below is maintained by setTimeout method in the created section
      {{ needsVueRefresh }}
      It is here to force the component to update when any new change occurs in
      the underlying data The vue reactive framework detects that it has changed
      and forces the component to refresh
    </div>
    <h1>Create user</h1>
    <h1>{{ this.message }}</h1>
    <h1>{{ this.user.encoded_jwt }}</h1>
    <h1>{{ this.user.email }}</h1>
    <h1>{{ this.email }}</h1>
    <h1>{{ this.user.name }}</h1>
    <form method="post">
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" v-model="email" /><br />
      <label for="password">Password:</label><br />
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
      /><br /><br />
      <button type="button" @click="this.createUser(this.email, this.password)">
        submit
      </button>
    </form>
    <p>{{ user }} {{ password }}</p>
  </div>
</template>
  
  <script>
export default {
  name: "CreateUser",
  data() {
    return {
      message: "",
      message2: "",
      email: "ivan.shaw695@gmail.com",
      password: "Samsung695",
      needsVueRefresh: { data: false, keepLooping: false },
      messageCount: 0,
    };
  },
  props: ["user"],
  methods: {
    vueRefresh() {
      try {
        this.needsVueRefresh.data = this.user.email;
      } catch (error) {}
      if (this.needsVueRefresh.keepLooping) {
        const myTimeout = setTimeout(this.vueRefresh, 500);
      }
      if (this.user.logged_in == false) {
        
      }
    },
    createUser(email, password) {
      this.message = this.user.login(email, password);
    }
  },
  created() {
    // this.getResponse();
    // this.login();
    this.needsVueRefresh.keepLooping = true;
    this.vueRefresh();
  },
  beforeUnmount() {
    // we are leaving the page so don't need to keep refershing the local list
    this.needsVueRefresh.keepLooping = false;
  },
};
</script>