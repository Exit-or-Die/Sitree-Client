'use client';

import { useState } from 'react';

import SvgIcon from '../SVGIcon';

interface STooltipProps {
  children: React.ReactNode;
}

const STooltip = ({ children }: STooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <SvgIcon icon="tooltip" color="#B3BDCC" width={16} height={16} />
      {visible && (
        <div className="absolute bottom-full -left-[8px] mb-[10px] z-50">
          <div className="relative bg-slate-10 text-[1.3rem] text-white-100 px-2.5 py-1.5 rounded-base max-w-[284px] whitespace-normal break-words">
            {children}
            <div
              className="absolute top-full left-[10px]"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #16181D'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default STooltip;
