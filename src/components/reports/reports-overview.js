import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Chart from "react-apexcharts";
import axios from "axios";
import Box from "@mui/material/Box";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

import Spinner from "../common/Spinner";
import { faIR } from "@mui/x-data-grid";
import { type } from "@testing-library/user-event/dist/type";
import { LineWeight } from "@mui/icons-material";

function arrayFilter(array, max) {
  let newArray = [];
  for (let i = 0; i < array.length - 2; i += array.length / max) {
    newArray.push(array[parseInt(i)]);
  }
  newArray.push(array[array.length - 1]);
  return newArray;
}

export default function ReportsOverview({ selected, filters }) {
  const expired = useSelector((store) => store.auth.user.expired);
  const userId = useSelector((store) => store.auth.user.public_id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  

  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);

  const [EstadoData, setEstadoData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [optionColumnChart, setOptionColumnChart] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
      },
    },
    xaxis: {},
  });

  const [ejemploTortaChart1, setEjemploTortaChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  })

  
  
  const [ejemploChart1, setejemploChart] = useState({
    name: "",
    color: "#00E396",
    data: [],
  })
  
  const [ejemploOptionChart1, setEjemploOptionColumnChart] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
      },
    },
    xaxis: {},
  });





  const [ejemploChart2, setejemploChart2] = useState({
    name: "",
    color: "#00E396",
    data: [],
  
  })
  
  const [ejemploOptionChart2, setEjemploOptionColumnChart2] = useState({
  series:[],
  options:{
    chart: {
      type: "bar",
      height: 500,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
      },
    },
    xaxis: { categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']},
  }
  });



  const [ejemploOptionChart4, setEjemploOptionColumnChart4] = useState({
    series:[],
    options:{
      chart: {
        type: "bar",
        stacked: true,
        height: 350,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: -100,
                to: -46,
                color: "#F15B46",
              },
              {
                from: -45,
                to: 0,
                color: "#FEB019",
              },
            ],
          },       
          horizontal: false,
          borderRadius: 0,
          borderRadiusApplication: 'around',
          borderRadiusWhenStacked: 'last',
          columnWidth: '70%',
          barHeight: '200%',
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          hideZeroBarsWhenGrouped: false,
          isDumbbell: false,
          dumbbellColors: undefined,
          isFunnel: false,
          isFunnel3d: true
        },
      },
      dataLabels: {
        enabled: false,
                formatter: function (val) {
                  return val + "%";
                },
                offsetY: -50,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(2);
          },
        },
      },
      xaxis: { categories: ['eseero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']},
    }
    });



    const [ejemplolinea, setejemplolinea] = useState({
      
       options : {
        series: [
      ],
        chart: {
        height: 350,
        stacked: true,
        type: 'line',
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
      },
    },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [1, 1, 4]
      },
      grid: {
        show:false,
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      title: {
        text: 'Costos ventas',
        //offsetX: 110
      },
      xaxis: {
        categories: [2021, 2022, 2023, 2024],
      },
      yaxis: [
        {
          min: 0,
          max: 800000000,
          seriesName: 'Income',
          title: {
            text: '',
          },
        },
        {
          min: 0,
          max: 800000000,
          seriesName: 'Cashflow',
          labels: {
            show: false,
          },
          opposite: true,
          axisTicks: {
            show: false,
          },
        },
        {
          min: 0,
          max: 50,
          seriesName: 'Revenue',
          labels: {
            show: true,
          },
          opposite: true,
          title: {
            text: '',
          },
        },
       
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
        y: [{
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(0) + "$";
            }
            return y;
            
          }
        }, {
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(2) + "$";
            }
            return y;
            
          }},
          {
            formatter: function (y) {
              if(typeof y !== "undefined") {
                return  y.toFixed(4) + "%";
              }
              return y;
              
            }
        }]
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
      }

     
    
    
      });




      const [ejemplolinea2, setejemplolinea2] = useState({
      
        options : {
         series: [
       ],
         chart: {
         height: 350,
         stacked: true,
         type: 'line',
         toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
       },
      },
       dataLabels: {
         enabled: false
       },
       stroke: {
         curve: 'smooth',
         width: [1, 1, 1,4]
       },
       plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
       grid: {
         show:false,
         borderColor: '#e7e7e7',
         row: {
           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
           opacity: 0.5
         },
       },
       markers: {
        size: 1
      },
       title: {
         text: 'Gastos admon y ventas',
         //offsetX: 110
       },
       xaxis: {
         categories: [2021, 2022, 2023, 2024],
       },
       yaxis: [
         {
          min: 0,
          max: 800000000,
           seriesName: 'ventas',
           title: {
             text: '',
           },
         },
         {
          min: 0,
          max: 800000000,
           seriesName: 'Gastos administracion',
           labels: {
             show: false,
           },
           opposite: false,
           axisTicks: {
             show: false,
           },
         },

         {
          min: 0,
          max: 800000000,
          seriesName: 'Gastos ventas',
          labels: {
            show: false,
          },
          opposite: true,
          axisTicks: {
            show: false,
          },
        },
        {
          min: 0,
          max: 50,
          seriesName: 'Revenue',
          labels: {
            show: true,
          },
          opposite: true,
          title: {
            text: '',
          },
        },
      
        
       ],
       tooltip: {
         fixed: {
           enabled: true,
           position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
           offsetY: 30,
           offsetX: 60
         },
         y: [{
           formatter: function (y) {
             if(typeof y !== "undefined") {
               return  y.toFixed(0) + "$";
             }
             return y;
             
           }
         }, {
           formatter: function (y) {
             if(typeof y !== "undefined") {
               return  y.toFixed(2) + "$";
             }
             return y;
             
           }},
           {
             formatter: function (y) {
               if(typeof y !== "undefined") {
                 return  y.toFixed(4) + "%";
               }
               return y;
               
             }
         }]
       },
       legend: {
         horizontalAlign: 'left',
         offsetX: 40
       }
       }
 
      
     
     
       });




      const [lineaMargen, setlineaMargen] = useState({
     
        options: {
          series: [
          ],
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: false, 
            align: 'left',
           
          offsetX: 7,
          offsetY: 0,    
            formatter: function(val, opt) {
              return val.toFixed(0) + "%";
          },
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Margenes',
            align: 'left'
          },
          grid: {
            show:false,
            borderColor: '#e7e7e7',
            align: 'left',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(0) + "%";
                }
                return y;
                
              }
            }
          },
          xaxis: {
            categories: ['2021', '2022', '2023','2024'],
            title: {
              text: 'Year'
            }
          },
          yaxis: {
            title: {
              text: '%'
            },
            gridLines: {
              drawBorder: false,
          },
            min: 0,
            max: 300,
            //forceNiceScale: true,
          },
      
          legend: {
            enabled:true,
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
          
          }
        
     
      
      
        });

        



  const [ejemploChart3, setejemploChart3] = useState({
    name: "",
    color: "#2271b3",
    data: [],
  })
  
  const [ejemploOptionChart3, setEjemploOptionColumnChart3] = useState({
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });

  


  const [ejemploChartMargen, setejemploChartMargen] = useState({
    name: "",
    color: "#87CEEB",
    data: [],
  })
  
  const [ejemploOptionChartMargen, setEjemploOptionColumnChartMargen] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
      
        dataLabels: {
          position: 'top', // top, center, bottom
        },
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
      },
    },
    xaxis: {},
  });

  


  const [accumTotal, setAccumTotal] = useState({
    name: "",
    color: "#20603d",
    data: [],
  });
  const [accumTotalChart, setAccumTotalChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });

  const [optionChart1indice, setOptionChart1indice] = useState({
    name: "",
    color: "#20603d",
    data: [],
  });
  const [optionChart1, setOptionChart1] = useState({
    chart: {
      type: "area",
      foreColor: "#20603d",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });
  const [optionChart2, setOptionChart2] = useState({
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });

  const [ejemploOptionTortaChart1, setEjemploTortaOptionChart] = useState({
        
    series: [],
    options: {
      chart: {
        width: 150,
        type: 'donut',
        color:'#252850'
      },
      colors: ['#252850', '#87CEEB'],
      tooltip: {
        fillSeriesColor: true,
      },
      total: {
        show: true
    },
      labels: ['utilidades','perdidas'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'center'
          }
        }
      }]
    }
  })

const [ejemploRadial, setEjemploRadial] = useState({
        
  series: [90],
  options: {
  chart: {
    height: 350,
    type: 'radialBar',
    
},
title: {
  text: 'Crecimiento',
  //offsetX: 110
},
labels: ['2024'],
plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
          total:{
            show: true,
          },
          value:{
            show: true,
          },
          dataLabels:{
            value:{
              show: true,
            },
          }
        },
      },
    }
  })




  const [ejemploRadial2, setEjemploRadial2] = useState({
        
    series: [90],
    options: {
    chart: {
      height: 350,
      type: 'radialBar',
  },
  title: {
    text: 'crecimiento',
    //offsetX: 110
  },
  labels: ['2024'],
  plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
            total:{
              show: true,
            },
            value:{
              show: true,
            },
            dataLabels:{
              value:{
                show: true,
              },
            }
          },
        },
      }
    })







  const [optionChart, setOptionChart] = useState({
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });

  const [optionColumnChartPrueba, setOptionColumnChartPrueba] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
      },
    },
    xaxis: {},
  });



  const [chartCrecimiento, setChartCrecimiento] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
      },
    },
      stroke: {
        width: [0, 4]
      },
      grid: {
        show:false,
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      title: {
        text: 'Evolución ingresos'
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
        formatter: function(val, opt) {
          return val+"%"
      },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(0) + "$";
            }
            return y;
            
          }
        }, {
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(2) + "%";
            }
            return y;
            
          }
        }]
        
      },
      labels: [],
      yaxis: [{
        title: {
          text: 'Ventas',
        },
      
      }, {
        opposite: true,
        title: {
          text: 'Crecimiento'
        }
      }]
      }
    })




    const [chartGastosAdm, setChartGastosAdm] = useState({
      series: [],
      options: {
        chart: {
          height: 350,
          stacked: true,
          color:'#e7e7e7',
          type: 'line',
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [3],
        },
        stroke: {
          width: [1, 1, 1,2]
        },
        title: {
          text: 'Gastos adm',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012],
        },
        yaxis: [
          {
            seriesName: 'Income',
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "Income (thousand crores)",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            },
            min: 0,
            max: 3000000000

          },
          {
            seriesName: 'Cashflow',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "Operating Cashflow (thousand crores)",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Revenue (thousand crores)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
        }
      })



  const [dailyReturnC, setDailyReturnC] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnOnWinnersTotal, setReturnOnWinnersTotal] = useState(0);
  const [returnOnWinnersChart, setReturnOnWinnersChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnOnLosersTotal, setReturnOnLosersTotal] = useState(0);
  const [returnOnLosersChart, setReturnOnLosersChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnLongTotal, setReturnLongTotal] = useState(0);
  const [returnLongChart, setReturnLongChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnShortTotal, setReturnShortTotal] = useState(0);
  const [returnShortChart, setReturnShortChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [biggestProfitT, setBiggestProfitT] = useState(0);
  const [biggestLoseT, setBiggestLoseT] = useState(0);
  const [winLoseRatio, setWinLoseRatio] = useState(1);
  const [closedTradesTotal, setClosedTradesTotal] = useState(0);
  const [closedTradesChart, setClosedTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [openTradesTotal, setOpenTradesTotal] = useState(0);
  const [openTradesChart, setOpenTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [allTradesTotal, setAllTradesTotal] = useState(0);
  const [allTradesChart, setAllTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [avgNumTrades, setAvgNumTrades] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [totalWinChart, setTotalWinChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [totalLossChart, setTotalLossChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [beTotal, setBeTotal] = useState(0);
  const [totalBeChart, setTotalBeChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [openPercent, setOpenPercent] = useState(0);
  const [accumReturnPercentTotal, setAccumReturnPercentTotal] = useState(0);
  const [accumReturnPercentSeries, setAccumReturnPercentSeries] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [biggestPercentProfit, setBiggestPercentProfit] = useState(0);
  const [biggestPercentLose, setBiggestPercentLose] = useState(0);
  const [percentProfitsChart, setPercentProfitsChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [percentLosesChart, setPercentLosesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [totalReturnNet, setTotalReturnNet] = useState(0);
  
  const [totalReturnNetChart, setTotalReturnNetChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });

 
 



  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setEstadoData(true);

      await axios
        .post("/api/get-reports_siigo", {
          userId,
          filters
        })
        .then((res) => {
          const {
            totalReturnY,
            totalReturnX,
            totalReturn,
            totalDates,
            dailyReturn,
            returnWin,
            returnWinTotal,
            returnLose,
            returnLoseTotal,
            returnLong,
            returnLongTotal,
            returnShort,
            returnShortTotal,
            biggestProfit,
            biggestLose,
            totalClosedTrades,
            closedTrades,
            totalOpenTrades,
            openTrades,
            totalTrades,
            dailyTrades,
            totalWinner,
            totalLoser,
            dailyWinners,
            dailyLosers,
            beCount,
            dailyBe,
            returnPercentSeries,
            returnPercentTotal,
            biggestPercentProfit,
            biggestPercentLose,
            percentProfits,
            percentLoses,
            totalReturnNet,
            totalReturnNetArray,
            saldo,
            costoV,
            costoM,
            utilidad,
            gastosAdmon,
            gastosPer,
            gastosHono,
            gastosImp,
            gastosArrend,
            gastosServ,
            gastosLegales,
            gastosViaje,
            gastosDiver,
            margenBruto,
            totalMargen,
            labels,
            crecimiento,
            margenOperacional,
            margenNeto,
            porcentCostVentas,
            gastosVentas,
            porcentCostGastos,
            crecimiento_ventas,
            crecimiento_ventas2,
            textoRadiaBarUltimo,
            textoRadiaBarAnterior,
            no_hay_data
          } = res.data;

         
          setEstadoData(no_hay_data);

        
          setejemploChart({
            ...ejemploChart1,
            data:saldo
          });

          setEjemploOptionColumnChart({
            ...ejemploOptionChart1,
            xaxis: {
              categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
          });



          setOptionChart1({
            ...optionChart1,
            xaxis: {
              categories:[1]
               
            },
          });


          setejemploChart2({
            ...ejemploChart2,
          
            series: [{
              name: 'Net Profit',
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
              name: 'Revenue',
              data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
              name: 'Free Cash Flow',
              data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }]
         
          }
        );


        setEjemploRadial({
          ...ejemploRadial,
    
          series:[crecimiento_ventas],
          color:'#14a072',
          options: {
            colors: ["#14a072"],
            chart: {
              height: 450,
              color:'#14a072',
              type: 'radialBar',
          },
          title: {
            text: 'Crecimiento',
            //offsetX: 110
          },
          labels: [textoRadiaBarUltimo],
          plotOptions: {
          
                  radialBar: {
                    background:'#14a072',
                    hollow: {
                      color:'#14a072',
                      size: "50%",
                    },
                    total:{

                      color:'#14a072',
                      show: true,
                    },
                    value:{
                      color:'#14a072',

                      show: true,
                    },
                    dataLabels:{
                      color:'#14a072',
                      value:{
                        show: true,
                      },
                    },
                    fill: {
                      color: '#14a072',
                    }
                  },
                },
              }
         
       
        }
      );



      setEjemploRadial2({
        ...ejemploRadial2,
  
        series: [crecimiento_ventas2],
        options: {
        colors: ["#75d119"],
          chart: {
            height: 350,
            type: 'radialBar',
        },
        title: {
          text: 'Crecimiento',
          //offsetX: 110
        },
        labels: [textoRadiaBarAnterior],
        plotOptions: {
                radialBar: {
                  hollow: {
                    size: "50%",
                  },
                  total:{
                    show: true,
                  },
                  value:{
                    show: true,
                  },
                  dataLabels:{
                    value:{
                      show: true,
                    },
                  },
             
                },
              },
            }
       
     
      }
    );

          setEjemploOptionColumnChart2({
            ...ejemploOptionChart2,
            series: [{
              name: 'costo ventas',
               type: 'column',
              color:'#8b0000',
              data: costoV
            }, {
              name: 'costo materia prima',
              type: 'line',
              data: costoM
            }],
            xaxis: {
              categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
          });


          setChartCrecimiento({
            ...chartCrecimiento,
            xaxis: {
              categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
            series: [{
              name: 'Ventas',
              type: 'column',
              color:'#800080',
              data: saldo,
              categories: ['2021', '2022', '2023', '2027']

            }, {
              name: 'Crecimiento',
              type: 'line',
              color: '#ffdf00',
              curve: 'smooth',
              data: crecimiento,
              categories: ['2021', '2022', '2023', '2027']

            },
          ],

          options: {
            chart: {
              height: 350,
              type: 'line',
              toolbar: {
                show: false,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true | '<img src="/static/icons/reset.png" width="20">',
                  customIcons: []
                },
            },
          },
          plotOptions: {
            bar: {
            
           
             columnWidth: "40%",
            },
          },
            stroke: {
              width: [0, 4]
            },
            grid: {
              show:false,
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 4
            },
            title: {
              text: 'Evolución ingresos'
            },
            dataLabels: {
              enabled: false,
              enabledOnSeries: [1],
              formatter: function(val, opt) {
                return val+"%"
            },
            },
            tooltip: {
              shared: false,
              intersect: true,
              y: [{
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toFixed(0) + "$";
                  }
                  return y;
                  
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toFixed(2) + "%";
                  }
                  return y;
                  
                }
              }]
              
            },
            labels: labels,
            yaxis: [{
              labels: {
                show: false,
              },
              title: {
                text: '',
              },
            
            }, {
              opposite: true,
              labels: {
                show: false,
              },
              title: {
                text: ''
              }
            }] 
            }
        
          
          
         
          
          });



          setChartGastosAdm({
            ...chartGastosAdm,
            series: [{
              name: 'Ventas',
              type: 'column',
              data: saldo
            }, 
            {
              name: 'costos ventas',
              type: 'column',
              data: costoV
            },
            {
              name: 'gastos adm y ventas',
              type: 'column',
              data: gastosAdmon
            },
            
            {
              name: 'Margen operacional',
              type: 'line',
              height: 350,
              curve: 'smooth',
              data: margenOperacional
            }],
            xaxis: {
              categories: ['2021', '2022', '2023', '2024']
            },
          });



          setejemplolinea({
            ...ejemplolinea,
            series: [
            {
              name: 'Costos ventas',
              type: 'column',
              color:'#d38226',
              data: costoV
            },
            {
              name: 'Ventas',
              type: 'column',
              color:'#FF4500',
              data: saldo
            }, 
            {
              name: '% costos sobre ventas',
              type: 'line',
              color:'#14a072',
              curve: 'smooth',
              data: porcentCostVentas
            },      
          ],
          options : {
            series: [
          ],
            chart: {
            height: 350,
            stacked: true,
            type: 'line',
            toolbar: {
              show: false,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
              },
          },
        },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: [1, 1, 4]
          },
          grid: {
            show:false,
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          plotOptions: {
            bar: {
            
              columnWidth: "40%",
            },
          },
          markers: {
            size: 5
          },
          title: {
            text: 'Costos ventas',
            //offsetX: 110
          },
          xaxis: {
            categories: labels,
          },
          yaxis: [
            {
              min: 0,
              max: 800000000,
              forceNiceScale: true,
              seriesName: 'Income',
              labels: {
                show: false,
              },
              title: {
                text: '',
              },
            },
            {
              min: 0,
              max: 800000000,
              forceNiceScale: true,
              seriesName: 'Cashflow',
              labels: {
                show: false,
              },
              opposite: true,
              axisTicks: {
                show: false,
              },
            },
            {
           
              seriesName: 'Revenue',
              labels: {
                show: false,
              },
              opposite: true,
              title: {
                text: '',
              },
            },
           
          ],
          tooltip: {
            shared: false,
            intersect: true,
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
            y: [{
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(0) + "$";
                }
                return y;
                
              }
            }, {
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(2) + "$";
                }
                return y;
                
              }},
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toFixed(4) + "%";
                  }
                  return y;
                  
                }
            }]
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
          }
    
         
      



      
      
          });




          setejemplolinea2({
            ...ejemplolinea2,
            series: [
              {
                name: 'Gastos ventas',
                type: 'column',
                color:'#800080',
                data: gastosVentas
              },
              {
                name: 'Gastos administracion',
                type: 'column',
                color:'#14a072',
                data: gastosAdmon
              },
          
              {
                name: 'Ventas',
                color:'#2bd326',
                type: 'column',
                data: saldo
              },
              {
                name: '% gastos sobre ventas',
                type: 'line',
                color:'#FF4500',
                curve: 'smooth',
                data: porcentCostGastos
              },       
            
          ],

          options : {
            series: [
          ],
            chart: {
            height: 350,
            stacked: true,
            type: 'line',
            toolbar: {
             show: false,
             offsetX: 0,
             offsetY: 0,
             tools: {
               download: true,
               selection: true,
               zoom: true,
               zoomin: true,
               zoomout: true,
               pan: true,
               reset: true | '<img src="/static/icons/reset.png" width="20">',
               customIcons: []
             },
          },
         },
         responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 800
            },
            legend: {
              position: 'center'
            }
          }
        }],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: [1, 1, 1,4]
          },
          plotOptions: {
           bar: {
             horizontal: false,
             dataLabels: {
               total: {
                 enabled: false,
                 offsetX: 0,
                 style: {
                   fontSize: '13px',
                   fontWeight: 900
                 }
               }
             },
             columnWidth: "39%",
           },
         },
          grid: {
            show:false,
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
           size: 5
         },
          title: {
            text: 'Gastos admon y ventas',
            //offsetX: 110
          },
          xaxis: {
            categories: labels,
          },
          yaxis: [
            {
             min: 0,
             max: 800000000,
             forceNiceScale: true,
              seriesName: 'ventas',
              labels: {
                show: false,
              },
              title: {
                text: '',
              },
            },
            {
             min: 0,
             max: 800000000,
             forceNiceScale: true,
              seriesName: 'Gastos administracion',
              labels: {
                show: false,
              },
              opposite: true,
              axisTicks: {
                show: false,
              },
            },
   
            {
             min: 0,
             max: 800000000,
             forceNiceScale: true,
             seriesName: 'Gastos ventas',
             labels: {
               show: false,
             },
             opposite: true,
             axisTicks: {
               show: false,
             },
           },
           {
           
             seriesName: 'Revenue',
             labels: {
               show: false,
             },
             opposite: true,
             title: {
               text: '',
             },
           },
         
           
          ],
          tooltip: {
            shared: false,
            intersect: true,
            fixed: {
              enabled: true,
              position: 'bottomLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
            y: [{
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(0) + "$";
                }
                return y;
                
              }
            }, {
              formatter: function (y) {
                if(typeof y !== "undefined") {
                  return  y.toFixed(2) + "$";
                }
                return y;
                
              }},
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toFixed(4) + "%";
                  }
                  return y;
                  
                }
            }]
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
          }    
      
          });




          setlineaMargen({
            ...lineaMargen,
            series: [
              {
                name: "Margen bruto",
                type: 'line',
                color:'#ced114',
                curve: 'straight',
                data: margenBruto
              },
              {
                name: "Margen operacional",
                type: 'line',
                color:'#14a072',
                curve: 'straight',
                data: margenOperacional
              },
              {
                name: "Margen neto",
                type: 'line',
                color:'#cf3e13',
                curve: 'straight',
                data: margenNeto
              }
            ],


            options: {
              series: [
              ],
              chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['#77B6EA', '#545454'],
              dataLabels: {
                enabled: false, 
                align: 'left',
               
              offsetX: 7,
              offsetY: 0,    
                formatter: function(val, opt) {
                  return val.toFixed(0) + "%";
              },
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Márgenes',
                align: 'left'
              },
              grid: {
                show:false,
                borderColor: '#e7e7e7',
                align: 'left',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                size: 5
              },
              tooltip: {
                shared: false,
                intersect: true,
                y: {
                  formatter: function (y) {
                    if(typeof y !== "undefined") {
                      return  y.toFixed(0) + "%";
                    }
                    return y;
                    
                  }
                }
              },
              xaxis: {
                categories: labels,
                title: {
                  text: ''
                }
              },
              yaxis: {
                labels: {
                  show: false,
                },
                title: {
                  text: ''
                },
                gridLines: {
                  drawBorder: false,
              },
             
              },
          
              legend: {
                enabled:true,
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
              
              },
              yaxis: {
                labels: {
                  formatter: function (y) {
                    return y.toFixed(0);
                  },
                },
              },
      
      
          });




          setEjemploOptionColumnChart4({
            ...ejemploOptionChart4,
            series: [{
              name: 'gastos administración',
              data: gastosAdmon
            }, {
              name: 'gastos personal',
              data: gastosPer
            },
            {
              name: 'honorarios',
              data: gastosHono
            },
            
            {
              name: 'impuestos',
              data: gastosImp
            },
            {
              name: 'arrendamientos',
              data: gastosArrend
            },
            {
              name: 'servicios',
              type: 'column',
              data: gastosServ
            },
            {
              name: 'gastos legales',
              data: gastosLegales
            },
            {
              name: 'gastos de viaje',
              data: gastosViaje
            },
            {
              name: 'gastos diversos',
              data: gastosDiver
            }         
          ],
            xaxis: {
              categories: ['ese-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
          });



          setejemploChart3({
            ...ejemploChart3,
            data:utilidad
          });
          setOptionChart1indice({
          ...optionChart1indice,
          data:[44]
        });
          setEjemploOptionColumnChart3({
            ...ejemploOptionChart3,
            xaxis: {
              categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
          });


          setejemploChartMargen({
            ...ejemploChartMargen,
            data:margenBruto
          });

          setEjemploOptionColumnChartMargen({
            ...ejemploOptionChartMargen,
            xaxis: {
              categories: ['enero-marzo', 'marzo-junio', 'junio-septiembre', 'septiembre-diciembre']
            },
          });
          
       
          
          setEjemploTortaOptionChart({
            ...ejemploOptionTortaChart1,
            series: [1, 2],
            labels: ["utilidad","perdidas"]
          });


          setAccumTotalChart({
            ...accumTotalChart,
            data:
              totalReturnY.length > 100
                ? arrayFilter(totalReturnY, 100)
                : totalReturnY,
          });
          setOptionColumnChart({
            ...optionColumnChart,
            xaxis: {
              categories:
                totalReturnX.length > 100
                  ? arrayFilter(totalReturnX, 100)
                  : totalReturnX,
            },
          });
          setOptionChart1({
            ...optionChart1,
            xaxis: {
              categories:
                totalReturnX.length > 200
                  ? arrayFilter(totalReturnX, 200)
                  : totalReturnX,
            },
          });
          setDailyReturnC({
            ...dailyReturnC,
            data:
              dailyReturn.length > 200
                ? arrayFilter(dailyReturn, 200)
                : dailyReturn,
          });
          setOptionChart2({
            ...optionChart2,
            xaxis: {
              categories:
                totalDates.length > 200
                  ? arrayFilter(totalDates, 200)
                  : totalDates,
            },
          });
          setReturnOnWinnersTotal(returnWinTotal);
          setReturnOnWinnersChart({
            ...returnOnWinnersChart,
            data:
              returnWin.length > 200 ? arrayFilter(returnWin, 200) : returnWin,
          });
          setReturnOnLosersTotal(returnLoseTotal);
          setReturnOnLosersChart({
            ...returnOnLosersChart,
            data:
              returnLose.length > 200
                ? arrayFilter(returnLose, 200)
                : returnLose,
          });
          setReturnLongTotal(returnLongTotal);
          setReturnLongChart({
            ...returnLongChart,
            data:
              returnLong.length > 200
                ? arrayFilter(returnLong, 200)
                : returnLong,
          });
          setReturnShortTotal(returnShortTotal);
          setReturnShortChart({
            ...returnShortChart,
            data:
              returnShort.length > 200
                ? arrayFilter(returnShort, 200)
                : returnShort,
          });
          setBiggestProfitT(biggestProfit);
          setBiggestLoseT(biggestLose);
          setWinLoseRatio(returnWin.length / returnLose.length);
          setClosedTradesTotal(totalClosedTrades);
          setAllTradesTotal(totalTrades);
          setOpenTradesTotal(totalOpenTrades);
          setClosedTradesChart({
            ...closedTradesChart,
            data:
              closedTrades.length > 200
                ? arrayFilter(closedTrades, 200)
                : closedTrades,
          });
          setAllTradesChart({
            ...allTradesChart,
            data:
              dailyTrades.length > 200
                ? arrayFilter(dailyTrades, 200)
                : dailyTrades,
          });
          setOpenTradesChart({
            ...openTradesChart,
            data:
              openTrades.length > 200
                ? arrayFilter(openTrades, 200)
                : openTrades,
          });
          setAvgNumTrades(totalTrades / totalDates.length);
          setTotalWin(totalWinner);
          setTotalWinChart({
            ...totalWinChart,
            data:
              dailyWinners.length > 200
                ? arrayFilter(dailyWinners, 200)
                : dailyWinners,
          });
          setTotalLoss(totalLoser);
          setTotalLossChart({
            ...totalLossChart,
            data:
              dailyLosers.length > 200
                ? arrayFilter(dailyLosers, 200)
                : dailyLosers,
          });
          setBeTotal((beCount * 100) / totalTrades);
          setTotalBeChart({
            ...totalBeChart,
            data: dailyBe.length > 200 ? arrayFilter(dailyBe, 200) : dailyBe,
          });
          setOpenPercent((totalOpenTrades * 100) / totalTrades);
          setAccumReturnPercentTotal(returnPercentTotal);
          setAccumReturnPercentSeries({
            ...accumReturnPercentSeries,
            data:
              returnPercentSeries.length > 100
                ? arrayFilter(returnPercentSeries, 100)
                : returnPercentSeries,
          });
          setBiggestPercentProfit(biggestPercentProfit);
          setBiggestPercentLose(biggestPercentLose);
          setPercentProfitsChart({
            ...percentProfitsChart,
            data:
              percentProfits.length > 100
                ? arrayFilter(percentProfits, 100)
                : percentProfits,
          });
          setPercentLosesChart({
            ...percentLosesChart,
            data:
              percentLoses.length > 100
                ? arrayFilter(percentLoses, 100)
                : percentLoses,
          });
          setTotalReturnNet(totalReturnNet);
          setTotalReturnNetChart({
            ...totalReturnNetChart,
            data:
              totalReturnNetArray.length > 0
                ? arrayFilter(totalReturnNetArray, 100)
                : totalReturnNetArray,
          });
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
    })();
  }, [selected, filters]);

  return (
    <Stack>
      {/*
      {isLoading? (
        <Stack width="100%" justifyContent="center" alignItems="center">
          <Spinner /> */}

      {EstadoData? (
         <Fade in={true} timeout={3600}>
         <Paper sx={{ width: "100%", mb: 2 }}>
           <Stack py={10} alignItems="center" color="text.disabled">
             <TextSnippetIcon sx={{ fontSize: 120 }} />
             <Typography variant="h4">No data to display</Typography>
           </Stack>
         </Paper>
       </Fade>
      ) : (
        <Box>
        <Grid container spacing={{ xs: 0, md: -4 }}>

          {/*
        <Grid  item xs={12} md={6} lg={3} mx={-1}>
            <Paper sx={{ p: 2 }} style={{ borderRadius: 40 / 2 ,width:'50%',height:'80%'}}>
              <Typography style={{ color: '#2271b3' }}>Margen bruto</Typography>
              <Typography variant="h5" mb={1}>
                <b style={{ color: '#2271b3' }}>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={ejemploOptionChart3}
                series={[ejemploChart3]}
                type="area"
                height={50}
                color="#FEB019"
              />
            </Paper>
          </Grid>

          
          <Grid  item xs={25} md={16} lg={3} mx={-15}>
            <Paper sx={{ p: 2 }} style={{ borderRadius: 40 / 2,width:'50%',height:'80%' }}>
              <Typography style={{ color: '#2271b3' }}>Utilidad neta</Typography>
              <Typography variant="h5" mb={1}>
                <b style={{ color: '#2271b3' }}>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={ejemploOptionChart3}
                series={[ejemploChart3]}
                type="area"
                height={50}
                color="#FEB019"
              />
            </Paper>
          </Grid>

          */}
     <Grid  >
       <Paper sx={{ p: 1 }} >
              <Typography variant="subtitle1"></Typography>
         
         <Chart options={ejemploRadial.options} series={ejemploRadial.series} type="radialBar"  height={215} width="280" />
       </Paper>
       </Grid>

       <Grid sx={{mx: 1  }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1"></Typography>
              <Chart options={chartCrecimiento.options} series={chartCrecimiento.series} type="line"  height={200} width="450" />

            </Paper>
            </Grid>

            <Grid sx={{mx: 0  }}>
            <Paper sx={{ p: 1 }} >
              <Typography variant="subtitle1"></Typography>
              <Chart options={ejemplolinea.options} series={ejemplolinea.series} type="line"  height={200} width="450" />

            </Paper>
            </Grid>
         


      
       {/*
            <Grid  sx={{ mx: -4, my: -4 }}>
         
           
         <Chart options={ejemploRadial.options} series={ejemploRadial.series} type="radialBar"  height={200} width="200" />

       </Grid>

      */}
      

      {/*
       <Grid  sx={{ mx: -4, my: -4 }}>
         
           
         <Chart options={ejemploRadial.options} series={ejemploRadial.series} type="radialBar"  height={200} width="200" />

       </Grid> */}
   
          
       {/*


          <Grid item xs={22} md={6} lg={3} mx={-47}>
            <Paper sx={{ p: 1 }} style={{ borderRadius: 40 / 2,width:'60%' }}>
              <Typography variant="subtitle1">% ganancias</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart options={ejemploOptionTortaChart1.options} series={ejemploOptionTortaChart1.series} type="donut"  height={280} width="280" />

            </Paper>
          </Grid>*/}

<Grid >
       <Paper sx={{ p: 1 }} >
              <Typography variant="subtitle1"></Typography>
         
         <Chart options={ejemploRadial2.options} series={ejemploRadial2.series} type="radialBar"  height={215} width="280" />
       </Paper>
       </Grid>


            <Grid sx={{mx: 1  }}>
            <Paper sx={{ p: 1 }} >
              <Typography variant="subtitle1"></Typography>
              <Chart options={lineaMargen.options} series={lineaMargen.series} type="line"  height={200} width="450" />

            </Paper>
            </Grid>


       

       
{/*
            <Grid  sx={{ mx: -4, my: -4 }}>
         
           
              <Chart options={ejemploRadial.options} series={ejemploRadial.series} type="radialBar"  height={300} width="300" />

            </Grid>
*/}


{/*

            <Grid  sx={{ mx: 7, my: 1 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1"></Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart options={chartCrecimiento.options} series={chartCrecimiento.series} type="line"  height={250} width="350" />

            </Paper>
            </Grid>


          
             
          <Grid  sx={{ mx: 30, my: 1 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Ventas año 2023</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart
                options={ejemploOptionChart1}
                series={[ejemploChart1]}
                type="bar"
                height={350}
                width="500"
                color="#FEB019"
              />
            </Paper>
            </Grid>



            <Grid>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Costo de ventas 2023</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart options={ejemploOptionChart2.options} series={ejemploOptionChart2.series} type="line"  height={350} width="500" />

            </Paper>
            </Grid>

          

            <Grid  sx={{ mx: 30, my: 1 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Gastos administración 2023</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart options={ejemploOptionChart4.options} series={ejemploOptionChart4.series} type="bar"  height={600} width="800" />

            </Paper>
            </Grid>


            <Grid>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Utilidad bruta 2023</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart
                options={ejemploOptionChart3}
                series={[ejemploChart3]}
                type="bar"
                height={350}
                width="500"
                color="#FEB019"
              />
            </Paper>
            </Grid>


{/*
            <Grid sx={{ mx: 17 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Margen bruto 2023</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart
                options={ejemploOptionChartMargen}
                series={[ejemploChartMargen]}
                type="bar"
                height={350}
                width="500"
                color="#FEB019"
              />
            </Paper>
            </Grid>




            <Grid  sx={{ mx: 30, my: 1 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">ejemplo</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart options={ejemplolinea.options} series={ejemplolinea.series} type="line"  height={500} width="800" />

            </Paper>
            </Grid>
*/}





            <Grid sx={{mx: 0  }}>
            <Paper sx={{ p: 1 }} >
              <Typography variant="subtitle1"></Typography>
              <Chart options={ejemplolinea2.options} series={ejemplolinea2.series} type="line"  height={200} width="450" />

            </Paper>
            </Grid>

    
          </Grid> 
          </Box>
        
      )}
    </Stack>
  );
}
