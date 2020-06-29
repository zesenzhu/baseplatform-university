import React from "react";
import "../../scss/index.scss";
import { CheckBox } from "../../../common";
const  {
  PropTypes
} = React
class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BreadcrumbData: {},
    };
  }
  render() {
    // console.log(this.props.options)

    return (
      <span className={`Breadcrumb ${this.props.className}`}>
        {this.props.options.map((child, index) => {
          return (
            <React.Fragment key={child.value} >
              <span
                onClick={() => {
                  if (this.props.options.length - 1 !== index)
                    return this.props.onBreadcrumbClick(child.value,child.id);
                  else return false;
                }}
                className={`node-title ${
                  this.props.options.length - 1 !== index
                    ? "pre-node"
                    : "last-node"
                }`}
              >
                {child.title}
              </span>
              <span
                style={{
                  display:
                    this.props.options.length - 1 === index
                      ? "none"
                      : "inline-block",
                }}
                className="node-separator"
              >
                {this.props.separator}
              </span>
            </React.Fragment>
          );
        })}
      </span>
    );
  }
}
Breadcrumb.defaultProps={
  value: 1,
  options: [],
  separator: ">",
  className:''
};
// Breadcrumb.propsType={
//   // value: PropTypes.number,
//   options: PropTypes.array,
//   separator: PropTypes.string,
// };
export default Breadcrumb;
