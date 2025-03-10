'use client';

import SButton from '../common/Button';
import SImage from '../common/Image';

type Props = {
  careers: any;
};


const ProfileCareer = ({ careers }: Props) => {

  return (
    <div className="p-[40px] bg-white flex flex-col bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lg text-slate-10">경력 0년 0개월</div>
      <div className="flex items-start mt-[20px] mb-6">
        <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
        <div className="ml-4">
          <h3 className="text-lg font-bold">마이크로소프트</h3>
          <p className="text-gray-500 text-sm">프로덕트디자이너(애는 직접 입력) | dd</p>
          <p className="text-gray-400 text-xs">YYYY.MM ~ YYYY.MM</p>
        </div>
      </div>

      {[1, 2].map((project, index) => (
        <div key={index} className="mb-6 border-l-2 pt-[12px] ml-[70px] pl-[20px]">
          <h4 className="text-md font-semibold">권한관리시스템 UXUI 개선</h4>
          <p className="text-gray-400 text-xs">YYYY.MM ~ YYYY.MM</p>
          <p className="text-gray-600 mt-2">
            {index === 0 ? (
              <>
                어쩌고 저쩌고 엄청나게 많은 것을 했습니다.
                <ul className="list-disc list-inside text-sm mt-2">
                  <li>짱 잘했음</li>
                  <li>진짜 잘했음</li>
                  <li>어쩌고저 1 고</li>
                </ul>
              </>
            ) : (
              <>{'{Project Description}'}</>
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['PM/PO', 'PD', 'FE', 'BE', 'INFRA', 'AI', 'DATA'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCareer;
