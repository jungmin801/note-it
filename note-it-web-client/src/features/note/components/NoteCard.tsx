import { useRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useDragBound } from '../hooks/useDragBound';
import type { Note } from '@/constants/mock';
import Konva from 'konva';

export default function NoteCard(props: {
  item: Note;
  onDblClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  isEditing: boolean;
  stage: Konva.Stage;
}) {
  const { item, onDblClick, isEditing, stage } = props;
  const rectRef = useRef<any>(null);
  const dragBoundFunc = useDragBound(stage, rectRef.current);
  return (
    <Group
      key={item.noteId}
      id={String(item.noteId)}
      x={item.x}
      y={item.y}
      onDblClick={onDblClick}
      draggable
      dragBoundFunc={(pos) => dragBoundFunc(pos)}
    >
      <Rect ref={rectRef} width={item.width} height={item.height} fill='#fcf68aff' shadowBlur={4} shadowOpacity={0.2} />
      {!isEditing && (
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
        />
      )}
    </Group>
  );
}
