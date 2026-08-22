/* ============================================================
   MAITRA SOLAR SOLUTIONS — script.js
   Same-page navigation engine: experience panels, detail modals,
   gallery + lightbox, interactive workflows. No libraries.
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   1. DATA
------------------------------------------------------------ */

/* Lifecycle data flow */
const FLOW_LIFECYCLE = [
  'Site Survey', 'Engineering', 'Execution', 'Testing',
  'Commissioning', 'Monitoring', 'Maintenance', 'Performance'
];

/* O&M data flow */
const FLOW_OM = [
  'Inspection', 'Measurement', 'Diagnosis', 'Maintenance', 'Report', 'Follow-up'
];

/* Due Diligence data flow */
const FLOW_DD = [
  'Site Data', 'Technical Review', 'Risk Identification', 'Assessment', 'Recommendations', 'Client Report'
];

/* Top-level service categories — each opens the corresponding experience panel. */
const SERVICES = [
  {
    id: 'om', num: '01', name: 'O&M', icon: 'wrench',
    desc: 'Operations and maintenance across the plant lifecycle — from module cleaning and electrical checks to monitoring, breakdown response and thermography.',
    detail: 'A documented operations and maintenance programme covering the thirteen client-defined O&M service scopes.',
    openPanel: 'om', actionLabel: 'Open O&M'
  },
  {
    id: 'epc', num: '02', name: 'EPC / EPC Keepability', icon: 'bolt',
    desc: 'Structured project execution from mobilization through testing, commissioning and handover.',
    detail: 'Maitra executes complete solar plant projects through a disciplined engineering sequence — from mobilization and surveying through civil, structural, DC, AC & HT, earthing, communication, testing, commissioning and handover.',
    openPanel: 'epc', actionLabel: 'Open EPC Engineering Timeline'
  },
  {
    id: 'dd', num: '03', name: 'Due Diligence', icon: 'scan',
    desc: 'Technical, operational, structural and performance assessment of solar plants.',
    detail: 'Comprehensive assessment of the solar plant condition to identify technical risks, operational gaps and improvement opportunities.',
    openPanel: 'dd', actionLabel: 'Open Due Diligence'
  }
];

/* EPC / EPC Keepability project execution sequence */
const EPC_STAGES = [
  { title: 'Mobilization', desc: 'Deployment of manpower, tools, equipment and resources at site.' },
  { title: 'Survey & Setting Out', desc: 'Marking locations and establishing accurate project coordinates and levels.' },
  { title: 'Civil & Structure', desc: 'Execution of foundations, structures and associated civil works.' },
  { title: 'Module Installation', desc: 'Mounting and securing PV modules as per approved layout.' },
  { title: 'DC Works', desc: 'Installation, dressing, termination and testing of DC cables and connections.' },
  { title: 'AC & HT Works', desc: 'Installation and termination of AC cables, panels, transformers and HT equipment.' },
  { title: 'Earthing & Communication', desc: 'Installation of earthing, lightning protection and communication systems.' },
  { title: 'Testing & Commissioning', desc: 'Inspection, testing and commissioning of all plant systems.' },
  { title: 'Punch Point Rectification', desc: 'Identification and closure of pending defects and installation issues.' },
  { title: 'Handover', desc: 'Final documentation, inspection and formal handover of the completed plant.' }
];

/* O&M dashboard items */
const OM_ITEMS = [
  { name: 'Module Cleaning', text: 'All module cleaning using brush. Team will check all modules for hotspot, broken or delamination, cable cracks, burn mark and sharp edges. Before and after cleaning pictures should be taken. Team will clean inverter and monitor all strings.' },
  { name: 'Inverter Maintenance', text: 'Clean inverter fan and filters using blower. Check tightness of all AC and DC connections. Megger testing of AC and DC cables. Check inverter, fuses, SPD and surge arrestor.' },
  { name: 'LT Panel', text: 'Check fuse, SPD, surge arrestor, breaker condition, corrosion, overheating, water ingress, pest infection, connection tightness and cable insulation.' },
  { name: 'Meter Panel', text: 'Check connection tightness, CT deformation, CT cable condition to energy meter and display operational status.' },
  { name: 'Lightning Arrestor', text: 'Check lightning arrestor condition, earth strip damage, corrosion, earth pit condition and vegetation growth. Earth pit testing.' },
  { name: 'Inverter Measurement', text: 'Measure inverter string current and voltage. Megger testing of AC and DC cables.' },
  { name: 'Earth Pit Testing', text: 'Earth pit testing once per year.' },
  { name: 'Mechanical PM', text: 'Check tightness of all modules before and after monsoon.' },
  { name: 'Plant Monitoring', text: 'Control team monitors plant three times a day.' },
  { name: 'Breakdown Maintenance', text: 'Team attends breakdown issues within 4 hours once notified, subject to location and circumstances.' },
  { name: 'Communication Issue', text: 'Communication team attends issues twice per month.' },
  { name: 'Revamp Works', text: 'Revamp works outside the defined scope are provided at minimum applicable charges.' },
  { name: 'Thermography of Plant', text: 'Maitra provides plant thermography as required by the client with a report. Separate quotation applies.' }
];

/* Representative field imagery for O&M categories. These are real supplied assets. */
const OM_IMAGES = {
  'Module Cleaning': 'assets/site/module-cleaning/cleaning-5.jpg',
  'Inverter Maintenance': 'assets/site/inverter-maintenance/inverter-1.jpg',
  'LT Panel': 'assets/site/inverter-maintenance/inverter-4.jpg',
  'Meter Panel': 'assets/site/inverter-maintenance/inverter-5.jpg',
  'Lightning Arrestor': 'assets/site/plant/plant-site.jpg',
  'Inverter Measurement': 'assets/site/inverter-maintenance/inverter-2.jpg',
  'Earth Pit Testing': 'assets/site/plant/plant-site.jpg',
  'Mechanical PM': 'assets/site/module-cleaning/cleaning-6.jpg',
  'Breakdown Maintenance': 'assets/site/revamp/revamping.jpg',
  'Communication Issue': 'assets/site/communication/communication-1.jpg',
  'Revamp Works': 'assets/site/revamp/revamping.jpg',
  'Thermography of Plant': 'assets/site/thermography/thermography-1.jpg'
};

/* Due diligence zones */
const DD_ZONES = [
  {
    name: 'Technical', icon: 'bolt',
    desc: 'Electrical and system health of the plant.',
    detail: [
      'PV module and string condition',
      'Inverter and protection devices',
      'DC / AC cabling and termination',
      'Earthing and lightning protection'
    ]
  },
  {
    name: 'Operational', icon: 'wrench',
    desc: 'How the plant is actually operated and maintained.',
    detail: [
      'Maintenance and cleaning records',
      'Monitoring practices and alarms',
      'Site operations and documentation',
      'Spare and material management'
    ]
  },
  {
    name: 'Structural', icon: 'layers',
    desc: 'Mechanical integrity of the plant infrastructure.',
    detail: [
      'Mounting structures and foundations',
      'Corrosion and alignment',
      'Module fixing integrity',
      'Civil condition assessment'
    ]
  },
  {
    name: 'Performance', icon: 'chart',
    desc: 'Generation behaviour against expectations.',
    detail: [
      'Generation data analysis',
      'String-level performance review',
      'Degradation assessment',
      'Yield consistency'
    ]
  },
  {
    name: 'Risk', icon: 'shield',
    desc: 'Identified technical, safety and operational risks.',
    detail: [
      'Technical and electrical risks',
      'Safety and access risks',
      'Environmental exposure',
      'Operational reliability'
    ]
  },
  {
    name: 'Improvement', icon: 'compass',
    desc: 'Prioritised recommendations for the client.',
    detail: [
      'Output improvement measures',
      'Reliability actions',
      'Maintenance plan adjustments',
      'Cost-effective priorities'
    ]
  }
];

/* Gallery data — descriptive captions, no fabricated project facts */
const GALLERY = [
  { src: 'assets/site/plant/plant-site.jpg', cat: 'plant', tag: 'Plant & Site', cap: 'Solar plant site — Dighi, Pune', wide: true },
  { src: 'assets/site/module-cleaning/cleaning-1.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning with brush and water' },
  { src: 'assets/site/module-cleaning/cleaning-2.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning in progress' },
  { src: 'assets/site/module-cleaning/cleaning-3.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Brush cleaning of PV modules' },
  { src: 'assets/site/module-cleaning/cleaning-4.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Cleaning operation at plant' },
  { src: 'assets/site/module-cleaning/cleaning-5.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Module cleaning — site operations', wide: true },
  { src: 'assets/site/module-cleaning/cleaning-6.jpg', cat: 'cleaning', tag: 'Module Cleaning', cap: 'Cleaning — plant view' },
  { src: 'assets/site/inverter-maintenance/inverter-1.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter maintenance — inspection' },
  { src: 'assets/site/inverter-maintenance/inverter-2.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter checks at plant' },
  { src: 'assets/site/inverter-maintenance/inverter-3.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter — periodic maintenance' },
  { src: 'assets/site/inverter-maintenance/inverter-4.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Plant maintenance activity' },
  { src: 'assets/site/inverter-maintenance/inverter-5.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter maintenance — checks' },
  { src: 'assets/site/inverter-maintenance/inverter-6.jpg', cat: 'inverter', tag: 'Inverter Maintenance', cap: 'Inverter internal checks', tall: true },
  { src: 'assets/site/communication/communication-1.jpg', cat: 'communication', tag: 'Communication', cap: 'Inverter communication — monitoring' },
  { src: 'assets/site/communication/communication-2.jpg', cat: 'communication', tag: 'Communication', cap: 'Communication module inspection' },
  { src: 'assets/site/thermography/thermography-1.jpg', cat: 'thermo', tag: 'Thermography', cap: 'Plant thermography — thermal inspection' },
  { src: 'assets/site/thermography/thermography-2.jpg', cat: 'thermo', tag: 'Thermography', cap: 'Thermal scan of plant area' },
  { src: 'assets/site/thermography/thermography-3.jpg', cat: 'thermo', tag: 'Thermography', cap: 'Thermography inspection view' },
  { src: 'assets/site/thermography/thermography-4.jpg', cat: 'thermo', tag: 'Thermography', cap: 'Thermal inspection data' },
  { src: 'assets/site/revamp/revamping.jpg', cat: 'revamp', tag: 'Revamping', cap: 'Revamping work at solar plant', wide: true },
  { src: 'assets/site/solution-cleaning/solution-cleaning-1.jpg', cat: 'solution', tag: 'Solution Cleaning', cap: 'Chemical / solution cleaning of modules' },
  { src: 'assets/site/solution-cleaning/solution-cleaning-2.jpg', cat: 'solution', tag: 'Solution Cleaning', cap: 'Solution cleaning operation' },
  
  
  
  
  
  ];

const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'plant', label: 'Plant & Site' },
  { id: 'cleaning', label: 'Module Cleaning' },
  { id: 'inverter', label: 'Inverter' },
  { id: 'communication', label: 'Communication' },
  { id: 'thermo', label: 'Thermography' },
  { id: 'revamp', label: 'Revamping' },
  { id: 'solution', label: 'Solution Cleaning' },
  ];

/* Team — client-facing profiles use professional designations instead of personal names. */
const TEAM = [
  { role: 'Managing Director', img: 'assets/team/prajkta-kulkarni.jpg', lead: true, stage: 'PROJECT DIRECTION', desc: 'Strategic direction, client alignment and the decisions that keep a project moving from requirement to delivery.', focus: ['Strategy', 'Client Alignment', 'Direction'] },
  { role: 'Project & Asset Manager', img: 'assets/team/amrut-bugad-cutout.png', lead: true, stage: 'PROJECT DELIVERY', desc: 'Coordinates project delivery and asset responsibilities across the operating lifecycle, keeping execution and follow-through connected.', focus: ['Project Delivery', 'Asset Management', 'Coordination'] },
  { role: 'EPC Supervisor', img: 'assets/team/babu-ghevade-cutout.png', stage: 'FIELD EXECUTION', desc: 'Supports EPC execution on site, translating the approved project sequence into coordinated field activity.', focus: ['EPC Execution', 'Site Supervision', 'Field Coordination'] },
  { role: 'Site Supervisor', img: 'assets/team/ravi-kumar-cutout.png', stage: 'SITE CONTROL', desc: 'Supports day-to-day site execution, keeping field activities aligned with the planned work sequence.', focus: ['Site Execution', 'Work Coordination', 'Quality Focus'] },
  { role: 'Sr O&M Supervisor', img: 'assets/team/rushikesh-ubale-cutout.png', stage: 'ASSET PERFORMANCE', desc: 'Supports O&M field activity, maintenance response and the practical work required to keep solar assets operating reliably.', focus: ['O&M', 'Maintenance', 'Field Response'] }
];

const LEADERSHIP_STAGES = [
  { label: 'PROJECT DIRECTION', person: 0 },
  { label: 'PROJECT DELIVERY', person: 1 },
  { label: 'FIELD EXECUTION', person: 2 },
  { label: 'SITE CONTROL', person: 3 },
  { label: 'ASSET PERFORMANCE', person: 4 },
  { label: 'ASSET PERFORMANCE', person: 4 }
];

/* Panel registry */
const PANELS = {
  about: { eyebrow: 'About Maitra', title: 'Engineering Beyond Installation', render: renderAboutPanel },
  services: { eyebrow: 'Services', title: 'Service Categories', render: renderServicesPanel },
  epc: { eyebrow: 'EPC / EPC Keepability', title: 'Project Execution Sequence', render: renderEpcPanel },
  om: { eyebrow: 'O&M', title: 'Operations & Maintenance Dashboard', render: renderOmPanel },
  dd: { eyebrow: 'Due Diligence', title: 'Solar Plant Due Diligence', render: renderDdPanel },
  projects: { eyebrow: 'Projects & Site Work', title: 'Project Gallery', render: renderProjectsPanel },
  team: { eyebrow: 'Team', title: 'Leadership & Site Engineers', render: renderTeamPanel },
  contact: { eyebrow: 'Contact', title: 'Start the Conversation', render: renderContactPanel }
};

/* ------------------------------------------------------------
   2. DOM REFERENCES
------------------------------------------------------------ */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

const body = document.body;
const header = $('#siteHeader');
const navToggle = $('#navToggle');
const mobileMenu = $('#mobileMenu');
const panelShell = $('#panelShell');
const panelTitle = $('#panelTitle');
const panelEyebrow = $('#panelEyebrow');
const panelBody = $('#panelBody');
const modalShell = $('#modalShell');
const modalBody = $('#modalBody');
const consultShell = $('#consultShell');
const lightboxEl = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxCaption = $('#lightboxCaption');
const lightboxTitle = $('#lightboxTitle');
const lightboxCount = $('#lightboxCount');
const lightboxCounter = $('#lightboxCounter');
const lightboxThumbs = $('#lightboxThumbs');
const toastEl = $('#toast');

let lastFocused = null;
let currentPanelId = null;
let panelHistory = [];
let lightboxList = [];
let lightboxIndex = 0;

/* ------------------------------------------------------------
   3. HELPERS
------------------------------------------------------------ */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function icon(name, cls) {
  return `<svg class="icon ${cls || ''}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function openOmItem(name) {
  if (!name) return;
  openPanel('om');
  requestAnimationFrame(() => {
    const item = $$('.om-item', panelBody).find(el => el.getAttribute('data-om-name') === name);
    if (!item) return;
    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    toggleAccordion(item, '.om-detail');
  });
}

function lockScroll() { body.classList.add('no-scroll'); }
function unlockScroll() { body.classList.remove('no-scroll'); }

/* Keep the scroll lock correct when overlays stack (panel + modal). */
function anyOverlayOpen() {
  return !panelShell.hidden || !modalShell.hidden || !consultShell.hidden || !lightboxEl.hidden;
}
function syncScrollLock() { body.classList.toggle('no-scroll', anyOverlayOpen()); }

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toastEl.hidden = true; }, 4200);
}

/* Accordion expand/collapse */
function toggleAccordion(item, detailClass) {
  const open = item.classList.toggle('is-open');
  const detail = item.querySelector(detailClass);
  if (detail) detail.style.maxHeight = open ? detail.scrollHeight + 'px' : '';
  const btn = item.querySelector('[aria-expanded]');
  if (btn) btn.setAttribute('aria-expanded', String(open));
}

/* ------------------------------------------------------------
   4. HEADER + MOBILE MENU
------------------------------------------------------------ */
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileMenu.hidden = open;
  header.classList.toggle('is-menu-open', !open);
  if (!open) lockScroll(); else unlockScroll();
});

function closeMobileMenu() {
  mobileMenu.hidden = true;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  header.classList.remove('is-menu-open');
}

/* ------------------------------------------------------------
   5. EXPERIENCE PANEL SYSTEM (same-page navigation)
------------------------------------------------------------ */
function setNavCurrent(panelId) {
  const servicePanels = new Set(['om', 'epc', 'dd']);
  const currentNavTarget = servicePanels.has(panelId) ? 'services' : panelId;
  $$('[data-open]').forEach(btn => {
    if (btn.classList.contains('nav-link') && btn.getAttribute('data-open') === currentNavTarget) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });
}

function fadeContentIn() {
  panelBody.style.opacity = '0';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panelBody.style.transition = 'opacity 0.4s ease';
      panelBody.style.opacity = '1';
    });
  });
}

function openPanel(panelId, options = {}) {
  const cfg = PANELS[panelId];
  if (!cfg) return;
  if (!modalShell.hidden) closeModal(modalShell);
  if (!consultShell.hidden) closeModal(consultShell);
  if (!lightboxEl.hidden) closeLightbox();
  if (options.resetHistory) panelHistory = [];
  if (!panelShell.hidden && currentPanelId && currentPanelId !== panelId && options.pushHistory !== false) {
    panelHistory.push(currentPanelId);
  }
  lastFocused = document.activeElement;
  currentPanelId = panelId;
  panelEyebrow.textContent = cfg.eyebrow;
  panelTitle.textContent = cfg.title;
  panelBody.innerHTML = cfg.render();
  /* populate any empty gallery grids inside the panel */
  $$('.gallery-grid', panelBody).forEach(grid => {
    if (!grid.querySelector('.g-item')) renderGallery(grid);
  });
  panelShell.hidden = false;
  panelShell.setAttribute('aria-hidden', 'false');
  fadeContentIn();
  syncScrollLock();
  setNavCurrent(panelId);
  closeMobileMenu();
  requestAnimationFrame(() => {
    const backBtn = $('.panel-back', panelShell);
    const closeBtn = $('.panel-close', panelShell);
    const focusTarget = backBtn && !backBtn.hidden ? backBtn : closeBtn;
    if (focusTarget) focusTarget.focus();
  });
}

function closePanel(options = {}) {
  panelShell.hidden = true;
  panelShell.setAttribute('aria-hidden', 'true');
  panelBody.innerHTML = '';
  syncScrollLock();
  setNavCurrent(null);
  if (options.clearHistory !== false) {
    currentPanelId = null;
    panelHistory = [];
  }
  if (lastFocused) lastFocused.focus();
}

function goBackPanel() {
  if (panelHistory.length) {
    const previous = panelHistory.pop();
    openPanel(previous, { pushHistory: false });
  } else {
    closePanel();
  }
}

/* ------------------------------------------------------------
   6. MODAL SYSTEM
------------------------------------------------------------ */
function openModal(html, ariaLabel) {
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  modalShell.hidden = false;
  modalShell.setAttribute('aria-hidden', 'false');
  modalShell.setAttribute('aria-label', ariaLabel || 'Details');
  syncScrollLock();
  requestAnimationFrame(() => {
    const closeBtn = $('.modal-close', modalShell);
    if (closeBtn) closeBtn.focus();
  });
}

function closeModal(shell) {
  const target = shell || modalShell;
  target.hidden = true;
  target.setAttribute('aria-hidden', 'true');
  if (target === modalShell) modalBody.innerHTML = '';
  syncScrollLock();
  if (lastFocused) lastFocused.focus();
}

/* Detail modal for a capability service */
function openServiceModal(id) {
  const svc = SERVICES.find(s => s.id === id);
  if (!svc) return;
  let media = '';
  if (svc.images && svc.images.length) {
    const cls = svc.images.length > 1 ? 'modal-media two-col' : 'modal-media';
    media = `<div class="${cls}">${svc.images.map(src =>
      `<img src="${src}" alt="${esc(svc.name)} — field imagery" loading="lazy">`).join('')}</div>`;
  }
  const bullets = svc.bullets ? `<ul class="dd-list">${svc.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  const html = `
    <p class="eyebrow eyebrow-light">Capability ${esc(svc.num)}</p>
    <h2 class="modal-title">${esc(svc.name)}</h2>
    <p class="modal-sub">${esc(svc.desc)}</p>
    ${media}
    <p>${esc(svc.detail)}</p>
    ${bullets}
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn btn-primary" type="button" data-close>Close</button>
      <button class="btn btn-ghost-light" type="button" data-open="contact">Talk to Maitra</button>
    </div>`;
  openModal(html, svc.name);
}

/* Legal placeholders */
function openLegalModal(kind) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use';
  const html = `
    <p class="eyebrow eyebrow-light">${isPrivacy ? 'Privacy Policy' : 'Terms'}</p>
    <h2 class="modal-title">${title}</h2>
    <p class="modal-sub">Placeholder</p>
    <p>This section is a placeholder for the ${isPrivacy ? 'privacy policy' : 'terms and conditions'} of Maitra Solar Solutions and will be completed before public deployment.</p>`;
  openModal(html, title);
}

/* ------------------------------------------------------------
   7. GLOBAL CLICK DELEGATION
------------------------------------------------------------ */
document.addEventListener('click', (e) => {
  const backPanel = e.target.closest('[data-back-panel]');
  if (backPanel) {
    goBackPanel();
    return;
  }

  const modalBack = e.target.closest('[data-modal-back]');
  if (modalBack) {
    const targetPanel = modalBack.getAttribute('data-modal-back');
    closeModal(modalShell);
    if (targetPanel && PANELS[targetPanel]) {
      currentPanelId = targetPanel;
      setNavCurrent(targetPanel);
    }
    return;
  }

  const opener = e.target.closest('[data-open]');
  if (opener) {
    const panelId = opener.getAttribute('data-open');
    const omItemName = opener.getAttribute('data-om-item');
    if (panelId === 'contact' && !modalShell.hidden) {
      /* "Talk to Maitra" inside a detail modal */
      closeModal(modalShell);
    }
    if (panelId === 'om' && omItemName) openOmItem(omItemName);
    else openPanel(panelId, { resetHistory: panelShell.hidden });
    return;
  }

  const modalOpener = e.target.closest('[data-modal]');
  if (modalOpener) {
    openLegalModal(modalOpener.getAttribute('data-modal'));
    return;
  }

  if (e.target.closest('[data-close]')) {
    if (!lightboxEl.hidden) closeLightbox();
    else if (!consultShell.hidden) closeModal(consultShell);
    else if (!modalShell.hidden) closeModal(modalShell);
    else if (!panelShell.hidden) closePanel();
    return;
  }

  /* capability triggers (landing cards + services-panel "View Details") */
  const svcTrigger = e.target.closest('[data-svc]');
  if (svcTrigger) {
    const svc = SERVICES.find(s => s.id === svcTrigger.getAttribute('data-svc'));
    if (svc && svc.openPanel) openPanel(svc.openPanel);
    else openServiceModal(svcTrigger.getAttribute('data-svc'));
    return;
  }

  /* O&M service detail cards */
  const omDetailTrigger = e.target.closest('[data-om-detail]');
  if (omDetailTrigger) {
    openOmServiceModal(omDetailTrigger.getAttribute('data-om-detail'));
    return;
  }

  /* accordions */
  const svcToggle = e.target.closest('.svc-toggle');
  if (svcToggle) {
    toggleAccordion(svcToggle.closest('.svc-row'), '.svc-detail');
    return;
  }
  const omItem = e.target.closest('.om-item');
  if (omItem) {
    toggleAccordion(omItem, '.om-detail');
    return;
  }
  const ddZone = e.target.closest('.dd-zone');
  if (ddZone) {
    toggleAccordion(ddZone, '.dd-zone-detail');
    return;
  }

  const teamPerson = e.target.closest('[data-team-person]');
  if (teamPerson) {
    setTeamPanelPerson(Number(teamPerson.getAttribute('data-team-person')) || 0);
    return;
  }
  const epcStage = e.target.closest('.epc-stage');
  if (epcStage) {
    activateEpcStage(epcStage);
    return;
  }

  /* gallery */
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    setGalleryFilter(filterBtn.getAttribute('data-filter'));
    return;
  }
  const gItem = e.target.closest('.g-item');
  if (gItem) {
    openLightboxGroup(gItem.getAttribute('data-cat'));
    return;
  }

  const lightboxThumb = e.target.closest('[data-lightbox-index]');
  if (lightboxThumb && !lightboxEl.hidden) {
    lightboxIndex = Number(lightboxThumb.getAttribute('data-lightbox-index')) || 0;
    showLightboxImage();
    return;
  }

  /* consultation */
  if (e.target.closest('#openConsult') || e.target.closest('#openConsultPanel')) {
    if (!panelShell.hidden) closePanel();
    openConsult();
  }
});

/* ------------------------------------------------------------
   8. PANEL RENDERERS
------------------------------------------------------------ */
function renderAboutPanel() {
  return `
    <div class="about-panel-grid">
      <div class="about-panel-copy">
        <p class="panel-intro">Maitra Solar Solutions is a solar plant engineering company based in <strong>Dighi, Pune</strong>, delivering integrated solutions across project execution, operations and maintenance, asset management and technical assessment for ground-mounted and rooftop solar plants across Maharashtra and Pan India.</p>
        <p class="panel-copy">From the first survey to handover, and from routine operation to complete overhaul, Maitra operates as a single accountable partner — combining site engineering discipline with structured O&amp;M and data-backed performance management.</p>
        <div class="about-chip-grid" aria-label="Operating profile">
          <span>Ground-mounted</span><span>Rooftop</span><span>Maharashtra</span><span>Pan India</span>
        </div>
        <div class="about-panel-actions">
          <button class="btn btn-primary" type="button" data-open="services">Explore Services <span aria-hidden="true">→</span></button>
          <button class="btn btn-ghost-light" type="button" data-open="contact">Talk to Maitra <span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div class="about-panel-media">
        <figure><img src="assets/site/plant/plant-site.jpg" alt="Solar plant site infrastructure under Maitra Solar Solutions management" loading="eager"><figcaption>FIELD ENGINEERING / 01</figcaption></figure>
        <div class="about-panel-thumbs">
          <figure><img src="assets/site/module-cleaning/cleaning-5.jpg" alt="Module cleaning in progress at a solar plant" loading="lazy"></figure>
          <figure><img src="assets/site/inverter-maintenance/inverter-6.jpg" alt="Inverter maintenance work at a solar plant" loading="lazy"></figure>
        </div>
      </div>
    </div>
    <div class="about-workflow">
      <div class="about-workflow-head">
        <div><p class="eyebrow eyebrow-light">Engineering Workflow</p><h3>From Survey to <span>Performance.</span></h3></div>
        <span>01 — 08</span>
      </div>
      <div class="panel-flow about-flow">${renderFlowList(FLOW_LIFECYCLE)}</div>
    </div>`;
}

function renderServicesPanel() {
  const categories = SERVICES.map(s => `
    <article class="service-category-card">
      <button class="cap-card service-category-trigger" type="button" data-svc="${s.id}" data-num="${esc(s.num)}" aria-label="Open ${esc(s.name)}">
        <div class="cap-top">
          <span class="cap-num">${esc(s.num)}</span>
          <span class="cap-arrow">${icon('arrow-right')}</span>
        </div>
        ${icon(s.icon, 'cap-icon')}
        <h3 class="cap-name">${esc(s.name)}</h3>
        <p class="cap-desc">${esc(s.desc)}</p>
      </button>
      <div class="service-category-meta"><span>${s.id === 'om' ? '13 service scopes' : 'Service category'}</span><span>Click to open</span></div>
    </article>`).join('');

  return `
    <div class="panel-command-head">
      <div>
        <p class="eyebrow eyebrow-light">Services / Level 01</p>
        <p class="panel-intro">Choose a top-level category. O&amp;M opens the thirteen client-defined service scopes; EPC / EPC Keepability and Due Diligence retain their existing interactive engineering views.</p>
      </div>
      <span class="panel-state">SELECT / OPEN</span>
    </div>
    <div class="service-category-grid">${categories}</div>`;
}
function renderEpcPanel() {
  const stages = EPC_STAGES.map((st, i) => `
    <div class="epc-stage" data-stage="${i}" tabindex="0" role="button" aria-expanded="false">
      <div class="epc-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="epc-body">
        <h3 class="epc-stage-title">${esc(st.title)}</h3>
        <p class="epc-stage-desc">${esc(st.desc)}</p>
      </div>
    </div>`).join('');
  return `
    <div class="panel-context-bar">
      <p class="panel-intro">Every Maitra project runs through this exact ten-stage engineering sequence — from mobilization to handover.</p>
      <button class="panel-back" type="button" data-back-panel>← Back to Services</button>
    </div>
    <div class="epc-progress">
      <div class="epc-progress-label"><span>Sequence progress</span><span id="epcCount">0 / ${EPC_STAGES.length} stages</span></div>
      <div class="epc-progress-bar" id="epcBar"></div>
    </div>
    <div class="epc-timeline">${stages}</div>`;
}

function activateEpcStage(el) {
  const wasActive = el.classList.contains('is-live');
  $$('.epc-stage').forEach(s => {
    s.classList.remove('is-live');
    s.setAttribute('aria-expanded', 'false');
  });
  if (!wasActive) {
    el.classList.add('is-live');
    el.setAttribute('aria-expanded', 'true');
  }
  const count = $$('.epc-stage.is-live').length;
  const bar = $('#epcBar');
  const label = $('#epcCount');
  if (bar) bar.style.setProperty('--progress', (count / EPC_STAGES.length) * 100 + '%');
  if (label) label.textContent = `${count} / ${EPC_STAGES.length} stages`;
}

function renderOmPanel() {
  const items = OM_ITEMS.map((it, i) => `
    <article class="om-item om-command-card" id="om-${slugify(it.name)}" data-om-name="${esc(it.name)}" data-om-detail="${esc(it.name)}" tabindex="0" role="button" aria-label="Open ${esc(it.name)} details">
      <div class="om-top">
        <span class="om-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="om-chev">${icon('arrow-right')}</span>
      </div>
      <h3 class="om-name">${esc(it.name)}</h3>
      <span class="om-open-label">OPEN DETAIL</span>
    </article>`).join('');
  return `
    <div class="om-panel-topbar">
      <div>
        <p class="eyebrow eyebrow-light">Services / Level 02</p>
        <p class="panel-intro">O&amp;M is the parent category for the thirteen client-defined maintenance scopes. Select any scope to open its dedicated detail view.</p>
      </div>
      <button class="panel-back" type="button" data-back-panel>← Back to Services</button>
    </div>
    <div class="om-panel-media">
      <div class="om-panel-video">
        <video autoplay muted loop playsinline preload="metadata" aria-label="Maitra Solar Solutions O&amp;M field maintenance video">
          <source src="assets/video/maitra-om-maintenance.mp4" type="video/mp4">
        </video>
        <div class="om-panel-video-overlay" aria-hidden="true"></div>
        <div class="om-panel-video-label"><span>FIELD MAINTENANCE</span><span>O&amp;M / ASSET CARE</span></div>
      </div>
      <div class="om-panel-flow">
        <p class="eyebrow eyebrow-light">Operating Cycle</p>
        <div class="panel-flow">${renderFlowList(FLOW_OM)}</div>
      </div>
    </div>
    <div class="om-grid om-command-grid">${items}</div>`;
}

function openOmServiceModal(name) {
  const item = OM_ITEMS.find(it => it.name === name);
  if (!item) return;
  const image = OM_IMAGES[name] ? `<div class="modal-media"><img src="${OM_IMAGES[name]}" alt="${esc(name)} — Maitra field imagery" loading="eager"></div>` : '';
  const html = `
    <p class="eyebrow eyebrow-light">O&amp;M / Service Detail</p>
    <h2 class="modal-title">${esc(item.name)}</h2>
    <p class="modal-sub">Client-defined O&amp;M service scope.</p>
    ${image}
    <p>${esc(item.text)}</p>
    <div class="service-detail-meta"><span>O&amp;M</span><span>FIELD SERVICE</span><span>MAITRA</span></div>
    <div class="service-detail-actions">
      <button class="btn btn-primary" type="button" data-open="contact">Request / Discuss Service <span aria-hidden="true">→</span></button>
      <button class="btn btn-ghost-light" type="button" data-modal-back="om">← Back to O&amp;M</button>
      <button class="btn btn-ghost-light" type="button" data-close>Close</button>
    </div>`;
  openModal(html, item.name);
}

function renderDdPanel() {
  const zones = DD_ZONES.map(z => `
    <article class="dd-zone" tabindex="0" role="button" aria-expanded="false">
      ${icon(z.icon, 'dd-zone-icon')}
      <h3 class="dd-zone-name">${esc(z.name)}</h3>
      <p class="dd-zone-desc">${esc(z.desc)}</p>
      <div class="dd-zone-detail">
        <ul>${z.detail.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      </div>
    </article>`).join('');
  return `
    <div class="panel-context-bar panel-context-bar-dd">
      <p class="panel-intro">Comprehensive assessment of the solar plant’s technical, operational, structural and performance condition to identify risks and improvement opportunities.</p>
      <button class="panel-back" type="button" data-back-panel>← Back to Services</button>
    </div>
    <div class="dd-hero">
      <p class="eyebrow eyebrow-light">Assessment</p>
      <h3>Solar Plant Due Diligence</h3>
      <p>Comprehensive assessment of the solar plant\u2019s technical, operational, structural, and performance condition to identify risks and improvement opportunities.</p>
    </div>
    <div class="panel-flow">${renderFlowList(FLOW_DD)}</div>
    <div class="dd-zones">${zones}</div>`;
}

function renderProjectsPanel() {
  return `
    <p class="panel-intro">Real field imagery from Maitra's solar plant operations. Select a collection to open every available image in a focused gallery.</p>
    <div class="gallery-tools">
      <div class="gallery-filters" role="group" aria-label="Filter gallery">
        ${GALLERY_FILTERS.map((f, i) =>
          `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" type="button" data-filter="${f.id}">${esc(f.label)}</button>`).join('')}
      </div>
      <span class="gallery-count" id="galleryCount"></span>
    </div>
    <div class="gallery-grid" id="panelProjectGrid"></div>`;
}

function renderTeamPanel() {
  const lead = TEAM[0];
  return `
    <div class="team-showcase" id="teamShowcase">
      <div class="team-blueprint" aria-hidden="true">
        <span>MAITRA / PEOPLE / 01</span>
        <span>FIELD → ASSET</span>
      </div>

      <div class="team-feature" id="teamFeature">
        <div class="team-feature-visual ${lead.lead ? 'is-photo' : 'is-cutout'}">
          <div class="team-feature-grid" aria-hidden="true"></div>
          <img id="teamFeatureImg" src="${lead.img}" alt="${esc(lead.role)}" loading="eager">
          <div class="team-feature-index"><span id="teamFeatureIndex">01</span><i></i><span>05</span></div>
        </div>

        <div class="team-feature-copy">
          <div class="team-feature-kicker"><span id="teamFeatureStage">${esc(lead.stage)}</span><span>ACTIVE PROFILE</span></div>
          <div class="team-feature-rule"></div>
          <h3 id="teamFeatureName">${esc(lead.role)}</h3>
          <p class="team-feature-role" id="teamFeatureRole">${esc(lead.stage)}</p>
          <p class="team-feature-desc" id="teamFeatureDesc">${esc(lead.desc)}</p>
          <div class="team-feature-focus" id="teamFeatureFocus">${lead.focus.map(item => `<span>${esc(item)}</span>`).join('')}</div>
          <div class="team-feature-signature"><span class="team-sig-line"></span><span>ONE TEAM / ONE ACCOUNTABILITY</span></div>
        </div>
      </div>

      <div class="team-roster-head">
        <span>TEAM ROSTER</span>
        <span>Select a profile to explore their responsibility</span>
      </div>
      <div class="team-roster" role="list" aria-label="Leadership and site engineers">
        ${TEAM.map((m, i) => `
          <button class="team-roster-item ${i === 0 ? 'is-active' : ''}" type="button" data-team-person="${i}" aria-pressed="${i === 0 ? 'true' : 'false'}">
            <span class="team-roster-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="team-roster-thumb ${i === 0 ? 'is-photo' : 'is-cutout'}"><img src="${m.img}" alt="" loading="lazy"></span>
            <span class="team-roster-copy"><strong>${esc(m.role)}</strong><small>${esc(m.stage)}</small></span>
            <span class="team-roster-arrow" aria-hidden="true">↗</span>
          </button>`).join('')}
      </div>

      <div class="team-showcase-note"><span></span><p>From project direction to field execution, <strong>the people stay close to the work.</strong></p></div>
    </div>`;
}

function setTeamPanelPerson(index) {
  const member = TEAM[index];
  const img = $('#teamFeatureImg');
  const frame = img?.closest('.team-feature-visual');
  const name = $('#teamFeatureName');
  const role = $('#teamFeatureRole');
  const stage = $('#teamFeatureStage');
  const desc = $('#teamFeatureDesc');
  const focus = $('#teamFeatureFocus');
  const number = $('#teamFeatureIndex');
  if (!member || !img || !frame || !name || !role || !stage || !desc || !focus || !number) return;

  img.style.opacity = '0';
  frame.classList.remove('is-photo', 'is-cutout');
  frame.classList.add(index === 0 ? 'is-photo' : 'is-cutout');
  setTimeout(() => {
    img.src = member.img;
    img.alt = member.role;
    name.textContent = member.role;
    role.textContent = member.stage;
    stage.textContent = member.stage;
    desc.textContent = member.desc;
    number.textContent = String(index + 1).padStart(2, '0');
    focus.innerHTML = member.focus.map(item => `<span>${esc(item)}</span>`).join('');
    img.style.opacity = '1';
  }, 140);

  $$('.team-roster-item', panelBody).forEach((button, i) => {
    const active = i === index;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderContactPanel() {
  return `
    <p class="panel-intro">Speak directly with Maitra's management about EPC, O&M, due diligence or asset management.</p>
    <div class="contact-grid">
      <div class="contact-card">
        <h3 class="contact-card-title">${icon('phone')} Call Us</h3>
        <p>Speak with the Maitra team about EPC, O&M or assessments.</p>
        <a class="contact-card-action btn btn-primary" href="tel:+918446853660">Call +91 84468 53660</a>
      </div>
      <div class="contact-card">
        <h3 class="contact-card-title">${icon('mail')} Email Us</h3>
        <p>Send project details, site information or maintenance enquiries.</p>
        <p class="contact-card-address">maitrasolarsolutions@gmail.com</p>
        <a class="contact-card-action btn btn-ghost-light" href="mailto:maitrasolarsolutions@gmail.com">Send an Email <span aria-hidden="true">→</span></a>
      </div>
      <div class="contact-card contact-card-consult">
        <h3 class="contact-card-title">${icon('compass')} Request a Consultation</h3>
        <p>Arrange a technical consultation directly with Maitra's management on WhatsApp.</p>
        <a class="contact-card-action btn btn-primary" href="https://wa.me/${MAITRA_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Maitra Solar Solutions, I would like to request a consultation regarding a solar project. Please let me know how we can proceed.') }" target="_blank" rel="noopener noreferrer">Request Consultation <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <div class="contact-details" style="border-top:1px solid var(--line-dark);margin-top:36px;padding-top:26px">
      <div>
        <h3>${icon('pin')} Location</h3>
        <p>Dighi, Pune, Maharashtra, India</p>
        <p>Service coverage: Maharashtra &amp; Pan India</p>
      </div>
      <div>
        <h3>${icon('shield')} Management</h3>
        <p><strong>Managing Director</strong></p>
        <p><strong>Project &amp; Asset Manager</strong></p>
      </div>
      <div>
        <h3>${icon('mail')} Email</h3>
        <p>maitrasolarsolutions@gmail.com</p>
      </div>
    </div>`;
}

function renderFlowList(flow) {
  return flow.map((f, i) => `<li style="--flow-i:${i}"><b>${String(i + 1).padStart(2, '0')}</b> ${esc(f)}</li>`).join('');
}

function teamCard(m) {
  return `
    <article class="team-card">
      <div class="team-photo ${m.lead ? '' : 'is-cutout'}">
        <img src="${m.img}" alt="${esc(m.role)}" loading="lazy">
      </div>
      <div class="team-info">
        <h3 class="team-name">${esc(m.role)}</h3>
        <p class="team-role">${esc(m.stage)}</p>
      </div>
    </article>`;
}

function initLeadershipStory() {
  const featureImg = $('#leadershipFeatureImg');
  const featureName = $('#leadershipFeatureName');
  const featureRole = $('#leadershipFeatureRole');
  const featureStage = $('#leadershipFeatureStage');
  const featureDesc = $('#leadershipFeatureDesc');
  const focus = $('#leadershipFocus');
  const photoIndex = $('#leadershipPhotoIndex');
  const stages = $$('.lead-stage');
  const people = $$('.lead-person');
  if (!featureImg || !featureName || !featureRole || !focus) return;

  let activePerson = 0;

  function setPerson(index) {
    const member = TEAM[index];
    if (!member) return;
    activePerson = index;
    featureImg.src = member.img;
    const photoFrame = featureImg.closest('.leadership-feature-photo');
    if (photoFrame) photoFrame.classList.toggle('is-cutout', index !== 0);
    featureImg.alt = member.role;
    featureName.textContent = member.role;
    featureRole.textContent = member.stage;
    featureStage.textContent = member.stage;
    featureDesc.textContent = member.desc;
    photoIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(TEAM.length).padStart(2, '0')}`;
    focus.innerHTML = member.focus.map(item => `<span>${esc(item)}</span>`).join('');
    people.forEach((button, i) => button.classList.toggle('is-active', i === index));
  }

  stages.forEach((button, stageIndex) => {
    button.addEventListener('click', () => {
      stages.forEach((b, i) => b.classList.toggle('is-active', i === stageIndex));
      const personIndex = LEADERSHIP_STAGES[stageIndex]?.person ?? activePerson;
      setPerson(personIndex);
    });
  });
  people.forEach((button, index) => {
    button.addEventListener('click', () => {
      setPerson(index);
      const stageIndex = LEADERSHIP_STAGES.findIndex(stage => stage.person === index);
      if (stageIndex >= 0) stages.forEach((b, i) => b.classList.toggle('is-active', i === stageIndex));
    });
  });
  setPerson(0);
}

function initOMMaintenanceVideo() {
  const video = $('#omMaintenanceVideo');
  if (!video) return;

  // Seamless maintenance video: autoplay, muted, looping and no custom controls.
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const playVideo = () => {
    if (video.paused) video.play().catch(() => {});
  };

  if (video.readyState >= 2) playVideo();
  else video.addEventListener('canplay', playVideo, { once: true });

  // Keep the video flowing if the browser temporarily pauses it.
  video.addEventListener('pause', () => {
    if (!document.hidden) playVideo();
  });
}
/* ------------------------------------------------------------
   9. LANDING SECTION RENDERERS
------------------------------------------------------------ */
function renderCapabilities() {
  const grid = $('#capGrid');
  if (!grid) return;
  grid.innerHTML = SERVICES.map(s => `
    <button class="cap-card" type="button" data-svc="${s.id}" data-num="${esc(s.num)}" aria-label="Open ${esc(s.name)}">
      <div class="cap-top">
        <span class="cap-num">${esc(s.num)}</span>
        <span class="cap-arrow">${icon('arrow-right')}</span>
      </div>
      ${icon(s.icon, 'cap-icon')}
      <h3 class="cap-name">${esc(s.name)}</h3>
      <p class="cap-desc">${esc(s.desc)}</p>
    </button>`).join('');
}

/* Landing-page gallery filters */
function renderFilters() {
  const wrap = $('#galleryFilters');
  if (!wrap) return;
  wrap.innerHTML = GALLERY_FILTERS.map((f, i) =>
    `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" type="button" data-filter="${f.id}">${esc(f.label)}</button>`).join('');
}

function renderLifecycleFlow() {
  const wrap = $('#lifecycleFlow');
  if (!wrap) return;
  const nodes = FLOW_LIFECYCLE.map((step, i) => `
    <div class="flow-node" data-step="${i}">
      <span class="flow-label flow-tag">${String(i + 1).padStart(2, '0')}</span>
      <span class="flow-label">${esc(step)}</span>
      <span class="flow-dot"></span>
      ${i < FLOW_LIFECYCLE.length - 1 ? '<span class="flow-link"></span>' : ''}
    </div>`).join('');
  wrap.innerHTML = `<div class="flow-track">${nodes}</div>
    <div class="flow-progress" aria-hidden="true"></div>`;
}

function galleryGroups() {
  const groups = [];
  const seen = new Set();
  GALLERY.forEach((g, i) => {
    if (seen.has(g.cat)) return;
    seen.add(g.cat);
    const images = GALLERY.map((entry, idx) => ({ g: entry, i: idx })).filter(x => x.g.cat === g.cat);
    groups.push({ cat: g.cat, tag: g.tag, cover: g, images });
  });
  return groups;
}

function renderGallery(gridEl) {
  if (!gridEl) return;
  gridEl.innerHTML = galleryGroups().map((group, i) => `
    <article class="g-item gallery-project-card ${i === 0 ? 'wide' : ''}" data-cat="${group.cat}" tabindex="0" role="button" aria-label="Open ${esc(group.tag)} gallery">
      <img src="${group.cover.src}" alt="${esc(group.cover.cap)}" loading="lazy">
      <span class="g-tag">${esc(group.tag)}</span>
      <div class="g-project-overlay">
        <div class="g-project-copy">
          <span class="g-project-count">${group.images.length} ${group.images.length === 1 ? 'image' : 'images'}</span>
          <h3>${esc(group.tag)}</h3>
          <p>${esc(group.cover.cap)}</p>
        </div>
        <span class="g-project-action">View Gallery <span aria-hidden="true">→</span></span>
      </div>
    </article>`).join('');
  $$('img', gridEl).forEach(img => {
    if (img.complete) img.classList.add('is-loaded');
    else img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
  });
}

function renderTeam() {
  const grid = $('#teamGrid');
  if (!grid) return;
  grid.innerHTML = TEAM.map(teamCard).join('');
}

/* ------------------------------------------------------------
   10. GALLERY FILTER + COUNT
------------------------------------------------------------ */
function setGalleryFilter(cat) {
  $$('.filter-btn').forEach(b => b.classList.toggle('is-active', b.getAttribute('data-filter') === cat));
  let visible = 0;
  $$('.gallery-grid').forEach(grid => {
    $$('.g-item', grid).forEach(item => {
      const show = cat === 'all' || item.getAttribute('data-cat') === cat;
      item.hidden = !show;
      if (show) visible++;
    });
  });
  $$('.gallery-count').forEach(el => { el.textContent = `${visible} ${visible === 1 ? 'collection' : 'collections'}`; });
}

/* ------------------------------------------------------------
   11. LIGHTBOX
------------------------------------------------------------ */
function currentLightboxList() {
  return lightboxList;
}

function openLightboxGroup(cat) {
  lightboxList = GALLERY.map((g, i) => ({ g, i })).filter(x => x.g.cat === cat);
  lightboxIndex = 0;
  const group = lightboxList[0]?.g;
  if (!group) return;
  if (lightboxTitle) lightboxTitle.textContent = group.tag;
  if (lightboxCount) lightboxCount.textContent = `${lightboxList.length} ${lightboxList.length === 1 ? 'image' : 'images'}`;
  showLightboxImage();
  lightboxEl.hidden = false;
  lightboxEl.setAttribute('aria-hidden', 'false');
  syncScrollLock();
  lastFocused = document.activeElement;
  $('.lightbox-close', lightboxEl).focus();
}

function showLightboxImage() {
  const entry = lightboxList[lightboxIndex];
  if (!entry) return;
  const g = entry.g;
  lightboxImg.src = g.src;
  lightboxImg.alt = g.cap;
  lightboxCaption.innerHTML = `${esc(g.cap)}`;
  if (lightboxCounter) lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxList.length}`;
  if (lightboxThumbs) {
    lightboxThumbs.innerHTML = lightboxList.map((item, idx) => `
      <button class="lightbox-thumb ${idx === lightboxIndex ? 'is-active' : ''}" type="button" data-lightbox-index="${idx}" aria-label="View image ${idx + 1}">
        <img src="${item.g.src}" alt="" loading="lazy">
      </button>`).join('');
  }
}

function closeLightbox() {
  lightboxEl.hidden = true;
  lightboxEl.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (lastFocused) lastFocused.focus();
}

/* ------------------------------------------------------------
   12. PROJECT ASSISTANCE → WHATSAPP
   Guided one-choice-at-a-time enquiry. No AI, backend, database or typing.
------------------------------------------------------------ */
const MAITRA_WHATSAPP_NUMBER = '918446853660';
const consultState = {};
let consultStepIndex = 0;
const consultStepNames = ['topic', 'projectType', 'stage', 'capacity', 'location'];
const consultSteps = [...document.querySelectorAll('.consult-step')];
const consultProgress = [...document.querySelectorAll('.project-assist-progress span')];
const consultReview = document.querySelector('[data-review]');
const consultSummary = $('#consultSummary');

function renderConsultStep(index) {
  consultStepIndex = index;
  consultSteps.forEach((step, i) => {
    const active = i === index;
    step.hidden = !active;
    step.classList.toggle('is-active', active);
    let nav = step.querySelector('.consult-step-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'consult-step-nav';
      step.appendChild(nav);
    }
    nav.innerHTML = i > 0
      ? `<button class="consult-back-btn" type="button" data-consult-back="${i - 1}">← Back</button>`
      : '';
  });
  if (consultReview) consultReview.hidden = true;
  consultProgress.forEach((bar, i) => bar.classList.toggle('is-active', i <= index));
  $('#formNote').textContent = '';
  requestAnimationFrame(() => {
    const first = consultSteps[index]?.querySelector('.choice-button');
    if (first) first.focus();
  });
}

function renderConsultReview() {
  consultSteps.forEach(step => { step.hidden = true; step.classList.remove('is-active'); });
  if (consultReview) {
    consultReview.hidden = false;
    consultReview.classList.add('is-active');
  }
  consultProgress.forEach(bar => bar.classList.add('is-active'));
  if (consultSummary) {
    const labels = {
      topic: 'Service',
      projectType: 'Project Type',
      stage: 'Project Stage',
      capacity: 'Approx. Capacity',
      location: 'Project Location'
    };
    consultSummary.innerHTML = consultStepNames.map(key => `
      <div class="consult-summary-row">
        <span>${esc(labels[key])}</span>
        <span>${esc(consultState[key] || '')}</span>
      </div>`).join('');
  }
  requestAnimationFrame(() => $('#sendConsultWhatsapp')?.focus());
}

function resetConsult() {
  Object.keys(consultState).forEach(key => delete consultState[key]);
  renderConsultStep(0);
}

function openConsult() {
  lastFocused = document.activeElement;
  consultShell.hidden = false;
  consultShell.setAttribute('aria-hidden', 'false');
  resetConsult();
  syncScrollLock();
}

consultShell?.addEventListener('click', (e) => {
  const choice = e.target.closest('.choice-button');
  if (choice) {
    const group = choice.dataset.group;
    consultState[group] = choice.dataset.value;
    const next = consultStepIndex + 1;
    if (next < consultSteps.length) renderConsultStep(next);
    else renderConsultReview();
    return;
  }

  if (e.target.closest('#sendConsultWhatsapp')) {
    const lines = [
      'Hello Maitra Solar Solutions,',
      '',
      'I would like to discuss a solar project.',
      '',
      'PROJECT ASSISTANCE',
      `Service Required: ${consultState.topic}`,
      `Project Type: ${consultState.projectType}`,
      `Project Stage: ${consultState.stage}`,
      `Approx. Capacity: ${consultState.capacity}`,
      `Project Location: ${consultState.location}`,
      '',
      'Please contact me regarding this requirement.',
      '',
      'Sent through the Maitra Solar Solutions website.'
    ];
    const whatsappUrl = `https://wa.me/${MAITRA_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    $('#formNote').textContent = 'Opening WhatsApp with your project enquiry…';
    showToast('Preparing your project enquiry for WhatsApp…');
    window.location.href = whatsappUrl;
  }

  if (e.target.closest('[data-consult-back]')) {
    const target = Number(e.target.closest('[data-consult-back]').getAttribute('data-consult-back'));
    if (Number.isFinite(target)) {
      consultStepNames.slice(target + 1).forEach(key => delete consultState[key]);
      renderConsultStep(target);
    }
    return;
  }

  if (e.target.closest('[data-consult-review-back]')) {
    delete consultState.location;
    renderConsultStep(consultSteps.length - 1);
    return;
  }

  if (e.target.closest('#restartConsult')) resetConsult();
});

/* ------------------------------------------------------------
   13. VIDEO FALLBACK
------------------------------------------------------------ */
function initHeroVideo() {
  const hero = $('#hero');
  const video = $('.hero-video', hero);
  if (!video) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const usePoster = () => { hero.classList.remove('is-playing'); hero.classList.add('is-fallback'); };

  if (prefersReduced) {
    usePoster();
    return;
  }

  video.addEventListener('error', usePoster, { once: true });
  video.addEventListener('playing', () => { clearTimeout(initHeroVideo._t); hero.classList.add('is-playing'); hero.classList.remove('is-fallback'); }, { once: true });
  video.addEventListener('stalled', () => {
    clearTimeout(initHeroVideo._t);
    initHeroVideo._t = setTimeout(() => {
      if (video.readyState < 2) usePoster();
    }, 3500);
  }, { once: true });
  video.play().then(() => { hero.classList.add('is-playing'); }).catch(usePoster);
}

/* ------------------------------------------------------------
   14. REVEAL ON SCROLL
------------------------------------------------------------ */
function initReveals() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in-view');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

function initFlowActivation() {
  const pipeline = $('#lifecycleFlow');
  if (!pipeline || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        pipeline.classList.add('is-active');
        $$('.flow-node', pipeline).forEach((n, i) => {
          setTimeout(() => n.classList.add('is-live'), i * 140);
        });
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.35 });
  io.observe(pipeline);
}

/* ------------------------------------------------------------
   15. KEYBOARD SUPPORT
------------------------------------------------------------ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!lightboxEl.hidden) closeLightbox();
    else if (!consultShell.hidden) closeModal(consultShell);
    else if (!modalShell.hidden) closeModal(modalShell);
    else if (!panelShell.hidden) closePanel();
    return;
  }
  if (!lightboxEl.hidden && e.key === 'ArrowRight') {
    lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
    showLightboxImage();
    return;
  }
  if (!lightboxEl.hidden && e.key === 'ArrowLeft') {
    lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    showLightboxImage();
    return;
  }
  /* Enter / Space on interactive cards */
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.epc-stage, .om-item, .dd-zone, .g-item, [data-om-detail]')) {
    e.preventDefault();
    e.target.click();
  }
});

$('.lightbox-next', lightboxEl).addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
  showLightboxImage();
});
$('.lightbox-prev', lightboxEl).addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
  showLightboxImage();
});

/* ------------------------------------------------------------
   16. INIT
------------------------------------------------------------ */
function init() {
  $('#year').textContent = new Date().getFullYear();
  renderCapabilities();
  renderFilters();
  renderLifecycleFlow();
  renderGallery($('#projectGrid'));
  renderTeam();
initLeadershipStory();
initOMMaintenanceVideo();
  initHeroVideo();
  initReveals();
  initFlowActivation();
  setGalleryFilter('all');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}