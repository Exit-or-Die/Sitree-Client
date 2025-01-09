'use client';

import SImage from '@/components/common/Image';
import STab from '@/components/common/Tab';

const ProjectDetailTech = () => {
  return (
    <div className="p-10 flex flex-col gap-5">
      <div>
        <STab
          items={['배치를 통한 유저 레벨 업데이트', '다이얼 UI + 무한 스크롤', 'DB Replication']}
          onChange={(item, index) => console.log(123, item, index)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">GitHub 링크</p>
        <div className="flex gap-1 text-[1.3rem] text-slate-30">
          <SImage src="/github.svg" width={20} height={20} />
          <p>https://github.com/uhjjugozujjugo</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">기술 설명</p>
        {/* editor viewer로? */}
        <div>
          프로젝트 기술 설명 텍스트 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을
          증가하거나 새 비목을 설치할 수 없다. 군인 또는 군무원이 아닌 국민은 대한민국의
          영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이
          정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다. 위원은
          정당에 가입하거나 정치에 관여할 수 없다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수
          있다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 국회는 정부의 동의없이
          정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 군인 또는
          군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상
          기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된
          경우를 제외하고는 군사법원의 재판을 받지 아니한다. 위원은 정당에 가입하거나 정치에 관여할
          수 없다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 대통령은 국가의 원수이며,
          외국에 대하여 국가를 대표한다.
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="py-1">기술 태그</p>
        <div className="flex gap-1 text-[1.3rem] text-slate-30">
          <SImage src="/github.svg" width={20} height={20} />
          <p>https://github.com/uhjjugozujjugo</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailTech;
