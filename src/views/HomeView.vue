<template>
  <div class="w-full h-[calc(100vh-64px)] flexbox">
    <div class="flex flex-col gap-x-3 p-2 bg-white/30 shadow-xl">
      <div class="flex gap-2 mb-2">
        <input
          v-model="url"
          type="url"
          class="outline-none border-none p-2 w-8/12 transition focus:shadow-md"
          placeholder="Enter link"
        />
        <input
          v-model="alias"
          type="text"
          class="outline-none border-none p-2 w-4/12 transition focus:shadow-md"
          placeholder="Alias"
        />
      </div>
      <div v-if="shortlink" class="bg-white mb-2 p-2 flexbox flex-col">
        <h2 class="text-xl text-sky-600 mb-3 font-medium">{{ shortlink }}</h2>
        <div class="flex gap-4">
          <a
            :href="shortlink"
            target="_blank"
            class="flex items-center font-semibold text-gray-600 text-lg gap-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 stroke-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Visit
          </a>
          <button
            class="flex items-center font-semibold text-gray-600 text-lg gap-x-1"
            @click="share"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 stroke-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke=""
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
          <button
            class="flex items-center font-semibold text-gray-600 text-lg gap-x-1"
            @click="copy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 stroke-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            Copy
          </button>
        </div>
      </div>
      <button
        :class="`bg-white px-4 flexbox py-2 active:shadow-md font-semibold text-gray-600 ${
          loading ? 'opacity-60' : ''
        }`"
        :disabled="loading"
        @click="cutURL"
      >
        <svg
          v-if="loading"
          aria-hidden="true"
          class="mr-2 w-6 h-6 text-gray-200 animate-spin fill-gray-700"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        Short
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      url: "",
      alias: "",
      shortlink: "",
      loading: false,
    };
  },
  methods: {
    async cutURL() {
      if (!this.url.length) {
        this.$notify({
          title: "Xato",
          text: "Qisqartirish uchun link kiritilmadi!",
          type: "warn",
        });
        return;
      }

      const body = JSON.stringify({
        url: this.url,
        custom: this.alias,
      });

      const token = import.meta.env.VITE_TOKEN;

      const config = {
        method: "post",
        url: "https://recut.in/api/url/add",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: body,
      };
      try {
        this.loading = true;
        const { data } = await axios(config);
        this.loading = false;

        if (!data.message) {
          this.shortlink = data.shorturl;
          this.url = "";
          this.alias = "";

          const links = localStorage.getItem("links")
            ? JSON.parse(localStorage.getItem("links"))
            : [];

          links.push({
            ...data,
            error: undefined,
          });

          localStorage.setItem("links", JSON.stringify(links));
        } else {
          this.$notify({
            title: data.message,
            type: "error",
          });
        }

        this.shortlink = data.shorturl;
        this.url = "";
        this.alias = "";
      } catch (err) {
        this.$notify({
          title: err.message,
          type: "error",
        });
      }
    },
    share() {
      navigator.share({
        text: "Mana bu linkga qarang - ",
        url: this.shortlink,
      });
    },
    copy() {
      navigator.clipboard.writeText(this.shortlink);
      this.$notify({
        title: "Copied to Clipboard",
        type: "success",
      });
    },
  },
  mounted() {
    const links = JSON.parse(localStorage.getItem("links"));
    if (!links) {
      localStorage.setItem("links", JSON.stringify([]));
    }
  },
};
</script>
