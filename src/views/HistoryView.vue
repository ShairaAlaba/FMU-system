<template>
  <AppLayout>
    <div class="history-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <div class="unit-badge" :style="`background: ${unitColor}20; color: ${unitColor}`">{{ unit }}</div>
          <h1>Records History</h1>
          <p class="page-desc">All records for {{ unitTitle }} organized by form category and building.</p>
        </div>
        <div class="header-actions">
          <select v-model="filterForm" class="filter-select">
            <option value="">All Forms</option>
            <option v-for="f in formTypes" :key="f.id" :value="f.id">{{ f.id }} — {{ f.title }}</option>
          </select>
          <select v-model="filterBuilding" class="filter-select">
            <option value="">All Buildings</option>
            <option v-for="b in buildings" :key="b.code" :value="b.code">{{ b.code }} — {{ b.name }}</option>
          </select>
        </div>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-pill" v-for="f in formTypes" :key="f.id">
          <span class="sp-label" :style="`color: ${f.color}`">{{ f.id }}</span>
          <span class="sp-count">{{ getFormTotal(f.id) }}</span>
          <span class="sp-text">records</span>
        </div>
      </div>

      <!-- Content by Form -->
      <div v-if="filteredSections.length === 0" class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
        <p>No records found. Start adding records from a building's form page.</p>
      </div>

      <div v-for="section in filteredSections" :key="section.formId" class="form-section">
        <div class="form-section-header" :style="`border-left: 4px solid ${section.color}`">
          <div class="fsh-left">
            <span class="fsh-id" :style="`color: ${section.color}`">{{ section.formId }}</span>
            <span class="fsh-title">{{ section.title }}</span>
          </div>
          <span class="fsh-count">{{ section.records.length }} record{{ section.records.length !== 1 ? 's' : '' }}</span>
        </div>

        <div v-if="section.records.length === 0" class="section-empty">No records for this form type.</div>

        <div v-else class="section-table-wrap">
          <table class="history-table">
            <thead>
              <tr>
                <th>Building</th>
                <th v-for="col in section.columns" :key="col.key">{{ col.label }}</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rec in section.records" :key="rec.id">
                <td>
                  <router-link :to="`/${unit.toLowerCase()}/building/${rec._building}`" class="bld-link">
                    {{ rec._building }}
                  </router-link>
                </td>
                <td v-for="col in section.columns" :key="col.key">{{ rec[col.key] || '—' }}</td>
                <td>{{ formatDate(rec.createdAt) }}</td>
                <td>
                  <router-link :to="`/${unit.toLowerCase()}/building/${rec._building}/form/${section.formId}`" class="act-btn view">
                    Open
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const filterForm = ref('')
const filterBuilding = ref('')

const formTypes = [
  { id: 'FORM1', title: 'List of Equipment & Facilities', color: '#006633', columns: [{ key: 'name', label: 'Equipment Name' }, { key: 'eqfCode', label: 'EQF Code' }, { key: 'accountableTo', label: 'Accountable To' }] },
  { id: 'FORM2', title: 'GSO Preventive Maintenance', color: '#26874e', columns: [{ key: 'description', label: 'Description' }, { key: 'frequency', label: 'Frequency' }, { key: 'responsible', label: 'Responsible' }] },
  { id: 'FORM3', title: 'Preventive Maintenance Checklist', color: '#4da768', columns: [{ key: 'facilityName', label: 'Facility' }, { key: 'month', label: 'Month' }, { key: 'mechanic', label: 'Mechanic' }] },
  { id: 'FORM16', title: 'Pre Inspection Report', color: '#73c883', columns: [{ key: 'requestedBy', label: 'Requested By' }, { key: 'defect1', label: 'Primary Defect' }, { key: 'inspectedBy', label: 'Inspected By' }] },
  { id: 'FORM20', title: 'Assessment of Buildings', color: '#99e89d', columns: [{ key: 'yearConstructed', label: 'Year Built' }, { key: 'buildingType', label: 'Type' }, { key: 'condition', label: 'Condition' }] },
]

function getFormTotal(formId) {
  return buildings.reduce((sum, b) => sum + recordsStore.getRecords(unit.value, b.code, formId).length, 0)
}

const allSections = computed(() => {
  return formTypes.map(f => {
    const recs = []
    const blds = filterBuilding.value ? buildings.filter(b => b.code === filterBuilding.value) : buildings
    blds.forEach(b => {
      const bRecs = recordsStore.getRecords(unit.value, b.code, f.id)
      bRecs.forEach(r => recs.push({ ...r, _building: b.code }))
    })
    return { ...f, records: recs }
  })
})

const filteredSections = computed(() => {
  let sections = allSections.value
  if (filterForm.value) sections = sections.filter(s => s.formId === filterForm.value)
  return sections.filter(s => s.records.length > 0 || !filterForm.value)
})

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.history-page { padding: 32px 40px; animation: fadeIn 0.4s ease; }

.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 24px; }
.unit-badge { display: inline-flex; padding: 4px 12px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.page-header h1 { font-family: var(--font-display); font-size: 1.75rem; color: var(--gray-800); letter-spacing: -0.5px; margin-bottom: 4px; }
.page-desc { color: var(--gray-400); font-size: 0.875rem; }

.header-actions { display: flex; gap: 12px; align-items: center; flex-shrink: 0; }
.filter-select {
  padding: 9px 14px; border: 1px solid var(--gray-200); border-radius: var(--radius-sm);
  font-size: 0.85rem; color: var(--gray-700); background: white; cursor: pointer;
  min-width: 200px; transition: var(--transition);
}
.filter-select:focus { border-color: var(--green-400); outline: none; box-shadow: 0 0 0 3px rgba(77,167,104,0.15); }

.stats-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
.stat-pill {
  display: flex; align-items: center; gap: 8px;
  background: white; border: 1px solid var(--gray-200); border-radius: 50px;
  padding: 8px 18px; font-size: 0.85rem; box-shadow: var(--shadow-sm);
}
.sp-label { font-weight: 700; font-size: 0.8rem; }
.sp-count { font-weight: 800; color: var(--gray-800); }
.sp-text { color: var(--gray-400); }

.form-section { margin-bottom: 28px; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }

.form-section-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}
.fsh-left { display: flex; align-items: center; gap: 12px; }
.fsh-id { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
.fsh-title { font-weight: 600; color: var(--gray-800); font-size: 0.9rem; }
.fsh-count { font-size: 0.8rem; color: var(--gray-400); font-weight: 500; }

.section-empty { padding: 24px; text-align: center; color: var(--gray-400); font-size: 0.875rem; }

.section-table-wrap { overflow-x: auto; }
.history-table { width: 100%; border-collapse: collapse; }
.history-table th {
  background: white; padding: 10px 14px; text-align: left; font-size: 0.75rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-500);
  border-bottom: 1px solid var(--gray-200); white-space: nowrap;
}
.history-table td {
  padding: 10px 14px; font-size: 0.85rem; color: var(--gray-700);
  border-bottom: 1px solid var(--gray-100); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.history-table tr:last-child td { border-bottom: none; }
.history-table tr:hover td { background: var(--gray-50); }

.bld-link { color: var(--green-500); font-weight: 600; font-size: 0.8rem; font-family: monospace; }
.bld-link:hover { text-decoration: underline; }
.act-btn.view {
  padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;
  background: var(--gray-100); color: var(--gray-700); transition: var(--transition); display: inline-block;
}
.act-btn.view:hover { background: var(--green-100); color: var(--green-600, var(--green-500)); }

.empty-state {
  background: white; border: 1px dashed var(--gray-300); border-radius: var(--radius-md);
  padding: 64px; text-align: center; color: var(--gray-400);
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.empty-state svg { width: 48px; height: 48px; }
.empty-state p { font-size: 0.875rem; max-width: 360px; line-height: 1.6; }

@media (max-width: 768px) {
  .history-page { padding: 20px; }
  .page-header { flex-direction: column; }
  .header-actions { flex-direction: column; width: 100%; }
  .filter-select { min-width: unset; width: 100%; }
}
</style>
