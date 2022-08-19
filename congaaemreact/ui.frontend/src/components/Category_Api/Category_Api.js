import {token} from "../storeToken.js";
export const getData = () => {
return fetch(
      "https://rlp-qa.congacloud.io/api/catalog/v1/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          pricelistid: "ACS_PL_SortingCat_PL",
          OrganizationId: "a5b2b6fe-02b7-47aa-b7ec-ecb619cc2f23",
          OrganizationFriendlyId: "rlp-qa-org2",
          UserId: "89761836-4d5e-4716-a320-764fedf7c0e8"
        }
      }
      )
    .then(response => response.json())
    .then((response) => {
        return response
    })
}