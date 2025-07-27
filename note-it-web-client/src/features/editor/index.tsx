import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Image, Group, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function NoteEditor() {
  const [image] = useImage('/images/note_1.png');

  const [text, setText] = useState('Hello!');

  const imageWidth = 308;
  const imageHeight = 327;

  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState(1);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const scaleBy = 1.25;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setScale(newScale);

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
    stage.batchDraw();
  };

  const groupRef = useRef(null);
  const transformerRef = useRef(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
    }
  }, [selected]);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef} onWheel={handleWheel} draggable>
      <Layer>
        <Group x={250} y={150} draggable ref={groupRef} onClick={() => setSelected(true)} onTap={() => setSelected(true)}>
          <Image image={image} width={imageWidth} height={imageHeight} />
          <Text
            text={text}
            width={imageWidth}
            height={imageHeight}
            fontSize={24}
            align='center'
            verticalAlign='middle'
            fill='black'
            fontStyle='bold'
          />
        </Group>
        {selected && <Transformer ref={transformerRef} flipEnabled={false} />}
      </Layer>
    </Stage>
  );
}
