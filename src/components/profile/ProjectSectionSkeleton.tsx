'use client';

import { useSession } from 'next-auth/react';
import SButton from '../common/Button';
import SImage from '../common/Image';
import { useParams } from 'next/navigation';

type Props = {
  type: string;
};

const ProfileButton = () => (
  <SButton size="sm" className="bg-tree-50 text-white-100 border-0 font-md self-center mt-3">
    <SImage src="/whiteSetting.svg" alt="setting" width={16} height={16} className="mr-1" />
    프로필 편집
  </SButton>
);

const ProjectButton = () => (
  <SButton
    size="sm"
    className="flex items-center text-tree-30 bg-tree-93 border-none hover:bg-green-200 rounded-base mt-4"
  >
    <SImage
      src="/write.svg"
      alt="write"
      width={16}
      height={16}
      className="w-[18px] h-[18px] text-slate-60 mr-1"
    />
    새 프로젝트
  </SButton>
);

const ProjectSectionSkeleton = ({ type }: Props) => {
  const { data: session } = useSession();
  const { memberId } = useParams();

  const isMyProfile = String(session?.detail.memberId) === String(memberId);

  return (
    <div className="bg-white p-[40px] flex flex-col items-center bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lg text-slate-60 self-start">{`등록된 ${type === 'project' ? '프로젝트' : '소개'}가 없어요`}</div>
      <SImage src="/emptyProject.svg" alt="empty" width={76} height={76} />
      <div className="text-[13px] text-slate-50 mt-5 font-md">
        표시할 내용이 없습니다.
      </div>
      {isMyProfile && (type === 'project' ? <ProjectButton /> : <ProfileButton />)}
    </div>
  );
};

export default ProjectSectionSkeleton;
