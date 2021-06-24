import React from 'react'
import Chart from "react-apexcharts";
import {Container } from '@material-ui/core';

function MonthlyRevenueChart(props) 
{
    const {Title, categories, data, format, ...other} = props
    const chartOptions =
        {
          
            series: [{
              name: 'chart',
              data: data
            }],
            options: {
              chart: {
                height: 420,
                type: "bar"
              },
              plotOptions: {
                bar: {
                  borderRadius: 0,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                  
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + format;
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },              
              xaxis: {
                labels: {
                  rotate: -45
                },
                categories: categories,
                tickPlacement: 'on',
                axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  crosshairs: {
                    fill: {
                      type: 'gradient',
                      gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      }
                    }
                  },
                  tooltip: {
                    enabled: true,
                }
              },
              yaxis: {
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + format;
                  }
                }
              },
              title: {
                text: Title,
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                  color: '#444',
                  fontSize:'20px'
                }
              }
             
            }
        }
      
    return (
    <Container maxWidth='lg' id="chart" {...other}>
        <Chart options={chartOptions.options} series={chartOptions.series} type="bar" height={420}  />
    </Container>
    )
}

export default MonthlyRevenueChart