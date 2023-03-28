import { Box, Container } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import {
  CustomeTextFieldProps,
  FileUploadProps,
  FileUploadedProps,
} from "../@types/props";

import { BsFillCloudArrowUpFill } from "react-icons/bs";
import CustomButton from "../components/CustomButton";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Nav } from "../components";
import { ProjectType } from "../@types";
import { RiImageAddLine } from "react-icons/ri";
import { addProject } from "../db";
import dayjs from "dayjs";
import styles from "../styles/pages/addHackathon.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function AddHackathon() {
  //initial state
  const [formdata, setFormdata] = useState<ProjectType>({
    id: "",
    title: "",
    description: "",
    summary: "",
    image: "",
    hackathon_name: "",
    start_date: dayjs(new Date()).format("MM/DD/YYYY").toString(),
    end_date: dayjs(new Date()).format("MM/DD/YYYY").toString(),
    github_link: "",
    other_link: "",
    favourite: false,
    created_at: dayjs(new Date()).format("MM/DD/YYYY").toString(),
    updated_at: dayjs(new Date()).format("MM/DD/YYYY").toString(),
  });
  const navigate = useNavigate();

  //single function to handle text field change
  const handleTextFieldChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFormdata((e) => ({ ...e, [evt.target.name]: evt.target.value }));
    },
    []
  );

  //single function to handle image upload
  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        var file = e.target.files[0];
        if (!file) {
          return;
        }
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

  // cheking if all the required fields are filled
  let shouldKeeptDisabled =
    !formdata.description ||
    !formdata.title ||
    !formdata.summary ||
    !formdata.github_link ||
    !formdata.hackathon_name ||
    !formdata.image;

  return (
    <>
      <Nav />
      <Box className={styles.addHackathon}>
        <Container className={`${styles.container} container`}>
          <h1 className={styles.title}>New Hackathon Submission</h1>
          <CustomTextField
            value={formdata.title}
            name="title"
            onChange={handleTextFieldChange}
            labelFor="title_field"
            label_text="Title *"
            inputProps={{
              maxLength: 100,
            }}
          />
          <CustomTextField
            name="summary"
            value={formdata.summary}
            onChange={handleTextFieldChange}
            labelFor="summary_field"
            label_text="Summary *"
            placeholder="A short summary of your submission (this will be visible with your submission)"
            inputProps={{
              maxLength: 300,
            }}
          />
          <Box>
            <CustomTextField
              name="description"
              value={formdata.description}
              onChange={handleTextFieldChange}
              labelFor="description_field"
              label_text="Description *"
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
              label_text="Cover Image *"
              info_text="Minimum resolution: 360px  X 360px"
              image={formdata.image}
              image_name={"Hello.png"}
              onChange={handleImageUpload}
            />
          ) : (
            <FileUpload
              label_text="Cover Image *"
              info_text="Minimum resolution: 360px  X 360px"
              onChange={handleImageUpload}
            />
          )}
          <CustomTextField
            name="hackathon_name"
            labelFor="hname_field"
            value={formdata.hackathon_name}
            onChange={handleTextFieldChange}
            label_text="Hackathon Name *"
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
            label_text="GitHub Repository *"
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
          <CustomButton
            onClick={() => {
              if (!validator.isURL(formdata.github_link)) {
                toast.error("Invalid GitHub URL");
                return;
              }
              if (
                formdata.other_link.length > 0 &&
                !validator.isURL(formdata.other_link)
              ) {
                toast.error("Invalid Other URL");
                return;
              }
              addProject(formdata);
              setFormdata({} as ProjectType);
              toast.success("Successfully added");
              navigate("/");
            }}
            disabled={shouldKeeptDisabled}
          >
            {!shouldKeeptDisabled
              ? "Upload Submission"
              : "Fill All Required Fields"}
          </CustomButton>
        </Container>
      </Box>
    </>
  );
}

export default AddHackathon;

//sub components
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

function FileUpload(props: FileUploadProps) {
  return (
    <Box className={styles.file_upload_field}>
      {props.label_text && <h1 className={styles.label}>{props.label_text}</h1>}
      {props.info_text && <p className={styles.info}>{props.info_text}</p>}
      <Box className={styles.file_upload}>
        <label htmlFor="file_input_0x">
          <RiImageAddLine size={50} color="gray" />
          <input
            accept="image/png, image/jpeg, image/jpg"
            {...props}
            type="file"
            id="file_input_0x"
            hidden
          />
        </label>
      </Box>
    </Box>
  );
}

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
            <input
              accept="image/png, image/jpeg, image/jpg"
              {...props}
              type="file"
              id="file_input_1x"
              hidden
            />
          </label>
        </Button>
      </Box>
    </Box>
  );
}
