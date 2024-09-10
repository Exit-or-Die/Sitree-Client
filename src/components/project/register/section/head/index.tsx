import SInput from '@/components/common/Input';

interface ProjectRegisterHeadProps {
  register: any;
}

const ProjectRegisterHead = ({ register }: ProjectRegisterHeadProps) => {
  const InputList = [
    {
      title: '프로젝트 이름',
      component: <SInput placeholder="프로젝트 이름을 입력해주세요" />,
      required: true
    },
    {
      title: 'Health Check API',
      component: <SInput placeholder="ex: https://sitree-api.com/healthcheck" />,
      required: true
    },
    {
      title: '한 줄 소개',
      component: <SInput placeholder="한 줄 소개를 작성해주세요" />,
      required: true
    },
    {
      title: '프로젝트 태그',
      component: <SInput />,
      required: true
    }
  ];

  return (
    <div className="p-12 border border-1 border-slate-90 rounded-2xlarge">
      <p className="mb-6 font-slate-10 font-lb text-xlarge">기본 정보</p>
      <div className="flex">
        <div>
          {InputList.map((input, index) => (
            <div key={index} className="mb-6">
              <label className="block text-gray-700 flex items-center">
                <span className="">{input.title}</span>
                {input.required && (
                  <span className="ml-1 mb-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
                )}
              </label>
              {input.component}
            </div>
          ))}
          {/* <div>
            <label>Thumbnail Image URL</label>
            <input
              {...register('head.thumbnailImageUrl')}
              placeholder="Enter thumbnail image URL"
            />
          </div>
          <div>
            <label>Project Name</label>
            <input {...register('head.title')} placeholder="Enter project name" />
          </div>
          <div>
            <label>Description</label>
            <textarea
              {...register('head.shortDescription')}
              placeholder="Enter project description"
            />
          </div>
          <div>
            <label>Health Check URL</label>
            <input {...register('head.healthCheckUrl')} placeholder="Enter health check URL" />
          </div> */}
        </div>
        <div>image upload</div>
      </div>
    </div>
  );
};

export default ProjectRegisterHead;
