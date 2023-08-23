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

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

type User = {
  id: number;
  email: string;
  role: string;
};

type Mentee = {
    mentee_id: any;
    email: string;
    id: string;
    // 必要に応じて他のプロパティを追加
  };
  
type Mentor = {
    mentor_id: any;
    email: string; // メールアドレスを追加
    id: string;
    // 必要に応じて他のプロパティを追加
};

const Admin = () => {
  const loggedInEmail = localStorage.getItem("email");
  const user_id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")!) : 0; // もしnullなら0にする
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [assignedMentors, setAssignedMentors] = useState<Mentor[]>([]);
  const [unassignedMentees, setUnassignedMentees] = useState<Mentee[]>([]);
  const apiUrl_2 = process.env.API_URI_2;

  useEffect(() => {
    axios.get(apiUrl_2 + `/api/v1/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));

    axios.get(apiUrl_2 + `/api/v1/mentorships/assigned_mentors`)
      .then(response => setAssignedMentors(response.data))
      .catch(error => console.error(error));

    axios.get(apiUrl_2 + `/api/v1/mentorships/unassigned_mentees`)
        .then(response => {
        console.log("Unassigned Mentees:", response.data); // データをログ出力
        setUnassignedMentees(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const unassignedMenteesList = unassignedMentees.map(mentee => {
    const menteeUser = users.find(user => user.id === mentee.mentee_id);
    return menteeUser ? (
      <Table key={mentee.id}>
        {menteeUser.email} 
      </Table>
    ) : null;
  });
  
  const assignedMentorsList = assignedMentors.map(mentor => {
    const mentorUser = users.find(user => user.id === mentor.mentor_id);
    return mentorUser ? (
      <Table key={mentor.mentor_id}>
        {mentor.mentor_id} - {mentorUser.email}
      </Table>
    ) : null;
  });
  

  // mentor_idを割り当てる処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(apiUrl_2 + `/api/v1/mentorships/${menteeId}`, {
        mentor_id: mentorId,
        status: status,
      });
      setMessage("Mentorshipが正常に登録されました！");
      setUnassignedMentees(unassignedMentees.filter(mentee => mentee.id !== menteeId)); // 未割り当てのmentee_idリストの更新
    } catch (error: unknown) {
      // エラー処理...
    }
  };
  return (
    <>
      <Head>
        <title>管理者ダッシュボード</title>
      </Head>

      <div>
        <main>

          <div style={{textAlign: 'center'}}>
            <Typography component="h1" variant="h5">
              管理者ダッシュボード
            </Typography>
            <p>ログインしているメールアドレス: {loggedInEmail}</p>
            <p>ログインしているid: {user_id}</p>
            <div style={{textAlign: 'center'}}>
              <LogoutButton />
            </div>
          </div>

          <div style={{width: '370px',margin: 'auto'}}>
            <div>
              <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                All Users
              </Typography>
              <ul>
                {users.map((user) => (
                  <Box>
                    <Table  key={user.id}>
                      <p>{user.id} - {user.email} - {user.role}</p>
                    </Table>
                  </Box>
                ))}
              </ul>
            </div>
              
            <div>
              <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                割り当て済みのMentors
              </Typography>
              <ul>
                <Box>
                  {assignedMentorsList}
                </Box>
              </ul>
            </div>
                
            <div>
              <Typography component="h1" variant="h5" style={{textAlign: 'center'}}>
                未割り当てのMentees
              </Typography>
              <ul>
                <Box>
                  {unassignedMenteesList}
                </Box>
              </ul>
            </div>

          </div>
          
          <form onSubmit={handleSubmit} style={{width: '600px',margin: 'auto'}}>
            <div>
              <TextField type="text" placeholder="Mentor ID" value={mentorId} onChange={(e) => setMentorId(e.target.value)}/>
            </div>

            <div>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <Select value={menteeId} onChange={(e) => setMenteeId(e.target.value)}>
                  <MenuItem value="" disabled>未割当のメンティーを選択</MenuItem>
                    {unassignedMenteesList}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>ステータス</InputLabel>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <MenuItem  value="" disabled>ステータスを選択</MenuItem>
                    <MenuItem  value="active">active</MenuItem>
                    <MenuItem  value="pending">pending</MenuItem>
                    <MenuItem  value="completed">completed</MenuItem>
                    <MenuItem  value="paused">paused</MenuItem>
                </Select>
              </FormControl>
            </div><br/>
            
            <div style={{textAlign: 'center'}}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>登録</Button>
            </div>
          </form>

          {message && <p>{message}</p>}
        </main>
      </div>
    </>
  );
};

export default Admin;