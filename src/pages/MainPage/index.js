import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import {
  deleteNotification,
  getChatHistory,
  getLastIncomingMessages,
  getMessages,
  sendMessage,
} from '../../api/chat';

import ChatWindow from './ChatWindow';

import { ReactComponent as UserAvatar } from '../../assets/userLogo.svg';

import './styled.css';

function MainPage() {
  const { user } = useAuth();
  const { idInstance, apiTokenInstance } = user;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newChat, setNewChat] = useState(null);
  const [incommingMessage, setIncommingMessage] = useState(null);

  // const getLastMessages = useMemo(() => {
  //   getLastIncomingMessages(idInstance, apiTokenInstance).then((data) =>
  //     console.log(data),
  //   );
  // }, [idInstance, apiTokenInstance, getLastIncomingMessages]);

  // useEffect(() => {
  //   // setInterval(() => reloadNot(), 5000);
  //   // getLastIncomingMessages(idInstance, apiTokenInstance).then((data) =>
  //   //   console.log(data),
  //   // );
  //   // console.log(getLastMessages);
  // }, [getLastMessages]);

  function reloadNot() {
    getMessages(idInstance, apiTokenInstance)
      .then((data) => {
        console.log(data);
        if (data == null) {
          console.log('Новых сообщений нету, создайте чат и начните общение');
        } else {
          deleteNotification(idInstance, apiTokenInstance, data.receiptId);
          if (data.body.typeWebhook === 'incomingMessageReceived') {
            setIncommingMessage({
              message: data.body.messageData.textMessageData.textMessage,
              senderName: data.body.senderData.senderName,
              sender: data.body.senderData.sender,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }

  const chatHandleChange = (event) => {
    // setNewChat(event.target.value);
  };

  const chatHandleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      setNewChat(event.target.value + '@c.us');
      setIsChatOpen(true);
      // getChatHistory(idInstance, apiTokenInstance, `${newChat}@c.us`)
      //   .then((data) => console.log(data))
      //   .catch((e) => console.log(e));
    }
  };

  const closeChat = (event) => {
    if (event.key === 'Escape') {
      console.log('ChatOpen: false');
      setIsChatOpen(false);
    }
  };

  return (
    <div className="MainWrapper" onKeyDown={closeChat}>
      <button onClick={() => reloadNot()}>RELOAD</button>
      <div className="mainContainer">
        <div className="chatListContainer">
          <div className="newChatInputWrapper">
            <input
              className="newChatInput"
              type="text"
              placeholder="Создать чат"
              onChange={chatHandleChange}
              onKeyDown={chatHandleKeyDown}
            />
          </div>
          {incommingMessage ? (
            <div
              className="messageFromUserWrapper"
              onClick={() => {
                setIsChatOpen(true);
                setNewChat(incommingMessage.sender);
              }}
            >
              <UserAvatar className="userAvatar" />
              <div className="fromUserTextContainer">
                <h3 className="userTextName">{incommingMessage.senderName}</h3>
                <span className="usertextContent">
                  {incommingMessage.message}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <ChatWindow
          isChatOpen={isChatOpen}
          sendMessage={sendMessage}
          chatId={newChat}
        />
      </div>
    </div>
  );
}

export default MainPage;
