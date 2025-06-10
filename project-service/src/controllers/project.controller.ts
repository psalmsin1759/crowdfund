import { Request, Response, NextFunction } from 'express';
import * as ProjectService from '@/services/project.service';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const project = await ProjectService.getById(req.params.id);
    if (!project)
      return res.status(404).json({ message: 'Project not found' });
    return res.json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching project', error: err });
  }
};


export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.update(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.remove(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err });
  }
};
