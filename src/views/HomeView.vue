<template>
  <AppLayout>
    <div class="home-page">
      <!-- Header -->
      <div class="home-header">
        <div>
          <p class="home-greeting">Good {{ greeting }}, {{ auth.user?.name?.split(' ')[0] }} 👋</p>
          <h1>Facility Management<br><span>Dashboard</span></h1>
        </div>
        <div class="header-meta">
          <div class="date-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {{ currentDate }}
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <div class="qstat" v-for="s in stats" :key="s.label">
          <div class="qstat-icon" :style="`background: ${s.bg}`">
            <span v-html="s.icon"></span>
          </div>
          <div>
            <span class="qstat-num">{{ s.value }}</span>
            <span class="qstat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <!-- 3 Unit Cards - 16x24 proportional vertical rectangles -->
      <div class="units-section">
        <h2 class="section-title">Management Units</h2>
        <p class="section-sub">Select a unit to manage equipment, facilities and maintenance records</p>

        <div class="unit-cards">
          <router-link
            v-for="unit in unitCards"
            :key="unit.abbr"
            :to="`/${unit.abbr.toLowerCase()}`"
            class="unit-card"
            :style="`--unit-color: ${unit.color}; --unit-light: ${unit.light}`"
          >
            <!-- Top pattern -->
            <div class="card-pattern">
              <div class="pattern-circle c1"></div>
              <div class="pattern-circle c2"></div>
              <div class="pattern-circle c3"></div>
            </div>

            <!-- Card content -->
            <div class="card-body">
              <div class="card-icon-wrap">
                <div class="card-icon" v-html="unit.icon"></div>
              </div>
              <div class="card-abbr">{{ unit.abbr }}</div>
              <div class="card-title">{{ unit.name }}</div>
              <div class="card-desc">{{ unit.desc }}</div>

              <div class="card-stats">
                <div class="cs">
                  <span class="cs-num">{{ unit.buildings }}</span>
                  <span class="cs-label">Buildings</span>
                </div>
                <div class="cs">
                  <span class="cs-num">{{ unit.forms }}</span>
                  <span class="cs-label">Forms</span>
                </div>
              </div>
            </div>

            <div class="card-footer-strip">
              <span>Open Unit</span>
              <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Activity (placeholder) -->
      <div class="recent-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
          <p>No recent activity yet. Start by selecting a management unit above.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const stats = [
  { label: 'Total Buildings', value: '94', bg: '#f0fdf4', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#006633" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' },
  { label: 'Active Units', value: '3', bg: '#fff7ed', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>' },
  { label: 'Form Types', value: '5', bg: '#eff6ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>' },
  { label: 'CSU Campus', value: '1', bg: '#fdf4ff', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
]

const unitCards = [
  {
    abbr: 'FMU',
    name: 'Facility Management Unit',
    desc: 'Manage physical infrastructure, equipment maintenance, pre-inspection reports, and building assessments for all campus facilities.',
    color: '#006633',
    light: '#f0fdf4',
    buildings: 94,
    forms: 5,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>'
  },
  {
    abbr: 'LU',
    name: 'Landscape Unit',
    desc: 'Oversee campus outdoor spaces, gardens, ecological areas, and landscape maintenance programs.',
    color: '#26874e',
    light: '#f0fdf4',
    buildings: 94,
    forms: 0,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>'
  },
  {
    abbr: 'TU',
    name: 'Transportation Unit',
    desc: 'Handle fleet management, vehicle preventive maintenance, transportation scheduling and operational records.',
    color: '#4da768',
    light: '#f0fdf4',
    buildings: 94,
    forms: 0,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>'
  },
]
</script>

<style scoped>
.home-page {
  padding: 32px 40px;
  max-width: 1400px;
  animation: fadeIn 0.4s ease;
}

.home-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
}
.home-greeting { color: var(--gray-400); font-size: 0.875rem; font-weight: 500; margin-bottom: 4px; }
.home-header h1 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--gray-800);
  letter-spacing: -1px;
  line-height: 1.2;
}
.home-header h1 span { color: var(--green-500); }

.date-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray-600);
  box-shadow: var(--shadow-sm);
}
.date-badge svg { width: 16px; height: 16px; }

/* Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}
.qstat {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.qstat:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.qstat-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.qstat-icon :deep(svg) { width: 22px; height: 22px; }
.qstat-num { display: block; font-size: 1.75rem; font-weight: 800; color: var(--gray-800); line-height: 1; }
.qstat-label { font-size: 0.75rem; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }

/* Section */
.section-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gray-800);
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}
.section-sub { color: var(--gray-400); font-size: 0.875rem; margin-bottom: 28px; }
.units-section { margin-bottom: 40px; }

/* Unit Cards — 16:24 aspect ratio = 2:3 */
.unit-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 900px;
}

.unit-card {
  aspect-ratio: 16 / 24;
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid var(--gray-200);
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-decoration: none;
  color: inherit;
  animation: fadeIn 0.5s ease both;
}
.unit-card:nth-child(2) { animation-delay: 0.1s; }
.unit-card:nth-child(3) { animation-delay: 0.2s; }

.unit-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--unit-color);
}

/* Pattern top section */
.card-pattern {
  height: 120px;
  background: linear-gradient(135deg, var(--unit-color) 0%, color-mix(in srgb, var(--unit-color) 70%, #99e89d) 100%);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.pattern-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}
.c1 { width: 120px; height: 120px; top: -40px; right: -30px; }
.c2 { width: 80px; height: 80px; top: 20px; left: -20px; }
.c3 { width: 60px; height: 60px; bottom: -20px; right: 40px; }

.card-body {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-icon-wrap {
  margin-top: -52px;
  margin-bottom: 8px;
}
.card-icon {
  width: 56px; height: 56px;
  background: white;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--unit-color);
  padding: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  border: 2px solid var(--gray-100);
}
.card-icon :deep(svg) { width: 100%; height: 100%; }

.card-abbr {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--unit-color);
}
.card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray-800);
  line-height: 1.3;
}
.card-desc {
  font-size: 0.8rem;
  color: var(--gray-600);
  line-height: 1.5;
  flex: 1;
}

.card-stats {
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--gray-100);
  margin-top: auto;
}
.cs { text-align: center; }
.cs-num { display: block; font-size: 1.25rem; font-weight: 800; color: var(--unit-color); }
.cs-label { font-size: 0.7rem; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.5px; }

.card-footer-strip {
  padding: 14px 24px;
  background: var(--unit-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--unit-color);
  flex-shrink: 0;
}
.card-footer-strip svg { width: 16px; height: 16px; transition: var(--transition); }
.unit-card:hover .card-footer-strip svg { transform: translateX(4px); }

/* Recent */
.recent-section { margin-bottom: 40px; }
.activity-empty {
  background: white;
  border: 1px dashed var(--gray-300);
  border-radius: var(--radius-md);
  padding: 48px;
  text-align: center;
  color: var(--gray-400);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.activity-empty svg { width: 48px; height: 48px; }
.activity-empty p { font-size: 0.9rem; max-width: 300px; line-height: 1.6; }

@media (max-width: 1100px) {
  .quick-stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .home-page { padding: 20px; }
  .unit-cards { grid-template-columns: 1fr; max-width: 300px; }
}
</style>
