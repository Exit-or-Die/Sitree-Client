'use client';

import { ProfileUpdateRequest } from '@/service/profile/request';
import ProjectQueryOptions from '@/service/project/queries';
import { isEmpty } from '@/utils/array';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

const ProfileRegisterStackList = () => {
  const { setValue } = useFormContext<ProfileUpdateRequest>();
  const stackForm = useWatch({ name: 'myPage.techStacks' });
  const [techStacks, setTechStacks] = useState(isEmpty(stackForm) ? [] : stackForm);

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectTechStacks();
  const { data } = useQuery({ queryKey, queryFn });

  useEffect(() => {
    if (!isEmpty(stackForm)) {
      setTechStacks(stackForm);
    }
  }, [stackForm]);

  const updateTechStacks = (tags: string[]) => {
    setTechStacks(tags);
    setValue('myPage.techStacks', techStacks);
  };

  const availableTags = useMemo(() => data?.techStacks || [], [data?.techStacks]);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-8">
        <p className="text-slate-10 font-lb text-xlarge">기술 스택</p>
      </div>
      <ProjectTagSelect
        tags={availableTags}
        initialValue={techStacks}
        onChange={updateTechStacks}
      />
    </div>
  );
};

export default ProfileRegisterStackList;
