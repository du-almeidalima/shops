const webpack = require('webpack');

const stringfyEnv = (s) => JSON.stringify(s, null, '  ').replace("\\r", "");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        FIREBASE_API_KEY: stringfyEnv(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: stringfyEnv(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_PROJECT_ID: stringfyEnv(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: stringfyEnv(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_MESSAGING_SENDER_ID: stringfyEnv(process.env.FIREBASE_MESSAGING_SENDER_ID),
        FIREBASE_APP_ID: stringfyEnv(process.env.FIREBASE_APP_ID),
        FIREBASE_MEASUREMENT_ID: stringfyEnv(process.env.FIREBASE_MEASUREMENT_ID),
      }
    })
  ]
};
