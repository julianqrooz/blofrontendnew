<script setup>
import FooterHome from "../components/FooterHome.vue";
import { api } from "../stores/counter";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/counter";
import { useRouter } from "vue-router";
const router = useRouter();
const authuser = useAuthStore();
const posts = ref([]);
const fetchepost = async () => {
  try {
    const res = await api.get("/posts/my");
    // يجب التحقق هنا من وجود res.data قبل التعيين
    if (res && res.data) {
      posts.value = Array.isArray(res.data) ? res.data : [];
      if (posts.value.length === 0) {
        alert("لا يوجد مقالات لديك قم بانشاء اول مقال لك");
        router.push("/create");
      }
    } else {
      console.warn("الاستجابة فارغة أو غير متوقعة.");
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب المقالات:", error);
    // يمكنك عرض رسالة خطأ للمستخدم هنا
  }
};

onMounted(() => {
  fetchepost();
});
const viewPost = (id) => {
  if (!authuser.isLoggedIn) {
    alert("يجب تسجيل الدخول لمشاهده المقال كامل مع التعليقات");
  } else {
    router.push(`/post/${id}`);
  }
};
</script>
<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="flex-grow-1">
      <section class="py-5">
        <div class="container px-5" v-if="posts.length >= 1">
          <div class="card border-0 shadow rounded-3 overflow-hidden">
            <div class="card-body p-0">
              <div
                class="row gx-0"
                style="cursor: pointer"
                @click="viewPost(posts[0]._id)"
              >
                <div class="col-lg-6 col-xl-5 py-lg-5">
                  <div class="p-4 p-md-5">
                    <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                      {{ posts[0].category }}
                    </div>
                    <div class="h2 fw-bolder">{{ posts[0].title }}</div>
                    <p>{{ posts[0].content.substring(0, 150) }}...</p>
                    <div class="small">
                      <div class="fw-bold">{{ posts[0].author.name }}</div>
                      <div class="text-muted">
                        {{ posts[0].createdAt.split("T")[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-xl-7">
                  <div>
                    <img
                      class="card-img-top"
                      :src="`https://blog-xa93.onrender.com` + posts[0].image"
                      style="width: 700px; height: 350px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5" v-if="posts.length > 1">
        <div class="container px-5">
          <div class="row gx-5">
            <div
              class="col-lg-4 mb-5"
              v-for="post in posts.slice(1)"
              :key="post._id"
            >
              <div
                class="card h-100 shadow border-0"
                style="cursor: pointer"
                @click="viewPost(post._id)"
              >
                <img
                  class="card-img-top"
                  :src="`https://blog-xa93.onrender.com` + post.image"
                  style="width: 370px; height: 350px"
                />
                <div class="card-body p-4">
                  <div class="badge bg-primary bg-gradient rounded-pill mb-2">
                    {{ post.category }}
                  </div>
                  <a class="text-decoration-none link-dark stretched-link"
                    ><div class="h5 card-title mb-3">{{ post.title }}</div></a
                  >
                  <p class="card-text mb-0">
                    {{ post.content.substring(0, 150) }}...
                  </p>
                </div>
                <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                  <div class="d-flex align-items-end justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="small">
                        <div class="fw-bold">{{ post.author.name }}</div>
                        <div class="text-muted">
                          {{ post.createdAt.split("T")[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <FooterHome />
  </div>
</template>
