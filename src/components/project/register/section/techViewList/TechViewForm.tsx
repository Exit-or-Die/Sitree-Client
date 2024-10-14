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
    <div className="p-12 rounded-base shadow-lg bg-white mb-16">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-small font-md text-slate-50">기술 이름</label>
          <input
            type="text"
            placeholder="이름 입력"
            name="name"
            value={skill.name}
            onChange={handleChange}
            className="mt-1.5 block w-full rounded-base border-slate-90 shadow-sm focus:border-tree-60 focus:ring focus:ring-tree-tint-50 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-small font-md text-slate-50">GitHub 링크</label>
          <input
            type="text"
            placeholder="링크 입력"
            name="github"
            value={skill.github}
            onChange={handleChange}
            className="mt-1.5 block w-full rounded-base border-slate-90 shadow-sm focus:border-tree-60 focus:ring focus:ring-tree-tint-50 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-small font-md text-slate-50">기술 설명</label>
        <textarea
          placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
          name="stack"
          value={skill.stack}
          onChange={handleChange}
          rows={4}
          className="mt-1.5 block w-full rounded-base border-slate-90 shadow-sm focus:border-tree-60 focus:ring focus:ring-tree-tint-50 focus:ring-opacity-50"
        ></textarea>
      </div>
    </div>
  );
};

export default TechViewForm;
