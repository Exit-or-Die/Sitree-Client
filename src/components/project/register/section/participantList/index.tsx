import React, { useState } from 'react';

import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';

interface TeamMember {
  image: string;
  name: string;
  description: string;
}

const ProjectRegisterParticipantList: React.FC = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(teamMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = teamMembers.slice(startIndex, startIndex + membersPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const addTeamMember = () => {
    // Logic for adding a new team member (for now, just log it)
    console.log('팀원 추가');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">팀원 소개</h1>
        <div className="flex items-center space-x-4">
          <span>
            {currentPage} / {totalPages}
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
        {currentMembers.map((member, index) => (
          <ProjectParticipantCard
            key={index}
            image={member.image}
            name={member.name}
            description={member.description}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectRegisterParticipantList;
