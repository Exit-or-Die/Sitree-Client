import { ProfileUpdateRequest } from '@/service/profile/request';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Nullable } from 'types';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

interface ProfileUpdateSidebarProps {
  handleSubmitClick: () => void;
}

const calculateCompletionRate = (fields: Nullable<string | boolean | Date>[]) => {
  const filledFields = fields.filter(Boolean).length;

  return fields.length > 0 ? filledFields / fields.length : 0;
};

const ProfileUpdateSidebar = ({ handleSubmitClick }: ProfileUpdateSidebarProps) => {
  const { control } = useFormContext();
  const [requiredFields, setRequiredFields] = useState(false);
  const [progress, setProgress] = useState(0);
  const formData = useWatch({ control }) as ProfileUpdateRequest;
  const { nickname, position, email, phoneNumber, profileImgUrl, thirdPartyProfileUrl, myPage } =
    formData;
  const { selfIntroduction, careers, educationActivities, techStacks, links } = myPage;

  const basicInfo = useMemo(() => {
    const fields = [nickname, position, email, phoneNumber, profileImgUrl, thirdPartyProfileUrl];

    return {
      name: '기본 정보',
      completionRate: calculateCompletionRate(fields)
    };
  }, [nickname, position, email, phoneNumber, profileImgUrl, thirdPartyProfileUrl]);

  const selfIntro = useMemo(() => {
    const fields = [selfIntroduction.title, selfIntroduction.contents];

    return {
      name: '자기 소개',
      completionRate: calculateCompletionRate(fields)
    };
  }, [selfIntroduction]);

  const careersInfo = useMemo(() => {
    const { careerList } = careers;
    const allFields = careerList
      .map((career) => [career.belongingName, career.department, career.startedAt, career.position])
      .flat();

    return {
      name: '경력 소개',
      completionRate: allFields.length > 0 ? calculateCompletionRate(allFields) : 0
    };
  }, [careers]);

  const educationInfo = useMemo(() => {
    const allFields = educationActivities
      .map((education) => [
        education.educationActivityName,
        education.majorOrOrganization,
        education.startedAt
      ])
      .flat();

    return {
      name: '교육 및 활동',
      completionRate: allFields.length > 0 ? calculateCompletionRate(allFields) : 0
    };
  }, [educationActivities]);

  const techStackInfo = useMemo(() => {
    return {
      name: '기술 스택',
      completionRate: techStacks.length > 0 ? calculateCompletionRate(techStacks) : 0
    };
  }, [techStacks]);

  const linkInfo = useMemo(() => {
    const allFields = links.map((link) => [link.link, link.linkProvider]).flat();

    return {
      name: '링크',
      completionRate: allFields.length > 0 ? calculateCompletionRate(allFields) : 0
    };
  }, [links]);

  const sections = useMemo(
    () => [basicInfo, selfIntro, careersInfo, educationInfo, techStackInfo, linkInfo],
    [basicInfo, selfIntro, careersInfo, educationInfo, techStackInfo, linkInfo]
  );

  useEffect(() => {
    const totalCompletionRate = sections.reduce(
      (sum, { completionRate }) => sum + completionRate,
      0
    );
    setProgress((totalCompletionRate / sections.length) * 100);

    if (
      basicInfo.completionRate === 1 &&
      selfIntro.completionRate === 1 &&
      careersInfo.completionRate === 1 &&
      educationInfo.completionRate === 1 &&
      techStackInfo.completionRate === 1 &&
      linkInfo.completionRate === 1
    ) {
      setRequiredFields(true);
    } else {
      setRequiredFields(false);
    }
  }, [sections]);

  return (
    <div className="w-[30.4rem] sticky top-5 self-start space-y-2">
      <div className="rounded-2xlarge border bg-white-100">
        <div className="flex flex-col gap-2 p-6">
          <p className="mb-1 text-gray-500">완성도</p>
          <div className="flex items-center">
            <p className="w-[7.2rem] text-large font-lb">{Math.round(progress)}%</p>
            <div className="ml-4 h-2 w-full rounded-[999px] bg-gray-200">
              <div
                className="h-full rounded-[999px] bg-tree-50"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <ul className="space-y-1 p-4">
          {sections.map((item, index) => (
            <li key={index} className="flex h-[52px] items-center justify-between p-3">
              <p className="text-[1.5rem] leading-[2.2rem] tracking-[-0.15px]">{item.name}</p>
              <div
                className={`h-5 w-5 rounded-full p-[3px] ${
                  item.completionRate === 1 ? 'bg-tree-50' : 'bg-slate-98'
                }`}
              >
                <SImage
                  src={item.completionRate === 1 ? '/check/white.svg' : '/check/gray.svg'}
                  width={14}
                  height={14}
                  alt="Check icon"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SButton
        type="button"
        size="xl"
        className={`w-full leading-5 justify-center ${
          requiredFields
            ? 'bg-tree-50 text-white-100'
            : 'bg-slate-90 text-slate-80 cursor-not-allowed'
        }`}
        onClick={handleSubmitClick}
        disabled={!requiredFields}
      >
        프로필 저장
      </SButton>
    </div>
  );
};

export default ProfileUpdateSidebar;
