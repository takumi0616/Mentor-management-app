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

    if (!response.ok && response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // TODO: 他にも500エラーを考慮した分岐も必要
    const props = await response.json();
    return { props };
  };
};
