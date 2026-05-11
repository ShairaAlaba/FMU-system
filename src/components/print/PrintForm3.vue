<template>
  <div class="print-form">
    <div class="csu-header">
      <div class="header-logos">
        <div class="logo-box">CSU</div>
        <div class="header-text">
          <p class="republic">Republic of the Philippines</p>
          <h2 class="university">CARAGA STATE UNIVERSITY</h2>
          <p class="address">Ampayon, Butuan City 8600, Philippines</p>
          <p class="tagline">Competence Service Uprightness</p>
          <p class="office">OFFICE OF THE GENERAL SERVICES</p>
        </div>
        <div class="logo-box">ISO</div>
      </div>
      <div class="form-title-block">
        <h1>PREVENTIVE MAINTENANCE CHECKLIST</h1>
      </div>
    </div>

    <!-- Equipment Info block per record group -->
    <div v-for="rec in records" :key="rec.id" class="checklist-block">
      <div class="info-row">
        <span><strong>For the year:</strong> {{ rec.year || '______' }}</span>
        <span><strong>Equipment/Facility Name:</strong> {{ rec.facilityName || '___________________________' }}</span>
      </div>
      <div class="info-row">
        <span><strong>EQF Code:</strong> {{ rec.eqfCode || '___________________' }}</span>
        <span><strong>Location:</strong> {{ rec.location || '___________________________' }}</span>
      </div>

      <!-- Checkpoints legend -->
      <table class="freq-table">
        <thead>
          <tr>
            <th>Checkpoints</th>
            <th>Frequency</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Weekly</td><td></td></tr>
          <tr><td>2</td><td>Monthly</td><td></td></tr>
          <tr><td>3</td><td>Quarterly</td><td></td></tr>
          <tr><td>4</td><td>Semi-Annually</td><td></td></tr>
          <tr><td>5</td><td>Annually</td><td></td></tr>
        </tbody>
      </table>

      <p class="note"><em>Note: Put the actual date of maintenance and name of the mechanic</em></p>

      <!-- Monthly Checklist Grid -->
      <table class="checklist-grid">
        <thead>
          <tr>
            <th rowspan="2">Month</th>
            <th colspan="4">Checkpoint 1 (Weekly)</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
          <tr>
            <th>Week 1</th>
            <th>Week 2</th>
            <th>Week 3</th>
            <th>Week 4</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="month in months" :key="month">
            <td class="month-cell">{{ month }}</td>
            <td :class="isActive(rec, month, 'Week 1')">{{ isActive(rec, month, 'Week 1') ? rec.date || rec.mechanic : '' }}</td>
            <td :class="isActive(rec, month, 'Week 2')">{{ isActive(rec, month, 'Week 2') ? rec.date || rec.mechanic : '' }}</td>
            <td :class="isActive(rec, month, 'Week 3')">{{ isActive(rec, month, 'Week 3') ? rec.date || rec.mechanic : '' }}</td>
            <td :class="isActive(rec, month, 'Week 4')">{{ isActive(rec, month, 'Week 4') ? rec.date || rec.mechanic : '' }}</td>
            <td :class="isCheckpoint(rec, month, '2 - Monthly')">{{ isCheckpoint(rec, month, '2 - Monthly') ? rec.mechanic : '' }}</td>
            <td :class="isCheckpoint(rec, month, '3 - Quarterly')">{{ isCheckpoint(rec, month, '3 - Quarterly') ? rec.mechanic : '' }}</td>
            <td :class="isCheckpoint(rec, month, '4 - Semi-Annually')">{{ isCheckpoint(rec, month, '4 - Semi-Annually') ? rec.mechanic : '' }}</td>
            <td :class="isCheckpoint(rec, month, '5 - Annually')">{{ isCheckpoint(rec, month, '5 - Annually') ? rec.mechanic : '' }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Report Log -->
      <div class="report-log">
        <h3>REPORT LOG</h3>
        <p><em>*Log problem(s) encountered on equipment during conduct of Preventive Maintenance</em></p>
        <table class="log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Remarks</th>
              <th>Action Taken</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="rec.remarks || rec.actionTaken">
              <td>{{ rec.date }}</td>
              <td>{{ rec.remarks }}</td>
              <td>{{ rec.actionTaken }}</td>
              <td>{{ rec.mechanic }}</td>
            </tr>
            <tr v-for="n in 5" :key="n"><td>&nbsp;</td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
      <div class="page-break"></div>
    </div>

    <div class="print-footer">
      <p>F-GEN-PMC-003a Rev 3, 10/09/2023</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ records: Array, building: Object, unit: String })
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

function isActive(rec, month, week) {
  return rec.month === month && rec.checkpoint === '1 - Weekly' && rec.weekNo === week ? 'active-cell' : ''
}
function isCheckpoint(rec, month, cp) {
  return rec.month === month && rec.checkpoint === cp ? 'active-cell' : ''
}
</script>

<style scoped>
.print-form { font-family: Arial, sans-serif; font-size: 9pt; color: #000; padding: 20px; }
.csu-header { margin-bottom: 10px; }
.header-logos { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.logo-box { width: 56px; height: 56px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 9pt; flex-shrink: 0; }
.header-text { flex: 1; text-align: center; }
.university { font-size: 13pt; font-weight: bold; }
.republic, .address, .tagline, .office { font-size: 8.5pt; }
.office { font-weight: bold; }
.form-title-block { text-align: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 5px 0; margin-top: 6px; }
.form-title-block h1 { font-size: 12pt; font-weight: bold; }
.checklist-block { margin-bottom: 20px; }
.info-row { display: flex; gap: 40px; margin-bottom: 4px; font-size: 9pt; }
.freq-table { border-collapse: collapse; margin: 8px 0; font-size: 8.5pt; }
.freq-table th, .freq-table td { border: 1px solid #000; padding: 2px 8px; }
.freq-table th { background: #4da768; color: white; }
.note { font-size: 8pt; font-style: italic; margin: 4px 0; }
.checklist-grid { width: 100%; border-collapse: collapse; font-size: 7.5pt; margin-bottom: 10px; }
.checklist-grid th, .checklist-grid td { border: 1px solid #000; padding: 2px 4px; text-align: center; min-height: 16px; }
.checklist-grid th { background: #4da768; color: white; font-weight: bold; }
.month-cell { font-weight: bold; text-align: left; padding-left: 6px; }
.active-cell { background: #d1fae5; font-size: 7pt; overflow: hidden; }
.report-log { margin-top: 10px; }
.report-log h3 { font-size: 11pt; font-weight: bold; text-align: center; margin-bottom: 4px; }
.log-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
.log-table th, .log-table td { border: 1px solid #000; padding: 3px 6px; }
.log-table th { background: #4da768; color: white; text-align: center; font-weight: bold; }
.page-break { page-break-after: always; }
.print-footer { font-size: 8pt; color: #555; margin-top: 10px; }
</style>
