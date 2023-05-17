import React, { useEffect, useState } from "react";
import { config } from "./config"

export default function GeocodeAddress(props) {
  const { address } = props;
  const [res, setRes] = useState([]);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?region=us&address=${encodeURIComponent(address)}&sensor=false&key=${config.key}`

  const processData = (jsonData) => {
    const res = [];
    
    console.log(jsonData.results)

    res.push(jsonData.status)
    res.push(jsonData.results.length)

    res.push(jsonData.results?.[0].geometry.location_type)
    res.push(jsonData.results?.[0].geometry.location.lat)
    res.push(jsonData.results?.[0].geometry.location.lng)
    
    res.push(jsonData.results?.[0].formatted_address)

    res.push(jsonData.results?.[0].address_components.find(c => c.types.includes('administrative_area_level_1'))?.long_name)
    res.push(jsonData.results?.[0].address_components.find(c => c.types.includes('administrative_area_level_2'))?.long_name)
    res.push(jsonData.results?.[0].address_components.find(c => c.types.includes('postal_code'))?.long_name)

    return res
  }

  useEffect(() => {
    (async() => {
      const response = await fetch(url);
      const jsonData = await response.json();
      const processedJson = processData(jsonData);
      setRes(processedJson);
    })();
  }, [url]);

  return (
    <>
      {res.map((elem, i) => <td key={`geo-${i}`}>{elem}</td>)}
    </>
  );
}