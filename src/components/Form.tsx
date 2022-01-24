import axios from "axios";
import React, {ChangeEvent, FormEvent, useState} from "react";
interface IProduct{
  name: string;
  desc: string;
  category: string;
  price: number,
  amount: number
}
const intialForm:IProduct ={
  name: "",
  desc: "",
  category: "",
  price:0,
  amount:0
}
const Form:React.FC = () => {
  const [product, setProduct] =useState<IProduct>(intialForm)
  const {price,category,name,desc,amount} = product;
  const [file, setFile] = useState<any>();
  
  
  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setProduct({...product,[target.name]: target.value})
  };

  const handleFile = ({target}:ChangeEvent<HTMLInputElement>) => {
    if (target.files === null) {return;}
    setFile(target.files[0])
  };

  const handeSubmit= (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name === "" || desc === "" || category === "" || price.toString() === "" || price === 0 || amount.toString() === "" || amount === 0 || file === undefined) {return;}
    const formData = new FormData();
		formData.append('file', file);
    axios.post("https://auto-mundo.herokuapp.com/api/products",product, {headers:{'Access-Control-Allow-Origin':'*'}}).then(res => {
      axios.put(`https://auto-mundo.herokuapp.com/api/products/${res.data['product']._id}`,formData ).then(res=> console.log(res))
    }).catch(err=>console.log(err))
  };
  
  return(
    <form onSubmit={handeSubmit}>
      <div className="form_group">
        <label htmlFor="name">Nombre del producto</label>
        <input type="text" name="name" value={name} autoComplete="off" placeholder="Nombre el producto" onChange={handleChange} className="input"/>
      </div>
      <div className="form_group">
        <label htmlFor="name">Descripción</label>
        <input type="text" name="desc" value={desc} autoComplete="off" placeholder="Descripción del producto" onChange={handleChange} className="input"/>
      </div>
      <div className="form_group">
        <label htmlFor="category">Categoría</label>
        <input type="text" name="category" value={category} autoComplete="off" placeholder="Categoría del producto" onChange={handleChange} className="input"/>
      </div>
      <div className="form_group">
        <label htmlFor="amount">Cantidad</label>
        <input type="text" name="amount" value={amount} autoComplete="off" placeholder="Cantidad" onChange={handleChange} className="input"/>
      </div>
      <div className="form_group">
        <label htmlFor="name">Precio</label>
        <input type="number" name="price" value={price} autoComplete="off" placeholder="Precio del producto" onChange={handleChange} className="input"/>
     </div>

       <div className="form_group">
        <label htmlFor="file">Imagen</label>
        <input type="file" name="imagen" onChange={handleFile} className=""/>
      </div>
           <button className="btn btn__width">Guardar</button>
    </form>
)};
export default Form;
