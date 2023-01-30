<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand bg-light">
      <ul class="navbar-nav">
        <a href="#" class="navbar-brand">
          <img id="navy_img" src="@/assets/Logo_of_the_Royal_navy.svg.png" />
        </a>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link px-2">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/viewobservations" class="nav-link px-2"
            >View Observations</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/createobservation" class="nav-link px-2"
            >Create Observation</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink to="/data" class="nav-link px-2">View Data</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link px-2">Login</RouterLink>
        </li>
        <li class="nav-item">
          <!-- make it so this only shows if the admin is logged in -->
          <RouterLink to="/createuser" class="nav-link px-2"
            >Manage Users</RouterLink
          >
        </li>
        <li class="nav-item">
          <!-- make it so this only shows if the admin is logged in -->
          <RouterLink to="/testchart" class="nav-link px-2"
            >Test Chart</RouterLink
          >
        </li>
        <li class="nav-item">
          <a href="#" @click="this.user.logout()" class="nav-link px-2"
            >Logout</a
          >
        </li>
      </ul>
    </nav>
    <RouterView
      :users="users"
      :user="user"
      :observation="observation"
      :observations="observations"
      :config="config"
      :temperature_data="temperature_data"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import { Observation } from "../Observation.js";
import { Observations } from "../Observations.js";
// import temperature_chart_data from "../chart_data";
import config from "../chart_data";
import { Temperature_data } from "../chart_data";
import { User } from "../User";
import { Users } from "../Users"
import ObservationTest from "./components/ObservationTest.vue";
const users = reactive(new Users());
const user = reactive(new User(users));
const observation = reactive(new Observation(user));
const observations = reactive(new Observations(user));
const temperature_data = reactive(new Temperature_data(observations));
export default {
  data() {
    return {
      users: users,
      user: user,
      observation: observation,
      observations: observations,
      config: config,
      temperature_data: temperature_data,
    };
  },
  components: {
    ObservationTest,
  },
  methods: {
    check_logged_in() {
      this.user.check_logged_in();
      setTimeout(this.check_logged_in, 5000);
    },
  },
  created() {
    this.check_logged_in();
  },
};
</script>

<style>
</style>
