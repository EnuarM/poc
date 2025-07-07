import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { Form } from "@/components/Form";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { User } from "@/types/user.interface";
import { Country } from "@/types/country.interface";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ClientHomeProps {
  user: User | null;
  countries: Country[];
  error?: string;
}

const ClientHome = ({ user, countries }: ClientHomeProps) => {
  const { t } = useTranslation();
  
  const dataUser = useMemo(() => {
    return user || { name: "", address: "", country: "" };
  }, [user]);

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
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
          <LanguageSwitcher />
        </header>
        <div>
          <div className={styles.mainContainer}>
            <h1 className={styles.title}>
              {t('form.title')}
              <br />
              {t('form.subtitle')}
            </h1>
            <Form user={dataUser} countries={countries} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientHome;
