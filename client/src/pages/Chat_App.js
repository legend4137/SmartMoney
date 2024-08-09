import { useState } from "react";

import Message from "./chatBot/Message";
import Input from "./chatBot/Input";
import History from "./chatBot/History";
import Clear from "./chatBot/Clear";
import styles from "./Chat_App.module.css";
import axios from "axios";

var History_new;
const userName = sessionStorage.getItem('username');
export default function Chat_App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // State to manage visibility
const username = sessionStorage.getItem("username");
  let data;

  console.log(window.History_new);
  const handleSubmit = () => {
    const newMessage = { role: "user", content: input };
    let res = {};
    console.log(userName);
    axios
      .post("http://localhost:12000/chatbot-", {
        context: [window.History_new],
        prompt: input,
        userName : userName
      })
      .then((response) => {
        console.log(response);
        res = { role: "assistant", content: response.data.response };
        setMessages([...messages, newMessage, res]);

        const updatedHistory = [
          ...history,
          { question: input, answer: res.content },
        ];
        setHistory(updatedHistory);
        window.History_new = updatedHistory;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setInput("");
      });
  };

  const clear = () => {
    setMessages([]);
    setHistory([]); // Show the SampleQuestionsSection again
  };

  return (
    <div className={styles.Main}>
      <div className={styles.Column}>
        <h3 className={styles.Title}>Chat Messages</h3>

        <div className={styles.Content}>
          {messages.map((el, i) => {
            return <Message key={i} role={el.role} content={el.content} />;
          })}
        </div>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
}
