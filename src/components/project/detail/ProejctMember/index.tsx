'use client';

import { Participant } from '@/service/project/response';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ProjectMemberFocusedOn from './ProjectMemberFocusedOn';
import ProjectMemberItem from './ProjectMemberItem';

interface ProjectMemberProps {
  id: string;
  participantList: Array<Participant>;
}

const ProjectMember = ({ id, participantList }: ProjectMemberProps) => {
  const { data: session } = useSession();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (participantList.length === 0) {
    return null;
  }

  const onChangeMember = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div id={id} className="h-[66rem] p-10">
      <div className="text-xlarge font-lb leading-[3rem] tracking-[-0.48px] pb-5">
        팀원 {participantList.length}명
      </div>
      <div className="flex gap-5">
        <div>
          {participantList.map((member, index) => (
            <ProjectMemberItem
              key={`project_detail_member_${index}`}
              imageSrc={member.imageUrl}
              name={member.nickname}
              index={index}
              position={member.position}
              isLeader={member.isLeader}
              selected={index === currentIndex}
              onChangeMember={onChangeMember}
            />
          ))}
        </div>
        <ProjectMemberFocusedOn
          contents={participantList[currentIndex].focusPoints}
          isMe={session?.detail.memberId === participantList[currentIndex].memberId}
          key={currentIndex}
        />
      </div>
    </div>
  );
};

export default ProjectMember;
