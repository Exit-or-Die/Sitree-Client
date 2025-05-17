import ProfileBaseInfo from './BaseInfo';

const profileRegisterHead = () => {
  return (
    <div className="rounded-2xlarge border-[1px] border-slate-90 bg-white-100">
      <div className="px-10 pt-10">
        <p className="mb-5 text-slate-10 font-lb text-xlarge">기본 정보</p>
      </div>
      <ProfileBaseInfo />
    </div>
  );
};

export default profileRegisterHead;
