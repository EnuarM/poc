import Image from "next/image";
import styles from "./Home.module.scss";
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
