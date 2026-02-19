const app = document.getElementById("app");

function setActiveNav(page) {
  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.remove("active");
  });
  const active = document.getElementById("nav-" + page);
  if (active) active.classList.add("active");
}

window.navigate = function (page) {
  history.pushState({}, "", "#" + page);
  render(page);
};

window.onpopstate = function () {
  render(location.hash.replace("#", "") || "home");
};

function render(page) {
  setActiveNav(page);

  switch (page) {
    case "categories":
      app.innerHTML = categoriesPage();
      break;
    case "exams":
      app.innerHTML = examsPage();
      break;
    case "uni":
      app.innerHTML = uniPage();
      break;
    case "global":
      app.innerHTML = globalPage();
      break;
    default:
      app.innerHTML = homePage();
  }
}

function card(title, desc) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>
  `;
}

function homePage() {
  return `
    <section class="section">
      <h2>🌐 Global Education Gateway</h2>
      ${card("Competitive Exams", "All major global entrance exams.")}
      ${card("Universities", "Global universities & official portals.")}
      ${card("Scholarships", "Verified funding & grants.")}
      ${card("Research", "Global research institutions.")}
    </section>
  `;
}

function categoriesPage() {
  return `
    <section class="section">
      <h2>📂 QBank Categories</h2>
      ${card("Engineering", "All engineering boards & exams.")}
      ${card("Medical", "Medical councils & tests.")}
      ${card("AI", "Artificial Intelligence learning & resources.")}
      ${card("Finance", "Finance & Economics portals.")}
      ${card("Law", "Judiciary & law boards.")}
    </section>
  `;
}

function examsPage() {
  return `
    <section class="section">
      <h2>📝 Competitive Exams</h2>
      ${card("SAT", "Official SAT resources.")}
      ${card("GRE", "Graduate Record Exam details.")}
      ${card("IELTS", "English proficiency test.")}
    </section>
  `;
}

function uniPage() {
  return `
    <section class="section">
      <h2>🎓 Universities</h2>
      ${card("USA Universities", "Top US institutions.")}
      ${card("UK Universities", "Top UK institutions.")}
      ${card("Indian Universities", "UGC approved universities.")}
    </section>
  `;
}

function globalPage() {
  return `
    <section class="section">
      <h2>🌍 Global Access</h2>
      ${card("Government Portals", "Official exam boards.")}
      ${card("Accreditation Bodies", "AICTE, NAAC, global councils.")}
      ${card("Study Abroad", "International education gateways.")}
    </section>
  `;
}

render(location.hash.replace("#", "") || "home");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}