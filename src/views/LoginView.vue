<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <!-- Left Panel -->
    <div class="auth-left">
      <router-link to="/" class="back-link">
        <svg viewBox="0 0 20 20" fill="none"><path d="M16 10H4M4 10l6-6M4 10l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Back to Home
      </router-link>
      <div class="auth-branding">
        <div class="brand-logo">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.9"/>
            <rect x="18" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="2" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <h2>GSO Facility Management System</h2>
        <p>Caraga State University<br>Office of the General Services</p>
      </div>
      <div class="auth-tagline">
        <div class="tagline-item" v-for="t in taglines" :key="t">
          <svg viewBox="0 0 20 20" fill="none"><path d="M5 10l4 4L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          {{ t }}
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="auth-right">
      <div class="auth-card">
        <!-- Tabs -->
        <div class="auth-tabs">
          <button :class="['tab', { active: mode === 'login' }]" @click="mode = 'login'">Sign In</button>
          <button :class="['tab', { active: mode === 'register' }]" @click="mode = 'register'">Create Account</button>
        </div>

        <!-- Login Form -->
        <div v-if="mode === 'login'" class="auth-form">
          <h3>Welcome back</h3>
          <p class="form-subtitle">Sign in to your GSO account</p>

          <div class="alert alert-info" style="margin-bottom: 16px;">
            <strong>Test Account:</strong><br>
            Email: admin@csu.edu.ph<br>
            Password: Admin123!
          </div>

          <div class="field">
            <label>Email Address</label>
            <input v-model="loginData.email" type="email" placeholder="your@csu.edu.ph" />
          </div>
          <div class="field">
            <label>Password</label>
            <div class="input-with-icon">
              <input v-model="loginData.password" :type="showPw ? 'text' : 'password'" placeholder="Enter password" />
              <button class="eye-btn" @click="showPw = !showPw">
                <svg v-if="!showPw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="alert alert-error">{{ error }}</div>

          <button class="submit-btn" @click="handleLogin" :disabled="loading">
            <span v-if="!loading">Sign In</span>
            <span v-else class="loading-dots">Signing in<span>.</span><span>.</span><span>.</span></span>
          </button>
        </div>

        <!-- Register Form -->
        <div v-else class="auth-form">
          <h3>Create Account</h3>
          <p class="form-subtitle">Register for a GSO account</p>

          <div v-if="registered" class="alert alert-success">
            <strong>Account Created!</strong><br>
            A verification link has been sent. For testing, click the link below:<br>
            <a :href="`#/verify?token=${verifyToken}`" class="verify-link" @click="goVerify">
              Click here to verify your account
            </a>
          </div>

          <template v-if="!registered">
            <div class="field">
              <label>Full Name</label>
              <input v-model="regData.name" type="text" placeholder="Juan Dela Cruz" />
            </div>
            <div class="field">
              <label>Email Address</label>
              <input v-model="regData.email" type="email" placeholder="your@csu.edu.ph" />
            </div>
            <div class="field">
              <label>Password</label>
              <input v-model="regData.password" :type="showPw ? 'text' : 'password'" placeholder="Min. 8 characters" />
            </div>
            <div class="field">
              <label>Confirm Password</label>
              <input v-model="regData.confirm" :type="showPw ? 'text' : 'password'" placeholder="Repeat password" />
            </div>
            <div class="field">
              <label>Role</label>
              <select v-model="regData.role">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div v-if="error" class="alert alert-error">{{ error }}</div>

            <button class="submit-btn" @click="handleRegister" :disabled="loading">
              <span v-if="!loading">Create Account</span>
              <span v-else>Processing...</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()

const mode = ref('login')
const showPw = ref(false)
const loading = ref(false)
const error = ref('')
const registered = ref(false)
const verifyToken = ref('')

const loginData = ref({ email: '', password: '' })
const regData = ref({ name: '', email: '', password: '', confirm: '', role: 'staff' })

const taglines = [
  'Manage 94+ campus buildings',
  'Track equipment & maintenance',
  'Generate official inspection reports',
  'Monitor all three management units',
]

async function handleLogin() {
  error.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  const res = auth.login(loginData.value.email, loginData.value.password)
  loading.value = false
  if (res.success) router.push('/home')
  else error.value = res.message
}

async function handleRegister() {
  error.value = ''
  if (!regData.value.name || !regData.value.email || !regData.value.password) {
    error.value = 'Please fill all fields.'
    return
  }
  if (regData.value.password !== regData.value.confirm) {
    error.value = 'Passwords do not match.'
    return
  }
  if (regData.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  const res = auth.register({ name: regData.value.name, email: regData.value.email, password: regData.value.password, role: regData.value.role })
  loading.value = false
  if (res.success) {
    verifyToken.value = res.token
    registered.value = true
  } else {
    error.value = res.message
  }
}

function goVerify() {
  router.push(`/verify?token=${verifyToken.value}`)
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.auth-bg { position: fixed; inset: 0; pointer-events: none; }
.orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; }
.orb-1 { width: 500px; height: 500px; background: var(--green-300); top: -150px; left: -100px; }
.orb-2 { width: 400px; height: 400px; background: var(--green-400); bottom: -100px; right: -100px; }

/* Left */
.auth-left {
  width: 420px;
  min-height: 100vh;
  background: linear-gradient(160deg, var(--green-500) 0%, var(--green-400) 100%);
  display: flex;
  flex-direction: column;
  padding: 40px;
  color: white;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.back-link {
  display: flex; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.8);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  margin-bottom: auto;
}
.back-link svg { width: 16px; height: 16px; }
.back-link:hover { color: white; }

.auth-branding { margin-top: auto; }
.brand-logo {
  width: 64px; height: 64px;
  background: rgba(255,255,255,0.2);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  color: white; padding: 14px;
  margin-bottom: 24px;
}
.auth-branding h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.3;
  margin-bottom: 8px;
}
.auth-branding p { opacity: 0.8; line-height: 1.6; font-size: 0.9rem; }

.auth-tagline { margin-top: 40px; display: flex; flex-direction: column; gap: 12px; }
.tagline-item {
  display: flex; align-items: center; gap: 12px;
  font-size: 0.875rem;
  opacity: 0.9;
}
.tagline-item svg { width: 18px; height: 18px; color: var(--green-100); flex-shrink: 0; }

/* Right */
.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  z-index: 1;
  background: var(--gray-50);
}

.auth-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 48px;
  width: 100%;
  max-width: 440px;
  box-shadow: var(--shadow-xl);
  animation: scaleIn 0.4s ease;
}

.auth-tabs {
  display: flex;
  background: var(--gray-100);
  border-radius: 50px;
  padding: 4px;
  margin-bottom: 36px;
}
.tab {
  flex: 1;
  padding: 10px;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-600);
  background: transparent;
  transition: var(--transition);
}
.tab.active {
  background: white;
  color: var(--green-500);
  box-shadow: var(--shadow-sm);
}

.auth-form h3 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--gray-800);
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}
.form-subtitle { color: var(--gray-400); font-size: 0.875rem; margin-bottom: 28px; }

.field { margin-bottom: 20px; }
.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--gray-600);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.field input, .field select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-sm);
  font-size: 0.925rem;
  color: var(--gray-800);
  background: var(--gray-50);
  transition: var(--transition);
}
.field input:focus, .field select:focus {
  border-color: var(--green-400);
  background: white;
  box-shadow: 0 0 0 3px rgba(77,167,104,0.15);
}
.field select { cursor: pointer; }

.input-with-icon { position: relative; }
.input-with-icon input { padding-right: 48px; }
.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: var(--gray-400);
  padding: 4px;
}
.eye-btn svg { width: 18px; height: 18px; }

.submit-btn {
  width: 100%;
  padding: 14px;
  background: var(--green-500);
  color: white;
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 1rem;
  transition: var(--transition);
  margin-top: 8px;
}
.submit-btn:hover:not(:disabled) {
  background: var(--green-400);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.submit-btn:disabled { opacity: 0.7; }

.alert {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  margin-bottom: 16px;
  line-height: 1.5;
}
.alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
.alert-success { background: #f0fdf4; border: 1px solid var(--green-200); color: var(--green-500); }
.alert-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }

.verify-link {
  color: var(--green-500);
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
  margin-top: 8px;
}

.loading-dots span { animation: pulse 1s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@media (max-width: 768px) {
  .auth-page { flex-direction: column; }
  .auth-left { width: 100%; min-height: auto; padding: 32px 24px; }
  .auth-tagline { display: none; }
  .auth-right { padding: 24px; }
  .auth-card { padding: 32px 24px; }
}
</style>
