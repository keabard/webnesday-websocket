import React, {useEffect} from 'react';

import useWebSocket, {ReadyState} from 'react-use-websocket';

const MousePosition = () => {
  //Public API that will echo messages sent to it back to the client
  const socketUrl = 'ws://localhost:1234/mouse-position';
 
  const {
    sendMessage,
    readyState,
  } = useWebSocket(socketUrl);
 
  useEffect(() => {
    if(readyState === ReadyState.OPEN) {
      window.addEventListener('mousemove', e => sendMessage(JSON.stringify({x: e.clientX, y: e.clientY})))
    }
  }, [readyState, sendMessage])
 
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
    </div>
  );
};
 
export default MousePosition;