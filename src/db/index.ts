import { ProjectType } from "../@types";
import { generateRandomId } from "../utils";

const DB_NAME = "projects";

export const addProject = (project: ProjectType) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  let Projects: ProjectType[] = [];
  if (PROJECTS) {
    Projects = JSON.parse(PROJECTS);
    Projects.push({
      ...project,
      created_at: Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      favourite: false,
      id: generateRandomId(),
    });
  } else {
    Projects.push({
      ...project,
      created_at: Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      favourite: false,
      id: generateRandomId(),
    });
  }
  localStorage.setItem(DB_NAME, JSON.stringify(Projects));
};

export const getProjects = (filter?: 1 | -1): ProjectType[] => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  let data = [];
  if (PROJECTS) {
    data = JSON.parse(PROJECTS);
    if (filter) {
      data = data.sort((a: ProjectType, b: ProjectType) => {
        if (new Date(a.created_at) > new Date(b.created_at)) return filter;
        return -filter;
      });
    }
    return data;
  }
  return [];
};

export const getProjectById = (id: string): ProjectType => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    const project: ProjectType = JSON.parse(PROJECTS).find(
      (e: ProjectType) => e.id === id
    );
    if (project) {
      return project;
    }
  }
  return {} as ProjectType;
};

export const updateProject = (id: string, project: ProjectType) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    let Projects: ProjectType[] = JSON.parse(PROJECTS);
    Projects = Projects.map((e) => {
      if (e.id === id) {
        return { ...project, updated_at: new Date().toLocaleString() };
      }
      return e;
    });
    localStorage.setItem(DB_NAME, JSON.stringify(Projects));
  }
};

export const deleteProjectById = (id: string) => {
  let PROJECTS = localStorage.getItem(DB_NAME);
  if (PROJECTS) {
    let Projects: ProjectType[] = JSON.parse(PROJECTS);
    Projects = Projects.filter((e) => e.id !== id);
    console.log(Projects);
    localStorage.setItem(DB_NAME, JSON.stringify(Projects));
  }
};
