const HealthCheckState = ({ health }: { health: boolean }) => {
  const HealthIcon = () => {
    return (
      <div
        className={`relative w-[1.2rem] h-[1.2rem] rounded-full ${health ? 'bg-tree-50/20' : 'bg-slate-50/20'}`}
      >
        <span
          className={`absolute top-1/2 left-1/2 w-[0.6rem] h-[0.6rem] rounded-full transform -translate-x-1/2 -translate-y-1/2 ${health ? 'bg-tree-50' : 'bg-slate-50'}`}
        />
      </div>
    );
  };

  return (
    <div className="flex px-1 justify-center items-center gap-1.5">
      <HealthIcon />
      <p>{health ? '운영중' : '운영 종료'}</p>
    </div>
  );
};

export default HealthCheckState;
