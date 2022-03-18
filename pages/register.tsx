import type { NextPage } from "next";
import Head from "next/head";
import RegisterForm from "../components/user/RegisterForm";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
      </Head>

      <main className={styles.main}>
        <RegisterForm />
      </main>
    </div>
  );
};

export default Login;
