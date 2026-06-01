<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Create Post</h2>
        <div class="card p-4">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input
              type="text"
              class="form-control bg-white text-secondary"
              v-model="title"
              placeholder="Enter Title"
            />
          </div>
          <div class="mb-4">
            <label class="form-label">Content</label>
            <textarea
              class="form-control bg-white text-secondary"
              v-model="content"
              placeholder="Enter Content"
              rows="5"
            ></textarea>
          </div>
          <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
          <p v-if="successMsg" class="text-success">{{ successMsg }}</p>
          <button class="btn btn-create-post w-100 mb-2" @click="createPost">
            Create Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const title = ref("");
const content = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const router = useRouter();

const createPost = async () => {
  errorMsg.value = "";
  successMsg.value = "";
  try {
    await api.post("/api/posts", {
      title: title.value,
      content: content.value,
    });
    successMsg.value = "Post created!";
    setTimeout(() => router.push({ name: "Home" }), 1500);
  } catch (err) {
    errorMsg.value = err.response?.data?.error || "Failed to create post.";
  }
};
</script>
