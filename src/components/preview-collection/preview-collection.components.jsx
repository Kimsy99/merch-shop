import React from "react";
import "./preview-collection.styles.scss"
const PreviewCollection = ({title, items}) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {console.log(items)}
      {
        items.filter((item, idx) => idx<4).map(item => ( //for each type of item we only display 4 items
          <div key={item.id}>{item.name}</div>)
        )
      }
    </div>
  </div>
)
export default PreviewCollection;