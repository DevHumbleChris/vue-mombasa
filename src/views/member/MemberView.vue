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
    <aside class="sticky hidden sm:block top-0 h-screen w-18 sm:w-[250px] bg-white">
        <div class="flex flex-col justify-between h-full">
          <div class="flex-grow">
            <div class="max-w-xs px-4 py-4 flex flex-col justify-center items-center border-b border-primary">
                <img :src="user?.photoURL" class="object-fit w-24 h-24 rounded-full p-3 border-2 border-secondary"
                :alt="user?.displayName" />
                <p class="text-secondary text-bold">@{{ user?.displayName }}</p>
            </div>
            <div class="p-4">
              <ul class="space-y-1">
                <li>
                  <RouterLink
                    to="/dashboard"
                    class="flex items-center bg-secondary rounded-xl font-bold text-sm text-white py-3 px-4 space-x-2"
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
                    <FontAwesomeIcon :icon="['fas', 'people-group']" class="w-7 h-7" />
                    <p class="text-xl">Community</p>
                    </RouterLink>
                  </li>
                <li>
                  <RouterLink
                    to="/other-links"
                    class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 space-x-2"
                  >
                  <FontAwesomeIcon :icon="['fas', 'calendar-days']" class="w-7 h-7" />
                  <p class="text-xl">Events</p>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/other-links"
                    class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 space-x-2"
                  >
                  <FontAwesomeIcon :icon="['fas', 'user']" class="w-7 h-7" />
                  <p class="text-xl">Profile</p>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/other-links"
                    class="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4 space-x-2"
                  >
                  <FontAwesomeIcon :icon="['fas', 'gear']" class="w-7 h-7" />
                  <p class="text-xl">Settings</p>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="p-4">
            <button
              type="button"
              class="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-secondary text-white hover:text-white transition"
            >
              <FontAwesomeIcon :icon="['fas', 'right-from-bracket']" />
              <p class="font-bold">Logout</p>
            </button>
          </div>
        </div>
      </aside>
</template>
