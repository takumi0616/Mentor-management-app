// import styles from "../styles/Home.module.css";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");


const Home = () => {
  return (
    <>
      <div>
        <main>
          <h1>HOME</h1>
          <p>ホーム画面です</p>
        </main>
      </div>
    </>
  );
};

export default Home;

