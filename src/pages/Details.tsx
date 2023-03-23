import { AiFillCalendar, AiFillGithub } from "react-icons/ai";
import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";

import { DetailsHeader } from "../components";
import { ProjectType } from "../@types";
import { RxExternalLink } from "react-icons/rx";
import dayjs from "dayjs";
import { getProjectById } from "../db";
import styled from "@emotion/styled";
import styles from "../styles/pages/details.module.scss";
import { useParams } from "react-router-dom";

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
  const [data, setData] = useState<ProjectType>({} as ProjectType);
  const [starred, setStarred] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const temp = getProjectById(id);
      setData(temp);
      setStarred(temp.favourite);
    }
  }, [id, starred]);

  return (
    <div>
      <DetailsHeader data={data} starred={starred} setStarred={setStarred} />
      <Container maxWidth="xl" fixed className={styles.container}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box className={styles.left} flexBasis={"70%"}>
            <p className={styles.small_title}>Details</p>
            <p className={styles.text}>{data.description}</p>
          </Box>
          <Box className={styles.right} flexBasis={"20%"}>
            <p className={styles.subtitle}>Hackathon</p>
            <h4 className={styles.title}>{data.hackathon_name}</h4>
            <p className={styles.date}>
              <AiFillCalendar /> {dayjs(data.start_date).format("D MMM YYYY")}
              - {dayjs(data.end_date).format("D MMM YYYY")}
            </p>
            <Box display={"flex"} mt={6} flexDirection="column" gap={2}>
              <CustomButton
                startIcon={<AiFillGithub size={25} />}
                variant="outlined"
                onClick={() => {
                  window.open(data.github_link, "_blank");
                }}
              >
                GitHub Repository
              </CustomButton>
              {data.other_link?.length > 0 && (
                <CustomButton
                  startIcon={<RxExternalLink size={25} />}
                  variant="outlined"
                  onClick={() => {
                    window.open(data.other_link, "_blank");
                  }}
                >
                  Other Link
                </CustomButton>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Details;
