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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSkill(index, { ...skill, includeArchitecture: e.target.checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateSkill(index, { ...skill, architectureImage: e.target.files[0] });
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">기술 이름</label>
          <input
            type="text"
            placeholder="이름 입력"
            name="name"
            value={skill.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">GitHub 링크</label>
          <input
            type="text"
            placeholder="링크 입력"
            name="github"
            value={skill.github}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">기술 스택</label>
        <textarea
          placeholder="프로젝트를 진행하면서 활용한 기술 스택을 소개해 주세요"
          name="stack"
          value={skill.stack}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={skill.includeArchitecture}
          onChange={handleCheckboxChange}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">아키텍처 소개 포함</label>
      </div>

      {skill.includeArchitecture && (
        <>
          <div className="mt-4">
            <label className="block text-sm font-medium">아키텍처 설명</label>
            <textarea
              placeholder="개발 아키텍처를 설명해 주세요."
              name="architectureDescription"
              value={skill.architectureDescription || ''}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">아키텍처 이미지</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {skill.architectureImage && (
              <p className="text-sm text-gray-600 mt-2">{skill.architectureImage.name} 선택됨</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TechViewForm;
