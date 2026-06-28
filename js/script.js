/* ==========================================
   ConvertToPDF.in
   Main JavaScript
   Version 2.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();

    initializeSmoothScroll();

    initializeToolCards();

    initializeCounterAnimation();

});

/* ==========================================
   SEARCH
========================================== */

function initializeSearch() {

    const input = document.querySelector(".hero-search input");

    const cards = document.querySelectorAll(".card");

    if (!input) return;

    input.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/* ==========================================
   TOOL CARD EFFECT
========================================== */

function initializeToolCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

function initializeSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}

/* ==========================================
   STATS COUNTER
========================================== */

function initializeCounterAnimation() {

    const counters = document.querySelectorAll(".counter");

    if (counters.length === 0) return;

    counters.forEach(counter => {

        counter.innerText = "0";

        const target = Number(counter.dataset.target);

        const speed = 100;

        function updateCounter() {

            const current = Number(counter.innerText);

            const increment = Math.ceil(target / speed);

            if (current < target) {

                counter.innerText = current + increment;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target.toLocaleString();

            }

        }

        updateCounter();

    });

}

/* ==========================================
   SHOW MESSAGE
========================================== */

function showMessage(message, type = "success") {

    let box = document.getElementById("message-box");

    if (!box) {

        box = document.createElement("div");

        box.id = "message-box";

        box.style.position = "fixed";
        box.style.bottom = "25px";
        box.style.right = "25px";
        box.style.padding = "15px 20px";
        box.style.borderRadius = "10px";
        box.style.color = "#fff";
        box.style.fontWeight = "bold";
        box.style.zIndex = "99999";

        document.body.appendChild(box);

    }

    box.style.background = type === "success"
        ? "#16a34a"
        : "#dc2626";

    box.innerText = message;

    box.style.display = "block";

    setTimeout(() => {

        box.style.display = "none";

    }, 3000);

}

/* ==========================================
   LOADER
========================================== */

function showLoader(button) {

    if (!button) return;

    button.dataset.original = button.innerHTML;

    button.disabled = true;

    button.innerHTML = "Processing...";

}

function hideLoader(button) {

    if (!button) return;

    button.disabled = false;

    button.innerHTML = button.dataset.original;

}

/* ==========================================
   DOWNLOAD PDF
========================================== */

function downloadPDF(bytes, filename) {

    const blob = new Blob([bytes], {

        type: "application/pdf"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

}

/* ==========================================
   FUTURE FEATURES
========================================== */

// Dark Mode

// OCR

// PDF to Word

// Word to PDF

// Excel to PDF

// PowerPoint to PDF

// Unlock PDF

// Protect PDF

// Watermark PDF

// Batch Compression

// Image Converter

// QR Generator

// Barcode Generator

// Government Form Utilities

// AI PDF Summarizer

console.log("ConvertToPDF.in loaded successfully.");
