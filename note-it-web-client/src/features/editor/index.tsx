import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

export default function NoteEditor() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const stageRef = useRef<any>(null);
  const rectRef = useRef<any>(null);

  const rectWidth = 180;
  const rectHeight = 180;

  const [text, setText] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [textareaStyle, setTextareaStyle] = useState<React.CSSProperties>({});
  const [mainSize, setMainSize] = useState({ width: 0, height: 0 });

  const autosize = (nextValue?: string) => {
    const el = textareaRef.current;
    if (!el) return 0;

    // 측정 전 초기화
    el.style.height = '0px';
    if (typeof nextValue === 'string') {
      // 측정값을 정확히 하려면 value를 반영한 뒤 측정
      el.value = nextValue;
    }
    const h = el.scrollHeight; // 실제 필요한 높이
    el.style.height = `${h}px`; // 높이 갱신
    return h;
  };

  const openEditorAtNode = (targetNode: any) => {
    const nodeRect = targetNode.getClientRect();

    setTextareaStyle({
      position: 'absolute',
      top: nodeRect.y + nodeRect.height / 2,
      left: nodeRect.x,
      width: nodeRect.width,
      height: 'auto',
      transform: 'translateY(-50%)',
      zIndex: 10,
      padding: 0,
      fontSize: 18,
      background: 'transparent',
      lineHeight: '1',
      border: 'none', // 경계선 오차 방지 (필요 시 box-sizing으로 조절)
      outline: 'none',
      boxSizing: 'border-box',
      textAlign: 'center',
      display: 'flex', // 가운데 정렬을 CSS로 처리
      alignItems: 'center',
      justifyContent: 'center',
      resize: 'none',
    });
    setIsEditing(true);

    requestAnimationFrame(() => {
      autosize(text);
    });
  };

  const handleDblClick = (e: any) => {
    const group = e.target.getParent();
    openEditorAtNode(group);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // 높이 초기화
      el.style.height = `${el.scrollHeight}px`; // scrollHeight만큼 다시 세팅
    }
    setText(e.target.value);
  };

  useEffect(() => {
    const mainEl = document.querySelector('#main');
    if (!mainEl) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setMainSize({ width, height });
      }
    });

    observer.observe(mainEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      <Stage ref={stageRef} width={mainSize.width} height={mainSize.height}>
        <Layer>
          <Group
            x={rectWidth}
            y={rectHeight}
            onDblClick={handleDblClick}
            draggable
            dragBoundFunc={(pos) => {
              const stage = stageRef.current;
              const node = rectRef.current;
              if (!stage || !node) return pos;

              const rectWidth = node.width();
              const rectHeight = node.height();

              const maxX = stage.width() - rectWidth;
              const maxY = stage.height() - rectHeight;

              return {
                x: Math.min(Math.max(pos.x, 8), maxX - 8),
                y: Math.min(Math.max(pos.y, 8), maxY - 8),
              };
            }}
          >
            <Rect ref={rectRef} width={rectWidth} height={rectHeight} fill='#fcf68aff' shadowBlur={4} shadowOpacity={0.2} />
            {!isEditing && (
              <Text
                x={0}
                y={0}
                padding={8}
                width={rectWidth}
                height={rectHeight}
                text={text}
                fontSize={18}
                align='center'
                verticalAlign='middle'
                listening={false}
              />
            )}
          </Group>
        </Layer>
      </Stage>

      {isEditing && (
        <textarea
          ref={textareaRef}
          rows={1}
          style={textareaStyle}
          value={text}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          maxLength={70}
        />
      )}
    </div>
  );
}
