/**
 * @author @vidhanshu
 * @description this component is responsible rendering the custom button
 */

import { Button } from "@mui/material";
import { ButtonProps } from "@mui/material";
import styles from "../styles/components/customButton.module.scss";

function CustomButton(props: ButtonProps) {
  return (
    <Button
      className={props.disabled ? styles.disabled : styles.button}
      {...props}
    >
      <p className={styles.text}>{props.children}</p>
    </Button>
  );
}

export default CustomButton;
