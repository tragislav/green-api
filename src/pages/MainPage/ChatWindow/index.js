import { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';

import { ReactComponent as WhatsAppLogo } from '../../../assets/whatsAppLogo.svg';
import { ReactComponent as SendIcon } from '../../../assets/send-icon.svg';

import './styled.css';

function ChatWindow({ incomingMessage, sendMessage, chatId, isChatOpen }) {
  const messageRef = useRef(null);
  const { user } = useAuth();
  const { newMessage, chat } = useChat();
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState(null);
  const { idInstance, apiTokenInstance } = user;

  const messageHandleChange = ({ target }) => {
    setMessage(target.value);
  };

  const messageHandleKeyDown = (event) => {
    if (event.key === 'Enter') {
      clearMessageInput();
      sendToUser();
    }
  };

  function clearMessageInput() {
    messageRef.current.value = '';
  }

  function sendToUser() {
    return sendMessage(idInstance, apiTokenInstance, chatId, message)
      .then(() => {
        newMessage({
          type: 'outgoing',
          textMessage: message,
          idMessage: Math.random() * 10,
        });
      })
      .catch((e) => console.error(e));
  }

  function messageType(type) {
    switch (type) {
      case 'outgoing':
        return 'outgoing';
      case 'incoming':
        return 'incoming';
      default:
        return;
    }
  }

  useEffect(() => {
    if (chat.length) {
      setChatHistory(chat);
    }
  }, [chat]);

  return (
    <div
      className="chatContainer"
      style={{ background: isChatOpen ? '#eae6df' : '#fff' }}
    >
      {isChatOpen ? (
        <>
          <div className="chatWindowHeader">
            <h3 className="chatWindowHeaderText">
              {incomingMessage && incomingMessage.senderName
                ? incomingMessage.senderName
                : chatId}
            </h3>
          </div>
          <div className="chatWindow">
            {chatHistory &&
              chatHistory.map((item) => {
                return (
                  <div
                    key={item.idMessage}
                    className={
                      'messageWrapper ' + messageType(item.type) + 'Wrapper'
                    }
                  >
                    <p className={'messageContent ' + messageType(item.type)}>
                      {item.textMessage}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="sendMessageContainer">
            <input
              ref={messageRef}
              className="sendMessageInput"
              type="text"
              placeholder="Введите сообщение"
              onChange={messageHandleChange}
              onKeyDown={messageHandleKeyDown}
            />
            <SendIcon
              onClick={() => {
                sendToUser();
                clearMessageInput();
              }}
              className="sendMessageBtn"
            />
          </div>
        </>
      ) : (
        <div className="emptyChat">
          <WhatsAppLogo />
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
