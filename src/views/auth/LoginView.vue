<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import { login } from '@/utils/formValidator'
import { auth, googleProvider, githubProvider } from '@/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

// Form Details State.
const formDetails = ref({
    email: '',
    password: ''
})

// Form Handler.
const handleSubmit = async () => {

    // Form Validations.
    const { error } = await login(formDetails.value)
    if (error) {
        toast(error, {
            type: 'warning',
            theme: 'colored'
        })
    }

    // signIn With Email And Password.
    signInWithEmailAndPassword(auth, formDetails.value.email, formDetails.value.password)
        .then(() => {
            formDetails.value = {
                email: '',
                password: ''
            }
            toast('Signin Successful', {
                type: 'info',
                theme: 'colored'
            })
        })
        .catch(error => {
            toast(error.message, {
                type: 'warning',
                theme: 'colored'
            })
        })
}

// Signin with Google.
const googleSignin = () => {

    // Google signInWithPopup
    signInWithPopup(auth, googleProvider)
        .then(() => {
            formDetails.value = {
                email: '',
                password: ''
            }
            toast('Signin Successful', {
                type: 'info',
                theme: 'colored'
            })
        })
        .catch(error => {
            toast(error.message, {
                type: 'warning',
                theme: 'colored'
            })
        })
}

// Signin with GitHub.
const githubSignin = () => {

    // GitHub signInWithPopup
    signInWithPopup(auth, githubProvider)
        .then(() => {
            toast('Signin Successful', {
                type: 'info',
                theme: 'colored'
            })
        })
        .catch(error => {
            toast(error.message, {
                type: 'warning',
                theme: 'colored'
            })
        })
}
</script>

<template>
    <section
        class="grid sm:grid-cols-2 md:mx-auto md:p-3 md:max-w-[1250px] items-center gap-4 my-6 sm:my-8 md:my-7 mx-4">
        <div>
            <h1 class="text-2xl">Welcome Back!</h1>
            <h2 class="capitalize text-3xl sm:text-4xl my-4 text-bold">
                Sign in to <span class="text-secondary font-comforta font-extrabold">Vue Mombasa Community</span>.
            </h2>
            <p>If you don't have an account you can <RouterLink to="/auth/signup"><span class="text-indigo-600">register
                        here!</span></RouterLink>
            </p>
            <img src="../../assets/community.png" alt="community">
        </div>
        <form @submit.prevent="handleSubmit"
            class="max-w-lg border sm:border-0 rounded-lg my-4 px-3 py-6 space-y-4">
            <div class="space-y-2">
                <label for="email" class="text-secondary">Email</label>
                <input v-model="formDetails.email" type="email" name="email" id="email" autocomplete="off"
                    class="focus:outline-none block w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-600 transition duration-300 focus:ring-2 focus:ring-secondary" />
            </div>

            <div class="space-y-2">
                <label for="pwd" class="text-secondary">Password</label>
                <input v-model="formDetails.password" type="password" name="pwd" id="pwd" autocomplete="off"
                    class="focus:outline-none block w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-600 transition duration-300 focus:ring-2 focus:ring-secondary" />
            </div>
            <button type="submit" class="mx-auto
            flex
            space-x-3
            items-center
            justify-center
            w-full
            px-8
            py-3
            sm:text-sm
            text-lg
            sm:py-3.5
            font-semibold
            text-white
            transition-all
            duration-200
            bg-secondary
            rounded-lg
            hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-offset-2
            my-4
            focus:ring-gray-900">Login</button>
            <div>
                <div class="flex items-center space-x-4 justify-center">
                    <div class="w-full h-[3px] bg-primary"></div>
                    <p class="shrink-0">Or Continue With</p>
                    <div class="w-full h-[3px] bg-primary"></div>
                </div>
                <div class="grid grid-cols-2 gap-3 my-4">
                    <div @click="googleSignin"
                        class="flex justify-center items-center space-x-2 border p-3 rounded-lg hover:shadow cursor-pointer">
                        <FontAwesomeIcon :icon="['fab', 'google']" class="w-6 h-6 text-secondary" />
                        <p class="text-secondary">Google</p>
                    </div>
                    <div @click="githubSignin"
                        class="flex justify-center items-center space-x-2 border p-3 rounded-lg hover:shadow cursor-pointer">
                        <FontAwesomeIcon :icon="['fab', 'github']" class="w-6 h-6 text-secondary" />
                        <p class="text-secondary">GitHub</p>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>
