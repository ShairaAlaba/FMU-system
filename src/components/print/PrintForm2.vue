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
        <h1>ANNUAL PREVENTIVE MAINTENANCE PROGRAM</h1>
      </div>
    </div>

    <div class="building-info">
      <p><strong>Building:</strong> {{ building?.code }} — {{ building?.name }}</p>
    </div>

    <table class="print-table">
      <thead>
        <tr>
          <th rowspan="2">Description</th>
          <th rowspan="2">Components</th>
          <th rowspan="2">Task</th>
          <th colspan="6">Frequency</th>
          <th rowspan="2">Responsible</th>
          <th rowspan="2">Remarks</th>
        </tr>
        <tr>
          <th>Daily</th>
          <th>Weekly</th>
          <th>Monthly</th>
          <th>Quarterly</th>
          <th>Bi-Annual</th>
          <th>Annual</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rec in records" :key="rec.id">
          <td>{{ rec.description }}</td>
          <td>{{ rec.components }}</td>
          <td>{{ rec.task }}</td>
          <td class="center">{{ rec.frequency === 'Daily' ? '✓' : '' }}</td>
          <td class="center">{{ rec.frequency === 'Weekly' ? '✓' : '' }}</td>
          <td class="center">{{ rec.frequency === 'Monthly' ? '✓' : '' }}</td>
          <td class="center">{{ rec.frequency === 'Quarterly' ? '✓' : '' }}</td>
          <td class="center">{{ rec.frequency === 'Bi-Annual' ? '✓' : '' }}</td>
          <td class="center">{{ rec.frequency === 'Annual' ? '✓' : '' }}</td>
          <td>{{ rec.responsible }}</td>
          <td>{{ rec.remarks }}</td>
        </tr>
        <tr v-for="n in Math.max(0, 10 - records.length)" :key="`e${n}`">
          <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
      </tbody>
    </table>

    <div class="print-footer">
      <p>F-GEN-PMC — GSO Preventive Maintenance Program</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ records: Array, building: Object, unit: String })
</script>

<style scoped>
.print-form { font-family: Arial, sans-serif; font-size: 9pt; color: #000; padding: 20px; }
.csu-header { margin-bottom: 12px; }
.header-logos { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.logo-box { width: 60px; height: 60px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10pt; flex-shrink: 0; }
.header-text { flex: 1; text-align: center; }
.republic { font-size: 9pt; }
.university { font-size: 13pt; font-weight: bold; }
.address, .tagline, .office { font-size: 9pt; }
.office { font-weight: bold; }
.form-title-block { text-align: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 6px 0; margin-top: 8px; }
.form-title-block h1 { font-size: 12pt; font-weight: bold; }
.building-info { margin: 8px 0; }
.print-table { width: 100%; border-collapse: collapse; font-size: 8pt; }
.print-table th, .print-table td { border: 1px solid #000; padding: 3px 5px; vertical-align: top; }
.print-table th { background: #26874e; color: white; font-weight: bold; text-align: center; }
.center { text-align: center; }
.print-table tr:nth-child(even) td { background: #f9f9f9; }
.print-footer { margin-top: 12px; font-size: 8pt; color: #555; }
</style>
