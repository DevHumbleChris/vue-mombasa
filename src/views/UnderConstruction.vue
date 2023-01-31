<script setup>
import ConstructionSVG from '@/components/svg/ConstructionSVG.vue';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

const email = ref('')

const countDownDate = ref(new Date("Feb 25, 2023 19:30:00").getTime())
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

onMounted(() => {
    setInterval(() => {
        startTimer()
    }, 1000)
})

const startTimer = () => {
    // Current time.
    const now = new Date().getTime()

    // Distance between now and the countDownDate
    const distance = countDownDate.value - now

    // Time calculations.
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

const joinEmailList = () => {
    if (!email.value) {
        toast('Email is required! Please provide one.', {
            type: 'warning',
            theme: 'colored'
        })
    } else {
        toast('Email Received. Happy to see you onboard!', {
            type: 'info',
            theme: 'colored'
        })
        email.value = ''
    }
}
</script>

<template>
    <section class="grid md:grid-cols-2 gap-4 my-6 sm:my-8 md:my-12 items-center mx-4">
        <div>
            <ConstructionSVG />
        </div>
        <div class="text-center">
            <h1 class="text-2xl">Site Underconstruction.</h1>
            <h2 class="capitalize text-4xl my-4 text-bold font-comforta">We are comming soon!</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 items-center gap-3 justify-center">
                <div class="p-3 rounded-lg bg-secondary text-white">
                    <h3 class="text-3xl font-comforta">{{ days }}</h3>
                    <p>Days</p>
                </div>
                <div class="p-3 rounded-lg bg-secondary text-white">
                    <h3 class="text-3xl font-comforta">{{ hours }}</h3>
                    <p>Hours</p>
                </div>
                <div class="p-3 rounded-lg bg-secondary text-white">
                    <h3 class="text-3xl font-comforta">{{ minutes }}</h3>
                    <p>Minutes</p>
                </div>
                <div class="p-3 rounded-lg bg-secondary text-white">
                    <h3 class="text-3xl font-comforta"> {{ seconds }}</h3>
                    <p>Seconds</p>
                </div>
            </div>
            <div class="my-6">
                <p class="text-lg">The <span class="text-secondary font-bold">
                        Vue Mombasa Community</span> website is opening soon! Please register to notify you when it's
                    ready.
                </p>
                <a href="https://chat.whatsapp.com/CtNmD8cpogJLvzkh0AonO8"
                    class="flex space-x-3 items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-secondary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2  my-4 focus:ring-gray-900">
                    <FontAwesomeIcon :icon="['fab', 'whatsapp']" class="text-white w-6 h-6" />
                    <p>Join Our WhatsApp Group</p>
                </a>
                <div class="flex items-center space-x-4 justify-center">
                    <div class="w-full h-[3px] bg-primary"></div>
                    <p>Or</p>
                    <div class="w-full h-[3px] bg-primary"></div>
                </div>
                <form @submit.prevent="joinEmailList"
                    class="relative my-4 mx-auto max-w-lg space-y-4 sm:flex sm:space-y-0 sm:items-end">
                    <div class="flex-1">
                        <label for="email" class="sr-only">Email address</label>
                        <div>
                            <input type="email" v-model="email" id="email" autocomplete="off"
                                class="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter email address" />
                        </div>
                    </div>
                    <button type="submit"
                        class="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-lg sm:py-3.5 font-semibold text-white transition-all duration-200 bg-secondary border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                        Join Email List
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
