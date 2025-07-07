import { useTranslation } from 'react-i18next'
import { SupportedLanguages } from '@/locales'
import styles from './LanguageSwitcher.module.scss'

const ClientLanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: SupportedLanguages) => {
    i18n.changeLanguage(language)
  }

  const currentLanguage = i18n.language as SupportedLanguages

  return (
    <div className={styles.languageSwitcher}>
      <button 
        onClick={() => changeLanguage('es')}
        className={`${styles.button} ${currentLanguage === 'es' ? styles.active : ''}`}
      >
        ES
      </button>
      <button 
        onClick={() => changeLanguage('pt')}
        className={`${styles.button} ${currentLanguage === 'pt' ? styles.active : ''}`}
      >
        PT
      </button>
    </div>
  )
}

export default ClientLanguageSwitcher
