import useClickOutside from '@/hooks/useClickOutside';
import AuthService from '@/service/auth/AuthService';
import { UserResult } from '@/service/auth/response';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import SInput from '@/components/common/Input';

import UserSearchResult from './UserSearchResult';

export interface UserSearchBarProps {
  placeholder: string;
  clickMember: (member: UserResult) => void;
  excludeMemberIds?: Array<number>;
  locationClass?: string;
}

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

const UserSearchBar = ({
  excludeMemberIds = [],
  clickMember,
  placeholder,
  locationClass
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
      <SInput
        className="text-small w-[34.6rem]"
        placeholder={placeholder}
        value={inputQuery}
        onChange={handleInputChange}
      />
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
