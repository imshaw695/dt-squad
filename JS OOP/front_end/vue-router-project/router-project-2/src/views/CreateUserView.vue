<template>
  <div class="container">
    <p>{{ this.users }}</p>
    <h1 class="display-5">Create Login</h1>
    <form action="">
      <div class="row mb-2">
        <div class="col-1 mt-2">
          <label class="form-label" for="username">User</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.users.new_user_name"
            class="form-control"
            id="username"
            type="text"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-1 mt-2">
          <label class="form-label" for="password">Password</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.users.new_user_password"
            class="form-control"
            id="password"
            type="password"
          />
        </div>
        <div class="col-3">
          <button
            type="button"
            @click="this.add_user()"
            class="btn btn-primary"
          >
            Create
          </button>
        </div>
      </div>
    </form>
    <h1 class="display-5">Delete Login</h1>
    <form action="">
      <div class="row mb-2">
        <div class="col-1 mt-2">
          <label class="form-label" for="user">User</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.users.user_to_delete"
            class="form-control"
            id="user"
            type="text"
          />
        </div>
        <div class="col-3">
          <button
            type="button"
            @click="this.users.delete_user()"
            class="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  props: ["user", "users"],
  methods: {
    encrypt_password() {
      const key = "123456";
      const encrypted_password = CryptoJS.AES.encrypt(
        this.users.new_user_password,
        key
      ).toString();
      console.log("encrypted password:" + encrypted_password);
      return encrypted_password;
    },
    add_user() {
      const encrypted_password = this.encrypt_password();
      this.users.set_user(encrypted_password);
    },
  },
  created() {
    // if (this.user.name != "Ivan") {
    //     this.$router.push({ name: 'home' });
    //     alert("You do not have access to this page.")
    // }
  },
};
</script>