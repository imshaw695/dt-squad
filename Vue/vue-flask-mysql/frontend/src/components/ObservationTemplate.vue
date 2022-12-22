<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ObservationTemplate",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getResponse() {
      const path = "http://127.0.0.1:5000/api_ivan";
      axios
        .post(path)
        .then((res) => {
          console.log(res.data);
          this.msg = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    create_user() {
      const payload = {};
      payload.encoded_jwt = "this.user.encoded_jwt";
      payload.model_name = "User";
      payload.operation = "update";
      payload.email = "a@b.com";
      payload.password = "a@b.com";

      const request_options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer my-token',
        },
        body: JSON.stringify(payload),
      };
      const url = "http://127.0.0.1:5000/api_ivan_add_user";
      fetch(url, request_options)
        .then((response) => response.json())
        .then((data) => {
          if (data.rc == 0) {
            this.messages.addMessage(data.message);
          } else {
            // The update was rejected so we need to get a fresh copy of the user data
            const retailer_id = user.retailer_id;
            this.getUsersAtRetailer(retailer_id);
            this.messages.addMessage(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // this.getResponse();
    this.create_user();
  },
};
</script>