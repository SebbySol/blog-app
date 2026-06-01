<template>
  <div class="container mt-4 mb-5 px-4">
    <h2 class="mb-4 blog-text">Blog Posts</h2>
    <hr class="mb-4" />
    <div v-if="posts.length === 0" class="text-secondary">No posts yet.</div>
    <div class="row g-3">
      <div v-for="post in posts" :key="post._id" class="col-md-4">
        <div class="card p-3 h-100">
          <h4 class="post-title text-light">{{ post.title }}</h4>
          <p class="text-secondary">
            By {{ post.author?.username }} ·
            {{ new Date(post.createdAt).toLocaleDateString() }}
          </p>
          <p class="text-secondary">{{ post.content.substring(0, 100) }}...</p>
          <RouterLink :to="`/post/${post._id}`" class="btn btn-dark read-more-btn mt-auto">
            Read More
          </RouterLink>
        </div>
      </div>
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
