<script setup>
import FooterHome from "../components/FooterHome.vue";
import { ref } from "vue";
import { api } from "../stores/counter";
import { useRouter } from "vue-router";
const title = ref("");
const content = ref("");
const category = ref("");
const image = ref(null);
const categories = ["تقنية", "صحة", "تعليم", "رياضة", "فن"];
const router = useRouter();
const createPost = async () => {
  if (!image.value) return alert("الصورة مطلوبة");
  if (!content.value) return alert("المحتوى مطلوبة");
  if (!category.value) return alert("التصنيف  مطلوبة");
  if (!title.value) return alert("العنوان  مطلوبة");
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("category", category.value);
  formData.append("image", image.value);
  try {
    await api.post("/posts", formData);
    router.push("/");
  } catch (error) {
    alert("خطأ");
  }
};
</script>
<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <section class="py-5 flex-grow-1">
      <div class="container px-4 px-lg-5 my-5">
        <div class="bg-white rounded-4 shadow-lg p-4 p-md-5">
          <!-- العنوان -->
          <div class="text-center mb-5">
            <div
              class="feature bg-primary bg-gradient text-white rounded-3 mb-4 d-inline-block p-4"
            >
              <i class="bi bi-pencil-square fs-1"></i>
            </div>
            <h1 class="display-5 fw-bold mb-3">كتابة مقال جديد</h1>
            <p class="lead text-muted fs-5">
              شارك أفكارك مع العالم، اكتب مقالك الآن!
            </p>
          </div>

          <!-- الفورم -->
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6">
              <form
                @submit.prevent="createPost"
                class="needs-validation"
                novalidate
              >
                <!-- العنوان -->
                <div class="form-floating mb-4">
                  <input
                    v-model="title"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="عنوان المقال"
                    required
                  />
                  <label>عنوان المقال</label>
                </div>

                <!-- التصنيف -->
                <div class="form-floating mb-4">
                  <select
                    v-model="category"
                    class="form-select form-select-lg"
                    required
                  >
                    <option value="" disabled selected>اختر التصنيف...</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                      {{ cat }}
                    </option>
                  </select>
                  <label>التصنيف</label>
                </div>

                <!-- المحتوى -->
                <div class="form-floating mb-4">
                  <textarea
                    v-model="content"
                    class="form-control form-control-lg"
                    style="height: 200px; resize: vertical"
                    placeholder="اكتب محتوى المقال هنا..."
                    required
                  ></textarea>
                  <label>محتوى المقال</label>
                </div>

                <!-- رفع الصورة -->
                <div class="mb-4">
                  <label class="form-label fw-bold fs-5"
                    >صورة المقال (إلزامية)</label
                  >
                  <input
                    @change="(e) => (image = e.target.files[0])"
                    type="file"
                    accept="image/*"
                    class="form-control form-control-lg"
                    required
                  />
                  <div class="form-text text-muted">
                    اختر صورة واضحة تعبر عن المقال (JPEG, PNG)
                  </div>
                </div>

                <!-- زر الإرسال -->
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-lg py-3 fw-bold fs-5"
                    type="submit"
                  >
                    نشر المقال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterHome class="mt-auto" />
  </div>
</template>
