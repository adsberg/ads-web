import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import LoginForm from "../components/user/LoginForm";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  const { setAuthToken } = useAuth();
  const onLogin = (token: string) => {
    setAuthToken(token);
    Router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <main className={styles.main}>
        <LoginForm onLogin={onLogin} />
      </main>
    </div>
  );
};

export default Login;
