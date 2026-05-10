declare module '*.css';

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_ORDER_ALERT_EMAIL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}