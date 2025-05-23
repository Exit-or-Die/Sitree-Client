'use client';

import { useFormContext } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ProfileUpdateRequest } from '@/service/profile/request';
import ProjectQueryOptions from '@/service/project/queries';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

const ProfileRegisterStackList = () => {
  const { setValue, getValues } = useFormContext<ProfileUpdateRequest>();
  const initialTechStacks = getValues('myPage.techStacks') || [];
  const [techStacks, setTechStacks] = useState(initialTechStacks);

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjectTechStacks();
  const { data } = useQuery({ queryKey, queryFn });

  useEffect(() => {
    setValue('myPage.techStacks', techStacks);
  }, [techStacks, setValue]);

  const availableTags = useMemo(() => data?.techStacks || [], [data?.techStacks]);

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-8">
        <p className="text-slate-10 font-lb text-xlarge">기술 스택</p>
      </div>
      <ProjectTagSelect
        tags={availableTags}
        initialValue={techStacks}
        onChange={(tags: string[]) => {
          setTechStacks(tags);
        }}
      />
    </div>
  );
};

export default ProfileRegisterStackList;
