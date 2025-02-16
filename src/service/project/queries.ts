import ProjectService from './ProjectService';
import { ProjectParamsRequest, ProjectRegisterRequest } from './request';

const queryKeys = {
  retrieveProjectDetail: (projectId: string, memberId?: number) =>
    memberId
      ? (['retrieveDetail', projectId, memberId] as const)
      : (['retrieveDetail', projectId] as const),
  retrieveSitreePick: () => ['project', 'retrieveSitreePick'] as const,
  retrieveProjects: (projectQuery: ProjectParamsRequest) =>
    ['retrieveProjects', projectQuery] as const
};

const ProjectQueryOptions = {
  registerProject: (param: ProjectRegisterRequest) => ({
    mutateFn: () => ProjectService.registerProject(param)
  }),
  retrieveProjectDetail: (projectId: string, memberId?: number) => ({
    queryKey: queryKeys.retrieveProjectDetail(projectId, memberId),
    queryFn: () => ProjectService.retrieveProjectDetail(projectId, memberId)
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
