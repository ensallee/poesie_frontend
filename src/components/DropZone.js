import React, {Component} from 'react'
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';

function collect(connect, monitor) {
 return {
   connectDropTarget: connect.dropTarget()
 }
}

class Box extends Component {
 render() {
   const { connectDropTarget } = this.props
   return connectDropTarget(
     <div style={{border: '2px solid black', width: '100px', height: '80px' }}>
     </div>
  )
 }
}
export default DropTarget(ItemTypes.WORD, {}, collect)(Box)
