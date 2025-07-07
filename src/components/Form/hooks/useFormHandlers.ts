import { useState, useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  address: string;
  country: string;
}

export const useFormHandlers = () => {
  const { t } = useTranslation();
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
          title: t('common.error'),
          text: t('form.messages.securityNotAvailable'),
          icon: "error",
          confirmButtonText: t('common.close'),
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
            text: t('form.messages.recaptchaError'),
            icon: "error",
            confirmButtonText: t('common.close'),
          });
        } else {
          Swal.fire({
            title: `ReCAPTCHA score: ${data.score}`,
            text: t('form.messages.successMessage'),
            icon: "success",
            confirmButtonText: t('common.close'),
          });
        }
      } catch (error) {
        console.error("Error al procesar el formulario:", error);
        Swal.fire({
          title: t('common.error'),
          text: t('form.messages.submitError'),
          icon: "error",
          confirmButtonText: t('common.close'),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, t]
  );

  const handleBack = useCallback(() => {
    Swal.fire({
      title: t('form.buttons.back'),
      text: t('form.messages.backMessage'),
      icon: "info",
      confirmButtonText: t('common.close'),
    });
  }, [t]);

  return {
    isRecaptchaReady,
    onSubmit,
    handleBack,
    isSubmitting,
  };
};
