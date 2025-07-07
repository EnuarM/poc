import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
          required: t('form.fields.name.required'),
          minLength: {
            value: 3,
            message: t('form.fields.name.minLength'),
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
            placeholder={t('form.fields.name.placeholder')}
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
            <option value="">{t('form.fields.country.placeholder')}</option>
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
          required: t('form.fields.address.required'),
          minLength: {
            value: 5,
            message: t('form.fields.address.minLength'),
          },
        }}
        render={({ field }) => (
          <input
            value={field.value}
            placeholder={t('form.fields.address.placeholder')}
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
          {t('form.buttons.back')}
        </button>
        <button
          type="submit"
          className={styles.nextButton}
          disabled={isSubmitting || !isRecaptchaReady || !isValid}
        >
          {t('form.buttons.next')}
        </button>
      </div>
    </form>
  );
};
