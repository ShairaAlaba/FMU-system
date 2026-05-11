<template>
  <div class="print-form">
    <!-- CSU Header -->
    <div class="csu-header">
      <div class="header-logos">
        <div class="logo-placeholder">
          <div class="logo-box">CSU</div>
        </div>
        <div class="header-text">
          <p class="republic">Republic of the Philippines</p>
          <h2 class="university">CARAGA STATE UNIVERSITY</h2>
          <p class="address">Ampayon, Butuan City 8600, Philippines</p>
          <p class="tagline">Competence Service Uprightness</p>
          <p class="office">GENERAL SERVICES OFFICE</p>
        </div>
        <div class="logo-placeholder">
          <div class="logo-box">ISO</div>
        </div>
      </div>
      <div class="form-title-block">
        <h1>LIST OF EQUIPMENT AND FACILITIES</h1>
        <p>For the Year: {{ currentYear }}</p>
      </div>
    </div>

    <!-- Building Info -->
    <div class="building-info">
      <p><strong>Building:</strong> {{ building?.code }} — {{ building?.name }}</p>
    </div>

    <!-- Table -->
    <table class="print-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Equipment/Facilities Name</th>
          <th>EQF Code</th>
          <th>Accountable To</th>
          <th>Location</th>
          <th>Daily</th>
          <th>Weekly</th>
          <th>Monthly</th>
          <th>Quarterly</th>
          <th>Semi-Annually</th>
          <th>Annually</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rec, i) in records" :key="rec.id">
          <td>{{ i + 1 }}</td>
          <td>{{ rec.name }}</td>
          <td>{{ rec.eqfCode }}</td>
          <td>{{ rec.accountableTo }}</td>
          <td>{{ rec.location }}</td>
          <td>{{ rec.daily }}</td>
          <td>{{ rec.weekly }}</td>
          <td>{{ rec.monthly }}</td>
          <td>{{ rec.quarterly }}</td>
          <td>{{ rec.semiAnnually }}</td>
          <td>{{ rec.annually }}</td>
        </tr>
        <!-- Empty rows -->
        <tr v-for="n in emptyRows" :key="`e${n}`">
          <td>&nbsp;</td>
          <td></td><td></td><td></td><td></td>
          <td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
      </tbody>
    </table>

    <div class="print-footer">
      <p>F-GEN-LEF-001 Rev. 3, 10/19/2023</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ records: Array, building: Object, unit: String })
const currentYear = new Date().getFullYear()
const emptyRows = computed(() => Math.max(0, 15 - props.records.length))
</script>

<style scoped>
.print-form { font-family: Arial, sans-serif; font-size: 10pt; color: #000; padding: 20px; }
.csu-header { margin-bottom: 12px; }
.header-logos { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.logo-box { width: 60px; height: 60px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10pt; }
.header-text { flex: 1; text-align: center; }
.republic { font-size: 9pt; }
.university { font-size: 14pt; font-weight: bold; letter-spacing: 1px; }
.address, .tagline, .office { font-size: 9pt; }
.office { font-weight: bold; }
.form-title-block { text-align: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 6px 0; margin-top: 8px; }
.form-title-block h1 { font-size: 13pt; font-weight: bold; }
.form-title-block p { font-size: 10pt; }
.building-info { margin: 8px 0; font-size: 10pt; }
.print-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
.print-table th, .print-table td { border: 1px solid #000; padding: 4px 6px; text-align: center; }
.print-table th { background: #4da768; color: white; font-weight: bold; }
.print-table td:nth-child(2) { text-align: left; }
.print-table tr:nth-child(even) td { background: #f9f9f9; }
.print-footer { margin-top: 12px; font-size: 8pt; color: #555; }
</style>
