import fetchGet from "./FetchGet";

const getReportCounts = async () => {
  try {
      const reports = await fetchGet(`https://mantenimientoautosbackend.onrender.com/mantenimientos/countReportesPorPlaca`);
      return reports
      } catch (error) {
        console.error(`Error fetching reports for ${error}:`, error);
      }
}
export default getReportCounts;

