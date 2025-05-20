'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';
import SSelect from '@/components/common/Select';
import { UserLinkField } from '@/service/profile/response';
import SvgIcon from '@/components/common/SVGIcon';

const LINK_PROVIDERS = ['LINK', 'BEHANCE', 'GITHUB', 'LINKEDIN', 'NOTION'];

interface FormValues {
  links: UserLinkField[];
}

const ProfileRegisterStackList = () => {
  const { control, register, setValue, getValues } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links'
  });
  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-8">
        <p className="text-slate-10 font-lb text-xlarge">기술 스택</p>
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <div className="relative flex items-center w-full h-[36px] rounded-base text-small">
            <SvgIcon
              icon="magnifyGlass"
              width={14}
              height={14}
              className="w-[18px] h-[18px] text-slate-60 absolute z-10 ml-3"
              color="#959EB2"
            />
            <SInput
              type="text"
              placeholder="기술 스택 검색"
              className="bg-transparent w-full placeholder-slate-60 focus:!ring-0 pl-10"
            />
          </div>
        </div>
        <div className="w-full" />
      </div>
    </div>
  );
};

export default ProfileRegisterStackList;
