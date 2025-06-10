import * as ProjectRepo from '@/repositories/project.repository';
import { IProject } from '@/models/project.model';

export const create = async (data: Partial<IProject>): Promise<IProject> => {
  return await ProjectRepo.createProject(data);
};

export const getAll = async (): Promise<IProject[]> => {
  return await ProjectRepo.findAllProjects();
};

export const getById = async (id: string): Promise<IProject | null> => {
  return await ProjectRepo.findProjectById(id);
};

export const update = async (id: string, data: Partial<IProject>): Promise<IProject | null> => {
  return await ProjectRepo.updateProject(id, data);
};

export const remove = async (id: string): Promise<IProject | null> => {
  return await ProjectRepo.deleteProject(id);
};
