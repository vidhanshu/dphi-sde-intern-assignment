import { HtmlHTMLAttributes } from "react";
import { ProjectType } from ".";
import { TextFieldProps } from "@mui/material";

export interface DetailsHeaderProps {
  data: ProjectType;
  starred: boolean;
  setStarred: React.Dispatch<React.SetStateAction<boolean>>;
}

export type CustomeTextFieldProps = TextFieldProps & {
  label_text: string;
  labelFor: string;
};

export type FileUploadProps = HtmlHTMLAttributes<HTMLInputElement> & {
  label_text?: string;
  info_text?: string;
};

export type FileUploadedProps = HtmlHTMLAttributes<HTMLInputElement> & {
  label_text?: string;
  info_text?: string;
  image: string;
  image_name: string;
};
