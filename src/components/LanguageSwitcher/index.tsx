import dynamic from 'next/dynamic'
import styles from './LanguageSwitcher.module.scss'

const ClientLanguageSwitcher = dynamic(
  () => import('./ClientLanguageSwitcher'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.languageSwitcher}>
        <button className={`${styles.button} ${styles.active}`}>ES</button>
        <button className={styles.button}>PT</button>
      </div>
    )
  }
)

export const LanguageSwitcher = () => {
  return <ClientLanguageSwitcher />
}