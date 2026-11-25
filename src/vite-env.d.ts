/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS → Email Services → Service ID (e.g. "service_xxxxxxx") */
  readonly VITE_EMAILJS_SERVICE_ID?: string
  /** EmailJS → Email Templates → Template ID (e.g. "template_xxxxxxx") */
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  /** EmailJS → Account → General → Public Key */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
