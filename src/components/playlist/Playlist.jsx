import axios from 'axios'
import React, { useEffect, useState } from 'react'


import './Playlist.css'
export default function Playlist() {
    const [cardData, setCardData] = useState([])
  const [checkedList,setCheckedList]=useState([]);
    const url = "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1";
    const fetchApi = async () => {
        const config = {
            headers: {
                'x-api-key': 'MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr',
                'x-tenant-key': 'DIVANOR123',
                'content-type': 'text/json'
            }
        };
        await axios.post(url, { "Index": 1, "ContentType": [2] }, config).then(res => {

            console.log(res)
            setCardData(res.data.data.Feeds)
        })
            .catch(err => console.log(err))

    };
    useEffect(() => {
        console.log('hhh')
        fetchApi();
    }, [])


    const clickedCheckbox = (e) => {


        const { value, checked } = e.target;
        
      if(checked){
        setCheckedList([...checkedList,value]);

      }else{

        setCheckedList(checkedList.filter(e=>e!==value));
      }
        

    }
const creatPl='https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prodapi/engt/createPlayList'
   const playlistSubmitHandler=(e)=>{
    e.preventDefault()
         axios.post(creatPl,
            {
                "PlayListId": Math.round(Math.random()*10000),
                "Post_Ids" : checkedList,
                "Name" : e.target.name.value ,
                "Description" :e.target.description.value
             }
             
         ,{
            headers: {
                'x-api-key': 'MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr',
                'x-tenant-key': 'DIVANOR123',
                'content-type': 'text/json'
            } 
         })

   }

    return (
        <div>

            <div className='createplaylist'>

                <form   onSubmit={playlistSubmitHandler}className='playlistNavbar'>

                    <input type="text" name='name' placeholder='Playlist Name *' />
                    <input type="text" name='description' placeholder='Description *' />

                    <button>+ Create Playlist</button>


                </form>




                <div className="card">

                    {
                        cardData.slice(16, 28).map((post, index) => {
                            return (
                                <div className='card-details'>
                                    <div>

                                        <div className="checkbox">
                                            <input type="checkbox" key={index} value={post.EngagementPostId} onChange={clickedCheckbox} />
                                        </div>
                                        <img className='card-img' src={post.Thumbnail_URL} width={120} height={150} alt=" " />
                                        <h4 className='card-title'>{post.Thumbnail_Title}</h4>
                                    </div>


                                </div>


                            )
                        })
                    }
                </div>







            </div>




        </div>
    )
}
