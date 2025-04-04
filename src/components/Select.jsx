export function Select ({label="Input Label", name="inputname", hook, options}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label.replace(" ", "")} className='text-gray-500 text-xs'>
        {label}
      </label>
      <select {...hook(`${name}`)} className='pt-1 pb-1 pl-2 pr-2 rounded-sm border-gray-300 border-solid border-1'>
        { options.map((option, key) => <option key={key} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  )
}
