<template>
  <div class="print-form">
    <!-- CSU Header -->
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
        <h1>ASSESSMENT OF BUILDING UTILIZATION</h1>
      </div>
    </div>

    <div class="building-info">
      <p><strong>Building:</strong> {{ building?.code }} — {{ building?.name }}</p>
    </div>

    <table class="print-table">
      <thead>
        <tr>
          <th rowspan="2">NAME OF BLDG.</th>
          <th rowspan="2">YEAR CONSTRUCTED</th>
          <th rowspan="2">YEAR RENOVATED</th>
          <th rowspan="2">BUILDING TYPE</th>
          <th rowspan="2">STRUCTURAL INTEGRITY</th>
          <th colspan="2">FLOOR</th>
          <th rowspan="2">UNIT / DEPARTMENT UTILIZING</th>
          <th rowspan="2">REMARKS (IN GOOD CONDITION, NEEDS REPAIR, FOR DEMOLITION, ETC.)</th>
        </tr>
        <tr>
          <th>ROOM / SECT.</th>
          <th>AREA (m²)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rec in records" :key="rec.id">
          <td>{{ building?.name }}</td>
          <td class="center">{{ rec.yearConstructed }}</td>
          <td class="center">{{ rec.yearRenovated }}</td>
          <td>{{ rec.buildingType }}</td>
          <td class="center">{{ rec.structuralIntegrity }}</td>
          <td>{{ rec.roomSection }}</td>
          <td class="center">{{ rec.floorArea }}</td>
          <td>{{ rec.unitDept }}</td>
          <td>{{ rec.condition }}<span v-if="rec.additionalRemarks"> — {{ rec.additionalRemarks }}</span></td>
        </tr>
        <tr v-for="n in Math.max(0, 8 - records.length)" :key="`e${n}`">
          <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
      </tbody>
    </table>

    <div class="print-footer">
      <p>F-GEN-ABU-020 — Assessment of Building Utilization</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ records: Array, building: Object, unit: String })
</script>

<style scoped>
.print-form { font-family: Arial, sans-serif; font-size: 9pt; color: #000; padding: 20px; }
.csu-header { margin-bottom: 10px; }
.header-logos { display: flex; align-items: center; gap: 14px; margin-bottom: 6px; }
.logo-box { width: 60px; height: 60px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10pt; flex-shrink: 0; }
.header-text { flex: 1; text-align: center; }
.republic { font-size: 9pt; }
.university { font-size: 13pt; font-weight: bold; }
.address, .tagline, .office { font-size: 8.5pt; }
.office { font-weight: bold; }
.form-title-block { text-align: center; border-top: 2px solid #000; border-bottom: 2px solid #000; padding: 6px 0; margin-top: 8px; }
.form-title-block h1 { font-size: 12pt; font-weight: bold; }
.building-info { margin: 8px 0; font-size: 9.5pt; }
.print-table { width: 100%; border-collapse: collapse; font-size: 7.5pt; }
.print-table th, .print-table td { border: 1px solid #000; padding: 4px 5px; vertical-align: middle; }
.print-table th { background: #006633; color: white; font-weight: bold; text-align: center; }
.center { text-align: center; }
.print-table tr:nth-child(even) td { background: #f6fff8; }
.print-footer { margin-top: 12px; font-size: 8pt; color: #555; }
</style>
