/**
 * @author @vidhanshu
 * @description this component is responsible for rendering the header of the hackathon details page
 */

import {
  AiFillCalendar,
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Box, Button, Chip, Container, IconButton, Modal } from "@mui/material";
import { deleteProjectById, updateProject } from "../db";
import { useCallback, useState } from "react";

import Nav from "./Nav";
import { ProjectType } from "../@types";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import styles from "../styles/components/detailsHeader.module.scss";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)({
  borderRadius: "10px",
  borderColor: "white",
  textTransform: "none",
  color: "white",
  "&:hover": {
    backgroundColor: "white",
    color: "#000",
    borderColor: "white",
  },
});

interface DetailsHeaderProps {
  data: ProjectType;
  starred: boolean;
  setStarred: React.Dispatch<React.SetStateAction<boolean>>;
}
function DetailsHeader({ data, starred, setStarred }: DetailsHeaderProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleModal = useCallback(() => {
    setOpen((e) => !e);
  }, []);

  return (
    <Box>
      {/* Navigation Bar */}
      <Nav />
      {/* Header */}
      <Box className={styles.wrapper}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={styles.left_header_top}>
            <div className={styles.left_header_top_left}>
              <img src={data.image} alt="" />
              <h1 className={styles.title}>{data.title}</h1>
            </div>
            <div className={styles.leaft_header_top_options}>
              <CustomButton
                variant="outlined"
                onClick={() => {
                  navigate(`/edit/${data.id}`);
                }}
              >
                <AiFillEdit size={20} style={{ marginRight: 10 }} />
                Edit
              </CustomButton>
              <CustomButton variant="outlined" onClick={handleModal}>
                <AiFillDelete size={20} style={{ marginRight: 10 }} />
                Delete
              </CustomButton>
            </div>
          </div>
          <div className={styles.header_bottom}>
            <p className={styles.subtitle}>{data.summary}</p>
            <div className={styles.options}>
              {starred ? (
                <IconButton
                  onClick={() => {
                    updateProject(data.id, { ...data, favourite: false });
                    setStarred(false);
                  }}
                >
                  <AiFillStar
                    color="white"
                    size={30}
                    style={{ marginRight: 10 }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    updateProject(data.id, { ...data, favourite: true });
                    setStarred(true);
                  }}
                >
                  <AiOutlineStar
                    color="white"
                    size={30}
                    style={{ marginRight: 10 }}
                  />
                </IconButton>
              )}
              <span className={styles.divider}></span>
              <Chip
                icon={<AiFillCalendar color="white" size={20} />}
                label={dayjs(data.created_at).format("D MMM").toString()}
                variant="filled"
                sx={{
                  color: "white",
                  background: "#255973",
                  pl: 1,
                }}
              />
            </div>
          </div>
        </Container>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleModal}
        className={styles.modal_container}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className={styles.card}>
          <h2 className={styles.title}>Delete model</h2>
          <p className={styles.text}>
            This action is irreversible. Are you sure you want to delete this
            model?
          </p>
          <Box className={styles.options}>
            <Button
              sx={{
                borderRadius: 2,
              }}
              variant="outlined"
              onClick={handleModal}
            >
              Cancel
            </Button>
            <Button
              sx={{
                borderRadius: 2,
              }}
              color="error"
              variant="contained"
              onClick={() => {
                deleteProjectById(data.id);
                handleModal();
                navigate("/");
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default DetailsHeader;
