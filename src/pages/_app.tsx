import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "@/lib/i18n";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHAKEY || ""}>
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
