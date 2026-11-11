const pages = [
  ['index.html', 'Overview', 'CMP'],
  ['requirements.html', 'Requirement summary', 'R'],
  ['architecture.html', 'Architecture L400', 'L4'],
  ['identity.html', 'Keycloak & Entra ID', 'ID'],
  ['saml-lab.html', 'SAML lab (Docker)', 'SML'],
  ['deployment.html', 'Deployment guide', 'CLI'],
  ['lab.html', 'Interactive lab', 'LAB'],
  ['management.html', 'Identity management', 'IAM'],
  ['billing.html', 'Billing & calculator', '$'],
];
const samlPages = [
  ['saml-lab.html', 'Ringkasan & video'],
  ['saml-lab-docker.html', '1 · Docker Compose'],
  ['saml-lab-entra.html', '2 · Entra ID (IdP)'],
  ['saml-lab-keycloak.html', '3 · Keycloak (SP)'],
  ['saml-lab-test.html', '4 · Uji & troubleshooting'],
];
const guideOnly = document.querySelector('meta[name="site-mode"]')?.content === 'saml-guide';
const navPages = guideOnly ? pages.filter(([path]) => path === 'saml-lab.html') : pages;
const filename = location.pathname.split('/').pop() || 'index.html';
const current = guideOnly && filename === 'index.html' ? 'saml-lab.html' : filename;
const samlIndex = samlPages.findIndex(([path]) => path === current);
const section = samlIndex >= 0 ? 'saml-lab.html' : current;
const navState = (path) => (path === current ? 'aria-current="page"' : path === section ? 'aria-current="true"' : '');
const active = (pages.find(([path]) => path === section)?.[1] || 'CMP lab') + (samlIndex > 0 ? ` / ${samlPages[samlIndex][1]}` : '');
document.querySelector('#shell').innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <aside class="sidebar" id="sidebar" aria-label="Primary navigation">
    ${guideOnly ? '<button class="menu-close secondary" aria-controls="sidebar">Tutup menu</button>' : ''}
    <a class="brand" href="index.html"><span class="brand-mark">C</span><span>CMP / Azure<small>IDENTITY FIELD GUIDE</small></span></a>
    <div class="nav-label">Learn & build</div>
    <nav>${navPages.map(([path, label, icon]) => `<a href="${path}" ${navState(path)}><span class="nav-icon" aria-hidden="true">${icon}</span>${label}</a>`).join('')}</nav>
    ${guideOnly
      ? '<div class="region-stamp">Runtime lab<strong>Docker di laptop</strong><code>localhost:3180</code><p class="small">GitHub Pages hanya menyajikan panduan, bukan layanan login.</p></div>'
      : '<div class="region-stamp"><span class="dot"></span>Deployment target<strong>Indonesia Central</strong><code>indonesiacentral</code><p class="small">Lab reference, not a production certification.</p></div>'}
  </aside>`;
const header = document.createElement('header');
header.className = 'topbar';
header.innerHTML = `<button class="menu-toggle secondary" aria-expanded="false" aria-controls="sidebar">Menu</button><span class="crumb">Field guide / ${active}</span><span class="badge">L400 · CMP INTEGRATION</span>${guideOnly ? '<a href="saml-lab-docker.html#run">Jalankan lab &rarr;</a>' : '<a href="management.html">Open management &rarr;</a>'}`;
document.querySelector('.layout').prepend(header);
header.querySelector('button').addEventListener('click', (event) => {
  const open = document.querySelector('#sidebar').classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('.menu-close')?.addEventListener('click', () => {
  document.querySelector('#sidebar').classList.remove('open');
  const toggle = header.querySelector('button');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
});
if (samlIndex >= 0) {
  const main = document.querySelector('#main');
  const subnav = document.createElement('nav');
  subnav.className = 'subnav';
  subnav.setAttribute('aria-label', 'Halaman SAML lab');
  subnav.innerHTML = samlPages.map(([path, label]) => `<a href="${path}" ${path === current ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  main.prepend(subnav);
  const prev = samlPages[samlIndex - 1];
  const next = samlPages[samlIndex + 1];
  const pager = document.createElement('nav');
  pager.className = 'pager';
  pager.setAttribute('aria-label', 'Langkah sebelumnya dan berikutnya');
  pager.innerHTML = (prev ? `<a href="${prev[0]}"><small>&larr; Sebelumnya</small>${prev[1]}</a>` : '<span></span>')
    + (next ? `<a class="next" href="${next[0]}"><small>Berikutnya &rarr;</small>${next[1]}</a>` : '');
  main.append(pager);
}
const footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = guideOnly
  ? 'Panduan statis SAML lab · Screenshot lab 11 November 2026 · <a href="saml-lab-test.html#evidence">Bukti &amp; batas pengujian</a> · <a href="https://github.com/ibranibeny/cmp-saml-lab-guide">Repositori dokumentasi</a>'
  : 'Based on CMP Azure Requirements, issued 16 October 2026 · Research checked 10 November 2026 · <a href="requirements.html#scope">Scope & evidence</a>';
document.querySelector('.layout').append(footer);
document.querySelectorAll('pre').forEach((pre) => {
  const head = document.createElement('div');
  head.className = 'code-head';
  const label = document.createElement('span');
  label.className = 'field-note';
  label.textContent = pre.dataset.label || 'Example — review parameters before running';
  const button = document.createElement('button');
  button.className = 'copy secondary';
  button.textContent = 'Copy';
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.textContent); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select text to copy'; }
  });
  head.append(label, button);
  pre.before(head);
});
