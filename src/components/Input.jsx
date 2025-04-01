export function Input ({value, onChange, type="text", label="Input Label"}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label.replace(" ", "")} className='text-gray-500 text-xs'>
        {label}
      </label>
      <input value={value} onChange={ (e) => onChange(e.target.value)} type={type} name={label.replace(" ", "")} className='pt-1 pb-1 pl-2 pr-2 rounded-sm border-gray-300 border-solid border-1'/>
    </div>
  )
}
