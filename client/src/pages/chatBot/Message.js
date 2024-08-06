import bot from "./assets/ai_chatbot.png";
import user from "./assets/person_chatbot.png";

import styles from "./Message.module.css";

export default function Message({ role, content }) {
  return (
    <div className={styles.wrapper}>
      <div>
        <img
          src={role === "assistant" ? bot : user}
          className={styles.avatar}
          alt="profile avatar"
        />
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}