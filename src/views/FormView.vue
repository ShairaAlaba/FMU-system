<template>
  <AppLayout>
    <div class="form-view" v-if="building && formDef">
      <!-- Breadcrumb -->
      <div class="breadcrumb no-print">
        <router-link to="/home">Dashboard</router-link>
        <span>/</span>
        <router-link :to="`/${unit}`">{{ unitTitle }}</router-link>
        <span>/</span>
        <router-link :to="`/${unit}/building/${building.code}`">{{ building.code }}</router-link>
        <span>/</span>
        <span class="bc-current">{{ formDef.title }}</span>
      </div>

      <!-- Header -->
      <div class="page-header no-print">
        <div>
          <div class="form-badge" :style="`background: ${formDef.color}20; color: ${formDef.color}`">{{ formId }}</div>
          <h1>{{ formDef.title }}</h1>
          <p class="page-sub">{{ building.code }} — {{ building.name }}</p>
        </div>
        <div class="header-actions">
          <button class="btn-print" @click="handlePrint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / Export
          </button>
          <button class="btn-add" @click="showModal = true">
            <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Add Record
          </button>
        </div>
      </div>

      <!-- Records Table -->
      <div class="records-section no-print">
        <div v-if="records.length === 0" class="empty-records">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
          <p>No records yet. Click "Add Record" to create the first entry.</p>
        </div>
        <div v-else class="records-table-wrap">
          <table class="records-table">
            <thead>
              <tr>
                <th v-for="col in formDef.columns" :key="col.key">{{ col.label }}</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rec in records" :key="rec.id">
                <td v-for="col in formDef.columns" :key="col.key">{{ rec[col.key] || '—' }}</td>
                <td>{{ formatDate(rec.createdAt) }}</td>
                <td>
                  <div class="row-actions">
                    <button class="act-btn view" @click="viewRecord = rec; showViewModal = true">View</button>
                    <button class="act-btn danger" @click="deleteRec(rec.id)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Print Area -->
      <div class="print-area" ref="printArea">
        <component :is="printComponent" :records="records" :building="building" :unit="unit" />
      </div>

      <!-- Add Record Modal -->
      <Teleport to="body">
        <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
          <div class="modal">
            <div class="modal-header">
              <h3>Add Record — {{ formDef.title }}</h3>
              <button @click="showModal = false" class="modal-close">
                <svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="field" v-for="field in formDef.fields" :key="field.key">
                <label>{{ field.label }} <span v-if="field.required" class="req">*</span></label>
                <textarea v-if="field.type === 'textarea'" v-model="formData[field.key]" :placeholder="field.placeholder || ''" rows="3"></textarea>
                <select v-else-if="field.type === 'select'" v-model="formData[field.key]">
                  <option value="">Select...</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <input v-else v-model="formData[field.key]" :type="field.type || 'text'" :placeholder="field.placeholder || ''" />
              </div>
              <div v-if="modalError" class="modal-error">{{ modalError }}</div>
            </div>
            <div class="modal-footer">
              <button @click="showModal = false" class="btn-cancel">Cancel</button>
              <button @click="submitRecord" class="btn-submit">Save Record</button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- View Modal -->
      <Teleport to="body">
        <div class="modal-overlay" v-if="showViewModal && viewRecord" @click.self="showViewModal = false">
          <div class="modal modal-wide">
            <div class="modal-header">
              <h3>Record Details</h3>
              <button @click="showViewModal = false" class="modal-close">
                <svg viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <div class="view-field" v-for="field in formDef.fields" :key="field.key">
                <span class="vf-label">{{ field.label }}</span>
                <span class="vf-value">{{ viewRecord[field.key] || '—' }}</span>
              </div>
              <div class="view-field">
                <span class="vf-label">Date Added</span>
                <span class="vf-value">{{ formatDate(viewRecord.createdAt) }}</span>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="showViewModal = false" class="btn-cancel">Close</button>
              <button @click="handlePrint" class="btn-submit">Print This Form</button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import { buildings } from '@/data/buildings'
import { useRecordsStore } from '@/store/records'
import PrintForm1 from '@/components/print/PrintForm1.vue'
import PrintForm2 from '@/components/print/PrintForm2.vue'
import PrintForm3 from '@/components/print/PrintForm3.vue'
import PrintForm16 from '@/components/print/PrintForm16.vue'
import PrintForm20 from '@/components/print/PrintForm20.vue'

const route = useRoute()
const recordsStore = useRecordsStore()

const unit = computed(() => route.params.unit.toUpperCase())
const code = computed(() => route.params.code)
const formId = computed(() => route.params.formId)

const unitTitleMap = { FMU: 'Facility Management Unit', LU: 'Landscape Unit', TU: 'Transportation Unit' }
const unitTitle = computed(() => unitTitleMap[unit.value] || unit.value)

const building = computed(() => buildings.find(b => b.code === code.value))

const printComponentMap = {
  FORM1: PrintForm1, FORM2: PrintForm2, FORM3: PrintForm3, FORM16: PrintForm16, FORM20: PrintForm20
}
const printComponent = computed(() => printComponentMap[formId.value] || PrintForm1)

const formDefs = {
  FORM1: {
    title: 'List of Equipment & Facilities',
    color: '#006633',
    columns: [
      { key: 'name', label: 'Equipment/Facility Name' },
      { key: 'eqfCode', label: 'EQF Code' },
      { key: 'accountableTo', label: 'Accountable To' },
      { key: 'location', label: 'Location' },
      { key: 'frequency', label: 'Maintenance Freq.' },
    ],
    fields: [
      { key: 'name', label: 'Equipment/Facility Name', required: true, placeholder: 'e.g. Air Conditioning Unit' },
      { key: 'eqfCode', label: 'EQF Code', placeholder: 'e.g. EQF-001' },
      { key: 'accountableTo', label: 'Accountable To', placeholder: 'Name of person in charge' },
      { key: 'location', label: 'Location', placeholder: 'Room/Area' },
      { key: 'daily', label: 'Daily Maintenance', type: 'select', options: ['Yes', 'No', 'N/A'] },
      { key: 'weekly', label: 'Weekly Maintenance', type: 'select', options: ['Yes', 'No', 'N/A'] },
      { key: 'monthly', label: 'Monthly Maintenance', type: 'select', options: ['Yes', 'No', 'N/A'] },
      { key: 'quarterly', label: 'Quarterly Maintenance', type: 'select', options: ['Yes', 'No', 'N/A'] },
      { key: 'semiAnnually', label: 'Semi-Annually', type: 'select', options: ['Yes', 'No', 'N/A'] },
      { key: 'annually', label: 'Annually', type: 'select', options: ['Yes', 'No', 'N/A'] },
    ]
  },
  FORM2: {
    title: 'GSO Preventive Maintenance Program',
    color: '#26874e',
    columns: [
      { key: 'description', label: 'Description' },
      { key: 'components', label: 'Components' },
      { key: 'task', label: 'Task' },
      { key: 'frequency', label: 'Frequency' },
      { key: 'responsible', label: 'Responsible' },
    ],
    fields: [
      { key: 'description', label: 'Description', required: true, placeholder: 'e.g. Pre-operation Checks' },
      { key: 'components', label: 'Components', placeholder: 'e.g. Engine oil level' },
      { key: 'task', label: 'Task', type: 'textarea', placeholder: 'Describe the maintenance task' },
      { key: 'frequency', label: 'Frequency', type: 'select', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Bi-Annual', 'Annual'] },
      { key: 'responsible', label: 'Responsible Person', placeholder: 'e.g. Mechanic / Assigned driver' },
      { key: 'remarks', label: 'Remarks', placeholder: 'Additional notes' },
    ]
  },
  FORM3: {
    title: 'Preventive Maintenance Checklist',
    color: '#4da768',
    columns: [
      { key: 'facilityName', label: 'Equipment/Facility' },
      { key: 'eqfCode', label: 'EQF Code' },
      { key: 'month', label: 'Month' },
      { key: 'checkpoint', label: 'Checkpoint' },
      { key: 'mechanic', label: 'Mechanic' },
      { key: 'date', label: 'Date' },
    ],
    fields: [
      { key: 'facilityName', label: 'Equipment/Facility Name', required: true },
      { key: 'eqfCode', label: 'EQF Code' },
      { key: 'location', label: 'Location' },
      { key: 'year', label: 'Year', type: 'number', placeholder: new Date().getFullYear() },
      { key: 'month', label: 'Month', type: 'select', options: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
      { key: 'checkpoint', label: 'Checkpoint', type: 'select', options: ['1 - Weekly', '2 - Monthly', '3 - Quarterly', '4 - Semi-Annually', '5 - Annually'] },
      { key: 'weekNo', label: 'Week Number (for Weekly)', type: 'select', options: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
      { key: 'date', label: 'Date of Maintenance', type: 'date' },
      { key: 'mechanic', label: 'Mechanic Name', required: true },
      { key: 'remarks', label: 'Remarks / Problem Encountered', type: 'textarea' },
      { key: 'actionTaken', label: 'Action Taken', type: 'textarea' },
    ]
  },
  FORM16: {
    title: 'Pre Inspection Report',
    color: '#73c883',
    columns: [
      { key: 'defect1', label: 'Primary Defect' },
      { key: 'finding1', label: 'Primary Finding' },
      { key: 'workScope', label: 'Work Scope' },
      { key: 'requestedBy', label: 'Requested By' },
      { key: 'inspectedBy', label: 'Inspected By' },
    ],
    fields: [
      { key: 'requestedBy', label: 'Requested By (Name)', required: true },
      { key: 'defect1', label: 'Defect/Complaint #1', type: 'textarea' },
      { key: 'defect2', label: 'Defect/Complaint #2', type: 'textarea' },
      { key: 'defect3', label: 'Defect/Complaint #3', type: 'textarea' },
      { key: 'defect4', label: 'Defect/Complaint #4', type: 'textarea' },
      { key: 'defect5', label: 'Defect/Complaint #5', type: 'textarea' },
      { key: 'finding1', label: 'Finding #1', type: 'textarea' },
      { key: 'finding2', label: 'Finding #2', type: 'textarea' },
      { key: 'finding3', label: 'Finding #3', type: 'textarea' },
      { key: 'finding4', label: 'Finding #4', type: 'textarea' },
      { key: 'finding5', label: 'Finding #5', type: 'textarea' },
      { key: 'workScope1', label: 'Work Scope #1', type: 'textarea' },
      { key: 'workScope2', label: 'Work Scope #2', type: 'textarea' },
      { key: 'workScope3', label: 'Work Scope #3', type: 'textarea' },
      { key: 'workScope4', label: 'Work Scope #4', type: 'textarea' },
      { key: 'workScope5', label: 'Work Scope #5', type: 'textarea' },
      { key: 'material1', label: 'Material #1' },
      { key: 'material2', label: 'Material #2' },
      { key: 'material3', label: 'Material #3' },
      { key: 'material4', label: 'Material #4' },
      { key: 'material5', label: 'Material #5' },
      { key: 'material6', label: 'Material #6' },
      { key: 'material7', label: 'Material #7' },
      { key: 'material8', label: 'Material #8' },
      { key: 'material9', label: 'Material #9' },
      { key: 'material10', label: 'Material #10' },
      { key: 'inspectedBy', label: 'Pre Inspected By (Name)', required: true },
    ]
  },
  FORM20: {
    title: 'Assessment of Buildings',
    color: '#99e89d',
    columns: [
      { key: 'yearConstructed', label: 'Year Constructed' },
      { key: 'yearRenovated', label: 'Year Renovated' },
      { key: 'buildingType', label: 'Building Type' },
      { key: 'structuralIntegrity', label: 'Structural Integrity' },
      { key: 'condition', label: 'Condition' },
    ],
    fields: [
      { key: 'yearConstructed', label: 'Year Constructed', type: 'number', placeholder: '2000' },
      { key: 'yearRenovated', label: 'Year Renovated', type: 'number', placeholder: '2020' },
      { key: 'buildingType', label: 'Building Type', placeholder: 'e.g. Concrete, Wood, Mixed' },
      { key: 'structuralIntegrity', label: 'Structural Integrity', type: 'select', options: ['Good', 'Fair', 'Poor', 'Critical'] },
      { key: 'floorArea', label: 'Floor Area (m²)', type: 'number' },
      { key: 'roomSection', label: 'Room/Section' },
      { key: 'unitDept', label: 'Unit/Department Utilizing' },
      { key: 'condition', label: 'Condition Remarks', type: 'select', options: ['In Good Condition', 'Needs Repair', 'For Demolition', 'Under Renovation', 'Not Functional'] },
      { key: 'additionalRemarks', label: 'Additional Remarks', type: 'textarea' },
    ]
  }
}

const formDef = computed(() => formDefs[formId.value])
const records = computed(() => recordsStore.getRecords(unit.value, code.value, formId.value))

const showModal = ref(false)
const showViewModal = ref(false)
const viewRecord = ref(null)
const modalError = ref('')
const formData = reactive({})

function resetForm() {
  formDef.value?.fields.forEach(f => { formData[f.key] = '' })
}

function submitRecord() {
  modalError.value = ''
  const required = formDef.value.fields.filter(f => f.required)
  for (const f of required) {
    if (!formData[f.key]) { modalError.value = `"${f.label}" is required.`; return }
  }
  recordsStore.addRecord(unit.value, code.value, formId.value, { ...formData })
  resetForm()
  showModal.value = false
}

function deleteRec(id) {
  if (confirm('Delete this record?')) {
    recordsStore.deleteRecord(unit.value, code.value, formId.value, id)
  }
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

function handlePrint() {
  window.print()
}
</script>

<style scoped>
.form-view {
  padding: 32px 40px;
  animation: fadeIn 0.4s ease;
}

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.8rem; color: var(--gray-400); margin-bottom: 24px;
}
.breadcrumb a { color: var(--green-500); font-weight: 500; }
.breadcrumb a:hover { text-decoration: underline; }
.bc-current { font-weight: 600; color: var(--gray-600); }
.breadcrumb span { color: var(--gray-300); }

.page-header {
  display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px;
}
.form-badge {
  display: inline-flex; padding: 4px 12px; border-radius: 6px;
  font-size: 0.75rem; font-weight: 700; margin-bottom: 8px;
}
.page-header h1 {
  font-family: var(--font-display); font-size: 1.75rem; color: var(--gray-800);
  letter-spacing: -0.5px; margin-bottom: 4px;
}
.page-sub { color: var(--gray-400); font-size: 0.875rem; }

.header-actions { display: flex; gap: 12px; align-items: center; }
.btn-print, .btn-add {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 50px;
  font-size: 0.875rem; font-weight: 600; transition: var(--transition);
}
.btn-print {
  background: white; border: 1px solid var(--gray-200); color: var(--gray-600); box-shadow: var(--shadow-sm);
}
.btn-print svg { width: 16px; height: 16px; }
.btn-print:hover { border-color: var(--green-300); color: var(--green-500); }
.btn-add { background: var(--green-500); color: white; box-shadow: var(--shadow-md); }
.btn-add svg { width: 16px; height: 16px; }
.btn-add:hover { background: var(--green-400); }

/* Records */
.records-section {
  background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);
}

.empty-records {
  padding: 64px; text-align: center; color: var(--gray-400);
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.empty-records svg { width: 48px; height: 48px; }
.empty-records p { font-size: 0.875rem; }

.records-table-wrap { overflow-x: auto; }
.records-table { width: 100%; border-collapse: collapse; }
.records-table th {
  background: var(--gray-50); padding: 12px 16px;
  text-align: left; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray-600);
  border-bottom: 1px solid var(--gray-200); white-space: nowrap;
}
.records-table td {
  padding: 12px 16px; font-size: 0.85rem; color: var(--gray-700);
  border-bottom: 1px solid var(--gray-100); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.records-table tr:last-child td { border-bottom: none; }
.records-table tr:hover td { background: var(--gray-50); }

.row-actions { display: flex; gap: 8px; }
.act-btn {
  padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; transition: var(--transition);
}
.act-btn.view { background: var(--gray-100); color: var(--gray-700); }
.act-btn.view:hover { background: var(--gray-200); }
.act-btn.danger { background: #fef2f2; color: #dc2626; }
.act-btn.danger:hover { background: #fee2e2; }

/* Print area hidden on screen */
.print-area { display: none; }
@media print {
  .no-print { display: none !important; }
  .print-area { display: block !important; }
}

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 20px;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}
.modal {
  background: white; border-radius: var(--radius-xl); width: 100%; max-width: 560px;
  max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-xl);
  animation: scaleIn 0.2s ease;
}
.modal-wide { max-width: 680px; }
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px; border-bottom: 1px solid var(--gray-100);
  position: sticky; top: 0; background: white; z-index: 1;
}
.modal-header h3 { font-family: var(--font-display); font-size: 1.25rem; color: var(--gray-800); }
.modal-close { color: var(--gray-400); padding: 4px; border-radius: 6px; transition: var(--transition); }
.modal-close svg { width: 18px; height: 18px; }
.modal-close:hover { background: var(--gray-100); color: var(--gray-800); }

.modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 16px; }

.field label {
  display: block; font-size: 0.8rem; font-weight: 600; color: var(--gray-600);
  margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;
}
.req { color: #dc2626; }
.field input, .field textarea, .field select {
  width: 100%; padding: 10px 14px; border: 2px solid var(--gray-200); border-radius: var(--radius-sm);
  font-size: 0.9rem; color: var(--gray-800); background: var(--gray-50); transition: var(--transition);
}
.field input:focus, .field textarea:focus, .field select:focus {
  border-color: var(--green-400); background: white; box-shadow: 0 0 0 3px rgba(77,167,104,0.15);
}
.field textarea { resize: vertical; min-height: 80px; }

.modal-error {
  padding: 10px 14px; background: #fef2f2; border: 1px solid #fecaca;
  border-radius: var(--radius-sm); color: #991b1b; font-size: 0.85rem;
}

.modal-footer {
  display: flex; gap: 12px; justify-content: flex-end;
  padding: 20px 28px; border-top: 1px solid var(--gray-100);
  position: sticky; bottom: 0; background: white;
}
.btn-cancel {
  padding: 10px 24px; border: 1px solid var(--gray-200); border-radius: 50px;
  font-size: 0.875rem; font-weight: 600; color: var(--gray-600); transition: var(--transition);
}
.btn-cancel:hover { background: var(--gray-100); }
.btn-submit {
  padding: 10px 24px; background: var(--green-500); color: white; border-radius: 50px;
  font-size: 0.875rem; font-weight: 700; transition: var(--transition);
}
.btn-submit:hover { background: var(--green-400); }

/* View fields */
.view-field {
  display: flex; gap: 16px; padding: 12px 0;
  border-bottom: 1px solid var(--gray-100);
}
.view-field:last-child { border-bottom: none; }
.vf-label { font-size: 0.8rem; font-weight: 600; color: var(--gray-400); min-width: 180px; text-transform: uppercase; letter-spacing: 0.5px; }
.vf-value { font-size: 0.9rem; color: var(--gray-800); flex: 1; }

@media (max-width: 768px) {
  .form-view { padding: 20px; }
  .page-header { flex-direction: column; gap: 16px; }
  .header-actions { flex-wrap: wrap; }
}
</style>
