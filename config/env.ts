import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
  baseURL: process.env.BASE_URL || "",
  apiBaseURL: process.env.API_BASE_URL || "",
};

if (!ENV.baseURL) throw new Error("BASE_URL missing in .env");
if (!ENV.apiBaseURL) throw new Error("API_BASE_URL missing in .env");
