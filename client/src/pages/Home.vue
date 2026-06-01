<template>
  <div class="container mt-4 mb-5 px-4">
    <h2 class="mb-4 blog-text">Blog Posts</h2>
    <hr class="mb-4" />
    <div v-if="posts.length === 0" class="text-secondary">No posts yet.</div>
    <div v-for="post in posts" :key="post._id" class="card mb-3 p-3">
      <h4 class="post-title text-light">{{ post.title }}</h4>
      <p class="text-secondary">
        By {{ post.author?.username }} ·
        {{ new Date(post.createdAt).toLocaleDateString() }}
      </p>
      <p class="text-secondary">{{ post.content.substring(0, 100) }}...</p>
      <RouterLink :to="`/post/${post._id}`" class="btn btn-dark read-more-btn"
        >Read More</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const posts = ref([]);

onMounted(async () => {
  try {
    const res = await api.get("/api/posts");
    posts.value = res.data;
  } catch (err) {
    console.log(err);
  }
});
</script>
