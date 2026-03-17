/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (STABLE FINAL)
======================================================= */

document.addEventListener("DOMContentLoaded", function(){

  /* =========================
     DRAWER SYSTEM (STABLE)
  ========================== */

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(menuBtn && drawer && overlay){

    function openDrawer(){
      drawer.classList.add("active");
      overlay.classList.add("active");

      // 🔥 repaint fix
      requestAnimationFrame(()=>{
        drawer.style.transform = "translateZ(0)";
      });
    }

    function closeDrawer(){
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }

    menuBtn.addEventListener("click", function(e){
      e.stopPropagation();

      if(drawer.classList.contains("active")){
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    overlay.addEventListener("click", closeDrawer);

    // SAFE BACK BUTTON
    const back = drawer.querySelector("a[href*='history.back']");
    if(back){
      back.addEventListener("click", function(e){
        e.preventDefault();
        closeDrawer();

        if(history.length > 1){
          history.back();
        } else {
          location.href = "/";
        }
      });
    }

    // CLOSE ON LINK CLICK
    drawer.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", closeDrawer);
    });

  }

  /* =========================
     ACTIVE BOTTOM NAV
  ========================== */

  const bottomItems = document.querySelectorAll(".bottom-item");
  const currentPath = window.location.pathname;

  bottomItems.forEach(item => {
    const linkPath = item.getAttribute("href");
    if(linkPath === currentPath){
      item.classList.add("active");
    }
  });

  /* =========================
     EXTERNAL LINK SAFETY
  ========================== */

  document.querySelectorAll("a[target='_blank']")
    .forEach(link => link.setAttribute("rel", "noopener noreferrer"));

  /* =========================
     JSON LOADER
  ========================== */

  const dataContainer = document.getElementById("dataContainer");

  if(dataContainer){
    const jsonFile = dataContainer.dataset.json;

    if(jsonFile){
      fetch(jsonFile, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {

          if(!Array.isArray(data)) return;

          dataContainer.innerHTML = data.map(item => `
            <div class="list-card">
              <div class="list-title">${item.name}</div>
              <div class="list-desc">${item.description}</div>
              <a href="${item.link}" target="_blank" class="btn">Visit</a>
            </div>
          `).join("");

        })
        .catch(err => console.error("JSON load error:", err));
    }
  }

});

/* =========================
   SERVICE WORKER
========================== */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker Registered"))
      .catch(err => console.log("SW Failed:", err));
  });
}

  /* =========================
     ACTIVE BOTTOM NAV
  ========================== */

  const bottomItems = document.querySelectorAll(".bottom-item");
  const currentPath = window.location.pathname;

  bottomItems.forEach(item => {
    const linkPath = item.getAttribute("href");
    if(linkPath === currentPath){
      item.classList.add("active");
    }
  });

  /* =========================
     EXTERNAL LINK SAFETY
  ========================== */

  const externalLinks = document.querySelectorAll("a[target='_blank']");
  externalLinks.forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* =========================
     JSON LOADER
  ========================== */

  const dataContainer = document.getElementById("dataContainer");

  if(dataContainer){

    const jsonFile = dataContainer.dataset.json;

    if(jsonFile){

      fetch(jsonFile, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {

          if(!Array.isArray(data)) return;

          dataContainer.innerHTML = data.map(item => `
            <div class="list-card">
              <div class="list-title">${item.name}</div>
              <div class="list-desc">${item.description}</div>
              <a href="${item.link}" target="_blank" class="btn">Visit</a>
            </div>
          `).join("");

        })
        .catch(err => {
          console.error("JSON load error:", err);
        });

    }

  }

});

/* =========================
   SERVICE WORKER
========================== */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js")
      .then(function () {
        console.log("QBank Service Worker Registered");
      })
      .catch(function (error) {
        console.log("Service Worker Registration Failed:", error);
      });
  });
}