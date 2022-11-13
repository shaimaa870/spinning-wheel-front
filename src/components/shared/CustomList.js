import { ListGroup, ListGroupItem } from "reactstrap";

const CustomList = ({ options = [] }) => {
  return (
    <ListGroup>
      {options.map((option, i) => (
        <ListGroupItem key={i} className="d-flex" onClick={option.onClick}>
          <span className="mr-1">{option.icon}</span>
          <span>{option.label}</span>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
export default CustomList;
