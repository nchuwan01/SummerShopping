import {useState, useEffect } from "react";
import axios from "axios";
import "./../HomeCSS/homeStyle.css";
import { useNavigate } from "react-router-dom";
import {APILocation} from "../../httpAPILocation/httpLocation";

 function CardLoader({categoryType}) {
    const [householdData, setHouseholdData] = useState([]);
    let navigate = useNavigate();

    //let arrayInfo = [];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${APILocation}/login/${categoryType}`);
          let data = response.data;
  
          data = data
            .filter((item) => item.category === categoryType)
            .reverse();

          
          setHouseholdData(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [categoryType]);
    

    function clicked(itemData)
    {
      navigate("/login/item/"+itemData.pid)
    }

    return (
      <div>

          <div className="cardDiv">
          {
          
          householdData.map((item) => (
              <div key={item.itemID} value={item.itemID} onClick={()=>clicked(item)} className="cardIO">   
                  <div className="imgDiv">
                    {item.image ? 
                    <img className="innerImg" src={`${APILocation}/images/${item.image}`} alt={item.name}/>
                      : <div> Loading....</div>}
                  </div>
                  <div className="card-footer">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text" id="priceParagraph">${item.price}</p>
                    <small className="text-muted">Posted on {item.created_at}</small>
                  </div>
              </div>
          ))}
          </div>
      </div>
    )
  }
  
  export default CardLoader;
