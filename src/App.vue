<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/counter";
const router = useRouter();
const authuser = useAuthStore();
const closeMenu = () => {
  const navbar = document.getElementById("navbarSupportedContent");
  if (navbar && navbar.classList.contains("show")) {
    navbar.classList.remove("show");
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container px-4 px-lg-5">
      <RouterLink class="navbar-brand fw-bold fs-4" to="/">جوليا</RouterLink>

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

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <!-- Home -->
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="closeMenu"
              >الرئيسية</router-link
            >
          </li>

          <!-- لو مسجل دخول -->
          <template v-if="authuser.isLoggedIn">
            <li class="nav-item">
              <router-link class="nav-link" to="/my-blog" @click="closeMenu"
                >مقالاتي</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create" @click="closeMenu"
                >كتابة مقالة</router-link
              >
            </li>
            <li class="nav-item">
              <span class="nav-link text-white me-3">
                مرحبا {{ authuser.user?.name || "User" }}
              </span>
            </li>
            <li class="nav-item">
              <button
                class="btn btn-outline-light btn-sm"
                @click="
                  authuser.logout();
                  closeMenu();
                  router.push('/login');
                "
              >
                تسجيل خروج
              </button>
            </li>
          </template>

          <!-- لو مش مسجل -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login" @click="closeMenu"
                >تسجيل الدخول</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="btn btn-outline-light btn-sm ms-2"
                to="/register"
                @click="closeMenu"
              >
                انشاء حساب
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

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
