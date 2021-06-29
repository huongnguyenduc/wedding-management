import React from 'react'
import Chart from "react-apexcharts";
import {Container } from '@material-ui/core';

function MonthlyRevenueChart(props) 
{
    const { title,series, labels, ...other} = props
    const chartOptions =  {
          
        series: series,
        options: {
          chart: {
            width: 500,
            type: 'donut',
            toolbar: {
              show: true,
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
              export: {
                csv: {
                  filename: undefined,
                  columnDelimiter: ',',
                  headerCategory: 'category',
                  headerValue: 'value',
                  dateFormatter(timestamp) {
                    return new Date(timestamp).toDateString()
                  }
                },
                svg: {
                  filename: undefined,
                },
                png: {
                  filename: undefined,
                }
              },
              autoSelected: 'zoom' 
            },
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
            }
          },
          labels: labels,
          dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8
            }
          },
          fill: {
            type: 'gradient',
          },
          legend: {
            formatter: function(val, opts) {
              return val + " - Số lượng: " + opts.w.globals.series[opts.seriesIndex]
            },
            position: 'left'
          },
          title: {
            text: title,
            floating: true,
            offsetY: 0,
            offsetX:50,
            align: 'left',
            style: {
                color: '#444',
                fontSize:'20px',
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              },
              title:{
                offsetX:0,
                offsetY: 130,
                align: 'center',
                style: {
                    color: '#444',
                    fontSize:'20px',
                }
              }
            }
          }]
        },
      
      
      };
      
    return (
    <Container maxWidth='lg' id="chart" {...other}>
        <Chart options={chartOptions.options} series={chartOptions.series} type="donut" height={400}/>
    </Container>
    )
}

export default MonthlyRevenueChart