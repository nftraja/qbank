/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (FINAL STABLE)
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

      // repaint fix
      drawer.style.display = "none";
      drawer.offsetHeight;
      drawer.style.display = "";

      // scroll reset
      drawer.scrollTop = 0;
    }

    function closeDrawer(){
      drawer.classList.remove("active");
      overlay.classList.remove("active");
    }

    // MENU BUTTON
    menuBtn.addEventListener("click", function(e){
      e.stopPropagation();

      if(drawer.classList.contains("active")){
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // OVERLAY CLICK
    overlay.addEventListener("click", closeDrawer);

    // BACK BUTTON
    const backBtn = document.getElementById("drawerBack");
    if(backBtn){
      backBtn.addEventListener("click", function(e){
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
     JSON LOADER (FIXED)
  ========================== */

  const dataContainer = document.getElementById("dataContainer");

  if(dataContainer){

    const jsonFile = dataContainer.dataset.json;

    if(jsonFile){

      fetch(jsonFile, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {

          if(!Array.isArray(data)) return;

          // ❌ पुराना innerHTML remove
          dataContainer.innerHTML = "";

          // ✅ safe render (no DOM break)
          data.forEach(item => {

            const card = document.createElement("div");
            card.className = "list-card";

            const title = document.createElement("div");
            title.className = "list-title";
            title.textContent = item.name;

            const desc = document.createElement("div");
            desc.className = "list-desc";
            desc.textContent = item.description;

            const btn = document.createElement("a");
            btn.href = item.link;
            btn.target = "_blank";
            btn.className = "btn";
            btn.textContent = "Visit";

            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(btn);

            dataContainer.appendChild(card);

          });

        })
        .catch(err => console.error("JSON load error:", err));

    }

  }

});

/* =========================
   BACK/FORWARD CACHE FIX
========================== */

window.addEventListener("pageshow", function(event){
  if(event.persisted){
    window.location.reload();
  }
});