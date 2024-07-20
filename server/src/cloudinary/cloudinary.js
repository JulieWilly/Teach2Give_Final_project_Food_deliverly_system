import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  API_environment_variable: process.env.CLOUDINARY_API_ENV_VARIABLE,
});

export default cloudinary;
