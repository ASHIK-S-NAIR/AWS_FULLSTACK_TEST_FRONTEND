import React, { useState, useEffect } from "react";

function App() {
  const [values, setValues] = useState({
    name: "",
    message: "",
  });

  const [messages, setMessages] = useState([]);

  const { name, message } = values;

  // const url = "http://localhost:1337";

  const postMessage = async () => {
    try {
      const response = await fetch(`/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());

      console.log(response);
      return setMessages(response);
    } catch (error) {
      return console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch("/messages", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json());

      return setMessages(response);
    } catch (error) {
      return console.log(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div>
      <h1>Hello Frontend</h1>

      <div className="messages">
        {messages &&
          messages.map((msg, index) => {
            return (
              <div className="messages-sec" key={index}>
                {msg.name} -- {msg.message}
              </div>
            );
          })}
      </div>

      <form onSubmit={postMessage}>
        <input
          type="text"
          className="message-input-name"
          value={name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <input
          type="text"
          className="message-input-message"
          value={message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
        <button type="submit" className="message-submit">
          Submit Message
        </button>
      </form>
    </div>
  );
}

export default App;
