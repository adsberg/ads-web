import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useCurrentUser } from "../lib/currenct-user";
import styles from "../styles/Home.module.css";

const Logout: NextPage = () => {
  const { logout, user } = useCurrentUser({
    redirectTo: "/",
    redirectIfFound: false
  });

  useEffect(() => {
    if (user) logout();
  });

  return (
    <div>
      <Head>
        <title>Logout</title>
      </Head>
    </div>
  );
};

export default Logout;
