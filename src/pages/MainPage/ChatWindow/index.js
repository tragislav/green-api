import { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../../hooks/useAuth';

// import WhatsAppLogo from '../../../assets/waLogo';
import { ReactComponent as WhatsAppLogo } from '../../../assets/whatsAppLogo.svg';
import { ReactComponent as SendIcon } from '../../../assets/send-icon.svg';

import { getChatHistory } from '../../../api/chat';

import './styled.css';

function ChatWindow({ sendMessage, chatId, isChatOpen }) {
  const messageRef = useRef(null);
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState(null);
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
      .then((data) => {
        console.log(data);
        getHistory();
      })
      .catch((e) => console.log(e));
  }

  function getHistory() {
    getChatHistory(idInstance, apiTokenInstance, chatId).then((data) => {
      console.log(data);
      setChatHistory(data);
    });
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
    if (chatId) {
      getHistory();
    }
  }, [chatId]);

  return (
    <div
      className="chatContainer"
      style={{ background: isChatOpen ? '#eae6df' : '#fff' }}
    >
      {isChatOpen ? (
        <>
          <div className="chatWindow">
            {chatHistory &&
              chatHistory
                .map((item) => {
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
                })
                .reverse()}
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
