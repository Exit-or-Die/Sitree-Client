import SImage from '@/components/common/Image';

const ProjectMemberFocusedOn = () => {
  return (
    <div className="border border-1 border-slate-90 rounded-2xlarge p-5 flex-grow">
      <div className="flex justify-between items-center">
        <span className="text-base font-lb tracking-[-0.32px]">Focused On</span>
        <div className="flex gap-1 px-3 py-2 rounded-[1rem] bg-slate-95">
          <p>프로필 페이지</p>
          <SImage src="/externalLink.svg" width={16} height={16} />
        </div>
      </div>
    </div>
  );
};

export default ProjectMemberFocusedOn;
