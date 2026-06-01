<template>
  <div class="container mt-4 p-5 custom-post-bg">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <h2>Edit Post</h2>
      <RouterLink :to="`/post/${route.params.id}`" class="btn nav-logout">Cancel</RouterLink>
    </div>
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input type="text" class="form-control bg-dark text-white" v-model="title" placeholder="Enter Title" />
    </div>
    <div class="mb-3">
      <label class="form-label">Content</label>
      <textarea class="form-control bg-dark text-white" v-model="content" placeholder="Enter Content" rows="5"></textarea>
    </div>
    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
    <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
    <button class="btn submit-btn border bg-success text-white px-4" @click="updatePost">Save</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const title = ref('')
const content = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const res = await api.get(`/api/posts/${route.params.id}`)
    title.value = res.data.title
    content.value = res.data.content
  } catch (err) {
    console.log(err)
  }
})

const updatePost = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await api.put(`/api/posts/${route.params.id}`, {
      title: title.value,
      content: content.value
    })
    successMsg.value = 'Post updated!'
    setTimeout(() => router.push({ name: 'Post', params: { id: route.params.id } }), 1500)
  } catch (err) {
    errorMsg.value = err.response?.data?.error || 'Failed to update post.'
  }
}
</script>