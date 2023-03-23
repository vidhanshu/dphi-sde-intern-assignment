/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the hackathon cards in the home page
 */

import { Link } from "react-router-dom";
import styles from "../styles/components/card.module.scss";

interface CardProps {
  img: string;
  title: string;
  description: string;
  link: string;
  time: string;
}
function Card({ description, img, link, time, title }: CardProps) {
  return (
    <Link to={link}>
      <div className={styles.card_container}>
        <div className={styles.top}>
          <img src={img} alt="card" />
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.middle}>{description}</div>
        <div className={styles.bottom}>updated {time} ago</div>
      </div>
    </Link>
  );
}

export default Card;
