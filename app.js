/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (LOCKED)
   Works across all 30 pages without breaking anything
======================================================= */

<script>
document.addEventListener("DOMContentLoaded", function(){

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(menuBtn && drawer && overlay){

    // TOGGLE DRAWER
    menuBtn.onclick = function(){
      drawer.classList.toggle("active");
      overlay.classList.toggle("active");
    };

    // CLOSE ON OVERLAY
    overlay.onclick = function(){
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    };

    // CLOSE DRAWER ON LINK CLICK (optional UX fix)
    document.querySelectorAll("#drawer a").forEach(link=>{
      link.addEventListener("click", function(){
        drawer.classList.remove("active");
        overlay.classList.remove("active");
      });
    });

  }

});
</script>

  /* =========================
     ACTIVE BOTTOM NAV AUTO DETECT
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
     SAFE EXTERNAL LINK HANDLING
  ========================== */

  const externalLinks = document.querySelectorAll("a[target='_blank']");
  externalLinks.forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
  });


  /* =========================
     FUTURE JSON READY (SAFE PLACEHOLDER)
     (No execution until JSON page uses it)
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


/* =======================================================
   SERVICE WORKER (SAFE REGISTER – NO BREAK)
======================================================= */

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