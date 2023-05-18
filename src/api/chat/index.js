import { api } from '..';

export function sendMessage(idInstance, apiTokenInstance, chatId, message) {
  return api.post(`/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
    chatId: chatId,
    message: message,
  });
}

export function getMessages(idInstance, apiTokenInstance) {
  return api.get(
    `/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
  );
}

export function deleteNotification(idInstance, apiTokenInstance, receiptId) {
  return api.delete(
    `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
  );
}

export function getChatHistory(idInstance, apiTokenInstance, chatId) {
  return api.post(
    `/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
    {
      chatId: chatId,
    },
  );
}

export function getLastIncomingMessages(idInstance, apiTokenInstance) {
  return api.get(
    `/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
  );
}
