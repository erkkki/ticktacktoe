import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

import { User } from './user';
import { Game } from './game';
import {Bot} from './bot';

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const games: Game[] = [];
let users: User[] = [];



wss.on('connection', (ws: WebSocket) => {

  /** On connection create user and return it for user */
  const newUser = new User();
  newUser.socket = ws;
  users.push(newUser);
  ws.send(JSON.stringify({
    type: 'USER',
    user: newUser,
  }));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      type: 'USER_COUNT',
      userCount: users.length,
    }));
  });

  /** Answer for ping */
  ws.on('pong', () => {
    const tempUser = users.find(user => {
      return user.socket === ws;
    });
    if (!tempUser) { return; }
    tempUser.heartBeat = true;
  });

  /** Client terminated */
  ws.on('close', () => {
    users = users.filter(user => {
      return user.socket !== ws;
    });
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: 'USER_COUNT',
        userCount: users.length,
      }));
    });
  });

  /** Events */
  ws.on('message', (data: string) => {
    const user = users.find(val => val.socket === ws);
    if (user === undefined) {
      return;
    }
    let message: any;
    try {
      message = JSON.parse(data);
    } catch (e) {
      console.log('Wrong format.');
      return;
    }

    /** CHAT EVENTS */
    if (message.type === 'CHAT') {
      if (message.action === 'NEW_MESSAGE') {
        console.log(message);
        wss.clients.forEach((client) => {
          // if (client !== ws && client.readyState === WebSocket.OPEN) {
          //     client.send(data);
          // }
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'CHAT',
              action: 'NEW_MESSAGE',
              message: message.message,
            }));
          }
        });
      }
    }
    /** USER EVENTS */
    if (message.type === 'USER') {
      if (message.action === 'USER_COUNT') {
        ws.send(JSON.stringify({
          type: 'USER_COUNT',
          userCount: users.length,
        }));
      }
      if (message.action === 'USERNAME') {
        // Change username
        if (user) {
          // Return user
          user.username = message.user.username;
          ws.send(JSON.stringify({
            type: 'USER',
            user: newUser,
          }));
        }

      }
    }
    /** GAME EVENTS */
    if (message.type === 'GAME') {
      if (message.action === 'NEW') {
        const game = new Game(user, new Bot());
        games.push(game);
        ws.send(JSON.stringify({
          type: 'GAME',
          action: 'NEW',
          game
        }));
      }
      if (message.action === 'MOVE') {
        const game = games.find(val => {
          return val.id === message.game.id;
        });
        if (!game) {
          return;
        }
        user.play(game, message.x, message.y);
        ws.send(JSON.stringify({
          type: 'GAME',
          action: 'UPDATE',
          game
        }));
        if (game.turn.id === 'bot') {
          setTimeout(() => {
            game.playerTwo.play(game);
            game.playerOne.socket.send(JSON.stringify({
              type: 'GAME',
              action: 'UPDATE',
              game
            }));
          }, 500);
        }
      }
    }
  });
});

/** Ping clients */
setInterval(function ping(): void {
  users.forEach(user => {
    if (!user.heartBeat) {
      return user.socket.terminate();
    }
    user.heartBeat = false;
    user.socket.ping();
  });
}, 3000);

/** Start server */
server.listen(process.env.PORT || 8999, () => {
  // @ts-ignore
  console.log(`Server started on port ${server.address().port} :)`);
});
