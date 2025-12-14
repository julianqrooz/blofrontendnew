<script setup>
import FooterHome from "../components/FooterHome.vue";
import { useAuthStore } from "../stores/counter";
import { useRouter } from "vue-router";
import { ref } from "vue";
const email = ref("");
const password = ref("");
const authuser = useAuthStore();
const router = useRouter();
const login = async () => {
  try {
    await authuser.login({ email: email.value, password: password.value });
    router.push("/");
  } catch {
    alert("خطأ في البريد او كلمة السر");
  }
};
</script>
<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="container px-4 py-5 my-5">
      <div class="row align-items-center g-5 justify-content-center">
        <!-- النصوص الترحيبية -->
        <div class="col-12 col-lg-6 text-center text-lg-start">
          <h1 class="display-5 display-md-4 fw-bold text-body-emphasis mb-3">
            Welcome Back! 👋
          </h1>
          <p class="lead fs-5 text-muted">
            Sign in to continue exploring new posts, manage your profile, and
            join the conversation. We missed you!
          </p>
        </div>

        <!-- الفورم -->
        <div class="col-12 col-md-8 col-lg-5 col-xl-4">
          <form
            @submit.prevent="login"
            class="p-4 p-md-5 border rounded-4 shadow-lg bg-white"
          >
            <div class="form-floating mb-4">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                id="floatingInput"
                placeholder="name@example.com"
                required
              />
              <label for="floatingInput">Email address</label>
            </div>

            <div class="form-floating mb-4">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button
              class="w-100 btn btn-primary btn-lg py-3 fw-bold"
              type="submit"
            >
              Log In
            </button>

            <hr class="my-4 border-secondary" />

            <div class="text-center">
              <small class="text-muted">
                Don't have an account?
                <router-link to="/register" class="text-primary fw-bold">
                  Sign Up
                </router-link>
              </small>
            </div>

            <small class="d-block text-center text-muted mt-3">
              By clicking Log In, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>

    <FooterHome class="mt-auto" />
  </div>
</template>
<style scoped>
/* تحسينات خاصة بالموبايل */
@media (max-width: 768px) {
  .display-5 {
    font-size: 2.5rem;
  }
  .lead {
    font-size: 1.1rem;
  }
  .form-control-lg {
    font-size: 1.1rem;
    padding: 1rem;
  }
  .btn-lg {
    padding: 1rem;
    font-size: 1.1rem;
  }
  .card,
  form {
    margin: 1rem;
  }
}

/* ظل لطيف للفورم */
form {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
}
</style>
