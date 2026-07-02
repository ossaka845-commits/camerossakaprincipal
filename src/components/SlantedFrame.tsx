interface SlantedFrameProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SlantedFrame({ className = '', style }: SlantedFrameProps) {
  return (
    <div
      className={`slanted-frame ${className}`}
      style={style}
    />
  );
}
