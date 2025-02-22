import { TechView } from '@/service/project/response';
import { extractContentFromHtml } from '@/utils/stringUtil';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SInput from '@/components/common/Input';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import { RegiseterErrorMessage } from '../../error/RegisterError';

const TechViewForm: React.FC<{
  skill: TechView;
  index: number;
  updateSkill: (index: number, updatedSkill: TechView) => void;
}> = ({ skill, index, updateSkill }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSkill(index, { ...skill, [name]: value });
  };

  const handleEditorChange = (value: string) => {
    if (!extractContentFromHtml(value).length) {
      return;
    }

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
          />
          <RegiseterErrorMessage errorKey={`techviewList.${index}.techTitle`} />
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
          <RegiseterErrorMessage errorKey={`techviewList.${index}.gitRepositoryUrl`} />
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
      <RegiseterErrorMessage errorKey="techviewList" />
    </div>
  );
};

export default TechViewForm;
