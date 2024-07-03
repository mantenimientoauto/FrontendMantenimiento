import fetchGet from "./FetchGet";

const getReportCounts = async (data) => {
  const counts = await Promise.all(
    data.map(async (item) => {
      try {
        const reports = await fetchGet(`https://mantenimientoautosbackend.onrender.com/mantenimientos/registros/${item.placa}`);
        const totalReports = reports.length;
        const verifiedReports = reports.filter((report) => report.estado).length;
        return { placa: item.placa, totalReports, verifiedReports };
      } catch (error) {
        console.error(`Error fetching reports for ${item.placa}:`, error);
        return { placa: item.placa, totalReports: 0, verifiedReports: 0 }; // Retornar 0 si hay error
      }
    })
  );

  const countsMap = counts.reduce((acc, count) => {
    acc[count.placa] = count;
    return acc;
  }, {});

  return countsMap;
};

export default getReportCounts;

