import Konva from 'konva';

export function useDragBound(stage: Konva.Stage | null, rect: Konva.Rect | null) {
  return (pos: { x: number; y: number }) => {
    const node = rect;
    if (!stage || !node) return pos;

    const rectWidth = node.width();
    const rectHeight = node.height();

    const maxX = stage.width() - rectWidth;
    const maxY = stage.height() - rectHeight;
    const margin = 8;

    return {
      x: Math.min(Math.max(pos.x, margin), maxX - margin),
      y: Math.min(Math.max(pos.y, margin), maxY - margin),
    };
  };
}
