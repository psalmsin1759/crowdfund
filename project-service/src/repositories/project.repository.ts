import Project, { IProject } from '@/models/project.model';

export const createProject = async (data: Partial<IProject>): Promise<IProject> => {
  const project = new Project(data);
  return project.save();
};

export const findAllProjects = async (): Promise<IProject[]> => {
  return Project.find().sort({ createdAt: -1 });
};


export const findProjectById = async (id: string): Promise<IProject | null> => {
  return Project.findById(id);
};

export const updateProject = async (id: string, updates: Partial<IProject>): Promise<IProject | null> => {
  return Project.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteProject = async (id: string): Promise<IProject | null> => {
  return Project.findByIdAndDelete(id);
};
