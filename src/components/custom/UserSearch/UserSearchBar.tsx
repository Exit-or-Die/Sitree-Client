import useClickOutside from '@/hooks/useClickOutside';
import AuthService from '@/service/auth/AuthService';
import { UserResult } from '@/service/auth/response';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import SInput from '@/components/common/Input';
import SvgIcon from '@/components/common/SVGIcon';

import UserSearchResult from './UserSearchResult';

export interface UserSearchBarProps {
  placeholder: string;
  clickMember: (member: UserResult) => void;
  inputClassName?: string;
  excludeMemberIds?: Array<number>;
  locationClass?: string;
}

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

const UserSearchBar = ({
  excludeMemberIds = [],
  clickMember,
  placeholder,
  locationClass,
  inputClassName = ''
}: UserSearchBarProps) => {
  const [inputQuery, setInputQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
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

      const selectedMemberIds = new Set([...excludeMemberIds]);

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!hasNextResult || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      pageRef.current += 1;
      searchUsers(inputQuery, pageRef.current);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputQuery(e.target.value);
  };

  const handleClickMember = (member: UserResult) => {
    clickMember(member);
    setSearchResults([]);
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      searchUsers(inputQuery, 0);
      pageRef.current = 0;
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceSearch);
  }, [inputQuery]);

  return (
    <div className="relative z-50">
      <div className="relative">
        <SvgIcon
          icon="magnifyGlass"
          width={18}
          height={18}
          className="w-[18px] h-[18px] text-slate-60 absolute left-3 top-1/2 -translate-y-1/2 z-10"
          color="#959EB2"
        />
        <SInput
          className={`text-small pl-10 border border-slate-90 rounded-2xlarge ${inputClassName}`}
          placeholder={placeholder}
          value={inputQuery}
          onChange={handleInputChange}
        />
      </div>
      {searchResults.length > 0 && inputQuery.length > 0 && (
        <div className={`fixed w-[34.6rem] ${locationClass}`}>
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
  );
};

export default UserSearchBar;
