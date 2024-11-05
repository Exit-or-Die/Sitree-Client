import { ProjectDetailResponse } from '@/service/project/response';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';

interface ProjectRegisterParticipantProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

interface TeamMember {
  image: string;
  name: string;
  description: string;
}

const TOTAL_MEMBER = 10;

const ProjectRegisterParticipantList = ({ register }: ProjectRegisterParticipantProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { image: '/path/to/image1.jpg', name: '헤더덕', description: '수도승' },
    { image: '/path/to/image2.jpg', name: '家守 きりこ', description: '로ㅋㅋ' },
    { image: '/path/to/image3.jpg', name: '프로덕트디자이너', description: '@lizzy123' },
    {
      image: '/path/to/image4.jpg',
      name: '어어 말이 그렇다는겁니다',
      description: '말이 그렇다는 겁니다 말이'
    },
    { image: '/path/to/image5.jpg', name: '이혜린', description: 'Product Designer' }
  ]);

  const addTeamMember = () => {};

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">팀원 소개</h1>
        <div className="flex items-center space-x-4">
          <span>
            {teamMembers.length} / {TOTAL_MEMBER}
          </span>
          <button
            onClick={addTeamMember}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
          >
            팀원 추가 +
          </button>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-4  gap-6">
        {teamMembers.map((member, index) => (
          <ProjectParticipantCard
            key={index}
            image={member.image}
            name={member.name}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectRegisterParticipantList;
