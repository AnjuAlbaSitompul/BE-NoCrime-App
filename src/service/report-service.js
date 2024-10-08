import { prismaClient } from "../application/database.js";
import { KMeans } from "../utils/kmeans.js";
import { sendNotification } from "../utils/notification.js";
import { addReportValidation } from "../validation/report-validation.js";
import { validate } from "../validation/validate.js";

const addReport = async (request) => {
  const report = validate(addReportValidation, request.body);

  const result = await prismaClient.report.create({
    data: {
      userId: request.id,
      typeId: report.typeId,
      subdistrictId: report.subdistrictId,
      latitude: report.latitude,
      longitude: report.longitude,
    },
    select: {
      id: true,
      types: {
        select: {
          name: true,
          level: true,
        },
      },
      subdistricts: {
        select: {
          name: true,
        },
      },
      latitude: true,
      longitude: true,
      createdAt: true,
    },
  });

  if (result) {
    const admin = await prismaClient.user.findMany({
      where: {
        role: "ADMIN",
      },
    });

    const getToken = await prismaClient.notificationToken.findMany({
      where: {
        userId: {
          in: admin.map((item) => item.id),
        },
      },
    });

    const token = getToken.map((item) => item.token);
    await sendNotification(token, {
      body: "Ada laporan baru",
      title: "Laporan Baru",
    });
  }

  return result;
};

const getReport = async (request) => {
  const { cursor, take = 10 } = request.query;

  const cursorObj = cursor ? { id: parseInt(cursor) } : undefined;
  const result = await prismaClient.report.findMany({
    take: parseInt(take),
    cursor: cursorObj,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      status: true,
    },
    select: {
      id: true,
      types: {
        select: {
          name: true,
          level: true,
        },
      },
      subdistricts: {
        select: {
          name: true,
        },
      },
      latitude: true,
      longitude: true,
      createdAt: true,
    },
  });

  return result;
};

const getAdminReport = async (request) => {
  const { cursor, take = 10 } = request.query;
  const cursorObj = cursor ? { id: parseInt(cursor) } : undefined;
  const result = await prismaClient.report.findMany({
    take: parseInt(take),
    cursor: cursorObj,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      types: {
        select: {
          name: true,
          level: true,
        },
      },
      subdistricts: {
        select: {
          name: true,
        },
      },
      latitude: true,
      longitude: true,
      createdAt: true,
      status: true,
    },
  });

  return result;
};

const updateReport = async (request) => {
  const { id } = request.params;

  const result = await prismaClient.report.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: true,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (result) {
    const getToken = await prismaClient.notificationToken.findMany({
      where: {
        userId: result.userId,
      },
      select: {
        token: true,
      },
    });

    const token = getToken.map((item) => item.token);
    await sendNotification(token, {
      body: "Harap Berlindung Ke Tempat Yang Aman Dan Jauhi Tempat Tersebut",
      title: "Laporan Diverifikasi",
    });
  }

  return result;
};

const deleteReport = async (request) => {
  const { id } = request.params;

  const result = await prismaClient.report.delete({
    where: {
      id: parseInt(id),
    },
  });

  return result;
};

const getDangerReport = async (request) => {
  const data = await KMeans();
  return data;
};
export default {
  addReport,
  getReport,
  getDangerReport,
  getAdminReport,
  updateReport,
  deleteReport,
};
