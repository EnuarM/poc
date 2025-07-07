/* eslint-disable react/no-unescaped-entities */
import styles from "./NoJavaScript.module.scss";

export const NoJavaScript = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>JavaScript está deshabilitado</h1>

        <p className={styles.description}>
          Para usar esta aplicación necesitas habilitar JavaScript en tu
          navegador. Esta página usa funciones interactivas que requieren
          JavaScript para funcionar correctamente.
        </p>

        <div className={styles.instructions}>
          <h2>¿Cómo habilitar JavaScript?</h2>

          <div className={styles.browserInstructions}>
            <details className={styles.accordion}>
              <summary>Google Chrome</summary>
              <ol>
                <li>
                  Haz clic en el menú de Chrome (⋮) en la esquina superior
                  derecha
                </li>
                <li>Selecciona "Configuración"</li>
                <li>Haz clic en "Privacidad y seguridad"</li>
                <li>Selecciona "Configuración de sitios"</li>
                <li>Haz clic en "JavaScript"</li>
                <li>Selecciona "Los sitios pueden usar JavaScript"</li>
              </ol>
            </details>

            <details className={styles.accordion}>
              <summary>Mozilla Firefox</summary>
              <ol>
                <li>Escribe "about:config" en la barra de direcciones</li>
                <li>Haz clic en "Acepto el riesgo"</li>
                <li>Busca "javascript.enabled"</li>
                <li>Cambia el valor a "true"</li>
              </ol>
            </details>

            <details className={styles.accordion}>
              <summary>Safari</summary>
              <ol>
                <li>Ve a Safari → Preferencias</li>
                <li>Haz clic en la pestaña "Seguridad"</li>
                <li>Marca la casilla "Activar JavaScript"</li>
              </ol>
            </details>

            <details className={styles.accordion}>
              <summary>Microsoft Edge</summary>
              <ol>
                <li>Haz clic en el menú (⋯) en la esquina superior derecha</li>
                <li>Selecciona "Configuración"</li>
                <li>Haz clic en "Configuración avanzada"</li>
                <li>En "Permisos del sitio web", haz clic en "JavaScript"</li>
                <li>Activa "Permitido"</li>
              </ol>
            </details>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            🔄 Recargar página
          </button>

          <a
            href="https://www.enable-javascript.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.helpLink}
          >
            📚 Más ayuda
          </a>
        </div>
      </div>
    </div>
  );
};
