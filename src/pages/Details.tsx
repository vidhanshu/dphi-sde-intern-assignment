import { AiFillCalendar, AiFillGithub } from "react-icons/ai";
import { Box, Button, Container } from "@mui/material";

import { DetailsHeader } from "../components";
import { RxExternalLink } from "react-icons/rx";
import styled from "@emotion/styled";
import styles from "../styles/pages/details.module.scss";

const CustomButton = styled(Button)({
  borderRadius: "10px",
  borderColor: "#858585",
  textTransform: "none",
  color: "#858585",
  "&:hover": {
    backgroundColor: "#000",
    color: "white",
    borderColor: "white",
  },
});

function Details() {

  return (
    <div>
      <DetailsHeader />
      <Container maxWidth="xl" fixed className={styles.container}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box className={styles.left} flexBasis={"70%"}>
            <p className={styles.small_title}>Details</p>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam vivamus
              sodales a integer justo elit. Mattis urna non parturient est non
              faucibus pretium morbi. Mattis condimentum arcu sapien nunc semper
              in laoreet amet cursus. At purus consectetur orci morbi at.
              Gravida consectetur nunc in quis vitae egestas. Fermentum
              pellentesque ullamcorper nisl massa penatibus condimentum non
              imperdiet. Porttitor a hendrerit pellentesque enim mus congue.
              Vitae interdum fusce duis ac posuere in aliquam risus aenean. Mi
              aliquet viverra ipsum lacus condimentum tincidunt. In bibendum
              imperdiet nullam eget tincidunt. Ut lorem id enim interdum
              lobortis aliquam risus elementum aliquet. Placerat fusce proin
              diam sollicitudin netus tincidunt sit ultricies. Varius convallis
              ultrices fermentum in commodo ut posuere. Lacus luctus lacus
              consequat dolor.
              <br />
              <br />
              Lacus vulputate molestie mattis penatibus risus quam elit gravida
              auctor. Eget morbi maecenas nam in. Felis urna non id adipiscing
              sed cursus nec arcu. Egestas placerat blandit sed quis sed vitae.
              Porta at ac turpis gravida leo. Ipsum in laoreet facilisi arcu.
              Proin vulputate mi viverra dignissim sollicitudin interdum
              ultrices. Habitant eget dapibus pharetra blandit quis sagittis
              pulvinar fames vel. Sit gravida cursus ligula fames lacus.
              Bibendum lectus nunc dapibus dui lectus velit porta. Sit id
              elementum urna at ut lorem aliquet.
              <br />
              <br />
              Pharetra sit malesuada tellus eget urna ultrices lectus et cursus.
              Bibendum leo id consectetur vel lectus mi urna in diam. Egestas
              metus enim elementum turpis felis. Leo ultrices adipiscing viverra
              ac. Maecenas a odio ac velit in tortor faucibus quam quis. Ut
              sapien auctor lacus pretium nec eu sed sit. Nulla quis sed massa
              maecenas.
            </p>
          </Box>
          <Box className={styles.right} flexBasis={"20%"}>
            <p className={styles.subtitle}>Hackathon</p>
            <h4 className={styles.title}>Presige coding challenge</h4>
            <p className={styles.date}>
              <AiFillCalendar /> 24 Feb 2023 - 24 March 2023
            </p>
            <Box display={"flex"} mt={6} flexDirection="column" gap={2}>
              <CustomButton
                startIcon={<AiFillGithub size={25} />}
                variant="outlined"
              >
                GitHub Repository
              </CustomButton>
              <CustomButton
                startIcon={<RxExternalLink size={25} />}
                variant="outlined"
              >
                Other Link
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Details;
