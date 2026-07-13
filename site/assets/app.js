(function () {
  const body = document.body;
  const currentPage = body.dataset.page || "home";
  const root = body.dataset.root || "./";

  const pages = [
    { id: "home", label: "首頁", href: "" },
    { id: "quick-start", label: "快速上手", href: "quick-start/" },
    { id: "advanced", label: "進階課程", href: "advanced/" },
    { id: "cases", label: "實戰案例", href: "cases/" },
    { id: "resources", label: "學習資源", href: "resources/" }
  ];

  const sidebars = {
    "quick-start": {
      title: "快速上手",
      items: ["課程導覽", "認識 Codex", "Codex App 介面", "建立第一個專案", "完成第一個任務", "成果檢查與交付"]
    },
    advanced: {
      title: "進階課程",
      items: ["學習路線", "理解陌生 Codebase", "AGENTS.md", "Skills 與 Plugins", "MCP 與外部工具", "權限、沙盒與審批", "可重複的團隊工作流"]
    },
    cases: {
      title: "實戰案例",
      items: ["案例總覽", "素材轉簡報", "Marketing 數據分析", "Codebase 理解", "建立系統架構圖", "驗證與 PR 交付"]
    },
    resources: {
      title: "學習資源",
      items: ["資源總覽", "Prompt 範本", "AGENTS.md 範本", "Skill Starter", "驗收清單", "官方文件", "課後練習"]
    }
  };

  function pageUrl(href) {
    return `${root}${href}`;
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    const links = pages.map((page) => {
      const current = page.id === currentPage ? ' aria-current="page"' : "";
      return `<a href="${pageUrl(page.href)}"${current}>${page.label}</a>`;
    }).join("");

    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="${pageUrl("")}" aria-label="Codex 學習中心首頁">
          <span class="brand-mark" aria-hidden="true">C</span>
          <span class="brand-text">Codex <span>學習中心</span></span>
        </a>
        <nav class="top-nav" id="top-navigation" aria-label="主要導覽">${links}</nav>
        <button class="menu-button" type="button" aria-label="開啟導覽選單" aria-controls="top-navigation" aria-expanded="false">
          <span class="menu-lines" aria-hidden="true"></span>
        </button>
      </div>`;
  }

  function renderSidebar() {
    const sidebar = document.querySelector("[data-docs-sidebar]");
    const config = sidebars[currentPage];
    if (!sidebar || !config) return;

    const activeIndex = Math.max(0, config.items.findIndex((_, index) => window.location.hash === `#unit-${index + 1}`));
    const links = config.items.map((item, index) => {
      const current = index === activeIndex ? ' aria-current="location"' : "";
      return `<a href="#unit-${index + 1}" data-unit-index="${index}"${current}>${item}</a>`;
    }).join("");

    sidebar.innerHTML = `
      <p class="sidebar-title">${config.title}</p>
      <nav class="sidebar-nav" aria-label="${config.title}目錄">${links}</nav>
      <p class="sidebar-note">這裡是共用目錄骨架。新增教材時，可直接調整 <strong>assets/app.js</strong> 的項目。</p>`;

    const title = document.querySelector("[data-placeholder-title]");
    if (title) title.textContent = `${config.items[activeIndex]} · 教材準備中`;
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-inner">
        <span><strong>Codex 學習中心</strong> · 團隊共編教材</span>
        <span>內容持續更新中</span>
      </div>`;
  }

  function closeMenus() {
    body.classList.remove("menu-open", "sidebar-open");
    const menuButton = document.querySelector(".menu-button");
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "開啟導覽選單");
    }
    const sidebarButton = document.querySelector(".sidebar-button");
    if (sidebarButton) sidebarButton.setAttribute("aria-expanded", "false");
  }

  renderHeader();
  renderSidebar();
  renderFooter();

  const menuButton = document.querySelector(".menu-button");
  const sidebarButton = document.querySelector(".sidebar-button");
  const sidebarNav = document.querySelector(".sidebar-nav");
  const overlay = document.querySelector(".mobile-overlay");

  menuButton?.addEventListener("click", () => {
    const nextOpen = !body.classList.contains("menu-open");
    closeMenus();
    body.classList.toggle("menu-open", nextOpen);
    menuButton.setAttribute("aria-expanded", String(nextOpen));
    menuButton.setAttribute("aria-label", nextOpen ? "關閉導覽選單" : "開啟導覽選單");
  });

  sidebarButton?.addEventListener("click", () => {
    const nextOpen = !body.classList.contains("sidebar-open");
    closeMenus();
    body.classList.toggle("sidebar-open", nextOpen);
    sidebarButton.setAttribute("aria-expanded", String(nextOpen));
  });

  sidebarNav?.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-unit-index]");
    const config = sidebars[currentPage];
    if (!link || !config) return;

    sidebarNav.querySelectorAll("a").forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "location");
    const title = document.querySelector("[data-placeholder-title]");
    if (title) title.textContent = `${config.items[Number(link.dataset.unitIndex)]} · 教材準備中`;
    closeMenus();
  });

  overlay?.addEventListener("click", closeMenus);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenus();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenus();
  });
})();
