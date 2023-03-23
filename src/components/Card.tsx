/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the hackathon cards in the home page
 */

import { Link } from "react-router-dom";
import { ProjectType } from "../@types";
import styles from "../styles/components/card.module.scss";

function Card({
  summary,
  image,
  start_date,
  end_date,
  title,
  id,
}: ProjectType) {
  return (
    <Link to={`/details/${id}`}>
      <div className={styles.card_container}>
        <div className={styles.top}>
          <img src={image} alt="card" />
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.middle}>{summary}</div>
        <div className={styles.bottom}>updated on {start_date}</div>
      </div>
    </Link>
  );
}

export default Card;
