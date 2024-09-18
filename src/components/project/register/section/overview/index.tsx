interface ProjectRegisterOverviewProps {
  register: any;
}

const ProjectRegisterOverview = ({ register }: ProjectRegisterOverviewProps) => {
  return (
    <div className="mt-10 border-t border-slate-300">
      <div className="flex items-start self-stretch gap-1.5 mb-2">
        <p className="text-slate-10 font-lb text-large">서비스 링크</p>
        <span className="mt-1.5 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
      </div>
      <p className="text-slate-50 font-md text-small mb-5">
        라이브 도메인, 다운로드 링크 중 최소 한 가지 이상을 입력해 주세요.
      </p>
    </div>
  );
};

export default ProjectRegisterOverview;
