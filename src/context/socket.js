import { io } from 'socket.io-client';
import React from 'react';

export const socket = hasJWT => {
  if (hasJWT) {
    return io.connect(process.env.REACT_APP_server_domain, {
      query: { token: localStorage.getItem('jwt') },
    });
  }
};
export const SocketContext = React.createContext();
