// Creating a new POST request to the JS endpoint on PANTRY API

fetch(
  "https://getpantry.cloud/apiv1/pantry/97e4f926-7b99-4f98-9705-41ace77aed7b/basket/JS",
  {
    method: "POST",
    body: JSON.stringify({
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }
)
  .then((resopnse) => resopnse.json())
  .then((json) => console.log(json));
