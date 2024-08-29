import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { obtenerOrdenTrabajosEstadoFecha } from "../../dato/OrdenTrabajoDato";

export default function CardLineChart() {
  const [ordenTrabajos, setOrdenTrabajos] = useState([]);

  useEffect(() => {
    const unsubscribe = obtenerOrdenTrabajosEstadoFecha(setOrdenTrabajos);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (ordenTrabajos.length === 0) return;

    const estadosPorMes = ordenTrabajos.reduce((acc, trabajo) => {
      const mes = new Date(trabajo.fecha).getMonth();
      if (!acc[mes]) {
        acc[mes] = { completado: 0, incumplido: 0, asignado: 0 };
      }
      acc[mes][trabajo.estado.toLowerCase()]++;
      return acc;
    }, {});

    const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const completados = labels.map((_, idx) => estadosPorMes[idx]?.completado || 0);
    const incompletos = labels.map((_, idx) => estadosPorMes[idx]?.incumplido || 0);
    const asignados = labels.map((_, idx) => estadosPorMes[idx]?.asignado || 0);

    const config = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Completado",
            backgroundColor: "#009929",
            borderColor: "#009929",
            data: completados,
            fill: false,
          },
          {
            label: "Incumplido",
            fill: false,
            backgroundColor: "#d50523",
            borderColor: "#d50523",
            data: incompletos,
          },
          {
            label: "Asignado",
            fill: false,
            backgroundColor: "#ff6347",
            borderColor: "#ff6347",
            data: asignados,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Estado de Ordenes de Trabajo",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
                beginAtZero: true,
                stepSize: 1, // Asegura que los ticks sean números enteros
              },
              display: true,
              gridLines: {
                borderDash: [3],
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
              },
            },
          ],
        },
      },
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    if (window.myLine) {
      window.myLine.destroy();
    }
    window.myLine = new Chart(ctx, config);
  }, [ordenTrabajos]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Descripción general
              </h6>
              <h2 className="text-white text-xl font-semibold">Ordenes</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
