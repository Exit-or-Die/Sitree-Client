import { DEFAULT_IMG_SRC } from '@/constants/image';
import Image from 'next/image';
import React, { useState } from 'react';

type DefaultImgType = 'user' | 'affiliation' | 'default';

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  defaultType?: DefaultImgType;
  onClick?: () => void;
}

/**
 * parent position relative 추천
 * width & height 없으면 fill
 */
const SImage = (props: ImageProps) => {
  const {
    src,
    alt = 'Common Image Component',
    width,
    height,
    onClick = () => {},
    className,
    defaultType = 'default'
  } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div>
      <Image
        className={className}
        src={imgSrc}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        onClick={onClick}
        onError={() => {
          setImgSrc(DEFAULT_IMG_SRC[defaultType]);
        }}
      />
    </div>
  );
};

export default SImage;
