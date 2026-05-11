<template>
  <AppLayout>
    <div class="forms-page" v-if="building">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/home">Dashboard</router-link>
        <span>/</span>
        <router-link :to="`/${unit}`">{{ unitTitle }}</router-link>
        <span>/</span>
        <span class="bc-current">{{ building.name }}</span>
      </div>

      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="building-id">{{ building.code }}</div>
          <h1>{{ building.name }}</h1>
          <p class="page-desc">Select a form type to view, add, or manage records for this building.</p>
        </div>
        <router-link :to="`/${unit}`" class="back-btn">
          <svg viewBox="0 0 20 20" fill="none"><path d="M16 10H4M4 10l6-6M4 10l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to Buildings
        </router-link>
      </div>

      <!-- 5 Form Vertical Cards -->
      <div class="forms-section">
        <h2 class="section-title">Available Forms</h2>
        <div class="form-cards">
          <router-link
            v-for="form in forms"
            :key="form.id"
            :to="`/${unit}/building/${building.code}/form/${form.id}`"
            class="form-card"
            :style="`--fc: ${form.color}`"
          >
            <div class="form-card-top">
              <div class="form-card-icon" v-html="form.icon"></div>
              <div class="form-number">{{ form.id }}</div>
            </div>
            <div class="form-card-body">
              <div class="form-title">{{ form.title }}</div>
              <div class="form-desc">{{ form.desc }}</div>
            </div>
            <div class="form-card-bottom">
              <div class="record-count">
                <svg viewBox="0 0 20 20" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ getCount(form.id) }} record{{ getCount(form.id) !== 1 ? 's' : '' }}
              </div>
              <div class="form-open">
                Open
                <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="not-found">Building not found.</div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { buildings } from '@/data/buildings'
import { useRecordsStore } from '@/store/records'

const route = useRoute()
const records = useRecordsStore()
const unit = computed(() => route.params.unit.toUpperCase())
const code = computed(() => route.params.code)

const unitTitleMap = { FMU: 'Facility Management Unit', LU: 'Landscape Unit', TU: 'Transportation Unit' }
const unitTitle = computed(() => unitTitleMap[unit.value] || unit.value)

const building = computed(() => buildings.find(b => b.code === code.value))

const forms = [
  {
    id: 'FORM1',
    title: 'List of Equipment & Facilities',
    desc: 'Inventory of all equipment and facilities, EQF codes, accountable persons, and maintenance frequency.',
    color: '#006633',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
  },
  {
    id: 'FORM2',
    title: 'GSO Preventive Maintenance',
    desc: 'Annual preventive maintenance program with tasks by frequency: daily, weekly, monthly, quarterly, bi-annual, annual.',
    color: '#26874e',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
  },
  {
    id: 'FORM3',
    title: 'Preventive Maintenance Checklist',
    desc: 'Monthly checklist tracking weekly and periodic maintenance tasks per equipment with mechanic assignments.',
    color: '#4da768',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  },
  {
    id: 'FORM16',
    title: 'Pre Inspection Report',
    desc: 'Pre-inspection report for buildings and equipment — defects, findings, work scope, and materials needed.',
    color: '#73c883',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>'
  },
  {
    id: 'FORM20',
    title: 'Assessment of Buildings',
    desc: 'Building utilization assessment — construction year, renovation, type, structural integrity, area, and condition remarks.',
    color: '#99e89d',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>'
  },
]

function getCount(formId) {
  return records.getRecords(unit.value, code.value, formId).length
}
</script>

<style scoped>
.forms-page {
  padding: 32px 40px;
  animation: fadeIn 0.4s ease;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-bottom: 24px;
}
.breadcrumb a { color: var(--green-500); font-weight: 500; }
.breadcrumb a:hover { text-decoration: underline; }
.bc-current { font-weight: 600; color: var(--gray-600); }
.breadcrumb span { color: var(--gray-300); }

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
}

.building-id {
  display: inline-flex;
  background: var(--green-500);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: monospace;
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.page-header h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--gray-800);
  letter-spacing: -0.5px;
  margin-bottom: 6px;
}
.page-desc { color: var(--gray-400); font-size: 0.875rem; }

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-600);
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
}
.back-btn svg { width: 16px; height: 16px; }
.back-btn:hover { border-color: var(--green-300); color: var(--green-500); }

.section-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gray-800);
  letter-spacing: -0.5px;
  margin-bottom: 24px;
}

/* 5 vertical form cards */
.form-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1100px;
}

.form-card {
  aspect-ratio: 16 / 24;
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: fadeIn 0.5s ease both;
  box-shadow: var(--shadow-sm);
}
.form-card:nth-child(2) { animation-delay: 0.08s; }
.form-card:nth-child(3) { animation-delay: 0.16s; }
.form-card:nth-child(4) { animation-delay: 0.24s; }
.form-card:nth-child(5) { animation-delay: 0.32s; }

.form-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: var(--fc);
  box-shadow: 0 12px 40px rgba(0,102,51,0.2);
}

.form-card-top {
  background: linear-gradient(145deg, var(--fc) 0%, color-mix(in srgb, var(--fc) 80%, #99e89d 20%) 100%);
  padding: 24px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.form-card-icon {
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: white;
  padding: 10px;
}
.form-card-icon :deep(svg) { width: 100%; height: 100%; }
.form-number {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255,255,255,0.7);
}

.form-card-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--gray-800);
  line-height: 1.3;
}
.form-desc {
  font-size: 0.75rem;
  color: var(--gray-600);
  line-height: 1.5;
}

.form-card-bottom {
  padding: 14px 20px;
  border-top: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.record-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  color: var(--gray-400);
  font-weight: 500;
}
.record-count svg { width: 12px; height: 12px; }
.form-open {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--fc);
  transition: var(--transition);
}
.form-open svg { width: 14px; height: 14px; transition: var(--transition); }
.form-card:hover .form-open svg { transform: translateX(4px); }

.not-found {
  padding: 64px;
  text-align: center;
  color: var(--gray-400);
}

@media (max-width: 1100px) {
  .form-cards { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .forms-page { padding: 20px; }
  .form-cards { grid-template-columns: repeat(2, 1fr); }
}
</style>
