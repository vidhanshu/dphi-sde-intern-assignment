/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the header of the landing page
 */

import { Box, Container } from "@mui/material";

import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import styles from "../styles/components/header.module.scss";

function Header() {
  return (
    <Box>
      {/* Navigation Bar */}
      <Nav />
      {/* Header */}
      <Box className={styles.wrapper}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={styles.left_header}>
            <h1 className={styles.title}>Hackathon Submissions</h1>
            <p className={styles.subtitle}>
              Lorem ipsum dolor sit amet consectetur. Urna cursus amet
              pellentesque in parturient purus feugiat faucibus. Congue laoreet
              duis porta turpis eget suspendisse ac pharetra amet. Vel nisl
              tempus nec vitae.
            </p>
            <Link to="/add">
              <CustomButton variant="contained">Upload Submission</CustomButton>
            </Link>
          </div>
          <div className={styles.right_header}>
            <img alt="header" src="/images/Hand holding bulb 3D.png" />
          </div>
        </Container>
      </Box>
    </Box>
  );
}

export default Header;
