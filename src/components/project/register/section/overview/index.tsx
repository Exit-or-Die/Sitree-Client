interface ProjectRegisterOverviewProps {
  register: any;
}

const ProjectRegisterOverview = ({ register }: ProjectRegisterOverviewProps) => {
  return (
    <div>
      <div>
        <label>Live Web Domain</label>
        <input
          {...register('overview.clientUrl.liveWebDomain')}
          placeholder="Enter live web domain"
        />
      </div>
      <div>
        <label>Detail Description</label>
        <input {...register('overview.detailDescription')} placeholder="Enter detail description" />
      </div>
    </div>
  );
};

export default ProjectRegisterOverview;
