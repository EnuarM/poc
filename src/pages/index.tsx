import { GetServerSideProps } from "next";
import { User } from "@/types/user.interface";
import { Country } from "@/types/country.interface";
import { service } from "@/services/prefetchService";
import dynamic from "next/dynamic";

const ClientHome = dynamic(() => import("@/components/Home/ClientHome"), {
  ssr: false,
  loading: () => (
    <div>Cargando formulario...</div>
  ),
});

interface HomeProps {
  user: User | null;
  countries: Country[];
  error?: string;
}

export default function Home({ user, countries }: HomeProps) {
  return <ClientHome user={user} countries={countries} />;
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