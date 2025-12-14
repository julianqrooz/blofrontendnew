<template>
  <footer class="bg-dark py-4 mt-auto">
    <div class="container px-5">
      <div
        class="row align-items-center justify-content-between flex-column flex-sm-row"
      >
        <div class="col-auto">
          <div class="small m-0 text-white">Copyright © Julia 2025</div>
        </div>
        <div class="col-auto">
          <router-link class="link-light small" to="/privacy"
            >خصوصية</router-link
          >
          <span class="text-white mx-1">·</span>
          <router-link class="link-light small" to="/terms"
            >الشروط والأحكام</router-link
          >
          <span class="text-white mx-1">·</span>
          <router-link class="link-light small" to="/contact"
            >اتصال</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>
