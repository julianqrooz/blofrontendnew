<template>
  <div class="container py-5 my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-header bg-info text-white text-center py-4">
            <h1 class="fw-bold mb-0">اتصل بنا</h1>
            <p class="mb-0 mt-2">Contact Us</p>
          </div>
          <div class="card-body p-5">
            <p class="text-center text-muted mb-5 fs-5">
              هل لديك اقتراح؟ مشكلة؟ فكرة تعاون؟ نحن هنا لنسمع منك! 📩
            </p>

            <!-- الفورم (يرسل لإيميلك عبر Formspree مجاني) -->
            <form
              action="https://formspree.io/f/mvgeydkg"
              method="POST"
              class="needs-validation"
              novalidate
            >
              <div class="form-floating mb-4">
                <input
                  type="text"
                  name="name"
                  class="form-control form-control-lg"
                  placeholder="اسمك"
                  required
                />
                <label>اسمك</label>
              </div>

              <div class="form-floating mb-4">
                <input
                  type="email"
                  name="email"
                  class="form-control form-control-lg"
                  placeholder="بريدك الإلكتروني"
                  required
                />
                <label>بريدك الإلكتروني</label>
              </div>

              <div class="form-floating mb-4">
                <textarea
                  name="message"
                  class="form-control form-control-lg"
                  style="height: 150px"
                  placeholder="رسالتك"
                  required
                ></textarea>
                <label>رسالتك</label>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-lg px-5 py-3 fw-bold"
                >
                  إرسال الرسالة
                </button>
              </div>
            </form>

            <div class="text-center mt-5">
              <p class="text-muted">
                أو تواصل معنا مباشرة عبر البريد:
                <strong>julianqrooz@gmail.com </strong><br />
                سنرد عليك في أقرب وقت ممكن ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

h1 {
  color: #ffffff;
}

.form-control:focus {
  border-color: #0dcaf0;
  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25);
}

.btn-info {
  background-color: #0dcaf0;
  border-color: #0dcaf0;
}

.btn-info:hover {
  background-color: #0bb5d8;
}
</style>
