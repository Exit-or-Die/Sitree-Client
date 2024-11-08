import withModal from '@/enhancers/WithModal';
import React, { useEffect, useState } from 'react';

import SButton from '@/components/common/Button';
import SInput from '@/components/common/Input';
import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';

interface TeamMember {
  image: string;
  name: string;
  description: string;
}

interface ParticipantModalProps {
  onClose: () => void;
  register: () => void;
}

const TOTAL_MEMBER = 10;

const ParticipantAddModal = ({ onClose, register }: ParticipantModalProps) => {
  return (
    <div className="w-[56rem] h-[22.6rem] bg-white-100 flex flex-col gap-4 rounded-[2.4rem] p-6">
      <p className="text-large font-lb leading-6 tracking-[-0.4px] text-left">팀원 등록</p>
      <div className="flex gap-5">
        <div className="text-left flex-1">
          <p className="text-small leading-5 tracking-[-0.14px] py-1 mb-1.5">팀원 ID</p>
          <SInput className="text-small" />
        </div>
        <div className="text-left flex-1">
          <p className="text-small leading-5 tracking-[-0.14px] py-1 mb-1.5">포지션</p>
          <SInput className="text-small" />
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <SButton className="bg-slate-95 border-none" onClick={onClose}>
          닫기
        </SButton>
        <SButton className="bg-tree-50 border-none text-white-100" onClick={register}>
          등록
        </SButton>
      </div>
    </div>
  );
};

const ProjectRegisterParticipantList = () => {
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

  const [toggleModal, setToggleModal] = useState(false);

  const AddWithModal = withModal(ParticipantAddModal);

  const openAddModal = () => {
    setToggleModal(true);
  };

  const closeAddModal = () => {
    setToggleModal(false);
  };

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border border-slate-90">
      <AddWithModal
        isVisible={toggleModal}
        hideClose={true}
        onClickClose={() => {}}
        onClose={closeAddModal}
        register={() => {}}
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">팀원 소개</h1>
        <div className="flex items-center space-x-4">
          <span className="text-small flex">
            <p className="text-slate-50">{teamMembers.length}</p>
            <p className="text-slate-70">&nbsp;/&nbsp;{TOTAL_MEMBER}</p>
          </span>
          <button
            onClick={openAddModal}
            className="flex items-center border border-slate-90 text-slate-40 text-small px-3 py-2 rounded-[1rem]"
          >
            팀원 추가 +
          </button>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
