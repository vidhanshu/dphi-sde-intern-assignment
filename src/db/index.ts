import { ProjectType } from "../@types";
import { generateRandomId } from "../utils";

const DB_NAME = "projects";

export const addProject = (project: ProjectType) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  let Projects: ProjectType[] = [];
  if (PROJECTS) {
    Projects = JSON.parse(PROJECTS);
    Projects.push({ ...project, id: generateRandomId() });
  } else {
    Projects.push({ ...project, id: generateRandomId() });
  }
  localStorage.setItem(DB_NAME, JSON.stringify(Projects));
};

export const getProjects = () => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    return JSON.parse(PROJECTS);
  }
  return [];
};

export const updateProject = (id: string, project: ProjectType) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    const Projects: ProjectType[] = JSON.parse(PROJECTS);
    Projects.map((e) => {
      if (e.id === id) {
        return project;
      }
      return e;
    });
    localStorage.setItem(DB_NAME, JSON.stringify(Projects));
  }
};

export const deleteProject = (id: string) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    const Projects: ProjectType[] = JSON.parse(PROJECTS);
    Projects.filter((e) => {
      if (e.id === id) {
        return false;
      }
      return true;
    });
    localStorage.setItem(DB_NAME, JSON.stringify(Projects));
  }
};
