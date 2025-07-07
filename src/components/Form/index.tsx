import { Controller, useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import { Country } from "@/types/country.interface";
import { User } from "@/types/user.interface";
import Swal from "sweetalert2";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface FormData {
  name: string;
  address: string;
  country: string;
}

interface FormProps {
  user: User;
  countries: Country[];
}

export const Form = ({ user, countries }: FormProps) => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      address: user.address,
      country: user.country,
    },
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = (data: FormData) => {
    if (!executeRecaptcha) {
      console.log("reCAPTCHA no está disponible");
      return;
    }
    console.log("📝 Datos del formulario:", data);
  };

  const onBackButton = () => {
    Swal.fire({
      title: "Volver",
      text: "Estas intentando volver atrás",
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Nombre completo"
            className={styles.input}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <select {...field} className={styles.input}>
            <option value="">Selecciona tu país</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <input {...field} placeholder="Dirección" className={styles.input} />
        )}
      />
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          className={styles.goBackButton}
          onClick={onBackButton}
        >
          Volver
        </button>
        <button type="submit" className={styles.nextButton}>
          Siguiente
        </button>
      </div>
    </form>
  );
};
