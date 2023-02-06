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
    <aside class="bg-primary justify-center max-w-[250px] h-screen p-3">
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
            <button class="absolute bottom-0 my-4 bg-secondary text-white">Logout</button>
        </RouterLink>
    </aside>
</template>
