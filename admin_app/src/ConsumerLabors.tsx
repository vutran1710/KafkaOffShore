import * as React from 'react'
import Chart from 'chart.js'
import 'chartjs-plugin-datalabels'

const BarColors = {
  red: "rgba(255, 99, 132, 0.8)",
  yellow: "rgba(255, 185, 86, 0.8)",
  green: "rgba(75, 222, 132, 0.8)",
  blue: "rgba(54, 162, 235, 0.8)",
  purple: "rgba(153, 102, 255, 0.8)",
}

export default class ConsumerLabors extends React.Component {
  CHART = undefined

  componentDidUpdate() {
    const {
      consumers,
      colors,
    } = this.props

    console.log('consumer', consumers)
    const chartData = {
      labels: Object.keys(consumers),
      datasets: [{
        backgroundColor: Object.values(colors).map(k => BarColors[k]),
        data: Object.values(consumers),
      }]
    }

    if (!this.CHART) {
      const ctx = document.getElementById('labor-chart').getContext('2d') as HTMLCanvasElement

      this.CHART = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          animation: {
            duration: 0,
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              ticks: {
                min: 0,
                stepSize: 1,
                maxTicksLimit: 10,
                padding: 10,
                display: false,
              },
              gridLines: {
                display: false,
                drawBorder: false,
                drawTicks: false,
              },
            }],
            yAxes: [{
              barThickness: 17,
              gridLines: {
                display: false,
                drawBorder: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              }
            }]
          },
          plugins: {
            datalabels: {
              color: '#555',
              anchor: 'end',
              align: 'end',
              clamp: false,
              textAlign: 'end',
              formatter: (v: number) => v,
            },
          },
        },
      })

    } else {
      this.CHART.data = chartData
      this.CHART.update()
    }
  }

  render() {
    return (
      <div className="container chart-container">
        <div className="container-header">
          Worker Labor Graph
        </div>
        <div>
          <canvas id="labor-chart" style={{ height: 114 }} />
        </div>
      </div>
    )
  }
}
