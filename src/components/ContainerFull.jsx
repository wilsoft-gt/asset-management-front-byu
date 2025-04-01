export default function ContainerFull ({children, centerContent=false}) {
  return (
    <article className={`flex ${centerContent ? "justify-center items-center" : null}  h-screen bg-neutral-300`}>
      {children}
    </article>
  )
}