'use client';

import { useState } from 'react';

import ProjectMemberFocusedOn from './ProjectMemberFocusedOn';
import ProjectMemberItem from './ProjectMemberItem';

const ProjectMember = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onChangeMember = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="p-10">
      <div className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px] pb-5">팀원 N명</div>
      <div className="flex gap-5">
        <div>
          {new Array(5).fill(0).map((member, index) => (
            <ProjectMemberItem
              key={`project_detail_member_${index}`}
              imageSrc="https://picsum.photos/600/400"
              name="조성훈"
              index={index}
              position="프론트엔드 개발자"
              isOwner={index === 0}
              selected={index === currentIndex}
              onChangeMember={onChangeMember}
            />
          ))}
        </div>
        <ProjectMemberFocusedOn />
      </div>
    </div>
  );
};

export default ProjectMember;
