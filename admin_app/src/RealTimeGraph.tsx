import * as React from 'react'
import Chart from 'chart.js'
import 'chartjs-plugin-streaming'

type Props = {
  pulse: any;
  colors: any;
}

export default class RealTimeGraph extends React.Component<Props, {}> {
  CHART = undefined

  componentDidUpdate() {
    const {
      pulse,
      colors,
    } = this.props

    if (!this.CHART) {
      const ctx = document.getElementById('realtime-chart').getContext('2d') as HTMLCanvasElement

      this.CHART = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: []
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                duration: 20000,    // data in the past 20000 ms will be displayed
                refresh: 1000,      // onRefresh callback will be called every 1000 ms
                delay: 1000,        // delay of 1000 ms, so upc oming values are known before plotting a line
                pause: false,       // chart is not paused
              },
            }],
            yAxes: [{
              ticks: {
                max: 5,
                min: -1,
                stepSize: 1
              }
            }]
          },
        }
      })
    } else {
      this.CHART.data.datasets = Object.values(pulse)
      this.CHART.update({ preservation: true })
    }
  }

  render() {
    return (
      <div className="container chart-container">
        <div className="container-header">
          Real-Time Graph
        </div>
        <div>
          <canvas id="realtime-chart" style={{ height: 114 }} />
        </div>
      </div>
    )
  }
}
