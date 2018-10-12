import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import stateListItemTypes from '../../StateListItem/Types';
import { Row, CardHeader,TabContent, Nav, NavItem, NavLink, TabPane, Col, Card, CardBody, CardText, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};
class StateListGroup extends Component {
  components = stateListItemTypes

  // OVERRIDE THIS TO SWAP THE INDIVIDUAL GROUP ELEMENT
  renderChild = (child) => {
    const StateListTag = this.components[child.component];
    if (!Array.isArray(child.value)) {
      return (<StateListTag key={child.rootKey + "-" + child.key} label={child.key} value={child.value} />);
    } else {
      return (<StateListTag key={child.rootKey + "-" + child.key} label={child.key} value={"TODO: No renderer for array"} />);
    }
  }
  renderChildren = () => {
    const { rootKey, data } = this.props;
    const childKeys = data.keys;
    return (<ListGroup>
      {childKeys.map((childKey) => {
        const childValue = data[childKey];
        const childComponent = data.childKeyToComponent[childKey];
        return this.renderChild({
          rootKey,
          key: childKey,
          value: childValue,
          component: childComponent
        });
      })}
    </ListGroup>);
  }
  render() {
    const { rootKey, data } = this.props;
    const childElems = this.renderChildren(this.props);
    
    return (
      <Card className={"state-card"}>
        <CardBody className={"state-card-body"}>
          <CardHeader className={"state-card-header"}>{rootKey}</CardHeader>
         {childElems}
        </CardBody>
      </Card>
    );
  }
}

export default StateListGroup;