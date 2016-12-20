import React from 'react';
import Radium from 'radium';

import { SortableItemMixin } from 'react-anything-sortable';

export default React.createClass({
  mixins: [SortableItemMixin],
  getDefaultProps() {
    return {
      className: 'img-item'
    };
  },

    render() {
    return this.renderWithSortable(
      <div style={{    textAlign: "center"}}>
        <img draggable={false} src={this.props.url} style={{width:"250px", height:"auto"}} className={this.props.className} />
      </div>
    );
  }
});
