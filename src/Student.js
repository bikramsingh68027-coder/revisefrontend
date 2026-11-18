import { Fragment } from "react";

function Student(props){
    return(
        <Fragment>
        {props.data.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.mobile}</td>
                <td>{item.course}</td>
                <td>{item.email}</td>
                <td>
            <button onClick={() => props.onUpdateclick(item)}>Edit</button>
            <button onClick={() => props.onrowclick(item)}>
              Delet
            </button>
          </td>
            </tr>
        ))}
        </Fragment>
    )
}
export default Student;