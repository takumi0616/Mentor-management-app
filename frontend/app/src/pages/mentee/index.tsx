import Head from "next/head";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";
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
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // 選択された言語を管理するstate
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

  const formData = { title, date, language: selectedLanguage, content };
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
      setSelectedLanguage(""); 
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

          <div style={{textAlign: 'center'}}>
            <Typography component="h1" variant="h5">
              メンティーダッシュボード
            </Typography>
            <p>ログインしているメールアドレス: {email}</p>
            <p>ログインしているid: {user_id}</p>
            <div style={{textAlign: 'center'}}>
              <LogoutButton />
            </div>
            <p>メンティー向けのコンテンツを追加</p>
          </div>

          <div style={{width: '500px',margin: 'auto'}}> 
            <h2 style={{textAlign: 'center'}}>学習記録登録</h2>
            <form onSubmit={handleSubmit}>
            <div>
              <TextField type="text" label="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} style = {{width: '30rem'}}/>
            </div><br/>

            <div>
              <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div><br/>

            <div>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>言語</InputLabel>
                <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                  <MenuItem value="">選択してください</MenuItem>
                  <MenuItem value="next.js">next.js</MenuItem>
                  <MenuItem value="react">react</MenuItem>
                </Select>
              </FormControl>
            </div><br/>

            <div><br/>
              <FormControl fullWidth>
                <TextField value={content} label="内容" multiline rows={3} onChange={(e) => setContent(e.target.value)}  style={{ width: '30rem' }}/>
              </FormControl>
            </div>

            <div style={{textAlign: 'center'}}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>登録</Button>
            </div>

          </form>
          </div>
          
          <div style={{width: '600px',margin: 'auto'}}>
            <h2 style={{textAlign: 'center'}}>学習記録一覧</h2>
            <ul>
              {learningRecords.map((record) => (
                <Box>
                  <Table key={record.id}>
                    <p>タイトル: {record.title}   日付: {record.date}   言語: {record.language}   内容: {record.content}</p>
                  </Table>
                </Box>
              ))}
            </ul>
          </div>
          
        </main>
      </div>
    </>
  );
};

export default LearningRecordsPage;
