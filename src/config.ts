export default () => ({
  mySql: {
    db: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});
