# Chatty

Chatty is a real-time, online chat service which uses a WebSocket server to broadcast incoming messages to all connected clients. The client-side chat window is built using ReactJS.

## Final Product

### A Well-Populated Chat Session:
!["Many users in chat"](https://github.com/bartnic1/chatty/blob/master/Sample_images/the%20chatty%20experience.png)

### Sending GIF and JPG URLs:
!["Images in chat"](https://github.com/bartnic1/chatty/blob/master/Sample_images/GIF%20and%20JPG.png)

## Client-side Dependencies

- Babel-core
- Babel-loader (https://github.com/babel/babel-loader)
- Babel-preset-es2015
- Babel-preset-react
- Babel-preset-stage-0
- Css-loader
- Node-sass
- Sass-loader
- Sockjs-client
- Style-loader
- Webpack
- Webpack-dev-server (https://github.com/webpack/webpack-dev-server)
- React
- React-dom
- Node 6.0.0 or above

## Client-side Dev-dependencies

- Eslint
- Eslint-plugin-react

## Server-side Dependencies

- Express
- UUID
- Websocket

## Basic Setup

1. From the terminal, clone a copy of this repository into a directory (i.e. git clone git@github.com:bartnic1/chatty.git chatty)
2. Install all dependencies in the main directory (chatty) using the 'npm install' command.
3. Change your directory to ./chatty_server, and run the 'npm install' command again.
4. Now run the 'node server.js' command. This will start the websocket server.
5. In a new terminal window, navigate back to your main chatty directory, and start the browser server with 'npm start'. Note that this may take about 20 seconds to load completely.
6. In a new browser window, navigate to <http://localhost:3000/>. Once webpack has finished translating all the files into a browser-friendly format, the appropriate elements will be rendered onto the screen.

## Getting Started

1. When the chatty window opens, the user is automatically conected to the websocket server. A single, automatically generated trial message is presented to the user shortly thereafter.
2. Users may change their username by entering a new one into the input field at the bottom-left hand corner of the screen, and pressing **ENTER**. Otherwise, their username defaults to 'Bob'.
3. Users may enter a chat message into the input field located at the bottom-center of the screen. Once finished, users should press **ENTER** to submit the message.
4. It is possible to simulate multiple users joining the same chat session by opening multiple browser windows at the same address (<http://localhost:3000/>).

## Features

1. When multiple users are engaged in the same chat session, any message sent is visible to all users. This simulates a true, real-time chat experience.
2. The websocket server assigns a randomized, background-constrasting colour to each user (2,985,984 colours are possible in total, reducing the chance of a collision). This helps differentiate users when they post messages.
3. If a user changes his/her name, all users are notified of this change in the chat log.
4. If a user enters no name into the user name input box, then the web app will set their messages as originating from an "Anonymous" alias.
5. Using specially-defined regular expressions, a user may enter the URL of an image-type file (.jpg, .png, .gif), and the chat window will automatically render it as an image for all users. The chat can render multiple images, so long as the URLs being passed use at least one space as a delimiter.
6. When a new client joins or leaves the chat session, the user count - visible at the top right-hand corner of the screen - will increment or decrement accordingly.

## Possible Future Additions

- Display a message (in the form of a notification) when a user leaves Chatty.
- Host the web application on an external server in order to test real-world functionality.
- Implement a private messaging system.
