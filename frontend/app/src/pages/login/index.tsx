import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
import axios from "axios";
import Cookies from "js-cookie";
import  Link  from "next/link"; // Next.js の Link コンポーネントをインポート

const Login = () => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const apiUrl_2 = process.env.API_URI_2;
    const axiosInstance = axios.create({
      baseURL: apiUrl_2 + `/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post("auth/sign_in", {
          email: data.get("email"),
          password: data.get("password"),
        })
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.data.admin);
          console.log(response.data.data.role);
          // Cookieにトークンをセットしています
          Cookies.set("uid", response.headers["uid"]);
          Cookies.set("client", response.headers["client"]);
          Cookies.set("access-token", response.headers["access-token"]);
          localStorage.setItem("id", response.data.data.id);//localstorageは情報をサーバーに送ることができない、意図的にデータを送る必要があるため、意図されていないリロードが入るとlocalstorage部分でエラーを吐きます
          localStorage.setItem("email", response.data.data.email); // メールアドレスをlocal storageに保存
          // adminとmentorのroleに基づいて異なるページにリダイレクト
          if (response.data.data.admin === true) {
            router.push("/admin");
          } else if (response.data.data.role === "mentor") {
            router.push("/mentor");
          } else {
            router.push("/mentee");
          }          
        })
        .catch(function (error) {
          // Cookieからトークンを削除しています
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
        });
    })();
  };

  return (
    <>
    <Head>
      <title>ログインページ</title>
    </Head>

    <Container component="main" maxWidth="xs">
      <Box>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography><br/>
        <Box component="form" onSubmit={handleSubmit}>

          <TextField id="email" label="メールアドレス" name="email" autoComplete="email" autoFocus/>

          <TextField name="password" label="パスワード" type="password" id="password" autoComplete="current-password"/>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>

          {isError ? (
            <Alert
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          ) : null}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Link href="/signup" passHref>
            <Button variant="text">
              新規アカウントを作成
            </Button>
          </Link>
        </Box>

      </Box>
    </Container>
    </>
  );
};

export default Login;
