import React from 'react';
import {withRouter} from 'react-router-dom'; // it is a higher order component => a func that takes component as arg and return a modifier component

import "./menu-item.styles.scss"
const MenuItem = ({title, imageUrl, size, linkUrl,history, match}) => ( //directly destructor the title from props
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image' style={{backgroundImage: `url(${imageUrl})`}} />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>Shop now</span>
    </div>
  </div>
)
export default withRouter(MenuItem); // it will return a superpowered menuitem component, then we now has access to history