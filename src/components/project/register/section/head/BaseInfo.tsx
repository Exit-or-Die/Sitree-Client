import CategoryQueryOptions from '@/service/category/queries';
import { ProjectRegisterRequest, Tag } from '@/service/project/request';
import getErrorMessage from '@/utils/getErrorMessage';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import SInput from '@/components/common/Input';
import ProjectIconUpload from '@/components/custom/ProjectIconUpload';
import ProjectTagSelect from '@/components/custom/ProjectTagSelect';

const ProjectHeadBaseInfo = () => {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<ProjectRegisterRequest>();

  const { queryKey, queryFn } = CategoryQueryOptions.getCategories();
  const { data: tagData } = useQuery({ queryKey, queryFn });

  const tags = (tagData ?? []).map((tag) => ({ name: tag.categoryName }));

  const InputList = [
    {
      title: '프로젝트 이름',
      component: (
        <SInput
          register={register}
          name="head.title"
          placeholder="프로젝트 이름을 입력해주세요"
          className="text-small font-md leading-5 tracking-[-0.14px] rounded-base"
        />
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
      required: true,
      errorKey: 'head.healthCheckUrl'
    },
    {
      title: '한 줄 소개',
      component: (
        <SInput
          register={register}
          name="head.shortDescription"
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
        />
      ),
      required: true,
      errorKey: 'categories'
    }
  ];

  return (
    <div className="flex gap-10 p-10">
      <div className="w-full ">
        {InputList.map((input, index) => (
          <div key={index} className="mb-6">
            <label className="block text-small font-md leading-5 tracking-[-0.14px] text-gray-700 flex items-center mb-1.5">
              <span className="text-[1.4rem]">{input.title}</span>
              {input.required && (
                <span className="ml-1 mb-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
              )}
            </label>
            {input.component}
            {getErrorMessage(errors, input.errorKey) && (
              <span className="text-[#DC2430] text-xsmall">
                {getErrorMessage(errors, input.errorKey)}
              </span>
            )}
          </div>
        ))}
      </div>
      <div>
        <ProjectIconUpload />
      </div>
    </div>
  );
};

export default ProjectHeadBaseInfo;
