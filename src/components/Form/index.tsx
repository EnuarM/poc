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
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      address: user.address,
      country: user.country,
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const { onSubmit, handleBack, isSubmitting, isRecaptchaReady } =
    useFormHandlers();

  return (
    <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
          },
        }}
        render={({ field }) => (
          <input
            value={field.value}
            onChange={(e) => {
              const value = e.target.value;
              const onlyLetters = value.replace(
                /[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g,
                ""
              );
              field.onChange(onlyLetters);
            }}
            placeholder="Nombre completo"
            className={styles.input}
          />
        )}
      />
      <div className={styles.errorMessage}>{errors.name?.message}</div>
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
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 5,
            message: "La dirección debe tener al menos 5 caracteres",
          },
        }}
        render={({ field }) => (
          <input
            value={field.value}
            placeholder="Dirección"
            className={styles.input}
            onChange={(e) => {
              const value = e.target.value;
              const onlyLettersAndNumbers = value.replace(
                /[^a-zA-ZÀ-ÿ\u00f1\u00d10-9#-\s]/g,
                ""
              );
              field.onChange(onlyLettersAndNumbers);
            }}
          />
        )}
      />
      <div className={styles.errorMessage}>{errors.address?.message}</div>
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          className={styles.goBackButton}
          onClick={handleBack}
        >
          Volver
        </button>
        <button
          type="submit"
          className={styles.nextButton}
          disabled={isSubmitting || !isRecaptchaReady || !isValid}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
