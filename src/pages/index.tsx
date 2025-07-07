import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { Form } from "@/components/Form";
import { GetServerSideProps } from "next";
import { User } from "@/types/user.interface";
import { Country } from "@/types/country.interface";
import { service } from "@/services/service";
import { useMemo } from "react";

interface HomeProps {
  user: User;
  countries: Country[];
}
export default function Home({ user, countries }: HomeProps) {
  const dataUser = useMemo(() => {
    return user || { name: "", address: "", country: "" };
  }, [user]);

  return (
    <>
      <Head>
        <title>Confirmación de datos</title>
        <meta name="description" content="Confirmation page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/MELI.svg" />
      </Head>
      <main>
        <header className={styles.header}>
          <Image
            src="/MELI.svg"
            alt="Mercado Libre logo"
            width={120}
            height={40}
            priority
          />
        </header>
        <div>
          <div className={styles.mainContainer}>
            <h1 className={styles.title}>
              Estamos casi listos...
              <br />
              Actualiza tus datos de contacto
            </h1>
            <Form user={dataUser} countries={countries} />
          </div>
        </div>
      </main>
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
