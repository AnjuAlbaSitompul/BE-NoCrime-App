import { Expo } from "expo-server-sdk";
import { ResponseError } from "../error/responseError.js";

// Fungsi untuk mengirim notifikasi
async function sendNotification(tokens, message) {
  let expo = new Expo({
    useFcmV1: true,
  });

  let messages = [];

  for (let token of tokens) {
    // Periksa apakah token Expo Push valid
    if (!Expo.isExpoPushToken(token)) {
      throw new ResponseError("Not a valid Expo Push Token", 400);
    }

    // Buat pesan notifikasi
    messages.push({
      to: token,
      sound: "default",
      body: message.body,
      title: message.title,
      data: message.data || {},
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
}

export { sendNotification };
