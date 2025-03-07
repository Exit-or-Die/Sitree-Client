'use client';

import SImage from '../common/Image';

type Props = {
  content: any;
  techStacks: string[];
  links: any;
};

type TechProps = {
  stack: string;
  label: string;
  bold?: boolean;
}

const TechIcon = ({ stack, label, bold }: TechProps) => {
  
  return (
    <div className="flex w-1/2 h-[32px] mb-[12px] items-center">
      <div className="min-w-[32px] min-h-[32px] border rounded-base bg-white flex justify-center items-center">
        <SImage src={`https://image.si-tree.com/tech-stack/${stack}.svg`} alt={`${stack} Icon`} width={24} height={24} />
      </div>
      <div className={`ml-[8px] text-small ${bold ? 'font-bd' : 'font-md'}`}>{label}</div>
    </div>
  );
}

const ProfileIntroSection = ({ content, techStacks, links }: Props) => {

  return (
    <div className="p-[40px] flex flex-col justify-center bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lg text-slate-10">{content.title}</div>
      <div className="mt-[20px] bg-black-7 h-auto w-full flex relative">
        <div className="flex-1 pr-[32px] truncate">
          <div className="text-base font-lg">자기소개</div>
          <p className="mt-[8px] whitespace-pre-line">{content.contents}</p>
        </div>
        <div className="w-[1px] bg-slate-95"></div>
        <div className="flex-1 pl-[32px]">
          <div className="text-base font-lg">기술 스택</div>
          <div className="w-full flex flex-wrap mt-[8px]">
            {techStacks.map(stack => (
              <TechIcon key={stack} stack={stack} label={stack} bold />
            ))}
          </div>
          <div className="mt-[40px] text-base font-lg">링크</div>
          <div className="mt-[12px]">
            {links.map((link: any) => (
              <TechIcon key={link.linkProvider} stack={link.linkProvider} label={`${link.link}@${link.linkProvider.toLowerCase()}.com`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntroSection;
