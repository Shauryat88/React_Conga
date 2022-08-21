import {token} from "../storeToken.js";
export const getData = () => {
return fetch(
      "https://rlp-dev.congacloud.io/api/catalog/v1/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          pricelistid: "cbc75112-60e9-47b2-a632-f70d5912b70f",
          OrganizationId: "a65544f2-b4cb-400c-a014-1fd6b04861c9",
          OrganizationFriendlyId: "rlp-dev",
          UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
        }
      }
      )
    .then(response => response.json())
    .then((response) => {
        return response
    })
}