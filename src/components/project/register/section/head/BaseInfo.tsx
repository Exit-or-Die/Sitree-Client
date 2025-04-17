'use cleint';

import CategoryQueryOptions from '@/service/category/queries';
import { ProjectRegisterRequest, Tag } from '@/service/project/request';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import SInput from '@/components/common/Input';
import ProjectIconUpload from '@/components/custom/ProjectIconUpload';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';
import { RegiseterErrorMessage } from '../../error/RegisterError';

const ProjectHeadBaseInfo = () => {
  const { register, setValue, getValues } = useFormContext<ProjectRegisterRequest>();

  const { queryKey, queryFn } = CategoryQueryOptions.getCategories();
  const { data: tagData } = useQuery({
    queryKey,
    queryFn
  });

  const currentCategories = getValues('categories');
  const tags = (tagData ?? []).map((tag) => ({ name: tag.categoryName }));

  const InputList = [
    {
      title: '프로젝트 이름',
      component: (
        <div>
          <SInput
            register={register}
            name="head.title"
            placeholder="프로젝트 이름을 입력해주세요"
            useLimit={true}
            limitLength={24}
            className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
          />
        </div>
      ),
      required: true,
      errorKey: 'head.title'
    },
    {
      title: 'Health Check API',
      component: (
        <SInput
          register={register}
          name="head.healthCheckUrl"
          placeholder="ex: https://sitree-api.com/healthcheck"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: false,
      errorKey: 'head.healthCheckUrl'
    },
    {
      title: '한 줄 소개',
      component: (
        <SInput
          register={register}
          name="head.shortDescription"
          useLimit={true}
          limitLength={80}
          placeholder="한 줄 소개를 작성해주세요"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
      ),
      required: true,
      errorKey: 'head.shortDescription'
    },
    {
      title: '프로젝트 태그',
      component: (
        <ProjectTagSelect<Tag>
          onChange={(tags: Tag[]) => setValue('categories', tags)}
          displayKey="name"
          tags={tags}
          initialValue={currentCategories}
        />
      ),
      required: true,
      errorKey: 'categories'
    }
  ];

  return (
    <div className="flex gap-10 p-10 pt-0 border-b border-1 border-slate-90">
      <div className="w-full ">
        {InputList.map((input, index) => (
          <div key={index} className="mb-6">
            <label className="block text-small font-md leading-5 tracking-[-0.14px] text-gray-700 flex items-center mb-1.5">
              <span className="text-[1.4rem]">{input.title}</span>
              {input.required && <RegisterRequiredMark />}
            </label>
            {input.component}
            <RegiseterErrorMessage errorKey={input.errorKey} />
          </div>
        ))}
      </div>
      <div className="text-center">
        <ProjectIconUpload />
      </div>
    </div>
  );
};

export default ProjectHeadBaseInfo;
