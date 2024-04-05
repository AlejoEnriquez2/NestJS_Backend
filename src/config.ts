import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      database: process.env.NAME_DB,
      port: parseInt(process.env.PORT_DB, 10),
      password: process.env.PASSWORD_DB,
      user: process.env.USERNAME_DB,
      host: process.env.HOST_DB,
    },
  };
});
