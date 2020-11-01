import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item.component";
//class item -> we need state of menu items
const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {
        // this.state.sections.map(({title, imageUrl,size, id, linkUrl}) => <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>) // this may be long bcs everytiume new props need to pass
        sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) =>
  createStructuredSelector({
    sections: selectDirectorySections,
  });
export default connect(mapStateToProps)(Directory);
