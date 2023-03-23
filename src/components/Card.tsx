/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the hackathon cards in the home page
 */

import { Link } from "react-router-dom";
import { ProjectType } from "../@types";
import dayjs from "dayjs";
import styles from "../styles/components/card.module.scss";
import { textShortner } from "../utils";

function Card({ summary, image, updated_at, title, id }: ProjectType) {
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
          updated at {dayjs(updated_at).format("h:mm A")}
        </div>
      </Link>
    </div>
  );
}

export default Card;
