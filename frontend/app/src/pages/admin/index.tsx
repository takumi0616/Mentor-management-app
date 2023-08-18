import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

const Admin = () => {
    const email = localStorage.getItem("email"); // メールアドレスをlocal storageから取得
  return (
    <>
      <Head>
        <title>管理者ダッシュボード</title>
      </Head>
      <div>
        <main>
          <h1>管理者ダッシュボード</h1>
          <p>ログインしているメールアドレス: {email}</p> {/* メールアドレスを表示 */}
          <p>ここに管理者向けのコンテンツを追加できます。</p>
          <LogoutButton />
        </main>
      </div>
    </>
  );
};

export default Admin;
