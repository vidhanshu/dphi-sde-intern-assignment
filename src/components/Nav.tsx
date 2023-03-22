import { Container } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <Container maxWidth="xl" sx={{ padding: "15px 0px !important" }}>
      <img
        alt="dphi logo"
        src="/images/logo.png"
        style={{ width: 105, height: 41 }}
      />
    </Container>
  );
}
