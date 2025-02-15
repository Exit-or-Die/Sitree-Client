'use client';

import SButton from '../common/Button';
import SImage from '../common/Image';

const ProfileIntroSection = () => {
  return (
    <div className="p-6 flex flex-col justify-center items-center bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-base font-lg text-slate-30">
        자기 소개, 경력, 활동, 기술 스택 등으로
        <br />
        username 님을 소개해 주세요!
      </div>
      <p className="text-[13px] text-slate-50 mt-2 font-md">
        작성한 프로필은 PDF 이력서로 다운 받을 수 있어요
      </p>
      <SButton size="sm" className="bg-tree-50 text-white-100 border-0 font-md self-center mt-3">
        <SImage src="/whiteSetting.svg" alt="setting" width={16} height={16} className="mr-1" />
        프로필 편집
      </SButton>
    </div>
  );
};

export default ProfileIntroSection;
