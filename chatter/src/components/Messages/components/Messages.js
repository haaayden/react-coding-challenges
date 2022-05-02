import React, { useContext, useEffect, useCallback, useState, useRef } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
import config from '../../../config';
import INITIAL_BOTTY_MESSAGE from '../../../common/constants/initialBottyMessage'
import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

import '../styles/_messages.scss';

const socket = io(
  config.BOT_SERVER_ENDPOINT,
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

function Messages() {
  // CORS issues on remote resource prevent these from working
  // const [playSend] = useSound(config.SEND_AUDIO_URL);
  // const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);

  const { setLatestMessage } = useContext(LatestMessagesContext);
  const latestMessageRef = useRef(null);
  const [message, setMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [messages, setMessages] = useState([
    // Show initial Botty message by default
    {user: 'bot', id: 1, message: INITIAL_BOTTY_MESSAGE}
  ])

  const onChangeMessage = (event) => setMessage(event.target.value);

  const sendMessage = useCallback(() => {
    // Send the user's message to Botty
    socket.emit('user-message', message);
    // Update latest message for Botty chat in left UserList
    setLatestMessage('bot', message)
    // Add sent user message to list, so it's then displayed
    setMessages(messages.concat({user: 'me', id: messages.length + 1, message}))
    setMessage(''); // Clear user message now it's been sent
    // Input is uncontrolled component, so clear value using DOM and ID
    document.getElementById('user-message-input').value = ''
  }, [message, messages]);

  // Scroll to the bottom of the messages list when message list changes
  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length]);

  useEffect(() => {
    // Show a typing message when Botty is typing
    socket.on('bot-typing', () => setBotTyping(true));
    socket.on('bot-message', (message) => {
      setBotTyping(false);
      // Add received Botty message to list, so it's then displayed
      setMessages(messages.concat({user: 'bot', id: messages.length + 1, message}))
    });
  });

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {
          messages.map((message, index) =>
            <React.Fragment key={index}>
              <Message
                key={message.id}
                message={message}
                nextMessage={messages[index + 1]}
                botTyping={botTyping}
              />
              <div ref={latestMessageRef} />
            </React.Fragment>
          )
        }
        {botTyping ? (<TypingMessage />) : null }
      </div>
      <Footer message={message} sendMessage={sendMessage} onChangeMessage={onChangeMessage} />
    </div>
  );
}

export default Messages;
