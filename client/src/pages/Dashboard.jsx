import { Button, Divider } from "@mui/material";

import React from "react";
import styled from "styled-components";
import { successToast } from "../utils/toast";
import { useAuthContext } from "../context/AuthContext";
import wait from "../utils/helper";

const Wrapper = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 1rem 2rem;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h3 {
    font-weight: normal;
    margin: 1rem 0;
  }
`;
const Dashboard = () => {
  const {
    logoutUser,
    user: { firstName, lastName, email },
  } = useAuthContext();

  const handleLogout = () => {
    wait(1).then(() => {
      logoutUser();
      successToast("Logout successfully 👏");
    });
  };
  return (
    <Wrapper>
      <Divider>
        <h2>Account Authenticated Successfully</h2>
      </Divider>
      <div className="content">
        <h3>
          Welcome {`${firstName} ${lastName}`} ({email}) <span>🤗</span>
        </h3>
        <Button variant="contained" size="large" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
