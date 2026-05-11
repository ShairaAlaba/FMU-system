<template>
  <div class="verify-page">
    <div class="verify-card">
      <div v-if="verifying" class="verify-state">
        <div class="spinner"></div>
        <p>Verifying your account...</p>
      </div>
      <div v-else-if="success" class="verify-state success">
        <div class="verify-icon success-icon">
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h2>Email Verified!</h2>
        <p>Your account has been successfully verified. You can now sign in.</p>
        <router-link to="/login" class="btn-primary">Go to Sign In</router-link>
      </div>
      <div v-else class="verify-state error">
        <div class="verify-icon error-icon">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        </div>
        <h2>Verification Failed</h2>
        <p>{{ message }}</p>
        <router-link to="/login" class="btn-primary">Back to Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const auth = useAuthStore()
const verifying = ref(true)
const success = ref(false)
const message = ref('')

onMounted(async () => {
  const token = route.query.token
  await new Promise(r => setTimeout(r, 1000))
  const res = auth.verifyEmail(token)
  verifying.value = false
  success.value = res.success
  message.value = res.message || ''
})
</script>

<style scoped>
.verify-page {
  min-height: 100vh;
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
}
.verify-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 64px;
  max-width: 480px;
  width: 90%;
  box-shadow: var(--shadow-xl);
  text-align: center;
}
.verify-state { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.verify-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px;
}
.success-icon { background: var(--green-100); color: var(--green-500); }
.error-icon { background: #fef2f2; color: #dc2626; }
.verify-icon svg { width: 36px; height: 36px; }
h2 { font-family: var(--font-display); font-size: 1.75rem; color: var(--gray-800); }
p { color: var(--gray-600); line-height: 1.6; }
.btn-primary {
  display: inline-flex;
  padding: 12px 32px;
  background: var(--green-500);
  color: white;
  border-radius: 50px;
  font-weight: 700;
  transition: var(--transition);
  margin-top: 8px;
}
.btn-primary:hover { background: var(--green-400); }
.spinner {
  width: 48px; height: 48px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--green-400);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
