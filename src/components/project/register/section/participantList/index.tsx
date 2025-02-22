'use client';

import withModal from '@/enhancers/WithModal';
import AuthService from '@/service/auth/AuthService';
import { UserResult } from '@/service/auth/response';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectRegisterRequest } from '@/service/project/request';
import { ParticipantResponse } from '@/service/project/response';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';

import { DEFAULT_DETAIL_DATA } from '../../ProjectRegisterForm';

// Constants
const TOTAL_MEMBER = 10;
const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

// Types
interface ParticipantAddModalProps {
  onClose: () => void;
  register: (members: Array<UserResult>) => void;
}

// Participant Search Modal Component
const ParticipantAddModal: React.FC<ParticipantAddModalProps> = ({ onClose, register }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [selectedMember, setSelectedMember] = useState<Array<UserResult>>([]);
  const [hasNextResult, setHasNextResult] = useState(false);
  const [searchTotalCount, setSearchTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(0);

  const searchUsers = async (query: string, page: number) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await AuthService.searchUsers({ q: query, page, size: PAGE_SIZE });

      const selectedMemberIds = new Set(selectedMember.map((member) => member.memberId));

      const filteredResults = data.content.filter(
        (result) => !selectedMemberIds.has(result.memberId)
      );

      setSearchResults((prev) => (page === 0 ? filteredResults : [...prev, ...filteredResults]));
      setSearchTotalCount(data.total);
      setHasNextResult(data.hasNext);
    } catch (error) {
      console.error('검색 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickMember = (member: UserResult) => {
    setSelectedMember((prev) => [...prev, member]);

    setSearchResults((prev) => prev.filter((result) => result.memberId !== member.memberId));
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      searchUsers(inputQuery, 0);
      pageRef.current = 0;
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceSearch);
  }, [inputQuery]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!hasNextResult || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      pageRef.current += 1;
      searchUsers(inputQuery, pageRef.current);
    }
  };

  const handleRegister = () => selectedMember && register(selectedMember);

  return (
    <div className="w-[42rem] h-[22.6rem] bg-white-100 flex flex-col gap-4 rounded-[2.4rem] p-6">
      <header className="flex gap-2 items-center">
        <p className="text-large font-lb">팀원 등록</p>
        <p className="text-small text-slate-50">사이트리에 가입한 팀원만 등록할 수 있어요.</p>
      </header>

      <div className="relative py-4">
        <SInput
          className="text-small w-[34.6rem]"
          placeholder="이메일 또는 닉네임 검색"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        {selectedMember.map((member, index) => (
          <div key={`selected_member_${index}`}>{member.nickname}</div>
        ))}
        {searchResults.length > 0 && inputQuery.length > 0 && (
          <div
            className="fixed w-[34.6rem] left-[3.8rem] bg-white-100 border rounded-md shadow-md mt-[1rem] max-h-[12rem] overflow-auto z-10 p-4"
            onScroll={handleScroll}
          >
            <div className="text-left">
              <span className="text-xsmall text-slate-50">
                검색 결과 <span className="font-bd text-slate-30">{searchTotalCount}</span>건
              </span>
            </div>
            <div className="max-h-[12rem] overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={result.memberId}
                  className="flex gap-4 p-3 rounded-large hover:bg-slate-95 cursor-pointer"
                  onClick={() => handleClickMember(result)}
                >
                  <SImage
                    src={result.profileImgUrl}
                    width={40}
                    height={40}
                    defaultType="user"
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-small font-md">{result.nickname}</p>
                    <p className="text-xsmall text-slate-50">{result.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-auto">
        <SButton className="bg-slate-95" onClick={onClose}>
          닫기
        </SButton>
        <SButton className="bg-tree-50 text-white-100" onClick={handleRegister}>
          등록
        </SButton>
      </div>
    </div>
  );
};

const ProjectRegisterParticipantList: React.FC = () => {
  const { projectId } = useParams();
  const { data: session, status } = useSession(); // status 추가
  const { setValue } = useFormContext<ProjectRegisterRequest>();
  const [teamMembers, setTeamMembers] = useState<ParticipantResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDefaultQuery = () => ({
    queryKey: ['defaultProject'],
    queryFn: () => ({
      ...DEFAULT_DETAIL_DATA,
      participantList: [
        {
          memberId: Number(session?.detail.memberId) || 0,
          nickname: String(session?.detail.nickname) || 'Unknown',
          isLeader: true,
          focusPoint: '',
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
    const newMemberArray: Array<ParticipantResponse> = members.map((member) => ({
      memberId: member.memberId,
      nickname: member.nickname,
      imageUrl: member.profileImgUrl,
      position: '',
      focusPoint: '',
      isLeader: false
    }));
    const updatedTeamMembers = [...teamMembers, ...newMemberArray];
    setTeamMembers(updatedTeamMembers);
    setValue('participantList', updatedTeamMembers);
    setIsModalOpen(false);
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
          onClickClose={() => {}}
          onClose={() => setIsModalOpen(false)}
          register={addTeamMember}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">팀원 소개</h1>
        <div className="flex items-center space-x-4">
          <span className="text-small">{`${teamMembers.length} / ${TOTAL_MEMBER}`}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-slate-90 text-small px-3 py-2 rounded-[1rem]"
          >
            팀원 추가 +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <ProjectParticipantCard
            key={member.memberId}
            image={member.imageUrl}
            name={member.nickname}
            description={member.position}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectRegisterParticipantList;
