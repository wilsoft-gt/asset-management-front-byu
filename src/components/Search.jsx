import { IconSearch, IconX } from '@tabler/icons-react';

export default function Search({text, setText}) {
  return (
    <div className='flex items-center gap-1 border-1 border-solid border-b-neutral-700 rounded-full p-1'>
      <IconSearch stroke={1} size={18} />
      <input value={text} onChange={(e) => setText(e.target.value)} type="input" placeholder='search...' className='outline-0 w-full h-full' />
      
      {
        text != "" 
        ? <span className='w-auto h-auto rounded-full hover:bg-neutral-300' onClick={() => setText("")}>
            <IconX stroke={1} size={18} />
          </span>
        : null
      }
    </div>
  )
}