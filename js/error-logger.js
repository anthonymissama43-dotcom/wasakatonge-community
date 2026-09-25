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
