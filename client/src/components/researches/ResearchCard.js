export const ResearchCard = ({research}) => {
  return (
    <>
      <h2>Исследование</h2>

      {/* <p>Сокращённая ссылка: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p> */}
      {/* <p>Полная ссылка: <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p> */}
      {/* <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p> */}
      {/* <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p> */}
      <p>Дата исследования: {new Date(research.date).toLocaleDateString()}</p>
    </>
  )
}
