import { ProjectRegisterRequest } from '@/service/project/request';
import { TechView } from '@/service/project/response';
import getErrorMessage from '@/utils/getErrorMessage';
import { useFormContext } from 'react-hook-form';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SInput from '@/components/common/Input';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

const TechViewForm: React.FC<{
  skill: TechView;
  index: number;
  updateSkill: (index: number, updatedSkill: TechView) => void;
}> = ({ skill, index, updateSkill }) => {
  const {
    formState: { errors }
  } = useFormContext<ProjectRegisterRequest>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSkill(index, { ...skill, [name]: value });
  };

  const handleEditorChange = (value: string) => {
    updateSkill(index, { ...skill, techDesc: value });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="w-full">
          <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
            기술 이름
          </label>
          <SInput
            type="text"
            placeholder="이름 입력"
            name="techTitle"
            value={skill?.techTitle}
            onChange={handleInputChange}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
            errors={getErrorMessage(errors, `techviewList.${index}.techTitle`)}
          />
          <span className="text-[#DC2430] text-xsmall">
            {getErrorMessage(errors, `techviewList.${index}.techTitle`)}
          </span>
        </div>
        <div className="w-full">
          <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
            GitHub 링크
          </label>
          <SInput
            type="text"
            placeholder="링크 입력"
            name="gitRepositoryUrl"
            value={skill?.gitRepositoryUrl}
            onChange={handleInputChange}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
          <span className="text-[#DC2430] text-xsmall">
            {getErrorMessage(errors, `techviewList.${index}.gitRepositoryUrl`)}
          </span>
        </div>
      </div>
      <div>
        <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
          기술 설명
        </label>
        <div className="mt-1.5">
          <DynamicSEditor
            placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
            initialValue={skill?.techDesc}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div>
        <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
          기술 태그
        </label>
        <ProjectTagSelect
          onChange={(tags: Array<string>) => {
            updateSkill(index, { ...skill, techStackTypes: tags.map((tag) => tag) });
          }}
          tags={['스포츠', '헬스케어']}
          initialValue={skill?.techStackTypes}
        />
      </div>
      <span className="text-[#DC2430] text-small">{getErrorMessage(errors, `techviewList`)}</span>
    </div>
  );
};

export default TechViewForm;
