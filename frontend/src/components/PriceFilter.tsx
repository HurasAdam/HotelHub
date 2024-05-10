

type Props = {
    selectedPrice?: number;
    onChange: (value?:number) => void;
  };
  
  const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Max Price</h4>
 <select 
 className="p-2 border rounded-md w-full"
 value={selectedPrice} 
 onChange={(e)=>onChange(e.target.value ?parseInt(e.target.value):undefined)}>

    <option value="">Select Max Price</option>
    {[50,100,200,300,500].map((price)=>{
return(
    <option value={price}>{price}</option>
)
    })}
 </select>
      </div>
    );
  };
  
  export default PriceFilter;