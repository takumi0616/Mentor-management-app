import React from "react";
import { useRouter } from "next/router";

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
        router.push("/login"); // ログインページへリダイレクト
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
    <button onClick={handleLogout}>ログアウト</button>
  );
};

export default LogoutButton;
