/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (FIXED)
======================================================= */

document.addEventListener("DOMContentLoaded", function(){

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(menuBtn && drawer && overlay){

    menuBtn.onclick = function(){
      drawer.classList.toggle("active");
      overlay.classList.toggle("active");
    };

    overlay.onclick = function(){
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    };

    document.querySelectorAll("#drawer a").forEach(link=>{
      link.addEventListener("click", function(){
        drawer.classList.remove("active");
        overlay.classList.remove("active");
      });
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