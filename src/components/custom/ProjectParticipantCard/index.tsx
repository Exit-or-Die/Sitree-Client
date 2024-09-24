import React from 'react';

import SImage from '@/components/common/Image';

interface TeamMember {
  image: string;
  name: string;
  description: string;
}

const ProjectParticipantCard: React.FC<TeamMember> = ({ image, name, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center">
      <SImage
        src={'https://picsum.photos/600/400'}
        width={20}
        height={20}
        alt={name}
        className="mx-auto rounded-full h-20 w-20 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default ProjectParticipantCard;
