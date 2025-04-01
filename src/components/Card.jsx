export function Card ({children}, props) {
  return (
    <section className='flex flex-col justify-center items-center gap-8 min-w-lg p-6 rounded-lg shadow-xl bg-white' {...props}>
      {children}
    </section>
  )
}

export function CardBody ({children}, props) {
  return (
        <section className='flex flex-col w-100 gap-6' {...props}>
          {children}
        </section>
  )
}

export function CardHeader ({children}, props) {
  return (
    <header className='flex flex-col items-center w-100' {...props}>
      {children}
    </header>
  )
}