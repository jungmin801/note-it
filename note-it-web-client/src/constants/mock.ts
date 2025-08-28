export type Note = {
  noteId: number;
  width: number;
  height: number;
  x: number;
  y: number;
  content: string;
};

export const mock = [
  {
    noteId: 1,
    width: 180,
    height: 180,
    x: 200,
    y: 200,
    content: '오늘 하루도 무사히',
  },
];
