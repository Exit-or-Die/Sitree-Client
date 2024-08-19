import ProjectService from './ProjectService';
import { ProjectRegisterRequest } from './request';

const queryKeys = {
  registerProject: () => ['register'] as const,
  retrieveProjectDetail: (projectDetail: string) => ['retrieveDetail', projectDetail] as const
};

const ProjectQueryOptions = {
  registerProject: (param: ProjectRegisterRequest) => ({
    queryKey: queryKeys.registerProject(),
    queryFn: () => ProjectService.registerProject(param)
  }),
  retrieveProjectDetail: (projectId: string) => ({
    queryKey: queryKeys.retrieveProjectDetail(projectId),
    queryFn: () => ProjectService.retrieveProjectDetail(projectId)
  })
};

export default ProjectQueryOptions;
