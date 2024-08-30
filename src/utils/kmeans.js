import { kmeans } from "ml-kmeans";
import { prismaClient } from "../application/database.js";

const KMeans = async () => {
  const data = await prismaClient.subdistrict.findMany({
    select: {
      name: true,
      Report: {
        select: {
          status: true,
        },
      },
    },
  });

  const dataResult = data.map((item) => ({
    name: item.name,
    kriminal: item.Report.filter((report) => report.status === true).length,
  }));

  const remainingData = dataResult.map((item) => [item.kriminal]);

  const result = kmeans(remainingData, 3);
  const centroids = result.centroids.map((centroid) => centroid[0]);
  const sortedCentroids = [...centroids].sort((a, b) => b - a);
  const dangerLevels = ["high", "medium", "safe"];

  const getDangerLevel = (index) => {
    const centroidValue = centroids[index];
    return dangerLevels[sortedCentroids.indexOf(centroidValue)];
  };

  const conclusion = dataResult.map((item, index) => ({
    name: item.name,
    jumlah: item.kriminal,
    level: getDangerLevel(result.clusters[index]),
  }));

  return conclusion;
};

export { KMeans };
