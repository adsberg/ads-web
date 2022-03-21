export interface Config {
  userTokenStoreName: string;
  userTokenMaxAge: number;
}

const config: Config = {
  userTokenStoreName: process.env.USER_TOKEN_STORE_NAME || "utkn",
  userTokenMaxAge: parseInt(
    process.env.USER_TOKEN_MAX_AGE || (86_400 * 30).toString()
  )
};

export default config;
