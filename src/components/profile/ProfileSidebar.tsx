'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Nullable } from 'types';

import SImage from '../common/Image';
import SvgIcon from '../common/SVGIcon';
import PortfolioPDF from './PortfolioPDF';

interface Props {
  nickname: string;
  profileImgUrl: string;
  email: string;
  thirdPartyProfileUrl: string;
  affiliation: string;
  phoneNumber: Nullable<string>;
  position: Nullable<string>;
}

const ProfileSidebar = ({
  nickname,
  profileImgUrl,
  email,
  thirdPartyProfileUrl,
  affiliation,
  phoneNumber,
  position
}: Props) => {
  const { data: session } = useSession();
  const { memberId } = useParams();

  const isMe = String(session?.detail.memberId) === String(memberId);
  const [text, setText] = useState('');

  // const exportToPDF = () => {
  //   const element = document.getElementById('pdf-template');
  //   if (!element) return;

  //   html2pdf()
  //     .set({
  //       margin: 0,
  //       filename: '이력서.pdf',
  //       image: { type: 'jpeg', quality: 1 },
  //       html2canvas: { scale: 3, useCORS: true },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //     })
  //     .from(element)
  //     .save();
  // };

  return (
    <div className="w-[300px] flex flex-col">
      <div className="bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
        <div className="p-5">
          <div className="w-[88px] h-[88px] bg-white-100 rounded-full flex items-center justify-center border">
            <SImage
              src={profileImgUrl}
              alt="default user"
              width={70}
              height={70}
              defaultType="user"
            />
          </div>
          <h2 className="text-large text-slate-10 mt-4 font-lb">{nickname}</h2>
          <div className="text-[13px] text-slate-50 font-md mt-1">{email}</div>
          <div className="text-[13px] text-tree-40 font-lb mt-1">{position}</div>
          {isMe && (
            <div className="h-[46px] relative flex items-center bg-slate-95 p-3 rounded-large w-full max-w-md mt-4">
              <input
                type="text"
                placeholder="한 줄 소개를 작성해 주세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-transparent w-full outline-none text-[13px] placeholder:text-slate-60 placeholder:font-md"
              />
              <button className="text-slate-30 flex items-center min-w-[65px] justify-center text-[10px]">
                <SvgIcon
                  icon="edit"
                  width={14}
                  height={14}
                  className="mr-1 cursor-pointer"
                  color="#414752"
                />
                입력하기
              </button>
              <div className="absolute top-1 left-5 -mt-2 w-3 h-3 bg-gray-100 rotate-45" />
            </div>
          )}
        </div>
        <div className="border-slate-95 border-t-[1px] p-5 space-y-4">
          {affiliation && (
            <div className="flex items-center text-slate-10 text-[13px]">
              <SImage
                src="/education.svg"
                alt="education"
                width={18}
                height={18}
                className="mr-2"
              />
              {affiliation}
            </div>
          )}
          {thirdPartyProfileUrl && (
            <div className="flex items-center text-slate-10 text-[13px]">
              <SvgIcon icon="link" width={18} height={18} className="mr-2" color="#778195" />
              <a
                href={thirdPartyProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {thirdPartyProfileUrl}
              </a>
            </div>
          )}
          {phoneNumber && (
            <div className="flex items-center text-slate-10 text-[13px]">
              <SImage src="/phone.svg" alt="phone" width={18} height={18} className="mr-2" />
              {phoneNumber}
            </div>
          )}
        </div>
      </div>
      <button
        // onClick={exportToPDF}
        className="mt-3 w-full py-2 text-slate-80 bg-slate-90 rounded-large text-center text-base font-bd h-[52px]"
      >
        PDF 이력서
      </button>
      <div className="mt-6 w-full flex justify-around text-slate-30 text-small font-md">
        <button>로그아웃</button>
        <button className="flex items-center">
          <SvgIcon icon="setting" width={18} height={18} className="mr-1" color="#414752" />
          프로필 편집
        </button>
      </div>
      <div className="hidden">
        <PortfolioPDF />
      </div>
    </div>
  );
};

export default ProfileSidebar;
