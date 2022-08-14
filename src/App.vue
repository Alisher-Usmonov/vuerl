<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-tr from-sky-300 to-indigo-300 font-work"
  >
    <Navbar />
    <router-view></router-view>
  </div>
  <notifications class="mt-20" />
</template>
