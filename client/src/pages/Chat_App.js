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
  const [history, setHistory] = useState([]);
  let data;
  //   axios.get('http://localhost:12000/get_account',
  //     {params: {
  //         "userName" : sessionStorage.getItem("userName")
  //     }}
  //   )
  //   .catch((error)=>{
  //     console.log(error);
  //   })
  //   .then((response) =>{
  //      console.log(sessionStorage.getItem("userName"));
  //      data = response;
  //   })

  console.log(window.History_new);
  const handleSubmit = () => {
    const newMessage = { role: "user", content: input };
    let res = {};
    console.log(userName);
    axios
      .post("http://localhost:12000/chatbot-", {
        context: [window.History_new],
        userName : userName,
        prompt: input,
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
        // always executed
        // setHistory([...history, { question: input, answer: res.content }]);
        setInput("");
      });
  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
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
      <div className={styles.Column}>
        <h3 className={styles.Title}>History</h3>
        <div className={styles.Content}>
          {history.map((el, i) => {
            return (
              <History
                key={i}
                question={el.question}
                onClick={() =>
                  setMessages([
                    { role: "user", content: history[i].question },
                    { role: "assistant", content: history[i].answer },
                  ])
                }
              />
            );
          })}
        </div>
        <Clear onClick={clear} />
      </div>
    </div>
  );
}
