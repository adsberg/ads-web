import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useAuth } from "../lib/auth";

const Logout: NextPage = () => {
  const { signOut, isSignedIn } = useAuth({
    redirectTo: "/",
    redirectIfFound: false
  });

  useEffect(() => {
    if (isSignedIn()) signOut();
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
