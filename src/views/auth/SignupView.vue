<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import { signup } from '@/utils/formValidator'
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth, githubProvider, googleProvider, storage } from '../../firebaseConfig';
import { ref as firebaseStorageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const selectedFile = ref(null)
const uploadingFile = ref(false)
const imageFileProgress = ref(0)
const uploadeImageURL = ref(null)
const imageUploadState = ref('')

const formDetails = ref({
    email: '',
    password: '',
    username: ''
})

const handleSubmit = async () => {

    try {
        // Form Validations.
        const { error } = await signup(formDetails.value)
        if (error) {
            toast(error, {
                type: 'warning',
                theme: 'colored'
            })
        } else {
            // Activate Image Upload State.
            uploadingFile.value = !uploadingFile.value

            // Uploading Profile Pic
            const storageRef = firebaseStorageRef(storage, `users/image/${formDetails.value.username}/`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile.value);

            await uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    imageFileProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            imageUploadState.value = 'Upload is paused'
                            toast(imageUploadState.value, {
                                type: 'info',
                                theme: 'colored'
                            })
                            break;
                        case 'running':
                            imageUploadState.value = 'Upload is running'
                            toast(imageUploadState.value, {
                                type: 'info',
                                theme: 'colored'
                            })
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    toast(error.message, {
                        type: 'error',
                        theme: 'colored'
                    })
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Set downloadURL
                        uploadeImageURL.value = downloadURL
                    });
                }
            )
            // Create New User.
            await createUserWithEmailAndPassword(auth, formDetails.value.email, formDetails.value.password)
            updateProfile({
                displayName: formDetails.value.username,
                photoURL: uploadeImageURL.value ? uploadeImageURL.value : 'https://avatars.dicebear.com/api/avataaars/Lorna-Christiansen.svg'
            })
            // Activate Image Upload State.
            uploadingFile.value = !uploadingFile.value

            // Reset to defaults.
            formDetails.value = {
                email: '',
                password: '',
                username: ''
            }
            uploadeImageURL.value = null
            selectedFile.value = null
            imageFileProgress.value = 0
            uploadeImageURL.value = null
            imageUploadState.value = ''

            toast('Signin Successful', {
                type: 'info',
                theme: 'colored'
            })
        }


    } catch (error) {
        toast(error.message, {
            type: 'warning',
            theme: 'colored'
        })
    }
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

const addProfilePic = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
        selectedFile.value = readerEvent.target.result
    }
}
</script>

<template>
    <section class="grid sm:grid-cols-2 md:mx-auto md:max-w-[1250px] items-center gap-3 my-6 sm:my-1 mx-4">
        <div>
            <h1 class="text-2xl">Join the community!</h1>
            <h2 class="capitalize text-4xl sm:text-4xl mt-4 mb-3 text-bold text-secondary font-comforta font-extrabold">
                Vue Mombasa Community.
            </h2>
            <p class="my-4 text-xl">A <span class="text-primary">Vue.js</span> community in Mombasa, Kenya. We network,
                code and use vue.js related technologies.</p>
            <p>If you have an account you can <RouterLink to="/auth/login"><span class="text-indigo-600">sign in
                        here!</span></RouterLink>
            </p>
            <img src="../../assets/community.png" alt="community">
        </div>
        <form @submit.prevent="handleSubmit" class="max-w-lg border sm:border-0 rounded-lg my-3 px-3 py-4 space-y-4">
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

            <div class="space-y-2">
                <label for="username" class="text-secondary">Username</label>
                <input v-model="formDetails.username" type="text" name="username" id="username" autocomplete="off"
                    class="focus:outline-none block w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-600 transition duration-300 focus:ring-2 focus:ring-secondary" />
            </div>

            <div v-if="uploadingFile">
                <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                        <div>
                            <span
                                class="text-xs font-semibold inline-block p-2 uppercase rounded-md text-white bg-primary">
                                Uploading Profile Pic
                            </span>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-semibold inline-block text-primary">
                                {{ imageFileProgress }}%
                            </span>
                        </div>
                    </div>
                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div :style="{ width: imageFileProgress + '%' }"
                            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary">
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="!selectedFile">
                <label class="block text-secondary">Profile Photo</label>
                <div
                    class="mt-1 flex justify-center rounded-md border-2 hover:border-secondary border-dashed border-gray-300 px-6 pt-5 pb-4">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                            viewBox="0 0 48 48" aria-hidden="true">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload"
                                class="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none ">
                                <span>Upload a file</span>
                                <input id="file-upload" @change="addProfilePic" name="file-upload" type="file"
                                    class="sr-only" />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG or GIF</p>
                    </div>
                </div>
            </div>
            <div v-else class="grid grid-cols-2 gap-2 items-center">
                <div>
                    <label class="block text-secondary">Profile Photo</label>
                    <div
                        class="mt-1 flex justify-center rounded-md border-2 hover:border-secondary border-dashed border-gray-300 px-6 pt-5 pb-4">
                        <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                                <label for="file-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-medium  focus-within:outline-none ">
                                    <span class="text-secondary">Change file</span>
                                    <p class="pl-1">or drag and drop</p>
                                    <input id="file-upload" @change="addProfilePic" name="file-upload" type="file"
                                        class="sr-only" />
                                </label>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG or GIF</p>
                        </div>
                    </div>
                </div>
                <div class="border-primary border-2 p-2 rounded-md w-40 h-40">
                    <img :src="selectedFile" :alt="formDetails.username" class="object-fit">
                </div>
            </div>
            <button type="submit" :disabled="uploadingFile" class="mx-auto
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
            focus:ring-gray-900">
                <FontAwesomeIcon v-if="uploadingFile" :icon="['fas', 'upload']"
                    :class="{ 'animate-bounce': uploadingFile }" />
                <span> {{ uploadingFile? 'Uploading Data': 'Register' }}</span>
            </button>
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
