import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";

interface LearningRecord {
  id: number;
  title: string;
  date: string;
  language: string;
  content: string;
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

const Mentor = () => {
  const email = localStorage.getItem("email");
  const user_id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")!) : 0;
  const [MenteeEmail, setMenteeEmail] = useState("");
  const [menteeId, setMenteeId] = useState<number | null>(null);
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);
  const apiUrl_2 = process.env.API_URI_2;
  const router = useRouter();

  const fetchMenteeId = async () => {
    try {
      const response = await fetch(apiUrl_2 + `/api/v1/mentorships/${user_id}/get_mentee_by_mentor`);
      if (response.ok) {
        const data = await response.json();
        setMenteeId(data.mentee_id);
      } else {
        console.error("メンティーIDの取得に失敗しました");
        // エラー時の処理を追加：管理者に申し出るなど
        localStorage.removeItem("email"); // emailの削除
        router.push("/login"); 
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const fetchMenteeEmail = async () => {
    try{
      const response = await fetch(apiUrl_2 + `/api/v1/users/${menteeId}/get_mentee_email_by_mentee_id`);
      if (response.ok) {
        const data = await response.json();
        setMenteeEmail(data.mentee_email);
      } else { 
        console.error("メンティーのemailを取得できませんでした");
        // localStorage.removeItem("email"); // emailの削除
        // router.push("/login"); 
      }
    } catch (error){
      console.error("menteeのemailが取得できませんでした", error);
    }
  };

  const loadLearningRecords = async () => {
    try {
      const response = await fetch(apiUrl_2 + `/api/v1/users/${menteeId}/learning_records`);
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
    fetchMenteeId();
  }, []);

  useEffect(() => {
    if (menteeId) {
      fetchMenteeEmail();
    }
  }, [menteeId]);

  useEffect(() => {
    if (menteeId) {
      loadLearningRecords();
    }
  }, [menteeId]);

  return (
    <>
      <Head>
        <title>メンターダッシュボード</title>
      </Head>
      <div>
        <main>
          <h1>メンターダッシュボード</h1>
          <p>ログインしているメールアドレス: {email}</p>
          <p>ここにメンター向けのコンテンツを追加できます。</p>
          <h2>メンティー{MenteeEmail}の学習記録一覧</h2>
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

export default Mentor;