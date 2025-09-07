interface SwatchProps {
  color: string;
  size?: number; // 선택: 기본값 32px
}

export default function Swatch({ color, size = 32 }: SwatchProps) {
  return (
    <div
      className='rounded-sm border border-gray-300 shadow-sm'
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
}
