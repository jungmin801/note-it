import { mock } from '@/constants/mock';
import { useRef, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import NoteCard from './components/NoteCard';
import TextOverlay from './components/TextOverlay';
import { useAutosizeTextarea } from './hooks/useAutoSizeTextarea';
import { useResizeObserver } from './hooks/useResizeObserver';

export default function NoteEditor() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const stageRef = useRef<any>(null);

  const [text, setText] = useState<string>('');
  const [textareaStyle, setTextareaStyle] = useState<React.CSSProperties>({});

  const [mockData, setMockData] = useState(mock);
  const [editId, setEditId] = useState<number | null>(null);
  const autosize = useAutosizeTextarea(textareaRef);
  const mainSize = useResizeObserver();

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
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      resize: 'none',
    });

    requestAnimationFrame(() => {
      autosize(text);
    });
  };

  const handleDblClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const group = e.target.findAncestor('Group');
    if (!group) return;
    const id = Number(group.id());
    setEditId(id);
    const cur = mockData.find((m) => m.noteId === id);
    setText(cur?.content ?? '');
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

  const onBlur = () => {
    const newData = [...mockData].map((item) => {
      if (item.noteId === editId) {
        return {
          ...item,
          content: text,
        };
      }
      return item;
    });
    setMockData(newData);
    setEditId(null);
  };

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
          {mockData.map((item) => (
            <NoteCard
              key={item.noteId}
              item={item}
              onDblClick={handleDblClick}
              isEditing={editId === item.noteId}
              stage={stageRef.current}
            />
          ))}
        </Layer>
      </Stage>
      {editId !== null && (
        <TextOverlay ref={textareaRef} value={text} style={textareaStyle} onChange={handleChange} onBlur={onBlur} />
      )}
    </div>
  );
}
