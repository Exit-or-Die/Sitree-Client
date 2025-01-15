import SImage from '@/components/common/Image';

interface ProjectMemberItemProps {
  imageSrc?: string;
  name: string;
  position: string;
  isOwner: boolean;
  selected: boolean;
}

const ProjectMemberItem = (props: ProjectMemberItemProps) => {
  return (
    <div className="flex justify-between gap-2.5 p-3 w-[27.4rem]">
      <div className="relative w-[5.2rem] h-[5.2rem]">
        <SImage src={props.imageSrc ?? ''} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-lb leading-8 tracking-[-0.32px]">조성훈</p>
        <p className="text-slate-50">프론트엔드 개발자</p>
      </div>
      <div className="flex items-center">
        <span className="px-1.5 py-1 bg-tree-50 rounded-small text-xsmall font-bd text-white-100 leading-4">
          Owner
        </span>
      </div>
    </div>
  );
};

export default ProjectMemberItem;
