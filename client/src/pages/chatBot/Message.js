import bot from "./assets/bot_chat.png";
import user from "./assets/portrait_user.png";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import styles from "./Message.module.css";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
      {content}
    </ReactMarkdown>
  );
};

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
          <p><MarkdownRenderer content={content}/></p> 
      </div>
      </div>
    </div>
  );
}