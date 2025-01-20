import SImage from '@/components/common/Image';

interface ProjectMemberItemProps {
  imageSrc?: string;
  name: string;
  index: number;
  position: string;
  isOwner: boolean;
  selected: boolean;
  onChangeMember: (index: number) => void;
}

const ProjectMemberItem = (props: ProjectMemberItemProps) => {
  const { index, isOwner, selected, onChangeMember } = props;

  return (
    <div
      className={`flex items-center gap-2.5 p-3 w-[27.4rem] rounded-large cursor-pointer hover:bg-tree-97 ${selected && 'bg-tree-97'}`}
      onClick={() => onChangeMember(index)}
    >
      <div className="relative w-[5.2rem] h-[5.2rem]">
        <SImage src={props.imageSrc ?? ''} className="rounded-full" />
      </div>
      <div className="flex flex-grow flex-col gap-1">
        <p className="text-base font-lb leading-5 tracking-[-0.32px]">조성훈</p>
        <p className="text-slate-50">프론트엔드 개발자</p>
      </div>
      {isOwner && (
        <div className="flex items-center">
          <span className="px-1.5 py-1 bg-tree-50 rounded-small text-xsmall font-bd text-white-100 leading-4">
            Owner
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectMemberItem;
