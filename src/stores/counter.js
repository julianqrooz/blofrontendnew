import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const api = axios.create({
  baseURL: "https://blog-xa93.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) delete config.headers["Content-Type"];
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/auth/login") &&
      !error.config.url.includes("/auth/register")
    ) {
      const authStore = useAuthStore();
      authStore.logout();
      alert("انتهت صلاحية جلستك، تم تسجيل الخروج تلقائياً");
      router.push("/login");
    }
    throw error;
  }
);
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token"),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async register(form) {
      const res = await api.post("/auth/register", form);
      this.setUser(res.data);
    },
    async login(form) {
      const res = await api.post("/auth/login", form);
      this.setUser(res.data);
    },
    setUser(data) {
      this.user = { _id: data._id, name: data.name, email: data.email };
      this.token = data.token;
      localStorage.setItem("token", data.token);
    },
    restoreUser() {
      const token = localStorage.getItem("token");
      if (!token) return this.logout();
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const currentTime = Date.now() / 1000; // الوقت الحالي بالثواني (Unix Timestamp)

        // التحقق من انتهاء الصلاحية:
        if (payload.exp < currentTime) {
          console.log("Token has expired. Logging out.");
          return this.logout(); // يتم تسجيل الخروج إذا انتهت صلاحية التوكن
        }

        // إذا لم تنتهِ الصلاحية:
        this.user = {
          _id: payload.id || payload._id || payload.sub, // أولوية للـ id أولاً
          name: payload.name,
        };
        this.token = token;
      } catch {
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
export { api };
