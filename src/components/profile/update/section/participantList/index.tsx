'use client';

import withModal from '@/enhancers/WithModal';
import { UserResult } from '@/service/auth/response';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectRegisterRequest } from '@/service/project/request';
import { Participant } from '@/service/project/response';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Nullable } from 'types';

import SButton from '@/components/common/Button';
import SInput from '@/components/common/Input';
import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';

import { RegiseterErrorMessage } from '../../error/RegisterError';
import { DEFAULT_PROFILE_DATA } from '../../ProfileUpdateForm';
import ParticipantAddModal from './ParticipantAddModal';

const TOTAL_MEMBER = 10;

const ProjectRegisterParticipantList: React.FC = () => {
  const { projectId } = useParams();
  const { data: session, status } = useSession(); // status 추가
  const { setValue } = useFormContext<ProjectRegisterRequest>();
  const [teamMembers, setTeamMembers] = useState<Participant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDefaultQuery = () => ({
    queryKey: ['defaultProject'],
    queryFn: () => ({
      ...DEFAULT_PROFILE_DATA,
      participantList: [
        {
          memberId: Number(session?.detail.memberId) || 0,
          nickname: String(session?.detail.nickname) || 'Unknown',
          isLeader: true,
          focusPoints: [] as Nullable<Array<string>>,
          imageUrl: String(session?.detail.profileImgUrl) || '',
          position: ''
        }
      ]
    })
  });

  const { queryKey, queryFn } = projectId
    ? ProjectQueryOptions.retrieveProjectDetail(projectId as string)
    : getDefaultQuery();

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled: !!projectId || status === 'authenticated' // projectId 없고 인증 완료 시에만 실행
  });

  const AddWithModal = withModal(ParticipantAddModal);

  const addTeamMember = (members: Array<UserResult>) => {
    const newMemberArray: Array<Participant> = members.map((member) => ({
      memberId: member.memberId,
      nickname: member.nickname,
      imageUrl: member.profileImgUrl,
      position: '',
      focusPoints: [],
      isLeader: false
    }));
    const updatedTeamMembers = [...teamMembers, ...newMemberArray];
    setTeamMembers(updatedTeamMembers);
    setValue('participantList', updatedTeamMembers);
    setIsModalOpen(false);
  };

  const handlePositionInput = (value: string, index: number) => {
    setTeamMembers((prevMembers) => {
      const updatedMembers = prevMembers.map((member, i) =>
        i === index ? { ...member, position: value } : member
      );
      setValue('participantList', updatedMembers);

      return updatedMembers;
    });
  };
  useEffect(() => {
    if (data?.participantList) {
      setTeamMembers(data.participantList);
    }
  }, [data, isFetching]);

  useEffect(() => {
    setValue('participantList', teamMembers);
  }, [teamMembers]);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border border-slate-90">
      {isModalOpen && (
        <AddWithModal
          isVisible={isModalOpen}
          hideClose
          onClickClose={() => {
            setIsModalOpen(false);
          }}
          teamMembers={teamMembers}
          register={addTeamMember}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">팀원 소개</h1>
        <div className="flex items-center space-x-4">
          <span className="text-small">{`${teamMembers.length} / ${TOTAL_MEMBER}`}</span>
          <SButton
            onClick={() => setIsModalOpen(true)}
            className="border border-slate-90 text-small px-3 py-2 rounded-[1rem]"
          >
            팀원 추가 +
          </SButton>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={member.memberId} className="min-w-[20.4rem] text-center">
            <ProjectParticipantCard
              image={member.imageUrl}
              name={member.nickname}
              isLeader={member.isLeader}
            />
            <SInput
              className="mt-2 text-center text-small"
              placeholder="포지션 입력"
              onChange={(e) => handlePositionInput(e.target.value, index)}
              value={teamMembers[index].position}
            />
            <RegiseterErrorMessage errorKey={`participantList.${index}.position`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRegisterParticipantList;
