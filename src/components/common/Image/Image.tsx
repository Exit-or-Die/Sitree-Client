import Image from 'next/image';
import React, { useState } from 'react';

import styles from './CommonImage.module.css';

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

/**
 * parent position relative 추천
 * width & height 없으면 fill
 */
const CommonImage = (props: ImageProps) => {
  const { src, alt = 'Common Image Component', width, height, onClick = () => {} } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.imageContainer}>
      {isLoading && <div>Skeleton!</div>}
      <Image
        src={src}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        onLoad={handleLoad}
        onClick={onClick}
        className={isLoading ? styles.hidden : ''}
      />
    </div>
  );
};

export default CommonImage;
