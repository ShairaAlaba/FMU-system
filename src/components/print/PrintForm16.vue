<template>
  <div class="print-form" v-for="rec in records" :key="rec.id">
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
    </div>

    <!-- PRE INSPECTION REPORT Section -->
    <div class="section-title-bar">PRE INSPECTION REPORT</div>

    <div class="field-line">
      <span class="field-label">Name of Building/Equipment:</span>
      <span class="field-value underline">{{ building?.code }} — {{ building?.name }}</span>
    </div>
    <div class="divider-line"></div>

    <div class="field-group">
      <p class="field-group-label">Defects/Complaints:</p>
      <div class="numbered-field" v-for="n in 5" :key="n">
        <span class="num">{{ n }}.</span>
        <span class="underline long">{{ rec[`defect${n}`] || '' }}</span>
      </div>
    </div>

    <div class="signature-block right">
      <p>Requested by:</p>
      <div class="sig-line"></div>
      <p class="sig-label">{{ rec.requestedBy || 'Signature over Printed Name' }}</p>
    </div>

    <div class="dotted-divider"></div>

    <!-- EVALUATION REPORT Section -->
    <div class="section-title-bar">EVALUATION REPORT</div>

    <div class="field-group">
      <p class="field-group-label">Findings:</p>
      <div class="numbered-field" v-for="n in 5" :key="n">
        <span class="num">{{ n }}.</span>
        <span class="underline long">{{ rec[`finding${n}`] || '' }}</span>
      </div>
    </div>

    <!-- Page 2 -->
    <div class="page-break"></div>

    <!-- CSU Header repeat -->
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
    </div>

    <div class="field-group">
      <p class="field-group-label">Nature and Scope of Work to Be Done:</p>
      <div class="numbered-field" v-for="n in 5" :key="n">
        <span class="num">{{ n }}.</span>
        <span class="underline long">{{ rec[`workScope${n}`] || '' }}</span>
      </div>
    </div>

    <div class="field-group">
      <p class="field-group-label">Materials to Be Supplied/Replaced:</p>
      <div class="materials-grid">
        <div class="material-item" v-for="n in 10" :key="n">
          <span class="num">{{ n }}.</span>
          <span class="underline medium">{{ rec[`material${n}`] || '' }}</span>
        </div>
      </div>
    </div>

    <div class="signature-block right">
      <p>Pre Inspected by:</p>
      <div class="sig-line"></div>
      <p class="sig-label">{{ rec.inspectedBy || 'Signature over Printed Name' }}</p>
    </div>

    <div class="form-footer">
      <p>F-GEN-PIER-016 Rev. 3, 10/19/2023</p>
    </div>
    <div class="page-break"></div>
  </div>
</template>

<script setup>
defineProps({ records: Array, building: Object, unit: String })
</script>

<style scoped>
.print-form { font-family: Arial, sans-serif; font-size: 10pt; color: #000; padding: 28px 36px; max-width: 720px; margin: 0 auto; }
.csu-header { margin-bottom: 10px; }
.header-logos { display: flex; align-items: center; gap: 14px; margin-bottom: 6px; }
.logo-box { width: 64px; height: 64px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10pt; flex-shrink: 0; }
.header-text { flex: 1; text-align: center; }
.republic { font-size: 9pt; }
.university { font-size: 14pt; font-weight: bold; letter-spacing: 1px; }
.address, .tagline { font-size: 9pt; }
.office { font-size: 10pt; font-weight: bold; }
.section-title-bar { text-align: center; font-size: 13pt; font-weight: bold; margin: 14px 0 12px; }
.field-line { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.field-label { font-weight: normal; white-space: nowrap; }
.field-value { flex: 1; }
.underline { border-bottom: 1px solid #000; display: inline-block; min-width: 200px; }
.long { min-width: 400px; flex: 1; }
.medium { min-width: 160px; }
.divider-line { border-bottom: 2px solid #000; margin: 4px 0 16px; }
.dotted-divider {
  border-bottom: 2px dashed #000;
  margin: 20px 0;
}
.field-group { margin-bottom: 18px; }
.field-group-label { font-weight: normal; margin-bottom: 8px; }
.numbered-field { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
.num { min-width: 20px; }
.materials-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; }
.material-item { display: flex; align-items: baseline; gap: 8px; }
.signature-block { margin-top: 28px; }
.signature-block.right { text-align: center; margin-left: auto; width: 280px; }
.sig-line { border-bottom: 1px solid #000; margin: 32px 0 4px; }
.sig-label { font-size: 9pt; text-align: center; }
.form-footer { margin-top: 16px; font-size: 8.5pt; color: #555; }
.page-break { page-break-after: always; }
</style>
