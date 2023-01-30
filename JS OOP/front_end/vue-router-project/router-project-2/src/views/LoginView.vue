<template>
  <div class="container">
    <p>{{ this.users.current_user }}</p>
    <h1 class="display-3">Login</h1>
    <form action="">
      <div class="row mb-2">
        <div class="col-1 mt-2">
          <label class="form-label" for="user">User</label>
        </div>
        <div class="col-6">
          <input
            v-model="this.user.user_name"
            class="form-control"
            id="user"
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
            v-model="this.user.user_password"
            class="form-control"
            id="password"
            type="password"
          />
        </div>
        <div class="col-3">
          <button type="button" @click="this.login()" class="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  data() {
    return {};
  },
  props: ["users","user"],
  methods: {
    // encryption is different every time but decryption is the same, so I have stopped encrypting on this end.
    // encrypt_password() {
    //   const encrypted_password = CryptoJS.AES.encrypt(
    //     this.user.user_password,
    //     "key",
    //     { mode: CryptoJS.mode.ECB }
    //   ).toString();
    //   console.log(encrypted_password);
    //   this.user.user_password = "";
    //   return encrypted_password;
    // },
    login() {
      // const encrypted_password = this.encrypt_password();
      this.user.login();
    },
    // check_logged_in() {
    //   this.user.check_logged_in();
    //   console.log("inside check_logged_in on vue page")
    //   setTimeout(this.check_logged_in, 5000)
    // }
  },
  // created() {
  //       this.check_logged_in();
  //   },
};
</script>