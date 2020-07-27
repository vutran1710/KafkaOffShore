import * as React from 'react'
import Chart from 'chart.js'

type Props = {
  pulse: any;
  colors: any;
}

export default class StaticTimeGraph extends React.Component<Props, {}> {
  CHART = undefined

  componentDidUpdate() {
    const {
      pulse,
    } = this.props

    if (!this.CHART) {
      const ctx = document.getElementById('statictime-chart').getContext('2d') as HTMLCanvasElement

      this.CHART = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: []
        },
        options: {
          legend: {
            display: false,
          },
          animation: {
            duration: 0,
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: false,
              type: 'linear',
              position: 'bottom'
            }],
            yAxes: [{
              ticks: {
                max: 4,
                min: 0,
                stepSize: 1,
                padding: 10,
              }
            }]
          },
        }
      })
    } else {
      this.CHART.data.datasets = Object.values(pulse)
      this.CHART.update()
    }
  }

  render() {
    return (
      <div className="container chart-container">
        <div className="container-header">
          Static-Time Graph
        </div>
        <div style={{ padding: '0 5px' }}>
          <canvas id="statictime-chart" style={{ height: 114 }} />
        </div>
      </div>
    )
  }
}
