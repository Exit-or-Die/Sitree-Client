'use client';

import ProfileSidebar from '@/components/profile/ProfileSidebar';

const Profile = () => {
  return (
    <div className="w-full h-full flex px-48 py-6">
      <ProfileSidebar />

      <div className="flex-1 flex flex-col ml-6 space-y-6 border">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">
            자기 소개, 경력, 활동, 기술 스택 등으로 username 님을 소개해 주세요!
          </h3>
          <p className="text-gray-500 mt-2">작성한 프로필은 PDF 이력서로 다운 받을 수 있어요</p>
          <button className="mt-4 px-6 py-2 text-white bg-green-500 rounded-lg">프로필 편집</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            📄
          </div>
          <p className="text-gray-500 mt-4">프로젝트가 없어요</p>
          <p className="text-gray-400 text-sm mt-1">첫 번째 프로젝트를 등록해 보세요!</p>
          <button className="mt-4 px-6 py-2 text-white bg-green-500 rounded-lg">새 프로젝트</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
