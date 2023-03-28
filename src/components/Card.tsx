/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the hackathon cards in the home page
 */

import { computeDifference, textShortner } from "../utils";

import { Link } from "react-router-dom";
import { ProjectType } from "../@types";
import styles from "../styles/components/card.module.scss";

function Card({ summary, image, created_at, title, id }: ProjectType) {
  return (
    <div>
      <Link to={`/details/${id}`} className={styles.card_container}>
        <div className={styles.top}>
          <img src={image} alt="card" />
          <p className={styles.title}>{textShortner(title, 20)}</p>
        </div>
        <div className={styles.middle}>
          <p>{textShortner(summary, 100)}</p>
        </div>
        <div className={styles.bottom}>
          uploaded {computeDifference(created_at)}
        </div>
      </Link>
    </div>
  );
}

export default Card;
