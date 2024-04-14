import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const QuesCharts = ({ selectedQuestion, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // Destroy the previous chart instance
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current && selectedQuestion) {
      const selectedQuestionData = data.find(
        (question) => question.id === selectedQuestion
      );

      if (selectedQuestionData) {
        const { text, responses } = selectedQuestionData;
        const numResponses = Object.keys(responses).length;

        if (numResponses === 1) {
          // For text field questions, render a message
          chartRef.current.innerHTML = "Text field question";
          return;
        }

        let chartType = "bar";
        let chartData = {
          labels: Object.keys(responses),
          datasets: [
            {
              label: "Responses",
              backgroundColor: [
                "rgba(51, 204, 0, 0.7)",
                "rgba(2, 136, 209, 0.7)",
                "rgba(255, 255, 0, 0.7)",
                "rgba(255, 0, 0 , 0.7)",
                "rgba(255,140,0, 0.7)",
                "rgba(128,0,128, 0.7)",
              ],
              borderColor: "rgb(250, 249, 246)",
              borderWidth: 1.5,
              hoverBackgroundColor: [
                "rgba(51, 204, 0, 1)",
                "rgba(2, 136, 209, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(255, 0, 0 , 1)",
                "rgba(255,140,0, 1)",
                "rgba(128,0,128, 1)",
              ],
              hoverBorderColor: "black",
              data: Object.values(responses),
            },
          ],
        };

        if (numResponses === 2) {
          chartType = "doughnut";
        } else if (numResponses >= 3 && numResponses <= 5) {
          chartType = "bar";
        } else {
          chartType = "polarArea";
        }

        const chartOptions = {
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
        };

        // Create a new chart instance
        chartInstanceRef.current = new Chart(chartRef.current, {
          type: chartType,
          data: chartData,
          options: chartOptions,
        });
      }
    }

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedQuestion, data]);

  return (
    <div className="w-1/2 p-4 bg-n-6 rounded-r-xl">
      <canvas
        ref={chartRef}
        style={{ backgroundColor: "transparent" }}
      ></canvas>
    </div>
  );
};

export default QuesCharts;
