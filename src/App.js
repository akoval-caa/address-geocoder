import React, { useEffect, useState } from "react";
import { read, utils } from 'xlsx';
import './App.css'
import GeocodeAddress from "./GeocodeAddress";
import { config } from "./config"


const geocoderColumns = [
  'status',
  'countResults',
  'location_type',
  'lat',
  'lng',
  'formatted_address',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'postal_code'
]


export default function SheetJSReactAoO() {
  const [pres, setPres] = useState([]);
  const { pathToFile, columns } = config; 

  useEffect(() => { (async() => {
    const f = await (await fetch(pathToFile)).arrayBuffer();
    const wb = read(f);
    const ws = wb.Sheets[wb.SheetNames[0]];
    let data = utils.sheet_to_json(ws);

    console.log(data.length)
    //filter some values
    //data = data.slice(0, 10);

    setPres(data);
  })(); }, [pathToFile]);

  const getAddressLine = (row) => {
    const addrLine = [
      row?.['line1'].startsWith('c/o') ? '' : row?.['line1'],
      row?.['line2'],
      row?.['line3'],
      row?.['city'],
      row?.['stateProv'],
      row?.['zip'],
      row?.['country']
    ].filter(v => v).join(', ');

    return addrLine;
  }

  if (!pres || !pres.length) {
    return null
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns?.map((c, i) => 
              <th key={i}>{c}</th>
            )}
            {geocoderColumns?.map((c, i) => 
              <th key={i}>{c}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            pres.map((row, i) => (
              <tr key={i}>
                {columns.map((c, i) => 
                  <td key={i}>
                    {row?.[c]}
                  </td>
                )}
                
                <GeocodeAddress address={getAddressLine(row)} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}