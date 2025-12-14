<script setup>
import FooterHome from "../components/FooterHome.vue";
</script>
<template>
  <div class="container py-5 my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-header bg-primary text-white text-center py-4">
            <h1 class="fw-bold mb-0">سياسة الخصوصية</h1>
            <p class="mb-0 mt-2">Privacy Policy</p>
          </div>
          <div class="card-body p-5">
            <p class="text-muted text-center mb-5">آخر تحديث: 14 ديسمبر 2025</p>

            <h3 class="fw-bold mb-3">مقدمة</h3>
            <p class="lead text-muted">
              مرحبًا بك نحن نهتم بخصوصيتك ونلتزم بحماية بياناتك الشخصية. هذه
              السياسة توضح كيف نجمع، نستخدم، ونحمي معلوماتك
            </p>

            <h3 class="fw-bold mb-3 mt-5">البيانات التي نجمعها</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                الاسم والبريد الإلكتروني وكلمة المرور عند التسجيل.
              </li>
              <li class="list-group-item">
                محتوى المقالات والتعليقات التي تنشرها.
              </li>
              <li class="list-group-item">
                بيانات تقنية تلقائية مثل عنوان IP، نوع المتصفح، والجهاز (لتحسين
                الأداء).
              </li>
            </ul>

            <h3 class="fw-bold mb-3 mt-5">كيف نستخدم بياناتك</h3>
            <p class="text-muted">نستخدم بياناتك فقط لـ:</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                تمكينك من تسجيل الدخول ونشر المقالات والتعليقات.
              </li>
              <li class="list-group-item">
                تحسين تجربة المستخدم وإصلاح الأخطاء.
              </li>
              <li class="list-group-item">
                التواصل معك في حالات ضرورية (مثل إعادة تعيين كلمة المرور).
              </li>
            </ul>

            <h3 class="fw-bold mb-3 mt-5">لا نشارك بياناتك</h3>
            <p class="text-muted">
              لا نبيع أو نشارك بياناتك الشخصية مع أي طرف ثالث، إلا في الحالات
              القانونية المطلوبة.
            </p>

            <h3 class="fw-bold mb-3 mt-5">الأمان</h3>
            <p class="text-muted">
              نستخدم تشفير قوي (HTTPS) وحماية كلمات المرور، لكن لا يوجد نظام آمن
              100%. نحن نبذل قصارى جهدنا لحماية بياناتك.
            </p>

            <h3 class="fw-bold mb-3 mt-5">حقوقك</h3>
            <p class="text-muted">
              يحق لك طلب حذف حسابك وبياناتك في أي وقت. تواصل معنا عبر البريد:
              [julianqrooz@gmail.com]
            </p>

            <h3 class="fw-bold mb-3 mt-5">التغييرات</h3>
            <p class="text-muted">
              قد نحدث هذه السياسة، وسنعلن عن أي تغيير كبير هنا.
            </p>

            <div class="text-center mt-5">
              <p class="text-muted">
                شكرًا لثقتك بنا ❤️<br />
                فريق Julia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterHome class="mt-auto" />
</template>

<style scoped>
.card {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

h3 {
  color: #0d6efd;
}

.list-group-item {
  background: transparent;
  border: none;
  padding-left: 0;
  padding-right: 0;
}
</style>
