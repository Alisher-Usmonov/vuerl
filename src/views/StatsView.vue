<template>
  <div v-if="linkData?.data" class="container px-10 mx-auto h-auto pt-4 pb-6">
    <h1 class="mb-4 text-2xl font-semibold text-white">Statistics</h1>
    <div class="mt-4">
      <h1 class="mb-2 text-xl font-semibold text-white">Clicks</h1>
      <div
        class="flex items-center flex-col md:flex-row flex-wrap p-3 bg-white/50 justify-evenly text-gray-800"
      >
        <h2 class="font-medium">Total Clicks: {{ linkData.data.clicks }}</h2>
        <h2
          v-for="count in Object.entries(linkData.data.socialCount)"
          class="capitalize font-medium"
        >
          {{ count[0] }}: {{ count[1] }}
        </h2>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2">
      <div class="border-r border-none md:border-white">
        <h1 class="mb-2 text-xl font-semibold text-white">Update Details</h1>
        <div class="flex flex-col gap-y-3">
          <div class="flex gap-x-3 items-center">
            <label for="longurl" class="text-white font-semibold"
              >Long URL</label
            >
            <input
              type="text"
              id="longurl"
              class="border-none outline-none focus:shadow-md w-80"
              v-model="longurl"
              :disabled="true"
            />
          </div>
          <div class="flex gap-x-3 items-center">
            <label for="longurl" class="text-white font-semibold">Alias</label>
            <input
              type="text"
              id="longurl"
              class="border-none outline-none focus:shadow-md w-80"
              v-model="alias"
            />
          </div>
        </div>
        <button
          class="mt-3 bg-yellow-500 px-4 py-2 font-semibold text-white active:shadow-md flexbox gap-x-2"
          @click="updateItem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          UPDATE
        </button>
        <div class="mt-6 pt-2">
          <h1 class="mb-2 text-xl font-semibold text-red-500">Danger Zone</h1>
          <button
            class="mt-3 bg-red-500 px-4 py-2 font-semibold text-white active:shadow-md flexbox gap-x-2"
            @click="deleteItem"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            DELETE
          </button>
        </div>
      </div>
      <div class="flexbox flex-col gap-3 text-white">
        <h1 class="mb-2 text-xl font-semibold text-center">QR Code</h1>
        <img
          :src="`${linkData.details.shorturl}/qr`"
          class="w-48 h-48 bg-white p-2"
          alt="vuerl-qrcode"
        />
        <a
          :href="`${linkData.details.shorturl}/qr`"
          class="bg-emerald-500 py-2 px-4 flexbox gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const token = import.meta.env.VITE_TOKEN;

export default {
  name: "StatsView",
  data() {
    return {
      linkData: {},
      id: this.$route.params.id,
      longurl: "",
      alias: "",
      links: [],
    };
  },
  async mounted() {
    const config = {
      method: "get",
      url: `https://recut.in/api/url/${this.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    this.linkData = data;
    this.longurl = data.details.longurl;
    this.alias = data.details.alias;
    this.links = JSON.parse(localStorage.getItem("links"));
  },
  methods: {
    async deleteItem() {
      try {
        const res = await axios.delete(
          `https://recut.in/api/url/${this.id}/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if ((res.status = 200)) {
          localStorage.setItem(
            "links",
            JSON.stringify(this.links.filter((el) => el.id !== this.id))
          );

          this.$router.push({ name: "dashboard" });

          this.$notify({
            title: "Link Deleted Successfully",
            type: "success",
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        this.$notify({
          title: "Error",
          type: "error",
        });
      }
    },
    async updateItem() {
      try {
        const res = await axios({
          url: `https://recut.in/api/url/${this.id}/update`,
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            url: this.longurl,
            custom: this.alias,
          },
        });

        if (res.status == 200) {
          localStorage.setItem(
            "links",
            JSON.stringify(
              this.links.map((item) => {
                if (item.id == res.data.id) {
                  return {
                    id: res.data.id,
                    shorturl: res.data.shorturl,
                  };
                } else {
                  return item;
                }
              })
            )
          );

          this.$router.push({ name: "dashboard" });

          this.$notify({
            title: "Link Updated Successfully",
            type: "success",
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        this.$notify({
          title: error.message,
          type: "error",
        });
      }
    },
  },
};
</script>
