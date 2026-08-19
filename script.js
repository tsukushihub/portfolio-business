// ハンバーガーメニュー
const hamburger = document.querySelector(".nav__hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// スクロールフェードイン
const targets = document.querySelectorAll(
  ".service-card, .work-card, .about__grid, .contact__lead"
);
targets.forEach((el) => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

targets.forEach((el) => observer.observe(el));

// ローカル確認時は送信エラーを防ぎ、公開後はNetlify Formsへ送信
const contactForm = document.querySelector(".contact-form");
if (contactForm && window.location.protocol === "file:") {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("contact-form-status");
    status.textContent = "フォームは完成しています。公開後、この内容が受信されます。";
  });
}
