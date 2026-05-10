export async function getAdminDashboard() {

  const token =
    localStorage.getItem(
      "token"
    );


  const response =
    await fetch(

      "http://localhost:8080/api/admin/dashboard",

      {

        headers: {

          Authorization:

            `Bearer ${token}`
        }
      }
    );


  if (!response.ok) {

    throw new Error(
      "Dashboard fetch failed"
    );
  }


  return response.json();
}




export async function getLowStockProducts() {

  const token =
    localStorage.getItem(
      "token"
    );


  const response =
    await fetch(

      "http://localhost:8080/api/admin/low-stock",

      {

        headers: {

          Authorization:

            `Bearer ${token}`
        }
      }
    );


  return response.json();
}