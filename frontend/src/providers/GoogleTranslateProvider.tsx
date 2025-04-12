// components/GoogleTranslateProvider.jsx
import { useEffect } from "react";

const GoogleTranslateProvider = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // Default language
            includedLanguages: "en,ig,yo,ha", // Allowed translations
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          "google_translate_element"
        );
      };

      // Remove previously saved Google Translate cookies to avoid auto-redirect
      document.cookie = "googtrans=/en/en;path=/";
      document.cookie = "googtrans=/en/en"; // Always default to English on load
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 9999,
        background: "#3c0c8c",
        padding: 8,
        borderRadius: "4px",
      }}
    />
  );
};

export default GoogleTranslateProvider;
