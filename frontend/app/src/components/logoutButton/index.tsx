import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

const LogoutButton = () => {
  const router = useRouter();
  const apiUrl_2 = process.env.API_URI_2;

  const handleLogout = async () => {
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

  return (
    <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>ログアウト</Button>
  );
};

export default LogoutButton;
