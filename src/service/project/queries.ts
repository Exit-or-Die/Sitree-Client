import ProjectService from './ProjectService';
import { ProjectRegisterRequest } from './request';

const queryKeys = {
  retrieveProjectDetail: (projectId: string) => ['retrieveDetail', projectId] as const
};

const ProjectQueryOptions = {
  registerProject: (param: ProjectRegisterRequest) => ({
    mutateFn: () => ProjectService.registerProject(param)
  }),
  retrieveProjectDetail: (projectId: string) => ({
    queryKey: queryKeys.retrieveProjectDetail(projectId),
    queryFn: () => ProjectService.retrieveProjectDetail(projectId)
  }),
  likeProject: (projectId: string) => ({
    mutateFn: () => ProjectService.likeProject(projectId)
  })
};

export default ProjectQueryOptions;
