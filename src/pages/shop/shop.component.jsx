import React from "react";
import ShopData from "./shop.data"
import PreviewCollection from "../../components/preview-collection/preview-collection.components"
class ShopPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collections: ShopData
    }
  }
  render(){
    const {collections} = this.state;
    console.log(collections);
    return(
      <div>
        {
          collections.map(({id, ...otherCollectionProps}) => (
            <PreviewCollection key={id} {...otherCollectionProps}/> //we pass in every item in a same category

          ))
        }
      </div>
    )
  }
}

export default ShopPage;