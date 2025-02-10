'use client';

import withModal from '@/enhancers/WithModal';
import { Participant, ProjectRegisterRequest } from '@/service/project/request';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SInput from '@/components/common/Input';
import ProjectParticipantCard from '@/components/custom/ProjectParticipantCard';
import AuthService from '@/service/auth/AuthService';
import { UserResult, UserSearchResult } from '@/service/auth/response';
import SImage from '@/components/common/Image';

const TOTAL_MEMBER = 10;

interface ParticipantModalProps {
  onClose: () => void;
  register: (nickname: string) => void;
}

const ParticipantAddModal = ({ onClose, register }: ParticipantModalProps) => {
  const [nickname, setNickname] = useState('');
  const [hasNextResult, setHasNextResult] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<UserResult>>([]);
  const [searchTotalCount, setSearchTotalCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const searchUsers = async (q: string, page: number) => {
    setLoading(true);
    try {
      const data = await AuthService.searchUsers({ q, page, size: 10 });
      if (page === 0) {
        setSearchResults(data.content);
        setSearchTotalCount(data.total);
        setHasNextResult(data.hasNext);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...data.content]);
        setHasNextResult(data.hasNext);
      }
    } catch (error) {
      console.error('검색 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (nickname) {
        searchUsers(nickname, page);
      } else {
        setSearchResults([]);
        setSearchTotalCount(0);
        setHasNextResult(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [nickname, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !loading && hasNextResult) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        searchUsers(nickname, nextPage);

        return nextPage;
      });
    }
  };

  const handleRegister = () => {
    if (nickname) {
      register(nickname);
      onClose();
    }
  };

  useEffect(() => {
    console.log('searchResult', searchResults);
  }, [searchResults]);

  return (
    <div className="w-[42rem] h-[22.6rem] bg-white-100 flex flex-col gap-4 rounded-[2.4rem] p-6">
      <div className="flex gap-2 items-center">
        <p className="text-large font-lb leading-6 tracking-[-0.4px] text-left">팀원 등록</p>
        <p className="text-small text-slate-50">사이트리에 가입한 팀원만 등록할 수 있어요.</p>
      </div>
      <div className="relative text-left py-4">
        <SInput
          className="text-small leading-5 tracking-[-0.14px]"
          placeholder="이메일 또는 닉네임 검색"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div
            className="absolute top-full left-0 flex flex-col gap-2 w-full bg-white-100 border rounded-md shadow-md mt-2 max-h-[12rem] overflow-hidden z-10 p-4"
            onScroll={handleScroll}
          >
            <span className="flex leading-4 text-xsmall text-slate-50">
              검색 결과 &nbsp;<p className="font-bd text-slate-30">{searchTotalCount}</p>건
            </span>
            <div className="max-h-[12rem] overflow-y-hidden">
              {searchResults.map((result, index) => (
                <div key={index} className="flex gap-[1rem] p-3 rounded-large hover:bg-slate-95">
                  <SImage
                    src={result.profileImgUrl}
                    width={40}
                    height={40}
                    defaultType="user"
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="leading-5 font-md text-small">{result.nickname}</p>
                    <div className="flex gap-1.5 text-xsmall font-md">
                      {result.belongingId && <p>{result.belongingId}</p>}
                      {result.belongingId && <p className="text-slate-90">|</p>}
                      <p className="text-slate-50">{result.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-auto">
        <SButton className="bg-slate-95 border-none" onClick={onClose}>
          닫기
        </SButton>
        <SButton className="bg-tree-50 border-none text-white-100" onClick={handleRegister}>
          등록
        </SButton>
      </div>
    </div>
  );
};

const ProjectRegisterParticipantList = () => {
  const { data: session } = useSession();
  const { setValue, getValues } = useFormContext<ProjectRegisterRequest>();
  const [teamMembers, setTeamMembers] = useState<Participant[]>(getValues('participantList') || []);
  const [toggleModal, setToggleModal] = useState(false);

  const AddWithModal = withModal(ParticipantAddModal);

  const addTeamMember = useCallback(
    (nickname: string) => {
      const newMember: Participant = {
        memberNo: teamMembers.length + 1,
        nickname,
        isLeader: false,
        focusPoint: '',
        imageUrl: ''
      };

      const updatedTeamMembers = [...teamMembers, newMember];
      setTeamMembers(updatedTeamMembers);
      setValue('participantList', updatedTeamMembers);
    },
    [teamMembers, setValue]
  );

  const openAddModal = () => {
    setToggleModal(true);
  };

  const closeAddModal = () => {
    setToggleModal(false);
  };

  useEffect(() => {
    if (!teamMembers.length && session) {
      const initialMember = {
        memberNo: 1,
        nickname: session?.detail.nickname,
        isLeader: true,
        focusPoint: '',
        imageUrl: '',
        position: ''
      };

      setValue('participantList', [initialMember]);
      setTeamMembers([initialMember]);
    }
  }, [session, teamMembers, setValue]);

  const renderTeamCards = () => {
    return teamMembers.map((member, index) => (
      <ProjectParticipantCard
        key={index}
        image={member.imageUrl}
        name={member.nickname}
        description={member.position}
      />
    ));
  };

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border border-slate-90">
      <AddWithModal
        isVisible={toggleModal}
        hideClose={true}
        onClickClose={() => {}}
        onClose={closeAddModal}
        register={addTeamMember}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{renderTeamCards()}</div>
    </div>
  );
};

export default ProjectRegisterParticipantList;
