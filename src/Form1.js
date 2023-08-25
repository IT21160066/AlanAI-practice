import { useForm } from "react-hook-form";
import {withRouter} from "react-router-dom";

const Form1 = (props) => {
  const {handleSubmit} = useForm();
  const onSubmit = () => {props.history.push("./Form2")};

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" value="Stat now!" className="demo"/>
    </form>
  );
}

export default withRouter(Form1);