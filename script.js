const form = document.getElementById("bookingForm");
if(form)
    {
        form.addEventListener("submit", function(e)
        {
            e.preventDefault();

let pickup = new Date(document.getElementById("pickupDate").value);

let ret = new Date(document.getElementById("returnDate").value);

let days = (ret - pickup) / (1000*60*60*24);

let pricePerDay = 5000;

let total = days * pricePerDay;

document.getElementById("totalPrice").innerHTML = "Total Price: ₹" + total;

alert("Booking Successful!");
});
}


const searchInput = document.getElementById("searchCar");

const typeFilter = document.getElementById("carType");

if(searchInput)
    {
        searchInput.addEventListener("keyup", filterCars);
        typeFilter.addEventListener("change", filterCars);
        function filterCars()
        {
            let search = searchInput.value.toLowerCase();
            let type = typeFilter.value;
            let cars = document.querySelectorAll(".car-card");
            cars.forEach(car=>
                {
                    let name = car.querySelector("h3").innerText.toLowerCase();
                    let carType = car.dataset.type;
                    if((name.includes(search))&&(type==="all" || type===carType))
                        {
                            car.style.display="block";
                        }
                        else
                            {
                                car.style.display="none";
                            }
                });
        }   
    }



const license = document.getElementById("license");
if(license)
    {
        license.addEventListener("change",function()
        {
            const file = this.files[0];
            if(file)
                {
                    document.getElementById("preview").src = URL.createObjectURL(file);
                }
        });
    }



function payNow()
{
    alert("Payment Successful!");
    window.location = "profile.html";
}




function loadHistory()
{
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let table = document.getElementById("historyTable");
    if(!table) return;
    table.innerHTML="";
    bookings.forEach(b=>
        {
            table.innerHTML += 
            `<tr>
            <td>${b.car}</td>
            <td>${b.date}</td>
            <td>Booked</td>
            </tr>`;
        });
}
loadHistory();




form.addEventListener("submit",function(e)
{
    e.preventDefault();
    let car = document.getElementById("carName").value;
    let pickup = document.getElementById("pickupDate").value;
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(
        {
            car:car,
            date:pickup
        });
localStorage.setItem("bookings",JSON.stringify(bookings));
alert("Booking Saved");
});





const total = document.getElementById("totalBookings");
if(total)
    {
        let bookings = JSON.parse(localStorage.getItem("bookings"))||[];
        total.innerText = bookings.length;
    }






const themeBtn = document.getElementById("themeBtn");
if(themeBtn)
    {
        themeBtn.onclick = ()=>
            {
                document.body.classList.toggle("dark");
                localStorage.setItem("theme",document.body.classList.contains("dark"));
            };
    }
    if(localStorage.getItem("theme")==="true")
        {
            document.body.classList.add("dark");
        }






