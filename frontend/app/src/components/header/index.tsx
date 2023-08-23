import React from 'react';
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

const Header: React.FC = () => {
  return (
    <AppBar>
      <div style={{textAlign: 'center'}}>
        <h1>Mentor-management-app</h1>
      </div>
    </AppBar>
  );
};

export default Header;
//  <header style={{textAlign: 'center'}}>  </header>