### Snowboards Parser
This parser is written to search, recognize, create and auto-format files ready for import into Commerce Tools.
Works with any catalog option using a given link
https://www.evo.com/shop/snowboard/snowboards/${endpoint}
Endpoint depends on the number of products displayed on the page and can be empty || rpp_200 || rpp_400.
The link and data for commerce are set in .env or by manual:
- PROJECT_KEY=
- CLIENT_SECRET=
- CLIENT_ID=
- AUTH_URL=
- API_URL=
- SCOPES=
- PARSE_URL=
The number of recognized products is set in a simple cycle in each file:
  for (let linkNumber = 0; linkNumber < ${number}; linkNumber += 1)
Several scripts have been implemented to create data types ready for uploading:
ProductParser.js - create list of products and all variants for each size, list of categories
ImagesParser.js - parse all product images + details images
AssetsFormatter.js - create product link data for images