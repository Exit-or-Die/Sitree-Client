import Service from '../service';
import { ProjectParamsRequest, ProjectRegisterRequest } from './request';
import {
  ProjectDetailResponse,
  ProjectLeader,
  ProjectRegisterResponse,
  ProjectsResponse,
  SitreePickResponse
} from './response';

class ProjectService extends Service {
  registerProject(param: ProjectRegisterRequest) {
    return this.http.post<ProjectRegisterResponse>('projects', param);
  }
  retrieveProjectDetail(projectId: string) {
    return this.http.get<ProjectDetailResponse>(`projects/${projectId}`);
  }
  deleteProject(projectId: string) {
    return this.http.delete(`projects/${projectId}`, { includeAuth: true });
  }
  likeProject(projectId: string) {
    return this.http.post(`projects/${projectId}/likes`, {}, { includeAuth: true });
  }
  retrieveSitreePick() {
    return this.http.get<Array<SitreePickResponse>>('projects/sitree-pick');
  }
  retrieveProjects(query: ProjectParamsRequest) {
    const params = new URLSearchParams({
      sortType: query.sortType
    });

    if (query.categoryIds) {
      query.categoryIds.forEach((id) => params.append('categoryIds', id.toString()));
    }

    if (query.nameKeyword) {
      params.append('nameKeyword', query.nameKeyword);
    }

    return this.http.get<ProjectsResponse>(`projects?${params.toString()}`);
  }
  checkProjectLikeStatus(projectId: string, memberId: number) {
    if (!projectId || !memberId) {
      return Promise.resolve({ isLiked: false });
    }

    return this.http.get<{ isLiked: boolean }>(
      `projects/${projectId}/likes/check?memberId=${memberId}`
    );
  }
  checkProjectLeader(projectId: string) {
    return this.http.get<ProjectLeader>(`projects/${projectId}/leader`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProjectService();
