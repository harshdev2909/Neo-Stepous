"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function MarketTrendsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const btcData = [56000, 57200, 58500, 57800, 59200, 60100, 60500]
    const ethData = [3200, 3350, 3280, 3400, 3520, 3480, 3650]
    const solData = [105, 112, 108, 115, 120, 118, 125]

    // Create gradient for BTC
    const btcGradient = ctx.createLinearGradient(0, 0, 0, 400)
    btcGradient.addColorStop(0, "rgba(255, 99, 132, 0.5)")
    btcGradient.addColorStop(1, "rgba(255, 99, 132, 0.0)")

    // Create gradient for ETH
    const ethGradient = ctx.createLinearGradient(0, 0, 0, 400)
    ethGradient.addColorStop(0, "rgba(54, 162, 235, 0.5)")
    ethGradient.addColorStop(1, "rgba(54, 162, 235, 0.0)")

    // Create gradient for SOL
    const solGradient = ctx.createLinearGradient(0, 0, 0, 400)
    solGradient.addColorStop(0, "rgba(153, 102, 255, 0.5)")
    solGradient.addColorStop(1, "rgba(153, 102, 255, 0.0)")

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "BTC",
            data: btcData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: btcGradient,
            tension: 0.4,
            fill: true,
          },
          {
            label: "ETH",
            data: ethData,
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: ethGradient,
            tension: 0.4,
            fill: true,
          },
          {
            label: "SOL",
            data: solData,
            borderColor: "rgb(153, 102, 255)",
            backgroundColor: solGradient,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
