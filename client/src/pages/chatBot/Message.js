import bot from "./assets/bot_chat.png";
import user from "./assets/portrait_user.png";

import styles from "./Message.module.css";
export default function Message({ role, content, loading }) {
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
      <div>
          <p>{content}</p> 
      </div>
      </div>
    </div>
  );
}