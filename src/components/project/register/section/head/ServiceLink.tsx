import { ClientUrl } from '@/service/project/request';
import { ProjectDetailResponse } from '@/service/project/response';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SInput from '@/components/common/Input';

interface ProjectRegisterHeadProps {
  register: UseFormRegister<ProjectDetailResponse>;
}

const ProjectHeadServiceLink = ({ register }: ProjectRegisterHeadProps) => {
  const [serviceLinks, setServiceLinks] = useState<ClientUrl>({
    WEB: '123',
    IOS: '',
    WINDOWS: '',
    AOS: '',
    MAC_OS: ''
  });

  const availableKeys = Object.keys(serviceLinks).filter(
    (key) => serviceLinks[key as keyof ClientUrl] === ''
  );

  return (
    <div className="p-10 flex flex-col gap-5">
      <p className="text-large font-lb">서비스 링크</p>
      <div>
        {Object.entries(serviceLinks).map(([key, value], index) => {
          if (value.length > 0) {
            return (
              <div key={`service_link_${index}`} className="flex gap-1.5">
                <select defaultValue={key}>
                  {availableKeys.map((availableKey) => (
                    <option key={availableKey} value={availableKey}>
                      {availableKey}
                    </option>
                  ))}
                </select>
                <SInput
                  placeholder="링크를 입력해주세요"
                  value={value}
                  onChange={(e) => setServiceLinks({ ...serviceLinks, [key]: e.target.value })}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
      <SButton size="lg" className="text-small bg-tree-93 leading-5 text-tree-30 gap-1.5">
        <p>+</p>
        <p>링크 추가</p>
      </SButton>
    </div>
  );
};

export default ProjectHeadServiceLink;
