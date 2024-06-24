require("dotenv").config();
const fs = require("fs").promises;
const { ClientBuilder } = require("@commercetools/sdk-client-v2");
const {
  ApiRoot,
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");
const oauthUri = process.env.AUTH_URL;
const baseUri = process.env.API_URL;
const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
const projectKey = process.env.PROJECT_KEY;
const PRODUCT_TYPE_KEY = process.env.PRODUCT_TYPE_KEY;
const client = new ClientBuilder()
  .defaultClient(baseUri, credentials, oauthUri, projectKey)
  .build();

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

let jsonData;
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading or parsing file:", err);
    throw err;
  }
}
async function init() {
  try {
    jsonData = await readJSONFile("ProductTypeDraft.json");
    console.log("Data successfully read and placed into variable");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
}
async function createProductType() {
  const response = await apiRoot
    .productTypes()
    .post({
      body: jsonData,
    })
    .execute();
  console.log("BODY", response.body);
}
function getProductTypes() {
  apiRoot
    .productTypes()
    .withKey({ key: PRODUCT_TYPE_KEY })
    .get()
    .execute()
    .then(function ({ body }) {
      const productType = body;

      console.log(`Product Type: ${productType.name}`);
      console.log(`Attributes: ${productType.attributes.length}`);

      productType.attributes.forEach((attribute) => {
        if (
          attribute.type.name === "enum" &&
          !attribute.name.includes("Details_")
        ) {
          console.log(`  - Name: ${attribute.name}`);
        }
      });
    })
    .catch(function (error) {
      console.error("Error creating product type:", error);
    });
}

init().then(() => {
  createProductType().then(() => {
    console.log("Product type created successfully");
    setTimeout(() => {
      getProductTypes();
    }, 2000);
  });
});
