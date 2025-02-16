import ProjectService from './ProjectService';
import { ProjectParamsRequest, ProjectRegisterRequest } from './request';

const queryKeys = {
  retrieveProjectDetail: (projectId: string) => ['retrieveDetail', projectId] as const,
  retrieveSitreePick: () => ['project', 'retrieveSitreePick'] as const,
  retrieveProjects: (projectQuery: ProjectParamsRequest) =>
    ['retrieveProjects', projectQuery] as const
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
  }),
  retrieveSitreePick: () => ({
    queryKey: queryKeys.retrieveSitreePick(),
    queryFn: () => ProjectService.retrieveSitreePick()
  }),
  retrieveProjects: (query: ProjectParamsRequest = { sortType: 'VIEWS' }) => ({
    queryKey: queryKeys.retrieveProjects(query),
    queryFn: () => ProjectService.retrieveProjects(query)
  })
};

export default ProjectQueryOptions;
