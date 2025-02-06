'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * parent position relative 추천
 * width & height 없으면 fill
 */
const SImage = (props: ImageProps) => {
  const {
    src = '', // 기본값 설정
    alt = 'Common Image Component',
    width,
    height,
    onClick = () => {},
    className
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [srcSet, setSrcSet] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof src === 'string' && !src.startsWith('/')) {
      setSrcSet('');
    } else {
      setSrcSet(src); // src가 올바른 경우 유지
    }
  }, [src]);

  return (
    <Image
      className={className}
      src={srcSet} // 기본값이 빈 문자열로 설정됨
      alt={alt}
      fill={!width && !height}
      width={width}
      height={height}
      onLoad={handleLoad}
      onClick={onClick}
    />
  );
};

export default SImage;
