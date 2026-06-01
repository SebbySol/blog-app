<template>
  <div class="container mt-4 p-5 custom-post-bg">
    <div v-if="post">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h2>{{ post.title }}</h2>
          <p class="text-secondary">
            By {{ post.author?.username }} ·
            {{ new Date(post.createdAt).toLocaleDateString() }}
          </p>
        </div>
        <div class="d-flex gap-2" v-if="canModify">
          <RouterLink :to="`/post/${post._id}/edit`" class="btn nav-login">Edit</RouterLink>
          <button class="btn nav-logout" @click="deletePost">Delete</button>
        </div>
      </div>
      <p class="mt-3">{{ post.content }}</p>
      <RouterLink to="/" class="btn nav-login mt-3">Back</RouterLink>
    </div>
    <div v-else class="text-muted">Loading...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { jwtDecode } from 'jwt-decode'
import api from '../api'

const post = ref(null)
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const canModify = computed(() => {
  if (!post.value) return false
  const token = localStorage.getItem('token')
  if (!token) return false
  const decoded = jwtDecode(token)
  return decoded.isAdmin || post.value.author?._id === decoded.id
})

onMounted(async () => {
  try {
    const res = await api.get(`/api/posts/${route.params.id}`)
    post.value = res.data
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    console.log('decoded:', decoded)
    console.log('post author:', post.value.author)
  } catch (err) {
    console.log(err)
  }
})

const deletePost = async () => {
  try {
    await api.delete(`/api/posts/${route.params.id}`)
    router.push({ name: 'Home' })
  } catch (err) {
    console.log(err)
  }
}
</script>