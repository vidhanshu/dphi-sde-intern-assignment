import { Box, Container } from "@mui/system";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";

import { BsFillCloudArrowUpFill } from "react-icons/bs";
import CustomButton from "../components/CustomButton";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { HtmlHTMLAttributes } from "react";
import { Nav } from "../components";
import { ProjectType } from "../@types";
import { RiImageAddLine } from "react-icons/ri";
import dayjs from "dayjs";
import styles from "../styles/pages/addHackathon.module.scss";

function AddHackathon() {
  const [formdata, setFormdata] = useState<ProjectType>({} as ProjectType);

  const handleTextFieldChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFormdata((e) => ({ ...e, [evt.target.name]: evt.target.value }));
    },
    []
  );

  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
          setFormdata({
            ...formdata,
            image: reader.result?.toString() || "",
          });
        };
        reader.readAsDataURL(file);
      }
    },
    [formdata]
  );

  return (
    <>
      <Nav />
      <Box className={styles.addHackathon}>
        <Container className={styles.container}>
          <h1 className={styles.title}>New Hackathon Submission</h1>
          <CustomTextField
            value={formdata.title}
            name="title"
            onChange={handleTextFieldChange}
            labelFor="title_field"
            label_text="Title"
          />
          <CustomTextField
            name="summary"
            value={formdata.summary}
            onChange={handleTextFieldChange}
            labelFor="summary_field"
            label_text="Summary"
            placeholder="A short summary of your submission (this will be visible with your submission)"
          />
          <Box>
            <CustomTextField
              name="description"
              value={formdata.description}
              onChange={handleTextFieldChange}
              labelFor="description_field"
              label_text="Description"
              placeholder="Write a long description of your project. You can describe your idea and approach here."
              multiline={true}
              rows={5}
              inputProps={{
                maxLength: 3000,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 0",
              }}
            >
              <p
                className={styles.info}
                style={
                  formdata.description?.length > 2995 ? { color: "red" } : {}
                }
              >
                {formdata.description?.length || 0} / 3,000 characters
              </p>
            </Box>
          </Box>
          {formdata.image ? (
            <FileUploaded
              label_text="Cover Image"
              info_text="Minimum resolution: 360px  X 360px"
              image={formdata.image}
              image_name={"Hello.png"}
              onChange={handleImageUpload}
            />
          ) : (
            <FileUpload
              label_text="Cover Image"
              info_text="Minimum resolution: 360px  X 360px"
              onChange={handleImageUpload}
            />
          )}
          <CustomTextField
            name="hackathon_name"
            labelFor="hname_field"
            value={formdata.hackathon_name}
            onChange={handleTextFieldChange}
            label_text="Hackathon Name"
            placeholder="Enter the name of the hackathon"
          />
          <Box className={styles.hdates_container}>
            <Box className={styles.item}>
              <h1 className={styles.label}>Hackathon Start Date</h1>
              <DesktopDatePicker
                value={dayjs(formdata.start_date)}
                onChange={(evt) => {
                  setFormdata((e) => ({
                    ...e,
                    start_date: evt?.format("MM/DD/YYYY") || "",
                  }));
                }}
                defaultValue={dayjs(new Date())}
              />
            </Box>
            <Box className={styles.item}>
              <h1 className={styles.label}>Hackathon End Date</h1>
              <DesktopDatePicker
                value={dayjs(formdata.end_date)}
                onChange={(evt) => {
                  setFormdata((e) => ({
                    ...e,
                    end_date: evt?.format("MM/DD/YYYY") || "",
                  }));
                }}
                defaultValue={dayjs(new Date())}
              />
            </Box>
          </Box>
          <CustomTextField
            name="github_link"
            labelFor="github_field"
            value={formdata.github_link}
            onChange={handleTextFieldChange}
            label_text="GitHub Repository"
            placeholder="Enter your submission’s public GitHub repository link"
          />
          <CustomTextField
            name="other_link"
            labelFor="other_link"
            value={formdata.other_link}
            onChange={handleTextFieldChange}
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
function CustomTextField({
  labelFor,
  label_text,
  ...props
}: CustomeTextFieldProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <label className={styles.label} htmlFor={labelFor}>
        {label_text}
      </label>
      <TextField
        id={labelFor}
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
      {props.label_text && <h1 className={styles.label}>{props.label_text}</h1>}
      {props.info_text && <p className={styles.info}>{props.info_text}</p>}
      <Box className={styles.file_upload}>
        <label htmlFor="file_input_0x">
          <RiImageAddLine size={50} color="gray" />
          <input {...props} type="file" id="file_input_0x" hidden />
        </label>
      </Box>
    </Box>
  );
}

type FileUploadedProps = HtmlHTMLAttributes<HTMLInputElement> & {
  label_text?: string;
  info_text?: string;
  image: string;
  image_name: string;
};
function FileUploaded({
  info_text,
  label_text,
  image,
  image_name,
  ...props
}: FileUploadedProps) {
  return (
    <Box className={styles.file_upload_field}>
      {label_text && <h1 className={styles.label}>{label_text}</h1>}
      {info_text && <p className={styles.info}>{info_text}</p>}
      <Box className={styles.file_uploaded}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <img className={styles.img} src={image} alt="" />
          <p className={styles.label}>{image_name}</p>
        </Box>
        <Button
          variant="text"
          sx={{ maxHeight: 40 }}
          endIcon={<BsFillCloudArrowUpFill color="gray" size={25} />}
        >
          <label htmlFor="file_input_1x">
            Reupload
            <input {...props} type="file" id="file_input_1x" hidden />
          </label>
        </Button>
      </Box>
    </Box>
  );
}
