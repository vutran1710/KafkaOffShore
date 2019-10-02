import * as React from 'react'

const DistributionContainer = ({
  docs,
  classes,
}) => {

  const itemClass = (hostname: string) => `doc bg-${classes[hostname]}`
  return (
    <div className="container shadow distribution-container">
      <div className="container-header">
        Document Insertion Graph <i>({docs.length} total)</i>
      </div>
      <div className="flex doc--container">
        {docs.map(t => (
          <div className={itemClass(t.hostname)} key={t._id}>
            {t._value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DistributionContainer
