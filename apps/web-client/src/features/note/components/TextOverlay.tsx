// TextOverlay.jsx
import { forwardRef } from 'react';

const TextOverlay = forwardRef<
  HTMLTextAreaElement,
  {
    style: React.CSSProperties;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
  }
>((props, ref) => {
  const { style, onChange, value } = props;

  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      style={style}
      onChange={onChange}
      autoFocus
      maxLength={70}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    />
  );
});

export default TextOverlay;
