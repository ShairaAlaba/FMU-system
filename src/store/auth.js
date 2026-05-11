import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('gso_user') || 'null'))
  const pendingUsers = ref(JSON.parse(localStorage.getItem('gso_pending') || '[]'))
  const verifiedUsers = ref(JSON.parse(localStorage.getItem('gso_users') || JSON.stringify([
    { email: 'admin@csu.edu.ph', password: 'Admin123!', name: 'System Administrator', role: 'admin', verified: true }
  ])))

  function saveUsers() {
    localStorage.setItem('gso_users', JSON.stringify(verifiedUsers.value))
    localStorage.setItem('gso_pending', JSON.stringify(pendingUsers.value))
  }

  function login(email, password) {
    const found = verifiedUsers.value.find(u => u.email === email && u.password === password && u.verified)
    if (found) {
      user.value = { email: found.email, name: found.name, role: found.role }
      localStorage.setItem('gso_user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials or account not verified.' }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('gso_user')
  }

  function register(data) {
    const exists = verifiedUsers.value.find(u => u.email === data.email) ||
                   pendingUsers.value.find(u => u.email === data.email)
    if (exists) return { success: false, message: 'Email already registered.' }

    const token = Math.random().toString(36).substr(2, 20)
    pendingUsers.value.push({ ...data, token, verified: false, createdAt: new Date().toISOString() })
    saveUsers()
    return { success: true, token, email: data.email }
  }

  function verifyEmail(token) {
    const idx = pendingUsers.value.findIndex(u => u.token === token)
    if (idx === -1) return { success: false, message: 'Invalid or expired verification link.' }

    const u = { ...pendingUsers.value[idx], verified: true }
    delete u.token
    verifiedUsers.value.push(u)
    pendingUsers.value.splice(idx, 1)
    saveUsers()
    return { success: true }
  }

  return { user, login, logout, register, verifyEmail }
})
