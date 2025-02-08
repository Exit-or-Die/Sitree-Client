import Service from '../service';
import { ProjectRegisterRequest } from './request';
import { ProjectDetailResponse, ProjectRegisterResponse } from './response';

class ProjectService extends Service {
  registerProject(param: ProjectRegisterRequest) {
    return this.http.post<ProjectRegisterResponse>('projects', param);
  }
  retrieveProjectDetail(projectId: string) {
    return this.http.get<ProjectDetailResponse>(`projects/${projectId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProjectService();
