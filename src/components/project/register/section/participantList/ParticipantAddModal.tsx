import useClickOutside from '@/hooks/useClickOutside';
import AuthService from '@/service/auth/AuthService';
import { UserResult } from '@/service/auth/response';
import { Participant } from '@/service/project/response';
import { useEffect, useRef, useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import UserSearchResult from '@/components/custom/UserSearchResult';

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

interface ParticipantAddModalProps {
  teamMembers: Array<Participant>;
  onClickClose: () => void;
  register: (members: Array<UserResult>) => void;
}

const ParticipantAddModal: React.FC<ParticipantAddModalProps> = ({
  teamMembers,
  onClickClose,
  register
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [selectedMember, setSelectedMember] = useState<Array<UserResult>>([]);
  const [hasNextResult, setHasNextResult] = useState(false);
  const [searchTotalCount, setSearchTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(0);
  const searchResultRef = useClickOutside(() => setSearchResults([]));

  const searchUsers = async (query: string, pageNo: number) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await AuthService.searchUsers({ q: query, pageNo, size: PAGE_SIZE });

      const selectedMemberIds = new Set([
        ...selectedMember.map((member) => member.memberId),
        ...teamMembers.map((member) => member.memberId)
      ]);
      const filteredResults = data.content.filter(
        (result) => !selectedMemberIds.has(result.memberId)
      );

      setSearchResults((prev) => (pageNo === 0 ? filteredResults : [...prev, ...filteredResults]));
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
  const handleDeleteMember = (index: number) => {
    setSelectedMember((prev) => prev.filter((_, i) => i !== index));
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
    <div className="w-[42rem] min-h-[22.6rem] bg-white-100 flex flex-col gap-4 rounded-[2.4rem] p-6">
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
        <div className="flex flex-col gap-1 mt-3">
          {selectedMember.map((member, index) => (
            <div
              key={`selected_member_${member.memberId}`}
              className="flex gap-[1rem] p-3 rounded-large hover:bg-slate-95 cursor-pointer"
              onScroll={handleScroll}
            >
              <SImage
                src={member.profileImgUrl}
                width={40}
                height={40}
                defaultType="user"
                className="rounded-full"
              />
              <div className="flex flex-col flex-1 gap-1 items-start">
                <p className="text-small font-md">{member.nickname}</p>
                <p className="text-xsmall text-slate-50">{member.email}</p>
                {/* <div className="flex gap-1.5">
                <p className="text-xsmall font-bd">{result.belongingId}</p>
                <p className="text-xsmall text-slate-50">{result.email}</p>
              </div> */}
              </div>
              <div className="flex items-center">
                <SImage
                  src="/close.svg"
                  width={16}
                  height={16}
                  onClick={() => handleDeleteMember(index)}
                />
              </div>
            </div>
          ))}
        </div>
        {searchResults.length > 0 && inputQuery.length > 0 && (
          <div className="fixed w-[34.6rem] left-[3.8rem] top-[13rem]">
            <UserSearchResult
              searchResultRef={searchResultRef}
              searchResults={searchResults}
              searchTotalCount={searchTotalCount}
              handleClickMember={handleClickMember}
              handleScroll={handleScroll}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-auto">
        <SButton className="bg-slate-95" onClick={onClickClose}>
          닫기
        </SButton>
        <SButton className="bg-tree-50 text-white-100" onClick={handleRegister}>
          등록
        </SButton>
      </div>
    </div>
  );
};

export default ParticipantAddModal;
