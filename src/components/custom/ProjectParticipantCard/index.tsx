import React from 'react';

import SImage from '@/components/common/Image';

interface TeamMember {
  image: string;
  name: string;
  description: string;
}

const ProjectParticipantCard: React.FC<TeamMember> = ({ image, name, description }) => {
  return (
    <div className="bg-white rounded-large px-4 py-5 border-[1px] w-[20.4rem] border-slate-90 flex flex-col items-center gap-4">
      <SImage
        src={'https://picsum.photos/600/400'}
        width={64}
        height={64}
        alt={name}
        className="mx-auto rounded-full h-20 w-20 object-cover mb-4"
      />
      <div className="text-center">
        <p className="text-base font-lb leading-5 tracking-[-0.32px]">{name}</p>
        <p className="text-[1.3rem] text-slate-50 leading-5 tracking-[-0.13px]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectParticipantCard;
