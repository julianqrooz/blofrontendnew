<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/counter";
const router = useRouter();
const authuser = useAuthStore();
</script>

<template>
  <!-- أهم حاجة: viewport في public/index.html، بس لو مش موجود أضفه هناك -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container px-4 px-lg-5">
      <!-- العنوان -->
      <RouterLink class="navbar-brand fw-bold fs-4" to="/"
        >Julia Blog</RouterLink
      >

      <!-- زر الهامبرجر للموبايل (ده اللي كان ناقص!) -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- المنيو -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>

          <!-- لو مسجل دخول -->
          <template v-if="authuser.isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/my-blog">My Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create"
                >Blog Writing</router-link
              >
            </li>
            <li class="nav-item">
              <span class="nav-link text-white me-3">
                Welcome {{ authuser.user?.name || "User" }}
              </span>
            </li>
            <li class="nav-item">
              <button
                class="btn btn-outline-light btn-sm"
                @click="
                  authuser.logout();
                  router.push('/login');
                "
              >
                Sign out
              </button>
            </li>
          </template>

          <!-- لو مش مسجل -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Log In</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="btn btn-outline-light btn-sm ms-2"
                to="/register"
              >
                Sign Up
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

  <!-- المحتوى الرئيسي -->
  <main class="flex-shrink-0 mt-5 pt-4">
    <router-view />
  </main>
</template>

<style scoped>
/* تحسينات صغيرة للموبايل */
.navbar-brand {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
  }

  .btn-sm {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
