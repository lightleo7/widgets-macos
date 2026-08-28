
document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const cpuValue =
      document.getElementById("cpu-value");

    const ramValue =
      document.getElementById("ram-value");

    const ramDetails =
      document.getElementById("ram-details");

    const updated =
      document.getElementById("updated");


    async function updateMetrics() {

      try {

        const {
          cpu_usage,
          ram_usage,
          ram_used_gb,
          ram_total_gb
        } = await tauri.invoke(
          "get_system_metrics"
        );


        cpuValue.textContent =
          cpu_usage.toFixed(1);

        ramValue.textContent =
          ram_usage.toFixed(1);

        ramDetails.textContent =
          `${ram_used_gb.toFixed(1)} / ` +
          `${ram_total_gb.toFixed(1)} GB`;


        updated.textContent =
          new Date().toLocaleTimeString(
            "ru-RU",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }
          );

      } catch (error) {

        console.error(error);

        cpuValue.textContent = "--";
        ramValue.textContent = "--";
        ramDetails.textContent =
          "Нет данных";
      }
    }


    updateMetrics();

    setInterval(
      updateMetrics,
      500
    );

  }
);