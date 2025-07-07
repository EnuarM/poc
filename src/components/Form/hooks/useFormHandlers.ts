import { useState, useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  address: string;
  country: string;
}

export const useFormHandlers = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  useEffect(() => {
    const checkRecaptcha = () => {
      if (executeRecaptcha) {
        setIsRecaptchaReady(true);
        console.log("✅ reCAPTCHA está listo");
      } else {
        setIsRecaptchaReady(false);
        console.log("⏳ reCAPTCHA no está listo aún");
      }
    };

    checkRecaptcha();
  }, [executeRecaptcha]);

  const onSubmit = useCallback(
    async (formData: FormData) => {
      console.log("👾 ~ data:", formData);
      if (!executeRecaptcha) {
        Swal.fire({
          title: "Error",
          text: "Sistema de seguridad no disponible. Por favor, recarga la página.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        const token = await executeRecaptcha("form_submit");

        const response = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const { data } = await response.json();
        if (!data.success) {
          Swal.fire({
            title: `ReCAPTCHA score: ${data.score}`,
            text: "Error en validación de reCAPTCHA. Por favor, inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        } else {
          Swal.fire({
            title: `ReCAPTCHA score: ${data.score}`,
            text: `Validación exitosa. Datos enviados correctamente.`,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
        }
      } catch (error) {
        console.error("Error al procesar el formulario:", error);
        Swal.fire({
          title: "Error",
          text: "Error al enviar el formulario. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha]
  );

  const handleBack = useCallback(() => {
    Swal.fire({
      title: "Volver",
      text: "Estas intentando volver atrás",
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  }, []);

  return {
    isRecaptchaReady,
    onSubmit,
    handleBack,
    isSubmitting,
  };
};
