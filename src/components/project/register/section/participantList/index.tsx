interface ProjectRegisterParticipantListProps {
  register: any;
}

const ProjectRegisterParticipantList = ({ register }: ProjectRegisterParticipantListProps) => {
  return (
    <div>
      <label>Participant List</label>
      <input {...register('participantList')} placeholder="Enter participant list" />
    </div>
  );
};

export default ProjectRegisterParticipantList;
