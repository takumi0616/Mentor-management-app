import Head from "next/head";
import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Table,
  Stack
} from "@mui/material/";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

const Error = () => {
    const router = useRouter();
    const apiUrl_2 = process.env.API_URI_2;

    const handleRestart = async () => {
        try {
          const headers: HeadersInit = {
            "Content-Type": "application/json",
          };
    
          const uid = getCookie("uid");
          const client = getCookie("client");
          const accessToken = getCookie("access-token");
    
          if (uid) headers["uid"] = uid;
          if (client) headers["client"] = client;
          if (accessToken) headers["access-token"] = accessToken;
    
          const response = await fetch(apiUrl_2 + "/api/v1/auth/sign_out", {
            method: "DELETE",
            headers: headers,
            credentials: "include", // Cookie を含める
          });
    
          if (response.ok) {
            localStorage.removeItem("email"); // emailの削除
            localStorage.removeItem("id");
            router.push("/login"); // ログインページへリダイレクト
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
          } else {
            // エラーハンドリング
            console.error("ログアウトに失敗しました");
          }
        } catch (error) {
          // ネットワークエラーハンドリング
          console.error(error);
        }
      };


    return(
        <>
          <Head>
            <title>エラーページ</title>
          </Head>
          <div>
            <main>
              <div style={{textAlign: 'center'}}>
                <p>メンティーが設定されていません</p>
                <p>管理者に問い合わせてください</p>
              </div>

              <div style={{textAlign: 'center'}}>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleRestart}>ログインページに戻る</Button>
              </div>
              
            </main>
          </div>
            
        </>
    );
};

export default Error