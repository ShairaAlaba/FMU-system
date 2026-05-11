<template>
  <div class="landing">
    <!-- Animated background -->
    <div class="bg-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <!-- Nav -->
    <nav class="landing-nav">
      <div class="nav-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.9"/>
            <rect x="18" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="2" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <span class="brand-text">GSO <span>FMS</span></span>
      </div>
      <router-link to="/login" class="nav-login-btn">
        Sign In
        <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        Caraga State University — General Services Office
      </div>
      <h1 class="hero-title">
        Facility Management
        <span class="hero-title-accent">System</span>
      </h1>
      <p class="hero-desc">
        A comprehensive digital platform for managing, monitoring, and maintaining 
        university facilities — from equipment records to preventive maintenance schedules.
      </p>
      <div class="hero-actions">
        <router-link to="/login" class="btn-primary">
          Get Started
          <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
        <a href="#features" class="btn-ghost">Learn More</a>
      </div>

      <!-- Stats -->
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">94</span>
          <span class="stat-label">Buildings</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">3</span>
          <span class="stat-label">Management Units</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">5</span>
          <span class="stat-label">Form Types</span>
        </div>
      </div>
    </section>

    <!-- Feature Cards -->
    <section id="features" class="features">
      <div class="features-header">
        <span class="section-label">What We Offer</span>
        <h2>Everything You Need</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.title" :style="`--card-color: ${f.color}`">
          <div class="feature-icon" v-html="f.icon"></div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Units Section -->
    <section class="units-section">
      <div class="units-inner">
        <div class="units-text">
          <span class="section-label">Management Units</span>
          <h2>Three Units, One System</h2>
          <p>The GSO Facility Management System covers three core operational units — each responsible for distinct aspects of campus facilities management.</p>
        </div>
        <div class="units-cards">
          <div class="unit-card" v-for="u in units" :key="u.abbr">
            <div class="unit-abbr">{{ u.abbr }}</div>
            <div class="unit-info">
              <h4>{{ u.name }}</h4>
              <p>{{ u.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-card">
        <h2>Ready to streamline<br>facility management?</h2>
        <p>Sign in to access the full suite of tools and start managing your facilities efficiently.</p>
        <router-link to="/login" class="btn-primary btn-large">
          Access the System
          <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="brand-icon small">
            <svg viewBox="0 0 32 32" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.9"/>
              <rect x="18" y="2" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="2" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6"/>
              <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span>GSO Facility Management System</span>
        </div>
        <p class="footer-copy">© {{ new Date().getFullYear() }} Caraga State University — Office of the General Services</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Equipment Registry',
    desc: 'Track all equipment and facilities with unique codes. Full history of assignments, locations, and maintenance schedules.',
    color: '#4da768',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`
  },
  {
    title: 'Preventive Maintenance',
    desc: 'Schedule and track daily, weekly, monthly, quarterly, semi-annual, and annual maintenance activities.',
    color: '#26874e',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
  },
  {
    title: 'Building Assessment',
    desc: 'Comprehensive assessment of buildings — structural integrity, utilization, and condition reporting.',
    color: '#006633',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`
  },
  {
    title: 'Inspection Reports',
    desc: 'Pre-inspection reports with defect logging, findings documentation, and work scope definition.',
    color: '#73c883',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`
  },
  {
    title: 'Print-Ready Forms',
    desc: 'Generate official CSU-formatted forms ready for print — matching the original document specifications.',
    color: '#4da768',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`
  },
  {
    title: 'Analytics & History',
    desc: 'Visual analysis dashboards and complete historical records organized by unit, building, and form type.',
    color: '#26874e',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
  },
]

const units = [
  { abbr: 'FMU', name: 'Facility Management Unit', desc: 'Oversees physical infrastructure, equipment maintenance, and building assessments across the campus.' },
  { abbr: 'LU', name: 'Landscape Unit', desc: 'Manages the upkeep and development of outdoor spaces, gardens, and landscape features.' },
  { abbr: 'TU', name: 'Transportation Unit', desc: 'Handles fleet management, vehicle maintenance, and transportation scheduling for the university.' },
]
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: #f8fafb;
  overflow-x: hidden;
  position: relative;
}

/* Background orbs */
.bg-orbs { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: float 8s ease-in-out infinite;
}
.orb-1 { width: 600px; height: 600px; background: var(--green-300); top: -200px; right: -100px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: var(--green-400); bottom: 200px; left: -100px; animation-delay: 3s; }
.orb-3 { width: 300px; height: 300px; background: var(--green-200); top: 40%; right: 20%; animation-delay: 5s; }
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
}

/* Nav */
.landing-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 60px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--gray-200);
}

.nav-brand { display: flex; align-items: center; gap: 12px; }
.brand-icon {
  width: 40px; height: 40px;
  background: var(--green-500);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: white; padding: 8px;
}
.brand-icon.small { width: 32px; height: 32px; padding: 6px; }
.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-800);
  letter-spacing: -0.5px;
}
.brand-text span { color: var(--green-500); }

.nav-login-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px;
  background: var(--green-500);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition);
}
.nav-login-btn svg { width: 16px; height: 16px; }
.nav-login-btn:hover { background: var(--green-400); transform: translateY(-1px); box-shadow: var(--shadow-md); }

/* Hero */
.hero {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 100px 40px 80px;
  animation: fadeIn 0.8s ease both;
}

.hero-badge {
  display: flex; align-items: center; gap: 8px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--green-500);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}
.badge-dot {
  width: 8px; height: 8px;
  background: var(--green-400);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--gray-800);
  max-width: 800px;
  margin-bottom: 12px;
  letter-spacing: -2px;
}
.hero-title-accent { 
  color: var(--green-500); 
  display: block;
  background: linear-gradient(135deg, var(--green-500), var(--green-300));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  max-width: 560px;
  color: var(--gray-600);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 40px;
}

.hero-actions { display: flex; align-items: center; gap: 16px; margin-bottom: 64px; }

.btn-primary {
  display: flex; align-items: center; gap: 10px;
  background: var(--green-500);
  color: white;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  transition: var(--transition);
  box-shadow: 0 4px 20px rgba(0,102,51,0.3);
}
.btn-primary svg { width: 18px; height: 18px; }
.btn-primary:hover { background: var(--green-400); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,102,51,0.4); }

.btn-ghost {
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 600;
  color: var(--gray-600);
  border: 2px solid var(--gray-200);
  transition: var(--transition);
  background: white;
}
.btn-ghost:hover { border-color: var(--green-300); color: var(--green-500); }

.btn-large { padding: 18px 40px; font-size: 1.1rem; }

.hero-stats {
  display: flex; align-items: center; gap: 40px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: 28px 48px;
  box-shadow: var(--shadow-md);
}
.stat { text-align: center; }
.stat-num { display: block; font-size: 2rem; font-weight: 800; color: var(--green-500); line-height: 1; }
.stat-label { font-size: 0.8rem; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-divider { width: 1px; height: 40px; background: var(--gray-200); }

/* Features */
.features {
  position: relative;
  z-index: 1;
  padding: 80px 60px;
  background: white;
}

.features-header {
  text-align: center;
  margin-bottom: 56px;
}
.section-label {
  display: inline-block;
  background: var(--gray-100);
  color: var(--green-500);
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.features-header h2 {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--gray-800);
  letter-spacing: -1px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: var(--transition);
  animation: fadeIn 0.6s ease both;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--green-200);
}

.feature-icon {
  width: 52px; height: 52px;
  background: var(--card-color, var(--green-400));
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  color: white;
  margin-bottom: 20px;
  padding: 12px;
}
.feature-icon svg { width: 100%; height: 100%; }
.feature-card h3 { font-size: 1rem; font-weight: 700; color: var(--gray-800); margin-bottom: 8px; }
.feature-card p { font-size: 0.875rem; color: var(--gray-600); line-height: 1.6; }

/* Units */
.units-section {
  position: relative; z-index: 1;
  padding: 80px 60px;
  background: var(--gray-50);
}
.units-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
}
.units-text h2 {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--gray-800);
  letter-spacing: -1px;
  margin: 12px 0 16px;
}
.units-text p { color: var(--gray-600); line-height: 1.7; }

.units-cards { display: flex; flex-direction: column; gap: 16px; }
.unit-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex; align-items: flex-start; gap: 20px;
  transition: var(--transition);
}
.unit-card:hover { border-color: var(--green-300); box-shadow: var(--shadow-sm); }
.unit-abbr {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--green-500);
  min-width: 56px;
  height: 56px;
  background: var(--gray-100);
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.unit-info h4 { font-weight: 700; color: var(--gray-800); margin-bottom: 4px; }
.unit-info p { font-size: 0.85rem; color: var(--gray-600); line-height: 1.5; }

/* CTA */
.cta-section {
  position: relative; z-index: 1;
  padding: 80px 60px;
  display: flex; justify-content: center;
  background: white;
}
.cta-card {
  max-width: 680px;
  text-align: center;
  background: linear-gradient(135deg, var(--green-500) 0%, var(--green-400) 100%);
  border-radius: var(--radius-xl);
  padding: 64px 56px;
  color: white;
  box-shadow: 0 20px 60px rgba(0,102,51,0.35);
}
.cta-card h2 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}
.cta-card p { opacity: 0.85; line-height: 1.6; margin-bottom: 36px; }
.cta-card .btn-primary {
  background: white;
  color: var(--green-500);
  display: inline-flex;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.cta-card .btn-primary:hover { background: var(--gray-100); }

/* Footer */
.landing-footer {
  position: relative; z-index: 1;
  background: var(--gray-800);
  padding: 40px 60px;
}
.footer-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-brand {
  display: flex; align-items: center; gap: 12px;
  color: white; font-weight: 600; font-size: 0.9rem;
}
.footer-brand .brand-icon { background: var(--green-400); }
.footer-copy { color: var(--gray-400); font-size: 0.8rem; }

@media (max-width: 900px) {
  .landing-nav { padding: 16px 24px; }
  .hero { padding: 60px 24px 60px; }
  .hero-stats { gap: 24px; padding: 20px 28px; }
  .features { padding: 60px 24px; }
  .features-grid { grid-template-columns: 1fr; }
  .units-section { padding: 60px 24px; }
  .units-inner { grid-template-columns: 1fr; gap: 40px; }
  .cta-section { padding: 60px 24px; }
  .cta-card { padding: 40px 28px; }
  .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
  .landing-footer { padding: 32px 24px; }
}
</style>
