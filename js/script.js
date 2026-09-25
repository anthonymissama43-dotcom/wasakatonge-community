/* =========================================================
   WASAKATONGE COMMUNITY
   Interactive JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 150) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".mindset-card, " +
        ".phase-card, " +
        ".contribution-card, " +
        ".project-placeholder, " +
        ".vision-card, " +
        ".join-card"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       PHASE CARD INTERACTION
    ===================================================== */

    const phaseCards =
        document.querySelectorAll(".phase-card");

    phaseCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            phaseCards.forEach((otherCard) => {

                if (otherCard !== card) {
                    otherCard.style.opacity = "0.58";
                }

            });

        });

        card.addEventListener("mouseleave", () => {

            phaseCards.forEach((otherCard) => {
                otherCard.style.opacity = "";
            });

        });

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       ESCAPE KEY — CLOSE MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });

});

/* =========================================================
   WASAKATONGE — JOIN COMMUNITY MODAL
========================================================= */

(() => {
    const joinButton = document.getElementById("joinCommunityBtn");
    const modal = document.getElementById("communityModal");
    const closeButton = document.getElementById("communityModalClose");
    const form = document.getElementById("communityJoinForm");
    const status = document.getElementById("communityFormStatus");

    if (!joinButton || !modal || !closeButton || !form || !status) {
        return;
    }

    let lastFocusedElement = null;

    const openModal = () => {
        lastFocusedElement = document.activeElement;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("community-modal-open");

        window.setTimeout(() => {
            const firstField = form.querySelector("input, select, textarea");

            if (firstField) {
                firstField.focus();
            }
        }, 50);
    };

    const closeModal = () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("community-modal-open");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    joinButton.addEventListener("click", openModal);

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target.matches("[data-modal-close]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    const successPanel =
        document.getElementById("communitySuccess");

    const successClose =
        document.getElementById("communitySuccessClose");

    const showSuccess = () => {

        modal
            .querySelector(".community-modal-dialog")
            .classList.add("success-mode");

        successPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        successPanel.classList.add("active");

        status.textContent = "";

        window.setTimeout(() => {
            if (successClose) {
                successClose.focus();
            }
        }, 50);
    };

    const resetSuccessState = () => {

        modal
            .querySelector(".community-modal-dialog")
            .classList.remove("success-mode");

        successPanel.classList.remove("active");

        successPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        form.reset();
    };

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitButton =
            form.querySelector(".community-submit");
        const status = document.getElementById("communityFormStatus");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute(
                "aria-busy",
                "true"
            );
            if (status) {
                status.textContent = "Submitting your application...";
                status.style.color = "var(--accent)";
            }
        }

        const formData = {
            name: form.elements.name.value.trim(),
            phone: form.elements.phone.value.trim(),
            email: form.elements.email.value.trim(),
            contribution: form.elements.contribution.value,
            interest: form.elements.interest.value,
            message: form.elements.message.value.trim()
        };

try {
            await fetch("https://script.google.com/macros/s/AKfycbwOGmYiN-JwW-c218GgsECQNIQcD29kY_JnxKv6Uj774zeKFtsZtCP2Gj3ZQU3eRuHn/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            // no-cors mode returns opaque response — assume success if fetch completes
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute(
                    "aria-busy"
                );
            }
            if (status) {
                status.textContent = "";
            }
            showSuccess();
        } catch (error) {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute(
                    "aria-busy"
                );
            }
            if (status) {
                status.textContent = "Failed to submit. Please try again.";
                status.style.color = "#ff6b6b";
            }
            console.error("Form submission error:", error);
            logError(formData, error);
        }

    });

    if (successClose) {

        successClose.addEventListener(
            "click",
            () => {
                resetSuccessState();
                closeModal();
            }
        );

    }
})();

/* =========================================================
   WASAKATONGE — ERROR LOGGING FOR DEVELOPMENT
========================================================= */

const logError = async (formData, error) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        formData: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            contribution: formData.contribution,
            interest: formData.interest,
            message: formData.message.substring(0, 200)
        },
        error: error.toString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };

    try {
        if (!window.location.hostname.includes("wasakatonge")) {
            await fetch("/.logs/submit-error", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logEntry)
            });
        }
    } catch (logError) {
        console.warn("Could not log error:", logError);
    }
};
