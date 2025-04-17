import React from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

interface TeamMember {
  image: string;
  name: string;
  isLeader: boolean;
}

const ProjectParticipantCard: React.FC<TeamMember> = ({ image, name, isLeader }) => {
  return (
    <div
      className={`relative bg-white rounded-large px-4 py-5 border-[1px] border-slate-90 flex flex-col items-center gap-4 ${!isLeader && 'hover:shadow-md'}`}
    >
      {isLeader && (
        <SButton className="absolute left-[0.8rem] top-[0.8rem] px-1.5 py-1 rounded-small bg-tree-97 text-tree-40 text-center font-bd text-xsmall">
          Owner
        </SButton>
      )}
      {!isLeader && (
        <SImage
          src="/close.svg"
          width={19}
          height={19}
          className="absolute right-[1.5rem] top-[1rem] cursor-pointer"
        />
      )}
      <SImage
        src={image}
        width={64}
        height={64}
        alt={name}
        defaultType="user"
        className="mx-auto rounded-full h-20 w-20 object-cover mb-4"
      />
      <div className="text-center">
        <p className="text-base font-lb leading-5 tracking-[-0.32px]">{name}</p>
      </div>
    </div>
  );
};

export default ProjectParticipantCard;
