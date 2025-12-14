<script setup>
import SectionHome from "../components/SectionHome.vue";
import FooterHome from "../components/FooterHome.vue";
</script>
<template>
  <div>
    <!-- Header / Hero Section -->
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5">
        <div
          class="row gx-5 align-items-center justify-content-center text-center text-md-start"
        >
          <!-- النصوص -->
          <div class="col-lg-8 col-xl-7 col-xxl-6">
            <div class="my-5">
              <h1
                class="display-4 display-md-3 fw-bolder text-white mb-3 mb-md-4"
              >
                مرحبا بك
              </h1>
              <p class="lead fw-normal text-white-50 mb-4 mb-md-5 fs-5">
                أهلاً بكم ، مساحتكم المخصصة للحصول على رؤى معمقة وأدلة عملية
                ومناقشات هادفة حول التكنولوجيا وأسلوب الحياة والمساعي الإبداعية.
              </p>

              <!-- الأزرار -->
              <div
                class="d-grid gap-3 d-sm-flex justify-content-center justify-content-md-start"
              >
                <router-link
                  class="btn btn-primary btn-lg px-5 py-3 me-sm-3"
                  to="/register"
                >
                  تسجيل
                </router-link>
                <router-link
                  class="btn btn-outline-light btn-lg px-5 py-3"
                  to="/login"
                >
                  تسجيل الدخول
                </router-link>
              </div>
            </div>
          </div>

          <!-- الصورة – هتظهر على التابلت فأعلى، واختياري على الموبايل -->
          <div class="col-xl-5 col-xxl-6 text-center mt-5 mt-xl-0">
            <img
              class="img-fluid rounded-3 shadow-lg"
              src="https://images.pexels.com/photos/5052875/pexels-photo-5052875.jpeg"
              alt="Julia Blog Hero Image"
              style="max-height: 400px; object-fit: cover"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- باقي الصفحة -->
    <SectionHome />
    <FooterHome />
  </div>
</template>

<style scoped>
/* تحسينات إضافية للموبايل */
@media (max-width: 767px) {
  .display-4 {
    font-size: 2.5rem;
  }
  .lead {
    font-size: 1.1rem;
  }
  .btn-lg {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
}

/* الصورة تظهر على الموبايل لو حابب (اختياري) */
/* إذا حابب تخفيها على الموبايل تمامًا، أضف d-none d-md-block للـ col التاني */
</style>
