'use client';

import { DEFAULT_IMG_SRC } from '@/constants/image';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';

type DefaultImgType = 'user' | 'affiliation' | 'default';

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  defaultType?: DefaultImgType;
  onClick?: () => void;
  onDefaultImageLoad?: (isDefault: boolean) => void; // 부모에게 Default 이미지 여부 전달
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
    defaultType = 'default',
    onDefaultImageLoad
  } = props;
  const [imgSrc, setImgSrc] = useState(src);

  const isDefaultImage = useMemo(
    () => imgSrc === DEFAULT_IMG_SRC[defaultType],
    [imgSrc, defaultType]
  );

  useEffect(() => {
    if (onDefaultImageLoad) {
      onDefaultImageLoad(isDefaultImage);
    }
  }, [isDefaultImage, onDefaultImageLoad]);

  return (
    <Image
      className={`${className}`}
      src={imgSrc}
      alt={alt}
      fill={!width && !height}
      width={width}
      priority
      height={height}
      onClick={onClick}
      onError={() => {
        setImgSrc(DEFAULT_IMG_SRC[defaultType]); // Default 이미지로 변경
      }}
    />
  );
};

export default SImage;
