import { ClientUrl } from '@/service/project/request';
import { ProjectDetailResponse } from '@/service/project/response';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
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

  // 빈 값이 없는 키만 필터링
  const availableKeys = (Object.keys(serviceLinks) as Array<keyof ClientUrl>).filter(
    (key) => serviceLinks[key] === ''
  );

  const deleteServiceLink = (key: keyof ClientUrl) => {
    setServiceLinks({ ...serviceLinks, [key]: '' });
  };

  const handleKeyChange = (oldKey: keyof ClientUrl, newKey: keyof ClientUrl) => {
    const updatedLinks = { ...serviceLinks };
    updatedLinks[newKey] = serviceLinks[oldKey];
    updatedLinks[oldKey] = '';
    setServiceLinks(updatedLinks);
  };

  const addServiceLink = () => {
    const firstEmptyKey = availableKeys[0];
    if (firstEmptyKey) {
      setServiceLinks({ ...serviceLinks, [firstEmptyKey]: ' ' }); // 첫 번째 빈 키에 값을 설정
    }
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <p className="text-large font-lb">서비스 링크</p>
      <div className="flex flex-col gap-2">
        {Object.entries(serviceLinks).map(([key, value], index) => {
          // 빈 값이 아닌 경우에만 렌더링
          if (value.length > 0) {
            return (
              <div key={`service_link_${index}`} className="flex gap-1.5">
                <select
                  value={key}
                  onChange={(e) =>
                    handleKeyChange(key as keyof ClientUrl, e.target.value as keyof ClientUrl)
                  }
                >
                  <option value={key}>{key}</option>
                  {availableKeys
                    .filter((availableKey) => availableKey !== key)
                    .map((availableKey) => (
                      <option key={availableKey} value={availableKey}>
                        {availableKey}
                      </option>
                    ))}
                </select>
                <SInput
                  className="w-[43.4rem]"
                  placeholder="링크를 입력해주세요"
                  value={value.trim()} // 입력 필드에서 공백 제거
                  onChange={(e) =>
                    setServiceLinks({ ...serviceLinks, [key as keyof ClientUrl]: e.target.value })
                  }
                />
                <span
                  className="flex items-center p-1 cursor-pointer"
                  onClick={() => deleteServiceLink(key as keyof ClientUrl)}
                >
                  <SImage src="/trash.svg" width={20} height={20} />
                </span>
              </div>
            );
          }

          return null; // 빈 값인 경우 렌더링하지 않음
        })}
      </div>
      <SButton
        size="lg"
        className="text-small bg-tree-93 text-tree-30 gap-1.5 h-[4.4rem] w-[10.8rem]"
        onClick={addServiceLink}
      >
        <p>+</p>
        <p className="leading-5 tracking-[-1%]">링크 추가</p>
      </SButton>
    </div>
  );
};

export default ProjectHeadServiceLink;
