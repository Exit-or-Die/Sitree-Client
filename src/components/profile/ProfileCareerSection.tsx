'use client';

import { UserCareerField } from '@/service/profile/response';
import formatTimestamps from '@/utils/date';

import SImage from '../common/Image';

type Props = {
  careers: UserCareerField;
};

const ProfileCareerSection = ({ careers }: Props) => {
  return (
    <div className="p-[40px] bg-white flex flex-col bg-white-100 border border-slate-90 rounded-xlarge shadow-sm">
      <div className="text-xlarge font-lg text-slate-10">
        경력 {careers.totalYears}년 {careers.totalMonths}개월
      </div>
      {careers.careerList.map((career, index) => {
        return (
          <div key={index}>
            <div className="flex items-start mt-[20px] mb-6">
              <SImage
                src={career.imageUrl ?? '/'}
                alt="affiliation image"
                width={64}
                height={64}
                defaultType="affiliation"
              />
              <div className="ml-4">
                <h3 className="text-large font-lg">{career.belongingName}</h3>
                <div className="flex items-center">
                  <div className="text-small text-slate-30 font-lg">{career.position}</div>
                  <div className="border-l-2 mx-[10px] h-[14px]" />
                  <div className="text-small text-slate-50 font-md">{career.department}</div>
                </div>
                <p className="text-slate-30 text-xsmall">
                  {formatTimestamps(career.startedAt, career.endedAt)}
                </p>
              </div>
            </div>

            {career.projects.map((project, index) => (
              <div key={index} className="mb-6 border-l-2 pt-[8px] ml-[70px] pl-[20px]">
                <h4 className="text-[15px] font-semibold text-slate-10">{project.projectName}</h4>
                <p className="text-slate-50 text-xsmall">
                  {formatTimestamps(project.startedAt, project.endedAt)}
                </p>
                <p className="text-slate-30 text-small mt-2">{project.contents}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.roleTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-slate-20 text-[13px] rounded-large"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCareerSection;
