import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import MainLayout from "../layouts/full/mainlayout";
import TradeTable from "./subcomp/TradeTable";
import isEmpty from "../validation/isEmpty";
import Spinner from "./common/Spinner";
import ReportsOverview from "./reports/reports-overview";

import { getTradesFromDatabase } from "../actions/tradesActions";

function uniq(a) {
  return Array.from(new Set(a));
}

function extract(a) {
  const newArray = a.map((item) => item.symbol);
  return newArray;
}

export default function TradesTable() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const expired = useSelector((store) => store.auth.user.expired);
  const email = useSelector((store) => store.auth.user.email);
  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);

  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.user.public_id);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [brokerFilters, setBrokerFilters] = useState([]);
  const [symbolFilters, setSymbolFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getTradesFromDatabase({ user: userId }, enqueueSnackbar));
    axios
      .post("/get-filter-item", { userId })
      .then((res) => {
        const { brokers, symbols, status } = res.data;
        if (brokers.length > 0) setBrokerFilters(brokers);
        if (symbols.length > 0) setSymbolFilters(symbols);
        if (status.length > 0) setStatusFilters(status);
      })
      .catch((err) => console.log(err));
  }, []);

  const trades = useSelector((store) => store.trades);
  useEffect(() => {
    if (!isEmpty(trades.trades)) setTableData(trades.trades);
    else setTableData([]);
  }, [trades]);

  const savedFilters = JSON.parse(localStorage.getItem("__filters"));
  const [filters, setFilters] = useState(
    savedFilters && savedFilters.email === email
      ? savedFilters.filters
      : {
          brokers: [],
          symbols: [],
          statue: [],
        }
  );

  useEffect(() => {
    if (filters)
      localStorage.setItem("__filters", JSON.stringify({ email, filters }));
  }, [filters]);

  useEffect(() => {
    if (!isEmpty(trades.trades)) {
      let filtered = trades.trades;
      if (filters.statue.length > 0) {
        filtered = filtered.filter((trade) =>
          filters.statue.includes(trade.status)
        );
      }
      if (filters.brokers.length > 0) {
        filtered = filtered.filter((trade) =>
          filters.brokers.includes(trade.broker + " " + trade.accountId)
        );
      }
      if (filters.symbols.length > 0) {
        filtered = filtered.filter((trade) =>
          filters.symbols.includes(trade.symbol)
        );
      }
      setTableData(filtered);
    }
  }, [filters, trades]);

  const [reportShow, setReportShow] = useState(false);
  const [filtroCheck, setfiltroCheck] = useState();

  const [selectedTrades, setSelectedTrades] = useState([]);
  const resetFilters = () => {
  setFilters({ ...filters, brokers: []});
  };

 

  return (
    <MainLayout title="">
      {trades.loading ? (
        <Stack
          height="calc(100vh - 135px)"
          width="100%"
          justifyContent="center"
        >
          <Spinner />
        </Stack>
      ) : (
        
        <Stack width="100%" p={{ xs: 1, md: 2 }} spacing={3}>
          <Card>
            <Box p={1.5}>
            <Typography component="span" m={0.5}>
                <b>Filters:</b>
              </Typography>
            <Button style={{color:'#80448C'}} variant="outlined" size="small" onClick={resetFilters}>Anual</Button>
           
              <Button
                style={{color:'#80448C'}}
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                size="small"
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedFilter("broker");
                }}
                sx={{ m: 0.5, width: 135, justifyContent: "space-between" }}
              >
                mensual
              </Button>
         
         
             {
             
          
             /*
               <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                size="small"
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedFilter("symbol");
                }}
                sx={{ m: 0.5, width: 142, justifyContent: "space-between" }}
              >
                symbol
              </Button>
              <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                size="small"
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                  setSelectedFilter("status");
                }}
                sx={{ m: 0.5, width: 135, justifyContent: "space-between" }}
              >
                win/loss
              </Button>
             
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => {
                  setFilters({ brokers: [], symbols: [], statue: [] });
                  localStorage.removeItem("__filters");
                }}
                sx={{ ml: 2, my: 0.5 }}
              >
                clear filters
              </Button>
               */}

               
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Stack p={1} width={185} maxHeight={500}>
              
                  {
                  
                  
                
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  selectedFilter === "broker"
                    ? brokerFilters.map((broker, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              style={{color:'#80448C'}}
                              checked={filters.brokers.includes(broker)}
                              size="small"
                              onChange={() => {
                                //alert(filters.brokers.includes(broker))
                                const checked = filters.brokers.includes(broker)
                                  ? filters.brokers.filter(
                                      (item) => item !== broker
                                    )
                                  : [...filters.brokers, broker];
                                setFilters({ ...filters, brokers: checked });
                              }}
                            />
                          }

                          label={
                            <Typography
                              variant="body2"
                              color={
                                filters.brokers.includes(broker)
                                  ? "#0094b6"
                                  : "black"
                              }
                            >
                              {broker.split(" ")[0]}
                              <br />
                              {broker.split(" ")[1]}
                            </Typography>
                          }

                       
                        />
                       
                      ))
                     
                    : selectedFilter === "symbol"
                    ? filters.brokers.length === 0
                      ? uniq(extract(symbolFilters)).map((symbol, index) => (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={filters.symbols.includes(symbol)}
                                size="small"
                                onChange={() => {
                                  const checked = filters.symbols.includes(
                                    symbol
                                  )
                                    ? filters.symbols.filter(
                                        (item) => item !== symbol
                                      )
                                    : [...filters.symbols, symbol];
                                  setFilters({ ...filters, symbols: checked });
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                color={
                                  filters.symbols.includes(symbol)
                                    ? "#0094b6"
                                    : "black"
                                }
                              >
                                {symbol}
                              </Typography>
                            }
                          />
                        ))
                      : symbolFilters
                          .filter((item) =>
                            filters.brokers.includes(
                              `${item.broker} ${item.account}`
                            )
                          )
                          .map((symbol, index) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  checked={filters.symbols.includes(
                                    symbol.symbol
                                  )}
                                  size="small"
                                  onChange={() => {
                                    const checked = filters.symbols.includes(
                                      symbol.symbol
                                    )
                                      ? filters.symbols.filter(
                                          (item) => item !== symbol.symbol
                                        )
                                      : [...filters.symbols, symbol.symbol];
                                    setFilters({
                                      ...filters,
                                      symbols: checked,
                                    });
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  variant="body2"
                                  color={
                                    filters.symbols.includes(symbol)
                                      ? "#0094b6"
                                      : "black"
                                  }
                                >
                                  {symbol.symbol}
                                </Typography>
                              }
                            />
                          ))
                    : statusFilters.map((status, index) => (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={filters.statue.includes(status)}
                              size="small"
                              onChange={() => {
                                const checked = filters.statue.includes(status)
                                  ? filters.statue.filter(
                                      (item) => item !== status
                                    )
                                  : [...filters.statue, status];
                                setFilters({ ...filters, statue: checked });
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              color={
                                filters.statue.includes(status)
                                  ? "#0094b6"
                                  : "black"
                              }
                            >
                              {status}
                            </Typography>
                          }
                        />
                      ))}
                       
                </Stack>
              </Popover>
            </Box>
            {(filters.brokers.length > 0 ||
              filters.symbols.length > 0 ||
              filters.statue.length > 0) && (
              <Box px={2} pb={2}>
                {filters.brokers.length > 0 && (
                  <>
                    <Typography component="span" mr={1} color="primary.dark">
                      Año:
                    </Typography>
                    {filters.brokers.map((broker, i) => (
                      <Typography
                        component="span"
                        key={i}
                        variant="caption"
                        borderRadius={5}
                        align="center"
                        py={0.5}
                        px={1}
                        mr={0.5}
                        bgcolor="primary.main"
                        color="white"
                      >
                        {broker}
                      </Typography>
                    ))}
                  </>
                )}
                {filters.symbols.length > 0 && (
                  <>
                    <Typography component="span" mx={1} color="primary.dark">
                      Symbol:
                    </Typography>
                    {filters.symbols.map((symbol, i) => (
                      <Typography
                        component="span"
                        key={i}
                        variant="caption"
                        borderRadius={5}
                        align="center"
                        py={0.5}
                        px={1}
                        mr={0.5}
                        bgcolor="primary.main"
                        color="white"
                      >
                        {symbol}
                      </Typography>
                    ))}
                  </>
                )}
                {filters.statue.length > 0 && (
                  <>
                    <Typography component="span" mx={1} color="primary.dark">
                      Status:
                    </Typography>
                    {filters.statue.map((status, i) => (
                      <Typography
                        component="span"
                        key={i}
                        variant="caption"
                        borderRadius={5}
                        align="center"
                        py={0.5}
                        px={1}
                        mr={0.5}
                        bgcolor="primary.main"
                        color="white"
                      >
                        {status}
                      </Typography>
                    ))}
                  </>
                )}
              </Box>
            )}
          </Card>
          {/*
          <Button
            variant="contained"
            sx={{ width: 150 }}
            onClick={() => setReportShow(!reportShow)}
          >
            {reportShow ? "Hide" : "Show"} Report
          </Button>

          {reportShow && (
            <ReportsOverview selected={selectedTrades} filters={filters} />
          )} */}
            <ReportsOverview selected={selectedTrades} filters={filters} />
       {/*

          <TradeTable
            dataToDisplay={tableData}
            tradeSelect={setSelectedTrades}
            setBrokerFilters={setBrokerFilters}
            setSymbolFilters={setSymbolFilters}
            setStatusFilters={setStatusFilters}
          /> */}
        </Stack>
      )}

      {/* <Paper sx={{ mb: 1, mt: 1, p: 1 }}>
                  Showing 5/9 Trades $14,402.57(RETURN $)
                </Paper> */}
    </MainLayout>
  );
}
