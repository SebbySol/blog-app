import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || null);
  const isAdmin = ref(JSON.parse(localStorage.getItem("isAdmin")) || false);
  const username = ref(localStorage.getItem("username") || null);

  const setUser = (newToken, adminStatus, newUsername) => {
    token.value = newToken;
    isAdmin.value = adminStatus;
    username.value = newUsername;
    localStorage.setItem("token", newToken);
    localStorage.setItem("isAdmin", JSON.stringify(adminStatus));
    localStorage.setItem("username", newUsername);
  };

  const clearUser = () => {
    token.value = null;
    isAdmin.value = false;
    username.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
  };

  const isAuthenticated = () => !!token.value;

  return { token, isAdmin, username, setUser, clearUser, isAuthenticated };
});
