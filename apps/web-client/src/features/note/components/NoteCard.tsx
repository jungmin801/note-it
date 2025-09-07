import { useRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useDragBound } from '../hooks/useDragBound';
import Konva from 'konva';
import { useNoteStore, type Note } from '@/store/noteStore';

export default function NoteCard(props: {
  item: Note;
  onDblClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  isEditing: boolean;
  stage: Konva.Stage;
}) {
  const { item, onDblClick, onClick, isEditing, stage } = props;
  const rectRef = useRef<any>(null);
  const dragBoundFunc = useDragBound(stage, rectRef.current);
  const selectedNoteId = useNoteStore((state) => state.selectedNoteId);
  return (
    <Group
      key={item.noteId}
      id={String(item.noteId)}
      x={item.x}
      y={item.y}
      onDblClick={onDblClick}
      onClick={onClick}
      onMouseDown={onClick}
      draggable
      dragBoundFunc={(pos) => dragBoundFunc(pos)}
    >
      <Rect
        ref={rectRef}
        width={item.width}
        height={item.height}
        fill={item.color}
        stroke={selectedNoteId === item.noteId ? 'dodgerblue' : undefined}
        strokeWidth={selectedNoteId === item.noteId ? 2 : 0}
        shadowBlur={4}
        shadowOpacity={0.2}
      />
      <Text
        x={0}
        padding={8}
        width={item.width}
        height={item.height}
        text={item.content}
        fontSize={18}
        align='center'
        verticalAlign='middle'
        listening={false}
        visible={!(isEditing && selectedNoteId === item.noteId)}
      />
    </Group>
  );
}
