interface ProjectRegisterTechViewListProps {
  register: any;
}

const ProjectRegisterTechViewList = ({ register }: ProjectRegisterTechViewListProps) => {
  return (
    <div>
      <label>Tech View List</label>
      <input {...register('techviewList')} placeholder="Enter tech view list" />
    </div>
  );
};

export default ProjectRegisterTechViewList;
