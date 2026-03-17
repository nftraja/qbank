/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (CLEAN)
======================================================= */

document.addEventListener("DOMContentLoaded", function(){

  /* =========================
     DRAWER SYSTEM
  ========================== */

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(menuBtn && drawer && overlay){

    function openDrawer(){
      drawer.classList.add("active");
      overlay.classList.add("active");

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
    if(item.getAttribute("href") === currentPath){
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