import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import RegisterForm from "../components/user/RegisterForm";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

const Register: NextPage = () => {
  const { setAuthToken } = useAuth({
    redirectTo: "/",
    redirectIfFound: true
  });

  const onRegister = (token: string) => {
    setAuthToken(token);
    Router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
      </Head>

      <main className={styles.main}>
        <RegisterForm onRegister={onRegister} />
      </main>
    </div>
  );
};

export default Register;
