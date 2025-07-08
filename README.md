# Step Review POC - Mercado Libre

Un proyecto de prueba de concepto que implementa un step de revisión optimizado para alta performance utilizando Next.js con estrategia SSR híbrida.

## 🚀 Características

- **SSR Optimizado**: Pre-carga de datos críticos en el servidor
- **Carga Progresiva**: Dynamic imports para componentes no-bloqueantes
- **Seguridad Integrada**: Google reCAPTCHA v3 con validación robusta
- **Internacionalización**: Soporte multi-idioma basado en dominio
- **Responsive Design**: Experiencia optimizada para web y móvil
- **Fallback Sin JavaScript**: Tutorial para usuarios con JS deshabilitado

## 🏗️ Arquitectura

### Estrategia Híbrida SSR + Dynamic Loading

```tsx
// Datos críticos pre-cargados en servidor
export const getServerSideProps: GetServerSideProps = async () => {
  const user = await service.getUser();
  const countries = await service.getCountries();
  return { props: { user, countries } };
};

// Componente interactivo cargado dinámicamente
const ClientHome = dynamic(() => import("@/components/Home/ClientHome"), {
  ssr: false,
});
```
## 📦 Instalación
```
# Clonar repositorio
git clone <repository-url>
cd step-review-poc

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles
```
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
```
## 📝 Estructura del Proyecto
```
src/
├── components/
│   ├── Form/
│   │   ├── index.tsx              # Componente formulario
│   │   ├── Form.module.scss       # Estilos formulario
│   │   └── hooks/
│   │       └── useFormHandlers.ts # Hook reCAPTCHA + validaciones
│   ├── Home/
│   │   ├── ClientHome.tsx         # Componente principal (ssr: false)
│   │   └── Home.module.scss       # Estilos home
│   ├── LanguageSwitcher/
│   │   ├── index.tsx              # Switcher principal
│   │   ├── ClientLanguageSwitcher.tsx # Componente cliente
│   │   └── LanguageSwitcher.module.scss
│   └── NoJavaScript/
│       ├── index.tsx              # Tutorial JS deshabilitado
│       └── NoJavaScript.module.scss
├── lib/
│   └── i18n.ts                    # Configuración i18next
├── locales/
│   ├── index.ts                   # Export locales
│   ├── es/
│   │   └── translation.json       # Traducciones español
│   └── pt/
│       └── translation.json       # Traducciones portugués
├── pages/
│   ├── _app.tsx                   # App wrapper Next.js
│   ├── _document.tsx              # Document HTML Next.js
│   ├── index.tsx                  # Página principal con SSR
│   ├── api/
│   │   └── verify-recaptcha.ts    # API reCAPTCHA validation
│   └── next-step/
│       ├── index.tsx              # Página siguiente paso
│       └── NextStep.module.scss
├── services/
│   ├── prefetchService.ts         # service.getUser() y getCountries()
│   └── recaptchaService.ts        # Servicio reCAPTCHA
├── styles/
│   ├── globals.css                # Estilos globales
│   └── components/
│       └── _variables.scss        # Variables SCSS
└── types/
    ├── user.interface.ts          # Interface User
    └── country.interface.ts       # Interface Country
```

##  📱 Responsive Design

- **Desktop:** Experiencia completa con formulario interactivo
- **Mobile:** Layout optimizado con touch-friendly inputs
- **Tablet:** Adaptación automática de breakpoints

## 🔒 Seguridad
```
- Análisis de comportamiento desde carga del formulario
- Validación de score en servidor antes de procesar datos
```

## 🚫 Soporte para usuarios sin JavaScript
```
- Tutorial paso a paso para habilitar JS
- Instrucciones específicas por navegador
- Enlaces de ayuda externa
```

## 📊 Performance
- **LCP**: < 2.5s (carga instantánea con SSR)
- **FID**: < 100ms (hidratación no-bloqueante)
- **CLS**: < 0.1 (estructura estable desde SSR)

  
Desarrollado con ❤️ para Mercado Libre
