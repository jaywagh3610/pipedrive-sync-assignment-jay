import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PIPEDRIVE_API_KEY", "PIPEDRIVE_COMPANY_DOMAIN"];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(
      `Environment variable ${varName} is required but not defined.`,
    );
  }
});

export const PIPEDRIVE_API_KEY = process.env.PIPEDRIVE_API_KEY as string;
export const PIPEDRIVE_COMPANY_DOMAIN = process.env
  .PIPEDRIVE_COMPANY_DOMAIN as string;
