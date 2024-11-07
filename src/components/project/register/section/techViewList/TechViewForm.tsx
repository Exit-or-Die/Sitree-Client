import SInput from '@/components/common/Input';
import STextarea from '@/components/common/Textarea';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import { TechViewProps } from '.';

const TechViewForm: React.FC<{
  skill: TechViewProps;
  index: number;
  updateSkill: (index: number, updatedSkill: TechViewProps) => void;
}> = ({ skill, index, updateSkill }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSkill(index, { ...skill, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateSkill(index, { ...skill, architectureImage: e.target.files[0] });
    }
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
            name="name"
            value={skill.name}
            onChange={handleChange}
            className="mt-1.5"
          />
        </div>
        <div className="w-full">
          <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
            기술 이름
          </label>
          <SInput
            type="text"
            placeholder="링크 입력"
            name="github"
            value={skill.github}
            onChange={handleChange}
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
          기술 설명
        </label>
        <STextarea
          placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
          name="stack"
          value={skill.stack}
          onChange={handleChange}
          className="mt-1.5 block w-full rounded-base border-slate-90 shadow-sm focus:border-tree-60 focus:ring focus:ring-tree-tint-50 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
          기술 태그
        </label>
        <ProjectTagSelect />
      </div>
    </div>
  );
};

export default TechViewForm;
