<template>
  <div class="container px-4 md:px-8 lg:px-10 mx-auto h-auto pt-4 pb-6">
    <h1 class="mb-4 text-2xl font-semibold text-white">Dashboard</h1>
    <ActionsBar
      :selectedItems="selectedItems"
      @delete-items="deleteSelectedItems"
    />
    <table
      v-if="links.length"
      class="mt-3 border-collapse bg-white/50 shadow-md w-full text-center text-gray-700 rounded-md overflow-hidden"
    >
      <thead class="border-b-2 border-white">
        <tr class="p-2">
          <th></th>
          <th class="py-3">ID</th>
          <th>Shorten Link</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(link, idx) in links"
          :class="`${
            idx + 1 === links.length ? '' : 'border-b border-white/70'
          }`"
        >
          <td>
            <input
              type="checkbox"
              class="form-checkbox rounded text-indigo-500"
              :data-id="link.id"
              @change="toggleItem"
            />
          </td>
          <td class="py-3">
            <router-link :to="`dashboard/${link.id}`">{{
              link.id
            }}</router-link>
          </td>
          <td>
            {{ link.shorturl }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="w-full mt-4 text-center flexbox gap-3 flex-col">
      <img
        src="../assets/shape.png"
        alt="vuerl-img"
        class="w-60 h-40 object-cover"
      />
      <h1 class="font-semibold text-white text-lg">
        You don't have any cutted links
      </h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionsBar from "../components/ActionsBar.vue";
export default {
  name: "DashboardView",
  data() {
    return {
      links: JSON.parse(localStorage.getItem("links")),
      selectedItems: [],
    };
  },
  components: { ActionsBar },
  methods: {
    toggleItem(evt) {
      const checked = evt.target.checked;
      const id = evt.target.getAttribute("data-id");
      if (checked) {
        this.selectedItems.push(id);
      } else {
        this.selectedItems = this.selectedItems.filter((el) => el !== id);
      }
    },
    deleteSelectedItems() {
      let urls = this.links;
      const token = import.meta.env.VITE_TOKEN;

      this.selectedItems.forEach((item) => {
        const config = {
          method: "delete",
          url: `/api/url/${item}/delete`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios(config);
        urls = urls.filter((link) => link.id !== item);
      });
      localStorage.setItem("links", JSON.stringify(urls));
      this.links = urls;
    },
  },
};
</script>
