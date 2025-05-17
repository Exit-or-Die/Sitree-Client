'use cleint';

import CategoryQueryOptions from '@/service/category/queries';
import { ProjectRegisterRequest, Tag } from '@/service/project/request';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import SInput from '@/components/common/Input';
import ProfileImageUpload from '@/components/custom/ProfileImageUpload';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';
import { RegiseterErrorMessage } from '../../error/RegisterError';

const ProjectHeadBaseInfo = () => {
  const { register } = useFormContext<ProjectRegisterRequest>();

  const InputList = [
    {
      title: '닉네임',
      component: (
        <div>
          <SInput
            register={register}
            name="head.nickname"
            placeholder="닉네임 입력"
            useLimit={true}
            limitLength={12}
            className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
          />
        </div>
      ),
      required: true,
      errorKey: 'head.nickname'
    },
    {
      title: '포지션',
      component: (
        <SInput
          register={register}
          name="head.position"
          placeholder="현재 직무(또는 희망 포지션) 입력"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: false,
      errorKey: 'head.position'
    },
    {
      title: '소속',
      component: (
        <SInput
          register={register}
          name="head.shortDescription"
          placeholder="현재 소속(학교, 회사) 입력"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: false,
      errorKey: 'head.belonging'
    },
    {
      title: '링크',
      component: (
        <SInput
          register={register}
          name="head.link"
          placeholder="대표 웹 주소(GitHub, 블로그, 링크드인 등) 입력"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: false,
      errorKey: 'head.link'
    },
    {
      title: '휴대폰 번호',
      component: (
        <SInput
          register={register}
          name="head.phoneNumber"
          placeholder="휴대폰 번호 입력"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: false,
      errorKey: 'head.phoneNumber'
    }
  ];

  return (
    <div className="flex gap-10 p-10 pt-0 border-b border-1 border-slate-90">
      <div className="w-full ">
        {InputList.map((input, index) => (
          <div key={index} className="mb-6">
            <label className="text-small font-md leading-5 tracking-[-0.14px] text-gray-700 flex items-center mb-1.5">
              <span className="text-[1.4rem]">{input.title}</span>
              {input.required && <RegisterRequiredMark />}
            </label>
            {input.component}
            <RegiseterErrorMessage errorKey={input.errorKey} />
          </div>
        ))}
      </div>
      <div className="text-center">
        <ProfileImageUpload />
      </div>
    </div>
  );
};

export default ProjectHeadBaseInfo;
