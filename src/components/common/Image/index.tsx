import Image from 'next/image';
import React, { useState } from 'react';

interface ImageProps {
  src: string;
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
    src,
    alt = 'Common Image Component',
    width,
    height,
    onClick = () => {},
    className
  } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <div>Skeleton!</div>}
      <Image
        className={`${className}`}
        src={src}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        onLoad={handleLoad}
        onClick={onClick}
      />
    </div>
  );
};

export default SImage;
