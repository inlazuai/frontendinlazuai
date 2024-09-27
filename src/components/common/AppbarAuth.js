import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  styled,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import BuyIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

import { ReactComponent as LogoFull } from "../../assets/logo/INLAZUAI_ok.svg";

import { logoutUser } from "../../actions/authActions";

export default function AppbarAuth(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AppBarStyled = styled(AppBar)(() => ({
    boxShadow: "none",
    backgroundImage: 'url("http://localhost:3000/banner_end.png")',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(4px)",
    width: "100%",
  }));

  return (
    <AppBarStyled position="fixed" color="default">
      <Toolbar sx={{ width: "100%" }}>
       {/* <LogoFull height={30} style={{ marginLeft: "-640px" }} />*/}
       <LogoFull height={50} width={160} style={{ marginLeft: "12px" }} />
        <Typography
          variant="h6"
          color="white"
          mr={5}
          ml={1}
          display={{ xs: "none", sm: "block" }}
        >
          {props.pagename}
        </Typography>
        <Box flexGrow={1} />
        {/* <Typography variant="h6" mr={1} display={{ xs: "none", lg: "inherit" }}>
          <b>2 days </b> remaining before expiration
        </Typography> */}
        {/*
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<BuyIcon />}
          sx={{
            mr: 1,
            bgcolor: "#0094b6",
            color: "white",
            borderColor: "white",
            borderWidth: 1,
          }}
          onClick={() => navigate("/profile/account_plan")}
        >
          Buy Now
        </Button>
        */}
        <Button
         style={{color:'#FFFFFF'}}
          variant="outlined"
          color="warning"
          endIcon={<LogoutIcon />}
          onClick={() => {
            dispatch(logoutUser());
          }}
          sx={{
            bgcolor: "",
            color: "blue",
            borderColor: "#FFFFFF",
            borderWidth: 1,
            mr: 2,
          }}
        >
      <Typography fontWeight={'bold'} variant='button' color="#FFFFFF">
        logout
      </Typography>
        </Button>
      </Toolbar>
    </AppBarStyled>
  );
}
