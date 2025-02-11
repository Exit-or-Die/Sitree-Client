import Service from '../service';
import { ProjectParamsRequest, ProjectRegisterRequest } from './request';
import {
  ProjectDetailResponse,
  ProjectRegisterResponse,
  ProjectsResponse,
  SitreePickResponse
} from './response';

class ProjectService extends Service {
  registerProject(param: ProjectRegisterRequest) {
    return this.http.post<ProjectRegisterResponse>('project', param);
  }
  retrieveProjectDetail(projectId: string) {
    return this.http.get<ProjectDetailResponse>(`project/${projectId}`);
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProjectService();
