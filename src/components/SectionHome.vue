<script setup>
import { ref, onMounted } from "vue";
import { api } from "../stores/counter";
import { useAuthStore } from "../stores/counter";
import { useRouter } from "vue-router";
const router = useRouter();
const authuser = useAuthStore();
const posts = ref([]);
const fetchepost = async () => {
  try {
    const response = await api.get("/posts");

    // التحقق من الاستجابة والبيانات
    if (response && response.data) {
      posts.value = response.data;
    } else {
      alert("لا يوجد مقالات متاحة");
    }
  } catch (error) {
    // استخدم console.error لتمييز الخطأ
    console.error("حدث خطأ أثناء جلب المقالات:", error);
    // يمكنك إضافة رسالة تنبيه للمستخدم هنا
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
  <section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 my-5">
      <!-- العنوان الرئيسي -->
      <div class="row gx-5 justify-content-center mb-5">
        <div class="col-lg-8 col-xl-7 text-center">
          <h2 class="display-5 fw-bolder mb-4">من مدونتنا</h2>
          <p class="lead fs-5 text-muted px-3 px-md-0">
            مساحة مخصصة لتقديم رؤى عميقة، دليل عملي، ومناقشات مدروسة في مجالات
            التقنية، نمط الحياة، والإبداع.
          </p>
        </div>
      </div>

      <!-- كروت المقالات -->
      <div class="row gx-4 gy-5">
        <div
          class="col-12 col-sm-6 col-lg-4"
          v-for="post in posts"
          :key="post._id"
        >
          <div
            class="card h-100 shadow-sm border-0 overflow-hidden transition hover-shadow"
            style="cursor: pointer; transition: transform 0.3s ease"
            @click="viewPost(post._id)"
          >
            <!-- الصورة متجاوبة تمامًا -->
            <img
              :src="'https://blog-xa93.onrender.com' + post.image"
              class="card-img-top"
              alt="صورة المقال"
              style="width: 100%; height: 220px; object-fit: cover"
            />

            <div class="card-body p-4 d-flex flex-column">
              <!-- التصنيف -->
              <div
                class="badge bg-primary bg-gradient rounded-pill mb-3 px-3 py-2 fw-bold"
              >
                {{ post.category }}
              </div>

              <!-- العنوان -->
              <h5 class="card-title fw-bold mb-3 text-primary">
                {{ post.title }}
              </h5>

              <!-- المحتوى المختصر -->
              <p
                class="card-text text-muted flex-grow-1"
                style="word-break: break-word"
              >
                {{ post.content.slice(0, 120) }}...
              </p>

              <!-- معلومات الكاتب والتاريخ -->
              <div class="mt-4 small text-muted">
                <div class="fw-bold">{{ post.author.name }}</div>
                <div>
                  {{ new Date(post.createdAt).toLocaleDateString("ar-EG") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- قسم الـ Call to Action -->
      <aside
        class="bg-primary bg-gradient rounded-4 p-4 p-md-5 mt-5 text-center text-md-start"
      >
        <div class="row align-items-center">
          <div class="col-12 col-xl-10 mx-auto">
            <h3 class="fs-2 fw-bold text-white mb-3">مهمتنا</h3>
            <p class="text-white fs-5 mb-0 opacity-90">
              نؤمن بقوة مشاركة المعرفة وتأثير القصة الجيدة. مهمتنا تقديم محتوى
              ليس معلوماتيًا فقط، بل ملهم حقًا، يساعدك على فهم تعقيدات العالم
              الحديث.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
/* تحسينات للموبايل */
@media (max-width: 576px) {
  .display-5 {
    font-size: 2.2rem;
  }
  .card-img-top {
    height: 180px !important;
  }
  .card-title {
    font-size: 1.1rem;
  }
  .card-text {
    font-size: 0.95rem;
  }
}

/* تأثير hover جميل على الكروت */
.hover-shadow:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}
</style>
