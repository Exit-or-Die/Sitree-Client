'use client';

import { EDUCATION_STATUS } from '@/constants/profile';
import { UserEducationField } from '@/service/profile/response';
import formatTimestamps from '@/utils/date';

type Props = {
  education: Array<UserEducationField>;
};

const ProfileEducationSection = ({ education }: Props) => {
  return (
    <div className="p-[40px] bg-white flex flex-col bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lb text-slate-10">교육 및 활동</div>
      {education.map((activity, index) => (
        <div key={index}>
          <p className="text-large font-lb text-slate-10 mt-[20px]">
            {activity.educationActivityName}
          </p>
          <p className="flex text-small text-slate-50 items-center">
            <span className="text-small text-slate-30 font-lb">{activity.majorOrOrganization}</span>
            <div className="border-l-[1px] mx-[10px] h-[14px]" />
            <div>{activity.category}</div>
            <div className="border-l-[1px] mx-[10px] h-[14px]" />
            <div>{EDUCATION_STATUS[activity.educationStatus]}</div>
          </p>
          <p className="text-xsmall text-slate-30 mt-[4px]">
            {formatTimestamps(activity.startedAt, activity.endedAt)}
          </p>
          <p className="text-small mt-2 pl-4 text-slate-30">{activity.contents}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileEducationSection;
