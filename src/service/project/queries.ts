import ProjectService from './ProjectService';
import { ProjectParamsRequest, ProjectRegisterRequest } from './request';

const queryKeys = {
  retrieveProjectDetail: (projectId: string) => ['retrieveDetail', projectId] as const,
  retrieveSitreePick: () => ['project', 'retrieveSitreePick'] as const,
  retrieveProjects: (projectQuery: ProjectParamsRequest) =>
    ['retrieveProjects', projectQuery] as const,
  retrieveProjectTechStacks: () => ['project', 'retrieveProjectTechStacks'] as const,
  checkProjectLikeStatus: (projectId: string, memberId: number) =>
    ['project', 'like', projectId, memberId] as const
};

const ProjectQueryOptions = {
  registerProject: (param: ProjectRegisterRequest) => ({
    mutateFn: () => ProjectService.registerProject(param)
  }),
  modifyProject: (projectId: string, param: ProjectRegisterRequest) => ({
    mutateFn: () => ProjectService.modifyProject(projectId, param)
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
  }),
  retrieveProjectTechStacks: () => ({
    queryKey: queryKeys.retrieveProjectTechStacks(),
    queryFn: () => ProjectService.retrieveProjectTechStacks()
  }),
  checkProjectLikeStatus: (projectId: string, memberId: number) => ({
    queryKey: queryKeys.checkProjectLikeStatus(projectId, memberId),
    queryFn: () => ProjectService.checkProjectLikeStatus(projectId, memberId)
  })
};

export default ProjectQueryOptions;
