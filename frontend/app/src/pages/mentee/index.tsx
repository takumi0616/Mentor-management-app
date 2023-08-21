import Head from "next/head";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";
import Cookies from "js-cookie";

interface LearningRecord {
  id: number;
  title: string;
  date: string;
  language: string;
  content: string;
}


export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

const LearningRecordsPage = () => {
  const email = localStorage.getItem("email") ?? ""; // もしnullなら空の文字列にする
  const user_id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")!) : 0; // もしnullなら0にする
  // const authToken = Cookies.get("access-token");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);
  const apiUrl_2 = process.env.API_URI_2;

  const loadLearningRecords = async () => {
    try {
      const response = await fetch(apiUrl_2 + `/api/v1/users/${user_id}/learning_records`);
      if (response.ok) {
        const data = await response.json();
        setLearningRecords(data);
      } else {
        console.error("学習記録の読み込みに失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  useEffect(() => {
    loadLearningRecords();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const formData = { title, date, language, content };
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(apiUrl_2 + `/api/v1/users/${user_id}/learning_records`, {
    method: "POST",
    headers,
    body: JSON.stringify({ learning_record: formData }),
  });

    if (response.ok) {
      console.log("学習記録が登録されました");
      setTitle("");
      setDate("");
      setLanguage("");
      setContent("");
      loadLearningRecords();
    } else {
      const data = await response.json();
      console.error("学習記録の登録に失敗しました", data.errors);
    }
  };

  return (
    <>
      <Head>
        <title>メンティーダッシュボード</title>
      </Head>
      <div>
        <main>
          <h1>メンティーダッシュボード</h1>
          <p>ログインしているメールアドレス: {email}</p>
          <p>ログインしているid: {user_id}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>タイトル</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>日付</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label>言語</label>
              <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div>
              <label>内容</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button type="submit">登録</button>
          </form>
          <h2>学習記録一覧</h2>
          <ul>
            {learningRecords.map((record) => (
              <li key={record.id}>
                <p>タイトル: {record.title}   日付: {record.date}   言語: {record.language}   内容: {record.content}</p>
              </li>
            ))}
          </ul>
          <LogoutButton />
        </main>
      </div>
    </>
  );
};

export default LearningRecordsPage;
