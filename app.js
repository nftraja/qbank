const app = document.getElementById("app");

const data = {
  categories: [
    {
      slug: "exams",
      title: "Competitive Exams",
      items: [
        {
          name: "JEE Main",
          info: "National engineering entrance exam conducted by NTA.",
          link: "https://jeemain.nta.nic.in"
        },
        {
          name: "NEET",
          info: "National medical entrance examination.",
          link: "https://neet.nta.nic.in"
        }
      ]
    },
    {
      slug: "universities",
      title: "Universities",
      items: [
        {
          name: "IIT Delhi",
          info: "Premier engineering institute in India.",
          link: "https://home.iitd.ac.in"
        }
      ]
    },
    {
      slug: "global",
      title: "Global Access",
      items: [
        {
          name: "SAT",
          info: "Standardized test widely used for college admissions.",
          link: "https://satsuite.collegeboard.org"
        }
      ]
    }
  ]
};

function navigate(route) {
  if (route === "home" || route === "categories") {
    renderHome();
  } else {
    renderCategory(route);
  }
}

function renderHome() {
  app.innerHTML = `
    <div class="card">
      <h2>Global Education Gateway</h2>
      <p>Access structured education ecosystem in one place.</p>
    </div>
    ${data.categories.map(cat => `
      <div class="card" onclick="navigate('${cat.slug}')">
        <h3>${cat.title}</h3>
        <p>Explore ${cat.title}</p>
      </div>
    `).join("")}
  `;
}

function renderCategory(slug) {
  const category = data.categories.find(c => c.slug === slug);
  if (!category) return renderHome();

  app.innerHTML = `
    <div class="card">
      <h2>${category.title}</h2>
      <p>Structured official resources</p>
    </div>
    ${category.items.map(item => `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.info}</p>
        <a class="button" href="${item.link}" target="_blank">Visit Official</a>
      </div>
    `).join("")}
  `;
}

renderHome();