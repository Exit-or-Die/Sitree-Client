import { Tag } from '@/service/project/request';
import dynamic from 'next/dynamic';

import SInput from '@/components/common/Input';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import { TechViewProps } from '.';

const SEditor = dynamic(() => import('@/components/common/Editor'), { ssr: false });

const TechViewForm: React.FC<{
  skill: TechViewProps;
  index: number;
  updateSkill: (index: number, updatedSkill: TechViewProps) => void;
}> = ({ skill, index, updateSkill }) => {
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
            value={skill.techTitle}
            onChange={handleInputChange}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
        <div className="w-full">
          <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
            GitHub 링크
          </label>
          <SInput
            type="text"
            placeholder="링크 입력"
            name="gitRepositoryUrl"
            value={skill.gitRepositoryUrl}
            onChange={handleInputChange}
            className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
          />
        </div>
      </div>
      <div>
        <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
          기술 설명
        </label>
        <div className="mt-1.5">
          <SEditor
            placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
            initialValue={skill.techDesc}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <div>
        <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
          기술 태그
        </label>
        <ProjectTagSelect
          onChange={(tags: Array<Tag>) => {
            updateSkill(index, { ...skill, techTagList: tags.map((tag) => tag.name) });
          }}
          tags={[{ name: '스포츠' }, { name: '헬스케어' }]}
          displayKey="name"
        />
      </div>
    </div>
  );
};

export default TechViewForm;
