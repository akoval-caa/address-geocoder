Simple tool that is capable to read addresses from the excel file and then ask Google API to geocode those addresses. Outputs lat, lon, formatted address, zip and some other data on the screen

1. npm install
2. edit /src/config.js and add Google API KEY that has geocoding api enabled.
3. put your file to /public/files/addressess.xlsx
4. npm start
5. open http://localhost:3000
6. Ctrl+A  and Ctrl+C to copy complete table results from the page
7. insert to the Excel and use vlookup() function to pull the geocoding data where needed using the ID column

Important notice: be carefull not to exaust API with too many calls! Every time page gets reloaded each table line makes new API call.

