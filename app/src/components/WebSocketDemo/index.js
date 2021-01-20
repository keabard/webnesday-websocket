import React, {useCallback, useState, useEffect} from 'react';

import useWebSocket, {ReadyState} from 'react-use-websocket';

const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  // const socketUrl = 'wss://echo.websocket.org';
  // const socketUrl = 'ws://localhost:1234/hello';
  const socketUrl = 'ws://localhost:1234/echo';
  const [messageHistory, setMessageHistory] = useState([]);
 
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);
 
  useEffect(() => {
    if (lastMessage) {
      setMessageHistory(messageHistory.concat(lastMessage));
    }
  },[lastMessage]);

 
  const handleClickSendMessage = useCallback(() =>
    sendMessage('Hello World'), []);
 
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
 
  return (
    <div>
      <div>The WebSocket is currently {connectionStatus}</div>
      <br />
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <br /><br />Message History
      <ul>
        {messageHistory
          .map((message, idx) => message.data).join(', ')}
      </ul>
    </div>
  );
};
 
export default WebSocketDemo;