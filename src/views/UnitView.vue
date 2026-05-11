<template>
  <AppLayout>
    <div class="unit-page">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-left">
          <router-link to="/home" class="breadcrumb-back">
            <svg viewBox="0 0 20 20" fill="none"><path d="M16 10H4M4 10l6-6M4 10l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Dashboard
          </router-link>
          <div class="page-title-wrap">
            <div class="unit-badge" :style="`background: ${unitColor}20; color: ${unitColor}`">{{ unit }}</div>
            <h1>{{ title }}</h1>
          </div>
          <p class="page-desc">
            <template v-if="unit === 'FMU'">Select a building to access equipment lists, maintenance checklists, inspection reports, and assessment forms.</template>
            <template v-else>Select a building to manage records for this unit. Forms will be available soon.</template>
          </p>
        </div>
        <div class="header-stats">
          <div class="hstat">
            <span class="hstat-num">{{ buildings.length }}</span>
            <span class="hstat-label">Buildings</span>
          </div>
          <div class="hstat" v-if="unit === 'FMU'">
            <span class="hstat-num">5</span>
            <span class="hstat-label">Form Types</span>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input v-model="search" type="text" placeholder="Search by building name or code (e.g. BL-001, CAA BUILDING)..." />
        <span v-if="search" class="search-count">{{ filteredBuildings.length }} result{{ filteredBuildings.length !== 1 ? 's' : '' }}</span>
        <button v-if="search" class="search-clear" @click="search = ''">
          <svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Buildings Grid -->
      <div v-if="filteredBuildings.length > 0" class="buildings-grid">
        <component
          :is="unit === 'FMU' ? 'router-link' : 'div'"
          v-for="bld in filteredBuildings"
          :key="bld.code"
          :to="unit === 'FMU' ? `/${unit.toLowerCase()}/building/${bld.code}` : undefined"
          :class="['building-card', { 'building-card-disabled': unit !== 'FMU' }]"
          @click="unit !== 'FMU' ? showComingSoon(bld) : null"
        >
          <div class="building-code">{{ bld.code }}</div>
          <div class="building-name">{{ bld.name }}</div>
          <div class="building-arrow" v-if="unit === 'FMU'">
            <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="building-soon" v-else>
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 3a7 7 0 1 0 0 14A7 7 0 0 0 10 3zm0 4v4m0 2v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
        </component>
      </div>

      <div v-else class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <p>No buildings found for "{{ search }}"</p>
        <button @click="search = ''" class="clear-btn">Clear Search</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { buildings as allBuildings } from '@/data/buildings'

const props = defineProps({
  unit: { type: String, required: true },
  title: { type: String, required: true }
})

const search = ref('')
const buildings = allBuildings

const unitColorMap = { FMU: '#006633', LU: '#26874e', TU: '#4da768' }
const unitColor = computed(() => unitColorMap[props.unit] || '#006633')

const filteredBuildings = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return buildings
  return buildings.filter(b => b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q))
})

function showComingSoon(bld) {
  alert(`Forms for ${props.unit} - ${bld.name} are coming soon!`)
}
</script>

<style scoped>
.unit-page {
  padding: 32px 40px;
  animation: fadeIn 0.4s ease;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28px;
}

.breadcrumb-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--gray-400);
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 12px;
  transition: var(--transition);
}
.breadcrumb-back svg { width: 14px; height: 14px; }
.breadcrumb-back:hover { color: var(--green-500); }

.page-title-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.unit-badge {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 4px 12px;
  border-radius: 50px;
}
.page-title-wrap h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--gray-800);
  letter-spacing: -0.5px;
}
.page-desc { color: var(--gray-400); font-size: 0.875rem; max-width: 560px; line-height: 1.6; }

.header-stats { display: flex; gap: 24px; }
.hstat { text-align: center; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 16px 24px; }
.hstat-num { display: block; font-size: 1.75rem; font-weight: 800; color: var(--green-500); }
.hstat-label { font-size: 0.7rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }

/* Search */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 20px;
  margin-bottom: 28px;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}
.search-bar:focus-within { border-color: var(--green-400); box-shadow: 0 0 0 3px rgba(77,167,104,0.15); }
.search-bar > svg { width: 20px; height: 20px; color: var(--gray-400); flex-shrink: 0; }
.search-bar input {
  flex: 1;
  border: none;
  background: none;
  font-size: 0.95rem;
  color: var(--gray-800);
}
.search-bar input::placeholder { color: var(--gray-400); }
.search-count { font-size: 0.8rem; color: var(--green-500); font-weight: 600; white-space: nowrap; }
.search-clear { color: var(--gray-400); padding: 2px; transition: var(--transition); }
.search-clear svg { width: 16px; height: 16px; }
.search-clear:hover { color: var(--gray-800); }

/* Buildings Grid */
.buildings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.building-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  padding: 16px 20px;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  color: inherit;
}
.building-card:hover:not(.building-card-disabled) {
  border-color: var(--green-300);
  background: var(--gray-50);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}
.building-card-disabled { cursor: default; opacity: 0.7; }

.building-code {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--green-500);
  background: var(--gray-100);
  padding: 4px 10px;
  border-radius: 6px;
  flex-shrink: 0;
  font-family: monospace;
}
.building-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-800);
  line-height: 1.3;
}
.building-arrow, .building-soon {
  color: var(--gray-400);
  flex-shrink: 0;
}
.building-arrow svg, .building-soon svg { width: 16px; height: 16px; }
.building-card:hover:not(.building-card-disabled) .building-arrow { color: var(--green-500); }

.empty-state {
  text-align: center;
  padding: 64px;
  color: var(--gray-400);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.empty-state svg { width: 48px; height: 48px; }
.empty-state p { font-size: 0.9rem; }
.clear-btn {
  padding: 10px 24px;
  background: var(--green-500);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition);
}
.clear-btn:hover { background: var(--green-400); }

@media (max-width: 768px) {
  .unit-page { padding: 20px; }
  .page-header { flex-direction: column; gap: 16px; }
  .buildings-grid { grid-template-columns: 1fr; }
}
</style>
