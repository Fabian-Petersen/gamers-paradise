// $ This depencency is used to validate the environment variables else TypeScript will complain ion the header

import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  PEXELS_API_KEY: str(),
});

export default env;
