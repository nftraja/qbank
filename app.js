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
          info: "National medical entrance exam conducted by NTA.",
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
          info: "Standardized test used for college admissions worldwide.",
          link: "https://satsuite.collegeboard.org"
        }
      ]
    }
  ]
};

function navigate(route) {
  if (route === "home") {
    renderHome();
  } else {
    renderCategory(route);
  }
}

function renderHome() {
  let html = `
    <div class="card">
      <h2>🌍 Global Education Gateway</h2>
      <p>Access structured education ecosystem in one place.</p>
    </div>
  `;

  data.categories.forEach(cat => {
    html += `
      <div class="card" onclick="navigate('${cat.slug}')">
        <h3>${cat.title}</h3>
        <p>Explore official resources and platforms.</p>
      </div>
    `;
  });

  app.innerHTML = html;
}

function renderCategory(slug) {
  const category = data.categories.find(c => c.slug === slug);

  if (!category) {
    renderHome();
    return;
  }

  let html = `
    <div class="card">
      <h2>${category.title}</h2>
      <p>Official structured resources</p>
    </div>
  `;

  category.items.forEach(item => {
    html += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.info}</p>
        <a href="${item.link}" target="_blank" class="button">Visit Official</a>
      </div>
    `;
  });

  app.innerHTML = html;
}

renderHome();