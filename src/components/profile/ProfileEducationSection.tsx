'use client';

import SButton from '../common/Button';
import SImage from '../common/Image';

const ProfileEducationSection = () => {
  const educationData = [
    {
      name: '스트릿드랍',
      detail: '디포팟 13기 | 동아리 | 수료',
      period: '2023.03 - 2023.07',
      description: ['짱 잘했음', '진짜 잘했음', '어쩌고저 1 고'],
    }
  ];

  return (
    <div className="p-[40px] bg-white flex flex-col bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lg text-slate-10">교육 및 활동</div>
      <p className="text-large font-lg text-slate-10 mt-[20px]">{'{교육 및 활동명}'}</p>
      <p className="flex text-small text-slate-50 items-center">
        <span className="text-small text-slate-30 font-lg">{'{전공 및 기관명}'}</span>
        <div className="border-l-[1px] mx-[10px] h-[14px]" />
        <div>{'{카테고리}'}</div>
        <div className="border-l-[1px] mx-[10px] h-[14px]" />
        <div>{'{구분}'}</div>
      </p>
      <p className="text-xsmall text-slate-30 mt-[4px]">YYYY.MM ~ YYYY.MM</p>
      <ul className="list-disc list-inside text-small mt-2 pl-4 text-slate-30">
        {educationData[0].description?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      
    </div>
  );
};

export default ProfileEducationSection;
