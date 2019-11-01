import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

//url for the rest webservice at Azure
let WebUrl: string = "https://itemservice-habo.azurewebsites.net/api/localitems/";

interface Item {
    id: number,
    name: string,
    quality: string,
    quantity: number
}

//create a click eventlistener at "Add" button
let AddCarButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
AddCarButton.addEventListener('click', add);
let getallbutton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
getallbutton.addEventListener('click', getall);
let getbyid: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getbyid");
getbyid.addEventListener('click', getbyidfunc);

let gettable: HTMLTableElement = <HTMLTableElement>document.getElementById("gettable");




function getbyidfunc(): void {

    console.log("At getbyid");
    let idelement2: HTMLInputElement = <HTMLInputElement>document.getElementById("getid");
    let id2: string = idelement2.value;
    //axios call

    axios.get<Item>(WebUrl + id2)
        .then(function (response: AxiosResponse<Item>) {
            //then the get is ok
            gettable.innerHTML = "";
            let car = response.data
            gettable.innerHTML = gettable.innerHTML + "<tr> <td>" + car.id + "</td> <td>" + car.name + "</td><td>" + car.quality + "</td><td>" + car.quantity + "</td></tr>"



        })
        .catch(function (error: AxiosError) {
            //then the get fails
        });


}


function getall(): void {

    console.log("At selectAllCarsfunction");

    //axios call

    axios.get<Item[]>(WebUrl)
        .then(function (response: AxiosResponse<Item[]>) {
            //then the get is ok
            gettable.innerHTML = "";
            response.data.forEach((car: Item) => {
                gettable.innerHTML = gettable.innerHTML + "<tr> <td>" + car.id + "</td> <td>" + car.name + "</td><td>" + car.quality + "</td><td>" + car.quantity + "</td></tr>"

            });

        })
        .catch(function (error: AxiosError) {
            //then the get fails
        });


}


//we need to code the axios post in this method
function add(): void {

    //Steps to do a axios post
    //step 1 we need to get the data from the html page (text input fields)
    let idelement: HTMLInputElement = <HTMLInputElement>document.getElementById("idin");
    let nameelement: HTMLInputElement = <HTMLInputElement>document.getElementById("namein");
    let quantityelement: HTMLInputElement = <HTMLInputElement>document.getElementById("quantityin");
    let qualityelement: HTMLInputElement = <HTMLInputElement>document.getElementById("qualityin");

    let id: number = +idelement.value;
    let name: string = nameelement.value;
    let quality: string = qualityelement.value;
    let quantity: number = +quantityelement.value;


    axios.post<Item>(WebUrl, {
        id: id,
        name: name,
        quality: quality,
        quantity: quantity
    })
        .then(function (response: AxiosResponse) {
            console.log("response " + response.status + " " + response.statusText)
        })
        .catch(function (error: AxiosError) { console.log(error) });
}
