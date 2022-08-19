export const getData = () => {
const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA5MTYwMzEsImV4cCI6MTY2MDkxOTYzMSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI1QkJGNTc3RTFGRkVDRDhBMEFGRkRGQjhCQUY5Mjk2QSIsImlhdCI6MTY2MDkxNjAzMSwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.R4-i2MmY1dU5bKTK4edKXP2Ompa_84P4LjBGpCvBQHTgLQ67Gn_Ya7y_VvhPARbjLd6cZIzt3P0k7UgMM8cA7_Ta1Qscsuhib91ANxRkJipcZfiC_R_yVlqZ9Bh-3lmc6hL0q4UqmKxVnvUnqBH4AdL2035kzqdaubjf-6Nat_eDrwIpjpfscpvK-OOIxIF5vHVlDGt7Xjfk1Nan4mIvwmdraqE3x4F14COsF1LcYEvvFuf0ZOk8eKKUxwUNzVP8IvVAW5NKyhtGLMlj6TAhwsDBb3icOZRplIuva5zHTsky1N95K1sz16f-AP1JiWCNbj6-F-8eFIlgzwW_NR7RaA";
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