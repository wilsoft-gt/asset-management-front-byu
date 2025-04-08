export function Input ({label="Input Label", hook, name="inputname"}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label.replace(" ", "")} className='text-gray-500 text-xs'>
        {label}
      </label>
      <input {...hook(`${name}`)} className='pt-1 pb-1 pl-2 pr-2 rounded-sm border-gray-300 border-solid border-1'/>
    </div>
  )
}


export function TextArea ({label="Input Label", hook, name="inputname"}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label.replace(" ", "")} className='text-gray-500 text-xs'>
        {label}
      </label>
      <textarea {...hook(`${name}`)} rows={7} className='pt-1 pb-1 pl-2 pr-2 rounded-sm border-gray-300 border-solid border-1'></textarea>
    </div>
  )
}
