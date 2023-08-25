import React from "react";
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";

const Form2 = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useFormContext();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Where would you like to go?</label>
      <input {...register("location", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.location && <span style={{color:'red'}}>This field is required</span>}
      
      <label>Checking in: </label>
      <Controller
        control={control}
        name="fromDate"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
            minDate={new Date()}
          />
        )}
      />

      <label>Checking out: </label>
      <Controller
        control={control}
        name="toDate"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            selected={value}
            minDate={new Date()}
          />
        )}
      />

      <label>Type:</label>
      <select {...register("type")}>
        <option value="apartment">Apartment</option>
        <option value="suite">Suite</option>
        <option value="bungalow">Bungalow</option>
        <option value="villa">Villa</option>
      </select>

      <label>Free cancelation:</label>
      <input name="cancelFree" type="checkbox" {...register('cancelFree')} id="cancelFree" />

      <input type="submit" className="demo"/>
    </form>
  );
}

export default Form2;