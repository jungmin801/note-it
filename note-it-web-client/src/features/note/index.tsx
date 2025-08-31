import { useRef, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import NoteCard from './components/NoteCard';
import TextOverlay from './components/TextOverlay';
import { useAutosizeTextarea } from './hooks/useAutoSizeTextarea';
import { useResizeObserver } from './hooks/useResizeObserver';
import AddNoteButton from './components/addNoteButton';
import { useNoteStore } from '@/store/noteStore';
import DeleteNoteButton from './components/DeleteNoteButton';

export default function NoteEditor() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const stageRef = useRef<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [textareaStyle, setTextareaStyle] = useState<React.CSSProperties>({});

  const { notes, updateNote, selectedNoteId, selectNote, deleteNote } = useNoteStore();
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
    const group = e.target.findAncestor('Group');
    if (!group) return;

    const id = Number(group.id());
    const currentNoteContent = notes.find((m) => m.noteId === id)?.content ?? '';

    selectNote(id);
    setIsEditing(true);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.value = currentNoteContent;

        autosize(textareaRef.current.value);
      }

      openEditorAtNode(group);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // 높이 초기화
      el.style.height = `${el.scrollHeight}px`; // scrollHeight만큼 다시 세팅
    }
    if (textareaRef.current) {
      textareaRef.current.value = e.target.value;
      console.log(textareaRef.current.value);
    }
  };

  const handleSelectedNote = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const group = e.target.findAncestor('Group');
    if (!group) return;

    const id = Number(group.id());
    selectNote(id);
  };

  const onDeleteNote = () => {
    if (selectedNoteId) {
      deleteNote(selectedNoteId);
      setIsEditing(false);
      selectNote(null);
    }
  };

  const onMouseUp = () => {
    selectNote(null);
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedNoteId && textareaRef.current) {
      updateNote(selectedNoteId, { content: textareaRef.current.value });
      selectNote(null);
      setIsEditing(false);
      textareaRef.current.value = '';
    }
  };

  return (
    <div className='relative overflow-hidden w-full h-full'>
      <Stage ref={stageRef} width={mainSize.width} height={mainSize.height} onMouseDown={handleStageClick}>
        <Layer>
          {notes.map((item) => (
            <NoteCard
              key={item.noteId}
              item={item}
              onClick={handleSelectedNote}
              onDblClick={handleDblClick}
              onMouseUp={onMouseUp}
              isEditing={isEditing}
              stage={stageRef.current}
            />
          ))}
        </Layer>
      </Stage>
      {isEditing && selectedNoteId !== null && <TextOverlay ref={textareaRef} style={textareaStyle} onChange={handleChange} />}
      {!selectedNoteId && <AddNoteButton mainSize={mainSize} />}
      {selectedNoteId && <DeleteNoteButton onClick={onDeleteNote} />}
    </div>
  );
}
