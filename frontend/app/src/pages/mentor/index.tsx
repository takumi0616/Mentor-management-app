import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

const Mentor = () => {
    const email = localStorage.getItem("email"); // メールアドレスをlocal storageから取得
  return (
    <>
      <Head>
        <title>メンターダッシュボード</title>
      </Head>
      <div>
        <main>
          <h1>メンターダッシュボード</h1>
          <p>ログインしているメールアドレス: {email}</p> {/* メールアドレスを表示 */}
          <p>ここにメンター向けのコンテンツを追加できます。</p>
          <LogoutButton />
        </main>
      </div>
    </>
  );
};

export default Mentor;
