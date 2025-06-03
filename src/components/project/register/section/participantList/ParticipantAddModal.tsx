import { UserResult } from '@/service/auth/response';
import { Participant } from '@/service/project/response';
import { useEffect, useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import { UserSearchBar } from '@/components/custom/UserSearch';

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
  const [selectedMember, setSelectedMember] = useState<Array<UserResult>>([]);
  const [excludeMemberIds, setExcludedMemberIds] = useState<Array<number>>([]);

  const handleClickMember = (member: UserResult) => {
    setSelectedMember((prev) => [...prev, member]);
  };
  const handleDeleteMember = (index: number) => {
    setSelectedMember((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRegister = () => selectedMember && register(selectedMember);

  useEffect(() => {
    setExcludedMemberIds([
      ...teamMembers.map((member) => member.memberId),
      ...selectedMember.map((member) => member.memberId)
    ]);
  }, [teamMembers, selectedMember]);

  return (
    <div className="w-[42rem] min-h-[22.6rem] bg-white-100 flex flex-col gap-4 rounded-[2.4rem] p-6">
      <header className="flex gap-2 items-center">
        <p className="text-large font-lb">팀원 등록</p>
        <p className="text-small text-slate-50">사이트리에 가입한 팀원만 등록할 수 있어요.</p>
      </header>
      <div className="py-4">
        <UserSearchBar
          excludeMemberIds={excludeMemberIds}
          clickMember={handleClickMember}
          placeholder="팀원 검색"
          locationClass="left-[3.8rem] top-[13rem]"
        />
        <div className="flex flex-col gap-1 mt-3">
          {selectedMember.map((member, index) => (
            <div
              key={`selected_member_${member.memberId}`}
              className="flex gap-[1rem] p-3 rounded-large hover:bg-slate-95 cursor-pointer"
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
