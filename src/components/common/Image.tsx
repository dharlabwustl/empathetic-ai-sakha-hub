
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt = "", 
  fallback = "/placeholder.png", 
  className = "", 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(src || fallback);
  const [isError, setIsError] = React.useState<boolean>(false);

  const handleError = () => {
    if (!isError) {
      setImgSrc(fallback);
      setIsError(true);
    }
  };

  React.useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsError(false);
    }
  }, [src]);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError} 
      className={className} 
      loading="lazy"
      {...props} 
    />
  );
};

export default Image;
