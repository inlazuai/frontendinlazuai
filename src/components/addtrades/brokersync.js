import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
// action
import {
  getTradesData,
  getTradesFromDatabase,
  setTradesLoading,
  setTradesLoadingFinished,
} from "../../actions/tradesActions";
import { CLEAR_ERRORS } from "../../actions/types";
// mui
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SyncIcon from '@mui/icons-material/Sync';

import AutoComplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// components
import MainLayout from "../../layouts/full/mainlayout";
import Spinner from "../common/Spinner";
// metatraderJSON
import metaServerData from "../../config/metatraderServerNames.json";
import metaBrokerData from "../../config/metatraderBrokers.json";

const brokers = ["Siigo", "Alegra"];
// oanda
const dataRanges = ["All Trades", "Latest Trades"];
const timezones = ["DO NOT CONVERT"];
// metatrader
const metatraderTypes = ["mt4", "mt5"];


function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function BrokerSync() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const expired = useSelector((store) => store.auth.user.expired);
  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);

  const userId = useSelector((store) => store.auth.user.public_id);
  const loading = useSelector((store) => store.trades.loading);

  // message
  const [message, setMessage] = useState("");

  const [broker, setBroker] = useState("");
  // oanda
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [dataRange, setDataRange] = useState("Latest Trades");
  const [timezone, setTimezone] = useState("DO NOT CONVERT");
  // metatrader
  const [mtValue, setMtValue] = useState("");
  const [mtLoginId, setMtLoginId] = useState("");
  const [mtPassword, setMtPassword] = useState("");
  const [mtBroker, setMtBroker] = useState("");
  const [mtServer, setMtServer] = useState("");
  const [CheckedData, setCheckedData] = useState(true);

  const [serverOpen, setServerOpen] = useState(false);
  const [brokerOpen, setBrokerOpen] = useState(false);
  const [metatraderServers, setMetatraderServers] = useState([]);
  const [metatraderBrokers, setMetatraderBrokers] = useState([]);
  const serverLoading = serverOpen && metatraderServers.length === 0;
  const brokerLoading = brokerOpen && metatraderBrokers.length === 0;

  const [user_siigo, setUserSiigo] = useState();
  const [password_siigo, setPasswordSiigo] = useState();


  useEffect(() => {
    let active = true;
    if (!brokerLoading) return undefined;
    (async () => {
      if (active) {
        if (mtValue === "mt4") {
          setMetatraderBrokers(
            metaBrokerData.filter((data) => {
              const ids = metaServerData
                .filter((server) => server.mt4 === 1)
                .map((filtered) => filtered.fk_broker_id);
              const uniq = [...new Set(ids)];
              return uniq.includes(data.id);
            })
          );
        } else {
          setMetatraderBrokers(
            metaBrokerData.filter((data) => {
              const ids = metaServerData
                .filter((server) => server.mt5 === 1)
                .map((filtered) => filtered.fk_broker_id);
              const uniq = [...new Set(ids)];
              return uniq.includes(data.id);
            })
          );
        }
      }
      await delay(1e3);
    })();
    return () => {
      active = false;
    };
  }, [mtValue, brokerLoading]);

 
  useEffect(() => {
    (async () => {
 await  axios.post(
    "/api/siigo_validate_credentials",
    {
      user: userId
    }
    
  ).then((res) => {
    const { tieneData,user_siigo,password_siigo} = res.data;
  
    setCheckedData(tieneData);
    setUserSiigo(user_siigo)
    setPasswordSiigo(password_siigo)
  
  })
})();},[])
 

  useEffect(() => {
    let serverActive = true;
    if (!serverLoading) return undefined;
    (async () => {
      if (serverActive) {
        if (mtValue === "mt4") {
          setMetatraderServers(
            metaServerData.filter(
              (server) =>
                server.fk_broker_id ===
                  metaBrokerData.find((broker) => broker.name === mtBroker)
                    .id && server.mt4 === 1
            )
          );
        } else {
          setMetatraderServers(
            metaServerData.filter(
              (server) =>
                server.fk_broker_id ===
                  metaBrokerData.find((broker) => broker.name === mtBroker)
                    .id && server.mt5 === 1
            )
          );
        }
      }
      await delay(1e3);
    })();
    return () => {
      serverActive = false;
    };
  }, [mtBroker, mtValue, serverLoading]);

  useEffect(() => {
    if (!brokerOpen) setMetatraderBrokers([]);
  }, [brokerOpen]);

  useEffect(() => {
    if (!serverOpen) setMetatraderServers([]);
  }, [serverOpen]);

  const [settings, setSettings] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setApiKey("");
    setAccountId("");
    setDataRange("Latest Trades");
    setTimezone("DO NOT CONVERT");
    setMtValue("");
    setMtLoginId("");
    setMtPassword("");
    setMtBroker("");
    setMtServer("");
  };

  const renderOanda = (
    <>
      <DialogContent dividers>
        <Stack direction="column" spacing={2} p={1}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter Api Key</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter account number ID</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select the data range to import</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  labelId="datarange"
                  value={dataRange}
                  onChange={(e) => setDataRange(e.target.value)}
                >
                  {dataRanges.map((dataRange, index) => (
                    <MenuItem key={index} value={dataRange}>
                      {dataRange}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select Timezone</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  labelId="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezones.map((timezone, index) => (
                    <MenuItem key={index} value={timezone}>
                      {timezone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Stack spacing={0.5} color="dimgrey">
            <Typography>
              <b>Instructions:</b>
            </Typography>
            <Typography>
              1. Paste that code in the box above and click on "Connect
            </Typography>
            <Typography pl={2}>
              Note: You can get the API code by logging into your account,
              navigating to "My account" and then click on "Manage API access"
              and generate the API code.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            apiKey.trim().length === 0 ||
            accountId.trim().length === 0 ||
            broker.trim().length === 0
          }
          sx={{ m: 1, bgcolor: "#0094b6" }}
          onClick={() => {
            setMessage("Importing data from oanda...");
            dispatch(
              getTradesData(
                {
                  broker,
                  key: apiKey,
                  id: accountId,
                  user: userId,
                },
                navigate,
                enqueueSnackbar
              )
            );
            handleDialogClose();
          }}
        >
          Connect
        </Button>
      </DialogActions>
    </>
  );




  const renderMetatrader = (
    <>
      <DialogContent dividers>
        <Stack spacing={2} p={1}>
          <Grid container spacing={1} alignItems="center">
         
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter Siigo User Name</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={mtLoginId}
                onChange={(e) => setMtLoginId(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>Enter Siigo Password</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={mtPassword}
                onChange={(e) => setMtPassword(e.target.value)}
              />
            </Grid>
          </Grid>

       


      
         
        
        
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
       
            mtLoginId.trim().length === 0 
          }
          sx={{ m: 1, bgcolor: "#0094b6" }}
          onClick={async () => {
            handleDialogClose();
            setMessage("Connecting the account to Siigo...");
            dispatch(setTradesLoading());
            const connectAccount = await axios.post(
              "/api/siigo_account",
              {
                user: userId,
                id: mtLoginId,
                pass: mtPassword
              }
            );
            if (connectAccount.data.success) {
              enqueueSnackbar(
                `Successfully stored data`,
                {
                  variant: "success",
                }
              );
            {/*
              setMessage("Getting reports...");
              const response = await axios.post("/api/import_reports_siigo", {
                user: userId,
                saldo: connectAccount.data.saldo,
                costoV:connectAccount.data.costoV,
                costoM:connectAccount.data.costoM,
                utilidad:connectAccount.data.utilidad,
                gastosAdmon:connectAccount.data.gastosAdmon,
                gastosPer:connectAccount.data.gastosPer,
                gastosHono:connectAccount.data.gastosHono,
                gastosImp:connectAccount.data.gastosImp,
                gastosArrend:connectAccount.data.gastosArrend,
                gastosServ:connectAccount.data.gastosServ,
                gastosLegales:connectAccount.data.gastosLegales,
                gastosViaje:connectAccount.data.gastosViaje,
                gastosDiver:connectAccount.data.gastosDiver,
                margenBruto:connectAccount.data.margenBruto 
              });
          
                if (response.data.success) {
                  enqueueSnackbar(
                    `Successfully imported data`,
                    {
                      variant: "success",
                    }
                  );
                  dispatch({ type: CLEAR_ERRORS });
                  dispatch(
                    getTradesFromDatabase({ user: userId }, enqueueSnackbar)
                  );
                  navigate("/tradestable");
                } else {
                  enqueueSnackbar("Can't execute data from orders", {
                    variant: "error",
                  });
                  dispatch({ type: CLEAR_ERRORS });
                  dispatch(
                    getTradesFromDatabase({ user: userId }, enqueueSnackbar)
                  );
                  navigate("/tradestable");
                }
            */}
            } else {
              enqueueSnackbar("Can't connect to account", {
                variant: "error",
              });
              dispatch({ type: CLEAR_ERRORS });
              dispatch(
                getTradesFromDatabase({ user: userId }, enqueueSnackbar)
              );
              navigate("/tradestable");
            }
            dispatch(setTradesLoadingFinished());
          }}
        >
          Connect
        </Button>
      </DialogActions>
    </>
  );

  return (
    <MainLayout title="Api Synchronization">
      <Stack width="100%" p={{ xs: 1, md: 2 }}>
        {loading ? (
          <Stack
            height="calc(100vh - 135px)"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
            <Typography>{message}</Typography>
          </Stack>
        ) : (
          <Card sx={{ p: 3 }}>
            <Stack direction="column" spacing={3}>
              <Typography variant="h6">
                <b>Auto Import Files From Your Api/Platform</b>
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={1}
              >
                <Typography minWidth={170}>
                  <b>Select Your Api:</b>
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="broker"
                    value={broker}
                    onChange={(e) => setBroker(e.target.value)}
                  >
                    {brokers.map((broker, index) => (
                      <MenuItem key={index} value={broker}>
                        {broker}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleClickDialogOpen}
                  disabled={broker.length === 0}
                  sx={{ bgcolor: "#0094b6" }}
                >
                  Connect Account
                </Button>
              <div hidden={CheckedData ?  true : false}>
              <Button
          variant="contained"
       
          sx={{ bgcolor: "#0094b6" }}
          onClick={async () => {
            handleDialogClose();
            setMessage("Connecting the account to Siigo...");
            dispatch(setTradesLoading());
            const connectAccount = await axios.post(
              "/api/siigo_account",
              {
                user: userId,
                id: user_siigo,
                pass: password_siigo
              }
            );
            if (connectAccount.data.success) {
              enqueueSnackbar(
                `Successfully stored data`,
                {
                  variant: "success",
                }
              );
            {/*
              setMessage("Getting reports...");
              const response = await axios.post("/api/import_reports_siigo", {
                user: userId,
                saldo: connectAccount.data.saldo,
                costoV:connectAccount.data.costoV,
                costoM:connectAccount.data.costoM,
                utilidad:connectAccount.data.utilidad,
                gastosAdmon:connectAccount.data.gastosAdmon,
                gastosPer:connectAccount.data.gastosPer,
                gastosHono:connectAccount.data.gastosHono,
                gastosImp:connectAccount.data.gastosImp,
                gastosArrend:connectAccount.data.gastosArrend,
                gastosServ:connectAccount.data.gastosServ,
                gastosLegales:connectAccount.data.gastosLegales,
                gastosViaje:connectAccount.data.gastosViaje,
                gastosDiver:connectAccount.data.gastosDiver,
                margenBruto:connectAccount.data.margenBruto 
              });
          
                if (response.data.success) {
                  enqueueSnackbar(
                    `Successfully imported data`,
                    {
                      variant: "success",
                    }
                  );
                  dispatch({ type: CLEAR_ERRORS });
                  dispatch(
                    getTradesFromDatabase({ user: userId }, enqueueSnackbar)
                  );
                  navigate("/tradestable");
                } else {
                  enqueueSnackbar("Can't execute data from orders", {
                    variant: "error",
                  });
                  dispatch({ type: CLEAR_ERRORS });
                  dispatch(
                    getTradesFromDatabase({ user: userId }, enqueueSnackbar)
                  );
                  navigate("/tradestable");
                }
            */}
            } else {
              enqueueSnackbar("Can't connect to account", {
                variant: "error",
              });
              dispatch({ type: CLEAR_ERRORS });
              dispatch(
                getTradesFromDatabase({ user: userId }, enqueueSnackbar)
              );
              navigate("/tradestable");
            }
            dispatch(setTradesLoadingFinished());
          }}
        >
          Sync account
        </Button>
                </div>
               
        
              </Stack>
              <Stack direction="column" color="dimgrey" spacing={0.5}>
                <Typography>
                  Want us to add your platform? or do you have issuses with auto
                  import? Please contact us.
                </Typography>
                <Typography>
                  Note: Please use the settings below to set the timezone,
                  currency and advanced settings for custom grouping of trades
                  for your auto-imported trades.
                </Typography>
                <Typography>
                  <b>
                    Note: Most connection issues can be resolved by simply
                    deleting and re-establishing your connection.
                  </b>
                </Typography>
                <Typography>
                  <b>
                    NEW: You can now set the sync from date for TD-A and other
                    brokers (for IB, use flex query history)
                  </b>
                </Typography>
                <Typography>
                  <b>
                    Deleting a connection DOES NOT delete ANY data from your
                    account.
                  </b>
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={1}
              >
              <FormControl  fullWidth>
                <InputLabel id="import-settings">
                 {/*Accounts*/}
                </InputLabel>
                {/*
                <Select
                  labelId="import-settings"
                  value={accountid}
                  label="Auto import settings"
                  defaultValue={{accountid}}
              
                  onChange={(e) => setSettings(e.target.value)}
                >
                  <option value="someOption">{accountid}</option>
                
                </Select>
                */}
                <Typography>
                  <b>
                 Account
                  </b>
                </Typography>
                <Stack   direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={3}>
                <Typography>
                  <b>
                   {user_siigo}
                  </b>
                </Typography>
                <Typography>
                  <b>
                  {password_siigo}
                  </b>
                </Typography>
                </Stack>
              </FormControl>
              </Stack>
            </Stack>
          </Card>
        )}
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography fontSize={18} my={1}>
            <b>Insert here your Credentials</b>
          </Typography>
        </DialogTitle>
        <IconButton
          onClick={handleDialogClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {broker === "Oanda" && renderOanda}
        {broker === "Siigo" && renderMetatrader}
      </Dialog>
    </MainLayout>
  );
}
