/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the Navigation bar
 */

import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Container
      maxWidth="xl"
      sx={{ padding: "15px 0px !important", background: "#fff" }}
    >
      <Link to="/">
        <img
          alt="dphi logo"
          src="/images/logo.png"
          style={{ width: 105, height: 41 }}
        />
      </Link>
    </Container>
  );
}
