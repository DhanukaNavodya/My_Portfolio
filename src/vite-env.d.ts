/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional form endpoint that accepts a JSON POST (e.g. a Formspree form URL,
   * a Web3Forms-style API, or your own serverless function).
   * When unset, the contact form validates and hands off to the visitor's email app instead.
   */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
