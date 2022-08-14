<script>
export default {
  name: "Navbar",
  data() {
    return {
      navbar: [
        {
          to: "/",
          text: "Home",
        },
        {
          to: "/dashboard",
          text: "Dashboard",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="w-full h-16 bg-white/50 backdrop-blur-md shadow-xl shadow-white/10 flexbox border-b-2 border-b-white/60">
    <ul class="flex gap-x-6">
      <li v-for="({ to, text }, index) in navbar" :key="index">
        <router-link :to="to">{{ text }}</router-link>
      </li>
    </ul>
  </div>
</template>
