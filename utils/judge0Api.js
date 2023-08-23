import axios from 'axios';

export const compileCode= async ( payload )=>{
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_JUDGE0_API,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: payload
      };
      
    try{
        const {data}= await axios.request(options)
        return data
    } catch(error){
        console.log(error)
        alert("Something went wrong => "+ error)
    }
}


export const getOutput= async ( token )=>{
  const options = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {          
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_JUDGE0_API,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);

    let statusId = response.data.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout( async () => {
          await getOutput(token);
        }, 2000);
        }
        else{
          return (response.data)
        }
  } catch (error) {
    console.error(error);
    alert("Something went wrong => "+ error)
  }
}