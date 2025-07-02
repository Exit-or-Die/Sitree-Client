import { DEFAULT_PROJECT, PROJECT_ROLE } from '@/constants/profile/defaultData';
import { UserProjectField } from '@/service/profile/response';
import { Tag } from '@/service/project/request';

import SInput from '@/components/common/Input';
import RegisterRequiredMark from '@/components/common/Register/RegisterRequiredMark';
import STextarea from '@/components/common/Textarea';
import DateRangeWithInProgress from '@/components/custom/DateRangeWithInProgress';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

const ProjectExperienceForm: React.FC<{
  project: UserProjectField;
  index: number;
  updateProject: (index: number, updateField: UserProjectField) => void;
}> = ({ project = DEFAULT_PROJECT, index, updateProject }) => {
  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateProject(index, { ...project, [name]: value });
  };

  const updateTags = (selectedTags: Tag[]) => {
    const updatedTags = selectedTags.map((tag) => tag.name);
    updateProject(index, { ...project, ['roleTags']: updatedTags });
  };

  const tags = Object.keys(PROJECT_ROLE).map((tag) => ({ name: tag }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              프로젝트 제목
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="제목 입력"
            name="projectName"
            onChange={(e) => handleInputChange('projectName', e)}
            value={project.projectName}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              기간
            </label>
            <RegisterRequiredMark />
          </div>
          <DateRangeWithInProgress
            className="mt-1.5"
            updateField={updateProject}
            index={index}
            fieldData={project}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center mb-1.5">
          <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mr-1">
            내용
          </label>
        </div>
        <STextarea
          value={project.contents}
          name="contents"
          placeholder="진행한 프로젝트와 업무 내용 및 성과를 작성해 주세요."
          maxLength={1000}
          className="w-full border p-3 !rounded-base text-small resize-none h-[160px] placeholder-slate-60 outline-tree-50 focus:ring-tree-50"
          onChange={(e) => updateProject(index, { ...project, ['contents']: e.target.value })}
        />
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
              담당 포지션
            </p>
            <RegisterRequiredMark />
          </div>
          <ProjectTagSelect
            onChange={updateTags}
            displayKey="name"
            tags={tags}
            initialValue={project.roleTags.map((role) => ({ name: role }))}
          />
        </div>
        <div className="w-full" />
      </div>
    </div>
  );
};

export default ProjectExperienceForm;
