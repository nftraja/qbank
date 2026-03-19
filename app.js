/* =======================================================
   QBANK – FINAL UNIVERSAL APP SCRIPT (FINAL STABLE FIXED)
======================================================= */

document.addEventListener("DOMContentLoaded", function(){

  /* =========================
     DRAWER SYSTEM
  ========================== */

  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const backBtn = document.getElementById("drawerBack");

  if(menuBtn && drawer && overlay){

    function openDrawer(){
      drawer.classList.add("active");
      overlay.classList.add("active");

      // ❌ BODY SCROLL LOCK REMOVED (MAIN FIX)
      // document.body.style.overflow = "hidden";

      drawer.scrollTop = 0;
    }

    function closeDrawer(){
      drawer.classList.remove("active");
      overlay.classList.remove("active");

      // ❌ BODY SCROLL UNLOCK REMOVED
      // document.body.style.overflow = "";
    }

    /* MENU BUTTON */
    menuBtn.addEventListener("click", function(e){
      e.stopPropagation();
      drawer.classList.contains("active") ? closeDrawer() : openDrawer();
    });

    /* OVERLAY CLICK */
    overlay.addEventListener("click", closeDrawer);

    /* BACK BUTTON */
    if(backBtn){
      backBtn.addEventListener("click", function(e){
        e.preventDefault();
        closeDrawer();

        setTimeout(()=>{
          if(history.length > 1){
            history.back();
          } else {
            location.href = "/";
          }
        }, 120);
      });
    }

    /* CLOSE ON LINK CLICK (EXCEPT BACK) */
    drawer.querySelectorAll("a").forEach(a=>{
      if(a.id !== "drawerBack"){
        a.addEventListener("click", closeDrawer);
      }
    });

  }

  /* =========================
     ACTIVE BOTTOM NAV
  ========================== */

  const bottomItems = document.querySelectorAll(".bottom-item");
  const currentPath = window.location.pathname;

  bottomItems.forEach(item => {
    const href = item.getAttribute("href");

    if(href === "/" && currentPath === "/"){
      item.classList.add("active");
    }
    else if(href !== "/" && currentPath.includes(href)){
      item.classList.add("active");
    }
  });

  /* =========================
     EXTERNAL LINK SAFETY
  ========================== */

  document.querySelectorAll("a[target='_blank']")
    .forEach(link => link.setAttribute("rel", "noopener noreferrer"));

  /* =========================
     JSON LOADER (SAFE)
  ========================== */

  const dataContainer = document.getElementById("dataContainer");

  if(dataContainer){

    const jsonFile = dataContainer.dataset.json;

    if(jsonFile){

      fetch(jsonFile, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {

          if(!Array.isArray(data)) return;

          dataContainer.innerHTML = "";

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

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

document.addEventListener("dblclick", function (e) {
  e.preventDefault();
});