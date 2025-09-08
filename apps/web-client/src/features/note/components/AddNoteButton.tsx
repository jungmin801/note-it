import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNoteStore } from '@/store/noteStore';

export default function AddNoteButton(props: { mainSize: { width: number; height: number } }) {
  const { mainSize } = props;
  const { addNote } = useNoteStore();

  const newNote = {
    id: 2,
    width: 180,
    height: 180,
    x: mainSize.width / 2,
    y: mainSize.height / 2,
    content: '',
    color: '#FFFACD',
  };

  const onAddNote = () => {
    addNote(newNote);
  };

  return (
    <div className='absolute bottom-0 right-0'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='secondary' size='icon' onClick={onAddNote}>
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>노트 추가</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
