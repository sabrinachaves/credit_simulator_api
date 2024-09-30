process.env = {
  ...process.env,
  APPLICATION_NAME: 'credit_simulator_api',
  APP_ENVIRONMENT: 'development',
  DB_HOST: 'database',
  MYSQL_USER: 'root',
  MYSQL_ROOT_PASSWORD: 'any',
  MYSQL_DATABASE: 'credit',
  DB_PORT: '3306',
};

export {};
