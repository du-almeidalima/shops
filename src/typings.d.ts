// https://medium.com/@fidelisclayton/system-environment-variables-in-angular-1f4a922c7b4c

declare var $ENV: Env;

interface Env {
  ENVIRONMENT: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
}
