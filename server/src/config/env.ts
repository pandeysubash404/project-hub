import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  email_user: process.env.EMAIL_USER || "panndeysubash404@gamil.com" as string,
  email_pass: process.env.EMAIL_PASS || "@Test404" as string,
  mongo: {
    uri: process.env.MONGO_URI as string,
  },
  cors: {
    origin: process.env.ORIGIN as string,
  },
  token: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
    expireTime: process.env.TOKEN_EXPIRE_TIME as string,
  },
  demoData: {
    password: process.env.DEMO_PASSWORD as string,
  },
};

export default env;
