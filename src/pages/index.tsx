import Head from "next/head";
import { GetServerSideProps } from "next";
import { User } from "@/types/user.interface";
import { Country } from "@/types/country.interface";
import { service } from "@/services/prefetchService";
import dynamic from "next/dynamic";
import { NoJavaScript } from "@/components/NoJavaScript";

const ClientHome = dynamic(() => import("@/components/Home/ClientHome"), {
  ssr: false,
});

interface HomeProps {
  user: User | null;
  countries: Country[];
  error?: string;
}

export default function Home({ user, countries }: HomeProps) {
  return (
    <>
      <Head>
        <title>Mercado Libre</title>
        <meta
          name="description"
          content="Completa tu información en Mercado Libre"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MELI.svg" />
      </Head>
      <ClientHome user={user} countries={countries} />
      <noscript>
        <NoJavaScript />
      </noscript>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    console.log("[SSR] Iniciando carga de datos...");

    const user = await service.getUser();
    const countries = await service.getCountries();

    console.log("[SSR] Datos cargados exitosamente:", {
      user: user.name,
      countriesCount: countries.length,
    });

    return {
      props: {
        user,
        countries,
      },
    };
  } catch (error) {
    console.error("[SSR] Error al cargar datos:", error);
    return {
      props: {
        user: { name: "", address: "", country: "" },
        countries: [
          { name: "Argentina", code: "AR" },
          { name: "Brasil", code: "BR" },
          { name: "Colombia", code: "CO" },
          { name: "México", code: "MX" },
          { name: "Chile", code: "CL" },
        ],
        error: "No se pudieron cargar los datos del servidor",
      },
    };
  }
};
