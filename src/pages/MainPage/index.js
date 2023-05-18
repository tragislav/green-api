import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

import { deleteNotification, getMessages, sendMessage } from '../../api/chat';

import ChatWindow from './ChatWindow';

import { ReactComponent as UserAvatar } from '../../assets/userLogo.svg';

import './styled.css';

function MainPage() {
  const { user, newMessage } = useAuth();
  const { idInstance, apiTokenInstance } = user;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newChat, setNewChat] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () =>
        getMessages(idInstance, apiTokenInstance)
          .then((data) => {
            console.log(data);
            if (data == null) {
              console.log(
                'Новых сообщений нету, создайте чат и начните общение',
              );
            } else {
              deleteNotification(idInstance, apiTokenInstance, data.receiptId);
              if (data.body.typeWebhook === 'incomingMessageReceived') {
                setIncomingMessage({
                  textMessage:
                    data.body.messageData.textMessageData.textMessage,
                  senderName: data.body.senderData.senderName,
                  sender: data.body.senderData.sender,
                  type: 'incoming',
                  idMessage: Math.random(),
                });
                newMessage({
                  type: 'incoming',
                  textMessage:
                    data.body.messageData.textMessageData.textMessage,
                  idMessage: Math.random(),
                });
              }
            }
          })
          .catch((e) => console.log(e)),
      3000,
    );

    return () => clearInterval(interval);
  }, [apiTokenInstance, idInstance, newMessage]);

  const chatHandleChange = (event) => {
    // setNewChat(event.target.value);
  };

  const chatHandleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value);
      setNewChat(event.target.value + '@c.us');
      setIsChatOpen(true);
    }
  };

  const closeChat = (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      console.log('ChatOpen: false');

      setIsChatOpen(false);
    }
  };

  return (
    <div className="MainWrapper" onKeyDown={closeChat} tabIndex={0}>
      {/* <button onClick={() => setIsChatOpen(false)}>RELOAD</button> */}
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
          {incomingMessage ? (
            <div
              className="messageFromUserWrapper"
              onClick={() => {
                setIsChatOpen(true);
                setNewChat(incomingMessage.sender);
              }}
            >
              <UserAvatar className="userAvatar" />
              <div className="fromUserTextContainer">
                <h3 className="userTextName">{incomingMessage.senderName}</h3>
                <span className="usertextContent">
                  {incomingMessage.textMessage}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <ChatWindow
          incomingMessage={incomingMessage}
          isChatOpen={isChatOpen}
          sendMessage={sendMessage}
          chatId={newChat}
        />
      </div>
    </div>
  );
}

export default MainPage;
