import dotenv from "dotenv";
dotenv.config();

export default {
  dbURI: `mongodb+srv://rahulraz1308:${process.env.DB_PASSWORD}@snapformcluster.hmb8ekv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=snapformCluster`,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
