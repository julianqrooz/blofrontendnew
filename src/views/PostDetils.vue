<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/counter";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { api } from "../stores/counter";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { user, isLoggedIn } = storeToRefs(authStore);
const router = useRouter();
const route = useRoute();
const post = ref(null);
const commenttext = ref("");
const LoadPost = async () => {
  try {
    const res = await api.get(`/posts/${route.params.id}`);
    post.value = res.data;
  } catch (error) {
    alert("المقال غير الموجود");
  }
};

const deletePost = async (id) => {
  if (!confirm("متأكد من الحذف؟")) return;
  try {
    // نستخدم معرّف المنشور الحالي post.value._id للحذف
    await api.delete(`/posts/${post.value._id}`);

    // ✅ الجزء الذي تم تعديله: التوجيه إلى الصفحة الرئيسية (مسار /)
    alert("تم حذف المنشور بنجاح.");
    router.push("/");
  } catch (error) {
    console.error("خطأ أثناء الحذف:", error);
    alert("فشل حذف المنشور. الرجاء المحاولة مرة أخرى.");
  }
};
const addcooment = async () => {
  if (!commenttext.value) return;
  await api.post(`/posts/${route.params.id}/comment`, {
    text: commenttext.value,
  });
  commenttext.value = "";
  LoadPost();
};
// حذف تعليق (لصاحبه أو صاحب المقال)
const deleteComment = async (commentId) => {
  if (!confirm("متأكد من حذف التعليق؟")) return;

  console.log("جاري محاولة حذف التعليق:", commentId);
  console.log("معرف المنشور:", route.params.id);
  console.log("المستخدم الحالي:", authStore.user?._id);

  try {
    const response = await api.delete(
      `/posts/${route.params.id}/comment/${commentId}`
    );

    console.log("نجح الحذف!", response.data);
    alert("تم حذف التعليق بنجاح");
    LoadPost(); // تحديث المنشور
  } catch (error) {
    console.error("خطأ في حذف التعليق:", error);
    console.error("الرد من السيرفر:", error.response?.data);
    console.error("الحالة:", error.response?.status);

    if (error.response?.status === 403) {
      alert("غير مسموح لك حذف هذا التعليق هنا.");
    } else if (error.response?.status === 404) {
      alert("التعليق أو المنشور غير موجود.");
    } else {
      alert("فشل حذف التعليق. حاول مرة أخرى.");
    }
  }
};
onMounted(LoadPost);
</script>

<template>
  <section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 my-5" v-if="post">
      <div class="row gx-5 justify-content-center">
        <!-- معلومات الكاتب (فوق على الموبايل، جانبي على الكمبيوتر) -->
        <div class="col-12 col-lg-3 mb-5 mb-lg-0 text-center text-lg-start">
          <div class="card border-0 shadow-sm p-4 bg-white">
            <div class="fw-bold fs-4 text-primary">{{ post.author.name }}</div>
            <small class="text-muted d-block mt-2">
              {{ new Date(post.createdAt).toLocaleDateString("ar-EG") }}
            </small>
          </div>
        </div>

        <!-- محتوى المقال الرئيسي -->
        <div class="col-12 col-lg-9">
          <article class="bg-white rounded shadow p-4 p-lg-5">
            <!-- العنوان -->
            <header class="text-center text-lg-start mb-5">
              <h1 class="display-4 display-md-3 fw-bolder mb-4">
                {{ post.title }}
              </h1>
              <div class="text-muted mb-3">
                <small>
                  نشر في:
                  {{ new Date(post.createdAt).toLocaleDateString("ar-EG") }}
                </small>
              </div>
              <span class="badge bg-primary fs-5 px-4 py-2">{{
                post.category
              }}</span>
            </header>

            <!-- الصورة متجاوبة تمامًا -->
            <figure class="mb-5 text-center">
              <img
                :src="'https://blog-xa93.onrender.com' + post.image"
                class="img-fluid rounded shadow"
                alt="صورة المقال"
                style="
                  max-width: 100%;
                  height: auto;
                  object-fit: cover;
                  max-height: 500px;
                "
              />
            </figure>

            <!-- المحتوى -->
            <section
              class="fs-5 lh-lg mb-5"
              style="word-break: break-word; white-space: pre-wrap"
            >
              {{ post.content }}
            </section>

            <!-- زر حذف المقال -->
            <div
              v-if="user && post.author._id === user._id"
              class="text-center mb-5"
            >
              <button
                @click="deletePost"
                class="btn btn-danger btn-lg px-5 py-3 fw-bold"
              >
                حذف المنشور
              </button>
            </div>
          </article>

          <!-- قسم التعليقات -->
          <section class="mt-5">
            <div class="card border-0 shadow">
              <div class="card-header bg-primary text-white py-3">
                <h4 class="mb-0 text-center text-lg-start">
                  التعليقات ({{ post.comments.length }})
                </h4>
              </div>
              <div class="card-body p-4">
                <!-- فورم إضافة تعليق -->
                <form @submit.prevent="addcooment" class="mb-5">
                  <textarea
                    v-model="commenttext"
                    class="form-control form-control-lg"
                    rows="4"
                    placeholder="أضف تعليقك هنا..."
                    required
                  ></textarea>
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100 mt-3 fw-bold"
                  >
                    إرسال التعليق
                  </button>
                </form>

                <!-- رسالة لو مش مسجل -->
                <div
                  v-if="!authStore.isLoggedIn"
                  class="text-center text-muted py-4"
                >
                  <p class="fs-5">
                    يجب
                    <router-link to="/login" class="text-primary fw-bold"
                      >تسجيل الدخول</router-link
                    >
                    لإضافة تعليق
                  </p>
                </div>

                <!-- قائمة التعليقات -->
                <div
                  v-if="post.comments.length === 0"
                  class="text-center text-muted py-5 fs-4"
                >
                  لا توجد تعليقات بعد.. كن الأول!
                </div>

                <div
                  v-for="comment in post.comments"
                  :key="comment._id"
                  class="bg-white rounded shadow-sm p-4 mb-4 border"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <div class="fw-bold text-primary fs-5">
                        {{ comment.name }}
                      </div>
                      <small class="text-muted">
                        {{
                          new Date(comment.createdAt).toLocaleDateString(
                            "ar-EG"
                          )
                        }}
                      </small>
                      <p class="mt-3 fs-5" style="word-break: break-word">
                        {{ comment.text }}
                      </p>
                    </div>

                    <!-- زر حذف التعليق -->
                    <button
                      v-if="
                        authStore.isLoggedIn &&
                        (comment.user._id === authStore.user._id ||
                          post.author._id === authStore.user._id)
                      "
                      @click="deleteComment(comment._id)"
                      class="btn btn-sm btn-outline-danger"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* تحسينات للموبايل */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.2rem;
  }
  .fs-5 {
    font-size: 1.1rem !important;
  }
  .btn-lg {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  .card-body {
    padding: 1.5rem;
  }
}
</style>
