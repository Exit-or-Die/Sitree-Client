'use client';

import { LINK_PROVIDERS } from '@/constants/profile/defaultData';
import { ProfileUpdateRequest } from '@/service/profile/request';
import { useFormContext, useFieldArray } from 'react-hook-form';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import SSelect from '@/components/common/Select';

const ProfileLinksForm = () => {
  const { control, register } = useFormContext<ProfileUpdateRequest>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'myPage.links'
  });

  const selectedProviders = fields.map((field) => field.linkProvider);
  const availableProviders = LINK_PROVIDERS.filter(
    (provider) => !selectedProviders.includes(provider)
  );

  const addLink = () => {
    if (availableProviders.length === 0) return;
    append({ linkProvider: availableProviders[0], link: '' });
  };

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">링크</p>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-1.5">
            <SSelect
              value={{ key: field.linkProvider }}
              onChange={(newOption) => {
                update(index, {
                  ...field,
                  linkProvider: newOption.key
                });
              }}
              options={[
                { key: field.linkProvider },
                ...availableProviders.map((provider) => ({ key: provider }))
              ]}
              displayKey="key"
              selectClass="w-[15.6rem]"
            />
            <div className="w-[43.4rem]">
              <SInput
                className="text-small font-md leading-5 tracking-[-0.14px]"
                placeholder="링크를 입력해주세요"
                register={register}
                name={`myPage.links.${index}.link`}
              />
            </div>
            {fields.length > 1 && (
              <span className="flex items-center p-1 cursor-pointer" onClick={() => remove(index)}>
                <SImage src="/trash.svg" width={20} height={20} />
              </span>
            )}
          </div>
        ))}
      </div>
      {availableProviders.length > 0 && (
        <SButton
          size="lg"
          className="text-small bg-tree-93 text-tree-30 gap-1.5 h-[4.4rem] w-[10.8rem] cursor-pointer mt-[20px]"
          onClick={addLink}
        >
          <p>+</p>
          <p className="leading-5 tracking-[-1%]">링크 추가</p>
        </SButton>
      )}
    </div>
  );
};

export default ProfileLinksForm;
