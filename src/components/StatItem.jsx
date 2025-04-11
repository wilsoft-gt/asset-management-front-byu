export const StatItem = ({label, value, icon, percent=null}) => {
  return (
    <section className="flex flex-col justify-center items-center p-5 border border-solid border-neutral-300 rounded-md w-full max-w-1/3">
      {icon ? icon : null}
      <span className="text-2xl font-extrabold">{ percent ? percent : value}</span>
      <span>{label}</span>
      {percent ? <span className="text-xs text-neutral-500">Total: {value}</span> : null}
    </section>
  )
}