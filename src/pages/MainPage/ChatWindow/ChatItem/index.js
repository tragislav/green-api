import './styled.css';

function ChatItem({ text, type }) {
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

  return (
    <div className={'messageWrapper ' + messageType(type) + 'Wrapper'}>
      <p className={'messageContent ' + messageType(type)}>{text}</p>
    </div>
  );
}

export default ChatItem;
