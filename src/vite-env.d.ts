/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_MAIN_APP_URL: string;
  readonly VITE_ADMIN_LOGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}