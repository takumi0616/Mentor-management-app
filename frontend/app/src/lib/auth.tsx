import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  const apiUrl_1 = process.env.API_URI_1;
  return async (context) => {
    const { req, res } = context;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (req.cookies["uid"]) headers["uid"] = req.cookies["uid"];
    if (req.cookies["client"]) headers["client"] = req.cookies["client"];
    if (req.cookies["access-token"]) headers["access-token"] = req.cookies["access-token"];

    const response = await fetch(apiUrl_1 + `${url}`, { headers });
    if(response.ok){
      console.log("ログイン情報はcookieで引き継がれており、ログイン出来ています")
    }else if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }else {
      console.error("サーバーエラーが発生しました");
      return {
        redirect: {
          destination: "/error", // サーバーエラーページへリダイレクトするか、適切なエラーページに置き換えてください
          permanent: false,
        },
      };
    }
    const props = await response.json();
    return { props };
  };
};
