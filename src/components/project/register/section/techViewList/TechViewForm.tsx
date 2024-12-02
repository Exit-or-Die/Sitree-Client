import { Tag } from '@/service/project/request';

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
            name="githubRepositoryUrl"
            value={skill.gitRepositoryUrl}
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
          name="techDesc"
          value={skill.techDesc}
          onChange={handleChange}
          className="mt-1.5 block w-full rounded-base border-slate-90 shadow-sm focus:border-tree-60 focus:ring focus:ring-tree-tint-50 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="inline-block text-small font-md text-slate-30 leading-5 tracking-[-0.14px] mb-1.5">
          기술 태그
        </label>
        <ProjectTagSelect
          onChange={(tags: Array<Tag>) => {
            console.log('tags', tags);
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
