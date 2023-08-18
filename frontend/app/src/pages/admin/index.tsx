import Head from "next/head";
import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import LogoutButton from "components/logoutButton";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/api/v1/test");

type User = {
  id: number;
  email: string;
  role: string;
};

type Mentee = {
    mentee_id: any;
    email: string; // メールアドレスを追加
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
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [assignedMentors, setAssignedMentors] = useState<Mentor[]>([]);
  const [unassignedMentees, setUnassignedMentees] = useState<Mentee[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));

    axios.get("http://localhost:3000/api/v1/mentorships/assigned_mentors")
      .then(response => setAssignedMentors(response.data))
      .catch(error => console.error(error));

    axios.get("http://localhost:3000/api/v1/mentorships/unassigned_mentees")
        .then(response => {
        console.log("Unassigned Mentees:", response.data); // データをログ出力
        setUnassignedMentees(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const unassignedMenteesList = unassignedMentees.map(mentee => {
    const menteeUser = users.find(user => user.id === mentee.mentee_id);
    return menteeUser ? (
      <option key={mentee.id} value={mentee.id}>
        {menteeUser.email} 
      </option>
    ) : null;
  });
  
  const assignedMentorsList = assignedMentors.map(mentor => {
    const mentorUser = users.find(user => user.id === mentor.mentor_id);
    return mentorUser ? (
      <li key={mentor.mentor_id}>
        {mentorUser.email}
      </li>
    ) : null;
  });
  

  // mentor_idを割り当てる処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/v1/mentorships/${menteeId}`, {
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
          <h1>管理者ダッシュボード</h1>
          <p>ログインしているメールアドレス: {loggedInEmail}</p>
          <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                <li key={user.id}>
                    {user.id} - {user.email} - {user.role}
                </li>
                ))}
            </ul>
            <h2>割り当て済みのMentors</h2>
            <ul>{assignedMentorsList}</ul>
            <h2>未割り当てのMentees</h2>
            <ul>{unassignedMenteesList}</ul>
          
            <form onSubmit={handleSubmit}>
            {/* 未割当のメンティーを選ぶための選択リスト */}
            <select value={menteeId} onChange={(e) => setMenteeId(e.target.value)}>
            <option value="" disabled>未割当のメンティーを選択</option>
                {unassignedMenteesList}
            </select>

            <input
                type="text"
                placeholder="Mentor ID"
                value={mentorId}
                onChange={(e) => setMentorId(e.target.value)}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
            <option value="" disabled>ステータスを選択</option>
            <option value="active">active</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
            <option value="paused">paused</option>
            </select>
            <button type="submit">登録</button>
            </form>

          {message && <p>{message}</p>}

          <p>登録が完了したらログアウトしてください</p>
          <LogoutButton />
        </main>
      </div>
    </>
  );
};

export default Admin;