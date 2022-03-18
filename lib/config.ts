export interface Config {
  userTokenStoreName: string;
}

const config: Config = {
  userTokenStoreName: process.env.USER_TOKEN_STORE_NAME || "utkn"
};

export default config;
