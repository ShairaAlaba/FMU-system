<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: sidebarCollapsed }]">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.9"/>
              <rect x="18" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="2" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span v-if="!sidebarCollapsed" class="brand-text">GSO <span>FMS</span></span>
        </div>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <svg viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <span v-if="!sidebarCollapsed" class="nav-label">Main</span>
          <router-link to="/home" class="nav-item" active-class="active" exact>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
            <span v-if="!sidebarCollapsed">Dashboard</span>
          </router-link>
        </div>

        <div class="nav-section" v-for="unit in units" :key="unit.abbr">
          <span v-if="!sidebarCollapsed" class="nav-label">{{ unit.abbr }}</span>
          <router-link :to="`/${unit.abbr.toLowerCase()}`" class="nav-item" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2"/></svg>
            <span v-if="!sidebarCollapsed">{{ unit.name }}</span>
          </router-link>
          <router-link :to="`/${unit.abbr.toLowerCase()}/history`" class="nav-item nav-sub" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            <span v-if="!sidebarCollapsed">History</span>
          </router-link>
          <router-link :to="`/${unit.abbr.toLowerCase()}/analysis`" class="nav-item nav-sub" active-class="active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span v-if="!sidebarCollapsed">Analysis</span>
          </router-link>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info" v-if="!sidebarCollapsed">
          <div class="user-avatar">{{ auth.user?.name?.[0] || 'U' }}</div>
          <div class="user-details">
            <span class="user-name">{{ auth.user?.name }}</span>
            <span class="user-role">{{ auth.user?.role }}</span>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout" :title="sidebarCollapsed ? 'Logout' : ''">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span v-if="!sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()
const sidebarCollapsed = ref(false)

const units = [
  { abbr: 'FMU', name: 'Facility Mgt. Unit' },
  { abbr: 'LU', name: 'Landscape Unit' },
  { abbr: 'TU', name: 'Transportation Unit' },
]

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--gray-50);
}

.sidebar {
  width: 260px;
  min-height: 100vh;
  background: white;
  border-right: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s ease;
  flex-shrink: 0;
  z-index: 50;
}
.sidebar.collapsed { width: 72px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid var(--gray-100);
  min-height: 72px;
}

.sidebar-brand { display: flex; align-items: center; gap: 12px; overflow: hidden; }
.brand-icon {
  width: 36px; height: 36px;
  background: var(--green-500);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: white; padding: 7px;
  flex-shrink: 0;
}
.brand-text { font-size: 1rem; font-weight: 700; color: var(--gray-800); white-space: nowrap; }
.brand-text span { color: var(--green-500); }

.collapse-btn {
  background: none;
  color: var(--gray-400);
  padding: 6px;
  border-radius: 6px;
  transition: var(--transition);
  flex-shrink: 0;
}
.collapse-btn svg { width: 20px; height: 20px; }
.collapse-btn:hover { background: var(--gray-100); color: var(--gray-800); }

.sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
.nav-section { margin-bottom: 8px; }
.nav-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--gray-400);
  padding: 0 8px;
  margin-bottom: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  white-space: nowrap;
}
.nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
.nav-item:hover { background: var(--gray-100); color: var(--gray-800); }
.nav-item.active { background: var(--green-500); color: white; }
.nav-sub { padding-left: 24px; }
.sidebar.collapsed .nav-sub { padding-left: 12px; }

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--gray-100);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}
.user-avatar {
  width: 36px; height: 36px;
  background: var(--green-100);
  color: var(--green-600, var(--green-500));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}
.user-name { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-800); }
.user-role { font-size: 0.75rem; color: var(--gray-400); text-transform: capitalize; }
.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 500;
  background: #fef2f2;
  transition: var(--transition);
  width: 100%;
}
.logout-btn svg { width: 18px; height: 18px; }
.logout-btn:hover { background: #fee2e2; }

.main-content {
  flex: 1;
  overflow-x: hidden;
  min-width: 0;
}
</style>
