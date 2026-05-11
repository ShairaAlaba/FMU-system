<template>
  <AppLayout>
    <div class="analysis-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="unit-badge" :style="`background: ${unitColor}20; color: ${unitColor}`">{{ unit }}</div>
          <h1>Analysis & Reports</h1>
          <p class="page-desc">Visual breakdown of all records and maintenance activities for {{ unitTitle }}.</p>
        </div>
        <div class="header-right">
          <div class="total-badge">
            <span class="tb-num">{{ totalRecords }}</span>
            <span class="tb-label">Total Records</span>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-grid">
        <div class="sum-card" v-for="f in formTypes" :key="f.id" :style="`--fc: ${f.color}`">
          <div class="sum-icon" v-html="f.icon"></div>
          <div class="sum-info">
            <span class="sum-count">{{ getFormTotal(f.id) }}</span>
            <span class="sum-label">{{ f.id }}</span>
            <span class="sum-title">{{ f.shortTitle }}</span>
          </div>
          <div class="sum-bar">
            <div class="sum-bar-fill" :style="`height: ${getBarHeight(f.id)}%`"></div>
          </div>
        </div>
      </div>

      <!-- Buildings with most records -->
      <div class="analysis-section">
        <h2>Buildings by Record Count</h2>
        <p class="section-sub">Top buildings with the most recorded entries across all forms.</p>

        <div v-if="topBuildings.length === 0" class="empty-chart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <p>No data yet. Add records to see analytics.</p>
        </div>

        <div v-else class="bar-chart">
          <div class="bar-item" v-for="b in topBuildings" :key="b.code">
            <div class="bar-label">
              <span class="bl-code">{{ b.code }}</span>
              <span class="bl-name">{{ b.name }}</span>
            </div>
            <div class="bar-track">
              <div
                class="bar-fill"
                :style="`width: ${(b.total / maxBuildingCount) * 100}%; background: ${unitColor}`"
              ></div>
            </div>
            <span class="bar-count">{{ b.total }}</span>
          </div>
        </div>
      </div>

      <!-- Form Distribution -->
      <div class="analysis-section">
        <h2>Records by Form Type</h2>
        <p class="section-sub">Distribution of records across the 5 form types.</p>

        <div class="donut-section" v-if="totalRecords > 0">
          <div class="donut-legend">
            <div class="legend-item" v-for="f in formTypes" :key="f.id">
              <div class="legend-dot" :style="`background: ${f.color}`"></div>
              <div class="legend-info">
                <span class="legend-id">{{ f.id }}</span>
                <span class="legend-title">{{ f.shortTitle }}</span>
              </div>
              <div class="legend-bar-wrap">
                <div class="legend-bar-track">
                  <div class="legend-bar-fill" :style="`width: ${getPercent(f.id)}%; background: ${f.color}`"></div>
                </div>
              </div>
              <span class="legend-count">{{ getFormTotal(f.id) }} <small>({{ getPercent(f.id) }}%)</small></span>
            </div>
          </div>
        </div>
        <div v-else class="empty-chart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <p>No data yet. Records will appear here once added.</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="analysis-section">
        <h2>Quick Navigation</h2>
        <p class="section-sub">Jump to specific buildings or form records.</p>
        <div class="quick-nav-grid">
          <router-link :to="`/${unit.toLowerCase()}`" class="qn-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span>View All Buildings</span>
          </router-link>
          <router-link :to="`/${unit.toLowerCase()}/history`" class="qn-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
            <span>View Full History</span>
          </router-link>
          <router-link to="/home" class="qn-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
            <span>Dashboard</span>
          </router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { buildings } from '@/data/buildings'
import { useRecordsStore } from '@/store/records'

const route = useRoute()
const recordsStore = useRecordsStore()
const unit = computed(() => route.params.unit.toUpperCase())
const unitTitleMap = { FMU: 'Facility Management Unit', LU: 'Landscape Unit', TU: 'Transportation Unit' }
const unitTitle = computed(() => unitTitleMap[unit.value] || unit.value)
const unitColorMap = { FMU: '#006633', LU: '#26874e', TU: '#4da768' }
const unitColor = computed(() => unitColorMap[unit.value] || '#006633')

const formTypes = [
  { id: 'FORM1', shortTitle: 'Equipment List', color: '#006633', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
  { id: 'FORM2', shortTitle: 'PM Program', color: '#26874e', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' },
  { id: 'FORM3', shortTitle: 'PM Checklist', color: '#4da768', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
  { id: 'FORM16', shortTitle: 'Inspection Report', color: '#73c883', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' },
  { id: 'FORM20', shortTitle: 'Building Assessment', color: '#99e89d', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' },
]

function getFormTotal(formId) {
  return buildings.reduce((sum, b) => sum + recordsStore.getRecords(unit.value, b.code, formId).length, 0)
}

const totalRecords = computed(() => formTypes.reduce((sum, f) => sum + getFormTotal(f.id), 0))

const maxFormCount = computed(() => Math.max(...formTypes.map(f => getFormTotal(f.id)), 1))

function getBarHeight(formId) {
  return Math.round((getFormTotal(formId) / maxFormCount.value) * 100)
}

function getPercent(formId) {
  if (totalRecords.value === 0) return 0
  return Math.round((getFormTotal(formId) / totalRecords.value) * 100)
}

const topBuildings = computed(() => {
  return buildings
    .map(b => ({
      ...b,
      total: formTypes.reduce((sum, f) => sum + recordsStore.getRecords(unit.value, b.code, f.id).length, 0)
    }))
    .filter(b => b.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 15)
})

const maxBuildingCount = computed(() => Math.max(...topBuildings.value.map(b => b.total), 1))
</script>

<style scoped>
.analysis-page { padding: 32px 40px; animation: fadeIn 0.4s ease; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; }
.unit-badge { display: inline-flex; padding: 4px 12px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.page-header h1 { font-family: var(--font-display); font-size: 1.75rem; color: var(--gray-800); letter-spacing: -0.5px; margin-bottom: 4px; }
.page-desc { color: var(--gray-400); font-size: 0.875rem; }

.total-badge { text-align: center; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 20px 32px; box-shadow: var(--shadow-sm); }
.tb-num { display: block; font-size: 2.5rem; font-weight: 800; color: var(--green-500); line-height: 1; }
.tb-label { font-size: 0.75rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }

/* Summary Grid */
.summary-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-bottom: 32px; }

.sum-card {
  background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
  padding: 20px; display: flex; align-items: flex-start; gap: 12px;
  box-shadow: var(--shadow-sm); transition: var(--transition); position: relative; overflow: hidden;
}
.sum-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--fc); }

.sum-icon {
  width: 40px; height: 40px; background: color-mix(in srgb, var(--fc) 15%, white);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  color: var(--fc); padding: 9px; flex-shrink: 0;
}
.sum-icon :deep(svg) { width: 100%; height: 100%; }

.sum-info { flex: 1; min-width: 0; }
.sum-count { display: block; font-size: 1.75rem; font-weight: 800; color: var(--gray-800); line-height: 1; }
.sum-label { display: block; font-size: 0.65rem; font-weight: 700; color: var(--fc); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
.sum-title { display: block; font-size: 0.75rem; color: var(--gray-500); margin-top: 2px; line-height: 1.3; }

.sum-bar { position: absolute; bottom: 0; right: 0; width: 4px; height: 100%; background: var(--gray-100); }
.sum-bar-fill { position: absolute; bottom: 0; width: 100%; background: var(--fc); transition: height 1s ease; border-radius: 2px 2px 0 0; }

/* Analysis sections */
.analysis-section {
  background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg);
  padding: 28px; margin-bottom: 24px; box-shadow: var(--shadow-sm);
}
.analysis-section h2 { font-family: var(--font-display); font-size: 1.25rem; color: var(--gray-800); margin-bottom: 4px; }
.section-sub { color: var(--gray-400); font-size: 0.85rem; margin-bottom: 24px; }

/* Bar Chart */
.bar-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.bar-label { min-width: 180px; display: flex; flex-direction: column; }
.bl-code { font-size: 0.7rem; font-weight: 700; color: var(--green-500); font-family: monospace; }
.bl-name { font-size: 0.75rem; color: var(--gray-600); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px; }
.bar-track { flex: 1; height: 28px; background: var(--gray-100); border-radius: 6px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 6px; transition: width 1s ease; min-width: 4px; }
.bar-count { min-width: 32px; text-align: right; font-size: 0.85rem; font-weight: 700; color: var(--gray-800); }

/* Donut Legend */
.donut-legend { display: flex; flex-direction: column; gap: 16px; }
.legend-item { display: flex; align-items: center; gap: 12px; }
.legend-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.legend-info { min-width: 180px; }
.legend-id { display: block; font-size: 0.7rem; font-weight: 700; color: var(--gray-500); text-transform: uppercase; }
.legend-title { font-size: 0.85rem; font-weight: 600; color: var(--gray-800); }
.legend-bar-wrap { flex: 1; }
.legend-bar-track { height: 10px; background: var(--gray-100); border-radius: 5px; overflow: hidden; }
.legend-bar-fill { height: 100%; border-radius: 5px; transition: width 1s ease; }
.legend-count { min-width: 100px; text-align: right; font-size: 0.85rem; font-weight: 700; color: var(--gray-800); }
.legend-count small { font-size: 0.75rem; color: var(--gray-400); font-weight: 400; }

/* Quick Nav */
.quick-nav-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.qn-card {
  display: flex; align-items: center; gap: 12px;
  padding: 20px; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
  color: var(--gray-700); font-weight: 600; font-size: 0.9rem; transition: var(--transition);
  background: var(--gray-50);
}
.qn-card svg { width: 20px; height: 20px; color: var(--green-500); flex-shrink: 0; }
.qn-card:hover { border-color: var(--green-300); background: white; color: var(--green-500); transform: translateY(-2px); box-shadow: var(--shadow-sm); }

.empty-chart {
  padding: 48px; text-align: center; color: var(--gray-400);
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.empty-chart svg { width: 40px; height: 40px; }
.empty-chart p { font-size: 0.875rem; }

@media (max-width: 1100px) { .summary-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .analysis-page { padding: 20px; }
  .page-header { flex-direction: column; gap: 16px; }
  .summary-grid { grid-template-columns: repeat(2, 1fr); }
  .quick-nav-grid { grid-template-columns: 1fr; }
  .bar-label { min-width: 120px; }
}
</style>
