// TextOverlay.jsx
import { forwardRef } from 'react';

const TextOverlay = forwardRef<
  HTMLTextAreaElement,
  {
    style: React.CSSProperties;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
>((props, ref) => {
  const { style, onChange } = props;

  return <textarea ref={ref} rows={1} style={style} onChange={onChange} autoFocus maxLength={70} />;
});

export default TextOverlay;
