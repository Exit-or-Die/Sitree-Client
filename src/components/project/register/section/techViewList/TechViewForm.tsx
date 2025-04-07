import { DEFAULT_TECH_VIEW } from '@/constants/project/techView';
import ProjectQueryOptions from '@/service/project/queries';
import { TechView } from '@/service/project/response';
import { useQuery } from '@tanstack/react-query';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SInput from '@/components/common/Input';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';
import { RegiseterErrorMessage } from '../../error/RegisterError';

const TechViewForm: React.FC<{
  skill: TechView;
  index: number;
  updateSkill: (index: number, updatedSkill: TechView) => void;
}> = ({ skill = DEFAULT_TECH_VIEW, index, updateSkill }) => {
  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectTechStacks();
  const { data } = useQuery({ queryKey, queryFn });
  // skill의 속성을 기본값으로 보장
  const normalizedSkill: TechView = { ...skill };
  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSkill(index, { ...normalizedSkill, [name]: value });
  };

  const handleEditorChange = (value: string) => {
    updateSkill(index, { ...normalizedSkill, techDesc: value });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="w-full">
          <div className="flex items-center">
            <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              기술 이름
            </p>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="이름 입력"
            name="techTitle"
            value={normalizedSkill.techTitle}
            onChange={(e) => handleInputChange('techTitle', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
          <RegiseterErrorMessage errorKey={`techviewList.${index}.techTitle`} />
        </div>
        <div className="w-full">
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              GitHub 링크
            </label>
            <RegisterRequiredMark />
          </div>
          <SInput
            type="text"
            placeholder="링크 입력"
            name="gitRepositoryUrl"
            value={normalizedSkill.gitRepositoryUrl}
            onChange={(e) => handleInputChange('gitRepositoryUrl', e)}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
          <RegiseterErrorMessage errorKey={`techviewList.${index}.gitRepositoryUrl`} />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
            기술 설명
          </label>
          <RegisterRequiredMark />
        </div>
        <div className="mt-1.5">
          <DynamicSEditor
            placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
            initialValue={normalizedSkill.techDesc}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
            기술 태그
          </label>
          <RegisterRequiredMark />
        </div>
        <ProjectTagSelect
          onChange={(tags: Array<string>) => {
            updateSkill(index, { ...normalizedSkill, techStackTypes: tags });
          }}
          tags={data?.techStacks || []}
          initialValue={normalizedSkill.techStackTypes}
        />
      </div>
      <RegiseterErrorMessage errorKey="techviewList" />
    </div>
  );
};

export default TechViewForm;
