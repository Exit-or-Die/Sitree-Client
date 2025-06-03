import { UserResult } from '@/service/auth/response';

import SImage from '@/components/common/Image';

export interface UserSearchResultProps {
  searchResults: UserResult[];
  searchTotalCount: number;
  handleClickMember: (member: UserResult) => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  searchResultRef: React.RefObject<HTMLDivElement>;
}

const UserSearchResult = ({
  searchResults,
  searchTotalCount,
  handleClickMember,
  handleScroll,
  searchResultRef
}: UserSearchResultProps) => {
  return (
    <div
      ref={searchResultRef}
      className="w-full bg-white-100 border rounded-xlarge shadow-md mt-[1rem] z-10 p-4 overflow-hidden"
    >
      <div className="text-left">
        <span className="text-xsmall text-slate-50">
          검색 결과 <span className="font-bd text-slate-30">{searchTotalCount}</span>건
        </span>
      </div>
      <div className="max-h-[32rem] overflow-y-auto scrollbar-hidden">
        {searchResults.map((result) => (
          <div
            key={result.memberId}
            className="flex gap-[1rem] p-3 rounded-large hover:bg-slate-95 cursor-pointer"
            onClick={() => handleClickMember(result)}
            onScroll={handleScroll}
          >
            <SImage
              src={result.profileImgUrl}
              width={40}
              height={40}
              defaultType="user"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 items-start">
              <p className="text-small font-md">{result.nickname}</p>
              <p className="text-xsmall text-slate-50">{result.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearchResult;
