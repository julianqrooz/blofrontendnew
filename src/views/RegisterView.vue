<script setup>
import FooterHome from "../components/FooterHome.vue";
import { api, useAuthStore } from "../stores/counter";
import { useRouter } from "vue-router";
import { ref } from "vue";
const name = ref("");
const email = ref("");
const password = ref("");
const authuser = useAuthStore();
const router = useRouter();
const rejister = async () => {
  try {
    if (!name.value || !email.value || !password.value)
      return alert("كل الحقول مطلوبه");
    await authuser.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch {
    alert("فشل التسجيل");
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
            Create Your Account 🚀
          </h1>
          <p class="lead fs-5 text-muted">
            Create your free account today to get full access to exclusive
            articles, personalized content, and the ability to comment on posts.
            We're excited to have you!
          </p>
        </div>

        <!-- الفورم -->
        <div class="col-12 col-md-8 col-lg-5 col-xl-4">
          <form
            @submit.prevent="register"
            class="p-4 p-md-5 border rounded-4 shadow-lg bg-white"
          >
            <div class="form-floating mb-4">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="floatingName"
                placeholder="Your Name"
                required
              />
              <label for="floatingName">Your Name</label>
            </div>

            <div class="form-floating mb-4">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                id="floatingEmail"
                placeholder="name@example.com"
                required
              />
              <label for="floatingEmail">Email Address</label>
            </div>

            <div class="form-floating mb-4">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                id="floatingPassword"
                placeholder="Password"
                required
                minlength="6"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button
              class="w-100 btn btn-primary btn-lg py-3 fw-bold"
              type="submit"
            >
              Sign Up
            </button>

            <hr class="my-4 border-secondary" />

            <div class="text-center">
              <small class="text-muted">
                Already have an account?
                <router-link to="/login" class="text-primary fw-bold">
                  Log In
                </router-link>
              </small>
            </div>

            <small class="d-block text-center text-muted mt-3">
              By clicking Sign Up, you agree to the terms of use.
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
}

/* ظل وخلفية لطيفة للفورم */
form {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
}
</style>
