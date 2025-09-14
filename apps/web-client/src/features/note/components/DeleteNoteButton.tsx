import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function DeleteNoteButton(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <div className='absolute bottom-0 right-0'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='secondary' size='icon' onClick={onClick}>
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>노트 삭제</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
