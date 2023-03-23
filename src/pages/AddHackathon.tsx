import { Box, Container } from "@mui/system";
import { TextField, TextFieldProps } from "@mui/material";

import CustomButton from "../components/CustomButton";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { HtmlHTMLAttributes } from "react";
import { Nav } from "../components";
import { RiImageAddLine } from "react-icons/ri";
import dayjs from "dayjs";
import styles from "../styles/pages/addHackathon.module.scss";

function AddHackathon() {
  return (
    <>
      <Nav />
      <Box className={styles.addHackathon}>
        <Container className={styles.container}>
          <h1 className={styles.title}>New Hackathon Submission</h1>
          <CustomTextField labelFor="title_field" label_text="Title" />
          <CustomTextField
            labelFor="summary_field"
            label_text="Summary"
            placeholder="A short summary of your submission (this will be visible with your submission)"
          />
          <CustomTextField
            labelFor="description_field"
            label_text="Description"
            placeholder="Write a long description of your project. You can describe your idea and approach here."
            multiline={true}
            rows={5}
          />
          <FileUpload
            label_text="Cover Image"
            info_text="Minimum resolution: 360px  X 360px"
          />
          <CustomTextField
            labelFor="hname_field"
            label_text="Hackathon Name"
            placeholder="Enter the name of the hackathon"
          />
          <Box className={styles.hdates_container}>
            <Box className={styles.item}>
              <h1 className={styles.label}>Hackathon Start Date</h1>
              <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
            </Box>
            <Box className={styles.item}>
              <h1 className={styles.label}>Hackathon End Date</h1>
              <DesktopDatePicker defaultValue={dayjs("2022-04-17")} />
            </Box>
          </Box>
          <CustomTextField
            labelFor="github_field"
            label_text="GitHub Repository"
            placeholder="Enter your submission’s public GitHub repository link"
          />
          <CustomTextField
            labelFor="other_link_field"
            label_text="Other Links"
            placeholder="You can upload a video demo or URL of you demo app here."
          />
          <CustomButton>Upload Submission</CustomButton>
        </Container>
      </Box>
    </>
  );
}

export default AddHackathon;

type CustomeTextFieldProps = TextFieldProps & {
  label_text: string;
  labelFor: string;
};
function CustomTextField(props: CustomeTextFieldProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <label className={styles.label} htmlFor={props.labelFor}>
        {props.label_text}
      </label>
      <TextField
        id={props.labelFor}
        placeholder="Title of the submission"
        {...props}
      />
    </Box>
  );
}

type FileUploadProps = HtmlHTMLAttributes<HTMLInputElement> & {
  label_text?: string;
  info_text?: string;
};
function FileUpload(props: FileUploadProps) {
  return (
    <Box className={styles.file_upload_field}>
      <h1 className={styles.label}>{props.label_text}</h1>
      <p className={styles.info}>{props.info_text}</p>
      <Box className={styles.file_upload}>
        <label htmlFor="file_input_0x">
          <RiImageAddLine size={50} color="gray" />
          <input {...props} type="file" id="file_input_0x" hidden />
        </label>
      </Box>
    </Box>
  );
}
