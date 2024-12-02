import { ClientUrl, ProjectRegisterRequest } from '@/service/project/request';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import SSelect from '@/components/common/Select'; // SSelect 컴포넌트 가져오기

type ServiceLink = { key: keyof ClientUrl; value: string };

const CLIENT_URL_KEYS: (keyof ClientUrl)[] = ['WEB', 'IOS', 'WINDOWS', 'AOS', 'MAC_OS'];

const ProjectHeadServiceLink = () => {
  const { setValue } = useFormContext<ProjectRegisterRequest>();

  const [serviceLinks, setServiceLinks] = useState<ServiceLink[]>([
    { key: 'WEB', value: '123' },
    { key: 'IOS', value: '' },
    { key: 'WINDOWS', value: '' },
    { key: 'AOS', value: '' },
    { key: 'MAC_OS', value: '' }
  ]);

  const availableKeys = CLIENT_URL_KEYS.filter(
    (key) => !serviceLinks.some((link) => link.key === key && link.value.length > 0)
  );

  const updateServiceLinks = (key: keyof ClientUrl, value: string) => {
    setServiceLinks((prev) => prev.map((link) => (link.key === key ? { ...link, value } : link)));
  };

  const deleteServiceLink = (key: keyof ClientUrl) => {
    setServiceLinks((prev) =>
      prev.map((link) => (link.key === key ? { ...link, value: '' } : link))
    );
  };

  const handleKeyChange = (oldKey: keyof ClientUrl, newKey: keyof ClientUrl) => {
    setServiceLinks((prev) =>
      prev.map((link) =>
        link.key === oldKey
          ? { key: newKey, value: link.value }
          : link.key === newKey
            ? { key: oldKey, value: '' }
            : link
      )
    );
  };

  const addServiceLink = () => {
    if (availableKeys.length > 0) {
      const newKey = availableKeys[0];
      setServiceLinks((prev) => [...prev, { key: newKey, value: ' ' }]); // 항상 아래에 추가
    }
  };

  useEffect(() => {
    const clientUrl: ClientUrl = serviceLinks.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {} as ClientUrl
    );
    setValue('overview.clientUrl', clientUrl);
  }, [serviceLinks, setValue]);

  return (
    <div className="p-10 flex flex-col gap-5">
      <p className="text-large font-lb">서비스 링크</p>
      <div className="flex flex-col gap-2">
        {serviceLinks
          .filter(({ value }) => value.length > 0)
          .map(({ key, value }) => (
            <div key={key} className="flex gap-1.5">
              <SSelect
                value={{ key }}
                onChange={(newOption) =>
                  handleKeyChange(key, (newOption.key as keyof ClientUrl) || key)
                }
                options={[
                  { key },
                  ...availableKeys
                    .filter((availableKey) => availableKey !== key)
                    .map((availableKey) => ({ key: availableKey }))
                ]}
                displayKey="key"
              />
              <SInput
                className="w-[43.4rem]"
                placeholder="링크를 입력해주세요"
                value={value.trim()} // 입력 필드에서 공백 제거
                onChange={(e) => updateServiceLinks(key, e.target.value)}
              />
              <span
                className="flex items-center p-1 cursor-pointer"
                onClick={() => deleteServiceLink(key)}
              >
                <SImage src="/trash.svg" width={20} height={20} />
              </span>
            </div>
          ))}
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
