import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="TU_SITE_KEY_AQUI">
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
