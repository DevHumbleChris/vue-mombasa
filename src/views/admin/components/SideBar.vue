<script setup>
import { auth } from "@/firebaseConfig"
import { computed } from "vue"
import { Squares2X2Icon } from '@heroicons/vue/20/solid'
import { RouterLink } from "vue-router"

const user = computed(() => {
    return auth.currentUser
})
</script>

<template>
    <aside class="sticky top-0 bg-primary justify-center max-w-[250px] h-screen p-3">
        <div class="flex flex-col items-center space-y-2 my-8">
            <img :src="user?.photoURL" class="object-fit w-24 h-24 rounded-full p-3 border-2 border-secondary"
                :alt="user?.displayName" />
                <p class="text-secondary text-bold">@{{ user?.displayName }}</p>
        </div>
        <ul class="px-5 space-y-8">
            <li class="flex space-x-2  items-center">
                <Squares2X2Icon class="w-7 h-7" />
                <p class="text-xl">Dashboard</p>
            </li>
            <li class="flex space-x-2  items-center">
                <Squares2X2Icon class="w-7 h-7" />
                <p class="text-xl">Community</p>
            </li>
            <li class="flex space-x-2  items-center">
                <Squares2X2Icon class="w-7 h-7" />
                <p class="text-xl">Profile</p>
            </li>
            <li class="flex space-x-2  items-center">
                <Squares2X2Icon class="w-7 h-7" />
                <p class="text-xl">Events</p>
            </li>
            <li class="flex space-x-2  items-center">
                <Squares2X2Icon class="w-7 h-7" />
                <p class="text-xl">Settings</p>
            </li>
        </ul>
        <RouterLink to="/auth/login">
            <button class="absolute w-full bottom-0 my-4 bg-secondary text-white">Logout</button>
        </RouterLink>
    </aside>
    <aside class="sticky hidden sm:block top-0 h-screen w-18 sm:w-[250px] bg-white">
        <div class="flex flex-col justify-between h-full">
          <div class="flex-grow">
            <div class="max-w-xs px-4 py-4 flex flex-col justify-center items-center border-b">
                <img :src="user?.photoURL" class="object-fit w-24 h-24 rounded-full p-3 border-2 border-secondary"
                :alt="user?.displayName" />
                <p class="text-secondary text-bold">@{{ user?.displayName }}</p>
            </div>
            <div class="p-4">
              <ul class="space-y-1">
                <li>
                  <RouterLink
                    to="/dashboard"
                    class="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4 space-x-2"
                  >
                  <Squares2X2Icon class="w-7 h-7" />
                  <p class="text-xl">Dashboard</p>
                  </RouterLink>
                </li>
                <li>
                    <RouterLink
                      to="/other-links"
                      class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 space-x-2"
                    >
                    <Squares2X2Icon class="w-7 h-7" />
                    <p class="text-xl">Dashboard</p>
                    </RouterLink>
                  </li>
                <li>
                  <RouterLink
                    to="/other-links"
                    class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 space-x-2"
                  >
                  <Squares2X2Icon class="w-7 h-7" />
                  <p class="text-xl">Dashboard</p>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="p-4">
            <button
              type="button"
              class="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-secondary text-gray-300 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <p class="font-bold">Logout</p>
            </button>
          </div>
        </div>
      </aside>
</template>
