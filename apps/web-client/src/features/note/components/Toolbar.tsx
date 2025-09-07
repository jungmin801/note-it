import Swatch from '@/components/ui/swatch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
const swatches = [
  {
    name: 'pink',
    size: 20,
    color: '#FAD0D7',
  },
  {
    name: 'yellow',
    size: 20,
    color: '#FFFACD',
  },
  {
    name: 'green',
    size: 20,
    color: '#DFFFD6',
  },
  {
    name: 'blue',
    size: 20,
    color: '#CFEFFF',
  },
  {
    name: 'purple',
    size: 20,
    color: '#E6D6FF',
  },
];

export default function Toolbar(props: { selectedColor: string | null; onChange: (color: string) => void }) {
  const { onChange, selectedColor } = props;
  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
      <ToggleGroup
        type='single'
        className='gap-0'
        size='lg'
        value={selectedColor || ''}
        onValueChange={(value) => onChange(value)}
      >
        {swatches.map((swatch) => (
          <ToggleGroupItem
            key={swatch.color}
            aria-label={`Toggle ${swatch.name}`}
            value={String(swatch.color)}
            variant='outline'
            className='
            border border-input rounded-none
            first:rounded-l-md last:rounded-r-md
            -ml-px focus:z-10
            data-[state=on]:bg-accent data-[state=on]:text-accent-foreground
          '
          >
            <Swatch size={swatch.size} color={swatch.color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
