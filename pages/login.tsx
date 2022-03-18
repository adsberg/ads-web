import type { NextPage } from "next";
import Head from "next/head";
import LoginForm from "../components/user/LoginForm";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
