import type { RefObject } from 'react';

export default function TextOverlay(props: {
  value: string;
  style: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  ref: RefObject<HTMLTextAreaElement | null>;
}) {
  const { value, style, onChange, onBlur, ref } = props;
  return <textarea ref={ref} rows={1} style={style} value={value} onChange={onChange} onBlur={onBlur} autoFocus maxLength={70} />;
}
