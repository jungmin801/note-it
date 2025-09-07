import { Fragment, useRef, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import NoteCard from './components/NoteCard';
import TextOverlay from './components/TextOverlay';
import { useAutosizeTextarea } from './hooks/useAutoSizeTextarea';
import { useResizeObserver } from './hooks/useResizeObserver';
import AddNoteButton from './components/AddNoteButton';
import { useNoteStore } from '@/store/noteStore';
import DeleteNoteButton from './components/DeleteNoteButton';
import Toolbar from './components/Toolbar';

export default function NoteEditor() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const stageRef = useRef<any>(null);
  const clickTimer = useRef<number | null>(null);
  const SINGLE_CLICK_DELAY = 220;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [textareaStyle, setTextareaStyle] = useState<React.CSSProperties>({});
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>({});

  const { notes, updateNote, selectedNoteId, selectNote, deleteNote } = useNoteStore();
  const autosize = useAutosizeTextarea(textareaRef);
  const mainSize = useResizeObserver(containerRef);

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
      pointerEvents: 'auto',
    });

    if (textareaRef?.current) {
      requestAnimationFrame(() => {
        autosize(textareaRef?.current?.value);
      });
    }
  };

  // NoteEditor.jsx에서 handleDblClick 수정
  const handleDblClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    const group = e.target.findAncestor('Group');
    if (!group) return;

    const id = Number(group.id());

    // 싱글클릭 예약 취소 (가장 중요)
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }

    const currentNoteContent = notes.find((m) => m.noteId === id)?.content ?? '';

    selectNote(id);
    setIsEditing(true);

    setDrafts((d) => ({ ...d, [id]: d[id] ?? currentNoteContent }));

    requestAnimationFrame(() => {
      openEditorAtNode(group);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNoteId == null) return;
    const v = e.target.value;

    // autosize가 ref를 요구하면 읽기만 (쓰기 금지)
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }

    // ★ 값은 state에만 반영
    setDrafts((d) => ({ ...d, [selectedNoteId]: v }));
  };

  const handleSelectedNote = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    const group = e.target.findAncestor('Group');
    if (!group) return;

    const id = Number(group.id());

    // 이전 예약 취소
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }

    // 싱글클릭 확정될 때만 실행
    clickTimer.current = window.setTimeout(() => {
      selectNote(id);
      clickTimer.current = null;
    }, SINGLE_CLICK_DELAY);
  };

  const onDeleteNote = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId);
      setIsEditing(false);
      selectNote(null);
    }
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedNoteId) {
      updateNote(selectedNoteId, { content: drafts[selectedNoteId] });
    }

    selectNote(null);
    setIsEditing(false);
    setDrafts({});
  };

  const onChangeColor = (color: string) => {
    if (selectedNoteId) {
      updateNote(selectedNoteId, { color });
      setSelectedColor(color);
    }
  };

  return (
    <div className='relative overflow-hidden w-full h-full' ref={containerRef}>
      {mainSize && (
        <>
          <Stage ref={stageRef} width={mainSize.width} height={mainSize.height} onMouseDown={handleStageClick}>
            <Layer>
              {notes.map((item) => (
                <Fragment key={item.noteId}>
                  <NoteCard
                    item={item}
                    onClick={handleSelectedNote}
                    onDblClick={handleDblClick}
                    isEditing={isEditing}
                    stage={stageRef.current}
                  />
                </Fragment>
              ))}
            </Layer>
          </Stage>
          {isEditing && selectedNoteId !== null && (
            <TextOverlay
              key={selectedNoteId}
              ref={textareaRef}
              style={textareaStyle}
              onChange={handleChange}
              value={drafts[selectedNoteId] ?? ''}
            />
          )}
          {!selectedNoteId && <AddNoteButton mainSize={mainSize} />}
          {selectedNoteId && <DeleteNoteButton onClick={onDeleteNote} />}
          {selectedNoteId && <Toolbar selectedColor={selectedColor} onChange={onChangeColor} />}
        </>
      )}
    </div>
  );
}
