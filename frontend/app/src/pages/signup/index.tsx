import React, { useState } from "react";
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
import Link from "next/link"; // Next.js の Link コンポーネントをインポート
import Head from "next/head";

const SignUp = () => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("role", role);
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
      await axiosInstance
        .post("auth", {
          registration: {
            email: data.get("email"),
            password: data.get("password"),
            password_confirmation: data.get("password_confirmation"),
            role: data.get("role"),
          },
        })
        .then(async function (response) {
          console.log(response.data);
          if (role === "mentee") {
            const menteeId = response.data.data.id; // サーバーから返されたmenteeのID

            await axiosInstance
            .post("mentorships", {
                mentorship: {
                    mentee_id: menteeId,
                }
            })
            .then(function () {
                // mentorshipの登録が成功した場合のみログインページへリダイレクト
                if (!isError) router.push("/login");
            })
            .catch(function (error) {
                setIsError(true);
                setErrorMessage("Mentorship registration failed: " + error.response.data.errors.full_messages[0]);
            });
          }
        }
        )
    })();
  };

  return (
    <>
      <Head>
        <title>サインアップページ</title>
      </Head>
      
      <Container component="main" maxWidth="xs">
        <Box>

          <Typography component="h1" variant="h5">
            サインアップ
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            
            <TextField id="email" label="メールアドレス" name="email" autoComplete="email" autoFocus style = {{display: 'block'}}/>
            <TextField name="password" label="パスワード" type="password" id="password" autoComplete="current-password" />
            <TextField name="password_confirmation" label="パスワードの確認" type="password" id="password_confirmation" autoComplete="current-password"/>
            
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="role-label">役割</InputLabel>
              <Select labelId="role-label" id="role" value={role} onChange={handleRoleChange} label="役割">
                <MenuItem value={"mentor"}>メンター</MenuItem>
                <MenuItem value={"mentee"}>メンティー</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              サインアップ
            </Button>

            <Link href="/login" passHref>
              <Button variant="text">ログインページに戻る</Button>
            </Link>

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
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
