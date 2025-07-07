import { Controller, useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import { Country } from "@/types/country.interface";
import { User } from "@/types/user.interface";
import { useFormHandlers } from "./hooks/useFormHandlers";

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
  const { onSubmit, handleBack, isSubmitting, isRecaptchaReady } =
    useFormHandlers();

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
          onClick={handleBack}
        >
          Volver
        </button>
        <button type="submit" className={styles.nextButton} disabled={isSubmitting || !isRecaptchaReady}>
          Siguiente
        </button>
      </div>
    </form>
  );
};
