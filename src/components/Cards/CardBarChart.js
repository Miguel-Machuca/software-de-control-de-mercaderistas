import React, { useEffect, useState } from "react";
import { obtenerOrdenTrabajosEstadoFecha } from "dato/OrdenTrabajoDato";
import Chart from "chart.js";

export default function CardBarChart() {
  const [ordenTrabajos, setOrdenTrabajos] = useState([]);

  useEffect(() => {
    const unsubscribe = obtenerOrdenTrabajosEstadoFecha(setOrdenTrabajos);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const conteoEstados = (ordenes) => {
      const meses = Array(12).fill(0);
      const completados = Array(12).fill(0);
      const incumplidos = Array(12).fill(0);

      ordenes.forEach(orden => {
        const fecha = new Date(orden.fecha);
        const mes = fecha.getMonth();

        meses[mes] += 1;
        if (orden.estado === "Completado") {
          completados[mes] += 1;
        } else if (orden.estado === "Incumplido") {
          incumplidos[mes] += 1;
        }
      });

      return { meses, completados, incumplidos };
    };

    const { meses, completados, incumplidos } = conteoEstados(ordenTrabajos);

    const config = {
      type: "bar",
      data: {
        labels: [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo",
          "Junio", "Julio", "Agosto", "Septiembre",
          "Octubre", "Noviembre", "Diciembre"
        ],
        datasets: [
          {
            label: "Incumplido",
            backgroundColor: "#d50523",
            borderColor: "#d50523",
            data: incumplidos,
            fill: false,
            barThickness: 8,
          },
          {
            label: "Completado",
            backgroundColor: "#009929",
            borderColor: "#009929",
            data: completados,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false, // Desactivar líneas de cuadrícula en el eje X
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: false, // Desactivar líneas de cuadrícula en el eje Y
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1, // Asegura que los ticks sean números enteros
            },
          }],
        },
      },
    };

    const ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [ordenTrabajos]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Desempeño
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Ordenes Totales {new Date().getFullYear()}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
