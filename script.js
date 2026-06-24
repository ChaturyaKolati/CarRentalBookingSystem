const form = document.getElementById("bookingForm");
if(form)
{
    form.addEventListener("submit", function(e)
    {
        e.preventDefault();

        let pickup = new Date(document.getElementById("pickupDate").value);
        let ret = new Date(document.getElementById("returnDate").value);

        let days = (ret - pickup) / (1000 * 60 * 60 * 24);
        if(days <= 0)
            {
                alert("Return date must be after pickup date");
                return;
            }

        let pricePerDay = 5000;
        let total = days * pricePerDay;
        document.getElementById("totalPrice").innerHTML = "Total Price: ₹" + total;

        document.getElementById("bookingSummary").innerHTML = `
        <p>Car: ${document.getElementById("carName").value}</p>
        <p>Total Days: ${days}</p>
        <p>Total Amount: ₹${total}</p>`;

        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

        bookings.push(
            {
            car: document.getElementById("carName").value,
            date: document.getElementById("pickupDate").value
        });

        localStorage.setItem("bookings",JSON.stringify(bookings));
        alert("Booking Successful!");
        window.location.href = "payment.html";
    });
}


const searchInput = document.getElementById("searchCar");

const typeFilter = document.getElementById("carType");

const priceFilter = document.getElementById("priceFilter");

const availabilityFilter = document.getElementById("availabilityFilter");

if(searchInput && typeFilter)
    {
        searchInput.addEventListener("keyup", filterCars);
        typeFilter.addEventListener("change", filterCars);
        priceFilter.addEventListener("change", filterCars);
        availabilityFilter.addEventListener("change", filterCars);
        function filterCars()
        {
            let search = searchInput.value.toLowerCase();
            let type = typeFilter.value;
            let price = priceFilter.value;
            let status = availabilityFilter.value;

        let cars = document.querySelectorAll(".car-card");
        cars.forEach(car =>
            {
                let name = car.querySelector("h3").innerText.toLowerCase();
                let carType = car.dataset.type;
                let carPrice = Number(car.dataset.price);
                let carStatus = car.dataset.status;

                let matchSearch = name.includes(search);

                let matchType = type === "all" || type === carType;

                let matchPrice = price === "all" || carPrice <= Number(price);

                let matchStatus = status === "all" || status === carStatus;
                
                if(matchSearch && matchType && matchPrice && matchStatus)
                    {
                        car.style.display = "block";
                    }
                    else
                        {
                            car.style.display = "none";
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
            if(file && file.type.startsWith("image/"))
                {
                    document.getElementById("preview").src = URL.createObjectURL(file);
                }
        });
    }



function payNow()
{
    alert("Payment Successful!");
    // window.location.href = "payment.html";
    window.location.href = "history.html";
}




function loadHistory()
{
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let table = document.getElementById("historyTable");
    if(!table) return;
    table.innerHTML="";

    if(bookings.length === 0)
    {
        table.innerHTML =
        `<tr>
            <td colspan="4">No bookings found</td>
        </tr>`;
        return;
    }

    bookings.forEach((b,index)=>
        {
            table.innerHTML += 
            `<tr>
    <td>${b.car}</td>
    <td>${b.date}</td>
    <td>${b.status}</td>
    <td>
        <button onclick="cancelBooking(${index})">
            Cancel
        </button>
    </td>
</tr>`;
});
}
loadHistory();

function cancelBooking(index)
{
    let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.splice(index,1);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    loadHistory();
}




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




// const regForm = document.querySelector("form");

// if(window.location.pathname.includes("register"))
// {
//     regForm.addEventListener("submit",function()
//     {
//         localStorage.setItem(
//             "username",document.getElementById("name").value
//         );

//         localStorage.setItem(
//             "email",document.getElementById("email").value
//         );
//     });
// }



if(document.getElementById("profileName"))
{
    document.getElementById("profileName").innerText = localStorage.getItem("username");

    document.getElementById("profileEmail").innerText = localStorage.getItem("email");
}




// const params = new URLSearchParams(window.location.search);
// const selectedCar = params.get("car");

// if(selectedCar && document.getElementById("carName"))
// {
//     document.getElementById("carName").value = selectedCar;
// }




const params = new URLSearchParams(window.location.search);
const selectedCar = params.get("car");

const carSelect = document.getElementById("carName");

if(selectedCar && carSelect)
{
    carSelect.value = selectedCar;
}




const profileBookings = document.getElementById("profileBookings");

if(profileBookings)
{
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.forEach(b =>
    {
        profileBookings.innerHTML +=
        `<li>${b.car} - ${b.date}</li>`;
    });
}





bookings.push(
{
    car: document.getElementById("carName").value,
    date: document.getElementById("pickupDate").value,
    status: "Booked"
});








function addCar()
{
    let carName = document.getElementById("carNameInput");

    let carType = document.getElementById("carTypeInput");

    if(!carName || !carType) return;

    if(carName.value.trim() === "")
    {
        alert("Enter Car Name");
        return;
    }

    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    cars.push({
        name: carName.value,
        type: carType.value
    });

    localStorage.setItem("cars", JSON.stringify(cars));
    carName.value = "";
    loadCars();
}

function loadCars()
{
    let table =
    document.getElementById("carTable");

    if(!table) return;

    let cars =
    JSON.parse(localStorage.getItem("cars")) || [];

    table.innerHTML = "";

    cars.forEach((car,index)=>
    {
        table.innerHTML +=
        `
        <tr>
            <td>${car.name}</td>
            <td>${car.type}</td>
            <td>
                <button onclick="deleteCar(${index})">
                    Delete
                </button>
            </td>
            <td>Available</td>
        </tr>
        `;
    });
}

function deleteCar(index)
{
    let cars =
    JSON.parse(localStorage.getItem("cars")) || [];

    cars.splice(index,1);
    localStorage.setItem(
        "cars",
        JSON.stringify(cars)
    );
    loadCars();
}
loadCars();




const registerForm = document.getElementById("registerForm");
if(registerForm)
{
    registerForm.addEventListener("submit",function(e)
{
    e.preventDefault();
    let user = 
    {
        name : document.getElementById("regName").value,
        email : document.getElementById("regEmail").value,
        password : document.getElementById("regPassword").value
    };
    localStorage.setItem("user",JSON.stringify(user));
    alert("Registration Successful!");
    window.location.href = "login.html";
});
}





const loginForm = document.getElementById("loginForm");
if(loginForm)
{
    loginForm.addEventListener("submit",function(e)
{
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let user = JSON.parse(localStorage.getItem("user"));
    if(user && user.email === email && user.password === password)
    {
        alert("Login Succesfull!");
        window.location.href = "profile.html";
    }
    else
    {
        alert("Invalid Email or Password")
    }
});
}





const contactForm = document.querySelector(".contact form");
if(contactForm)
{
    contactForm.addEventListener("submit", function(e)
    {
        e.preventDefault();
        alert("Message Sent Successfully!");
    });
}








const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
if(profileName && profileEmail)
{
    let user = JSON.parse(localStorage.getItem("user"));
    if(user)
    {
        profileName.innerText = user.name;
        profileEmail.innerText = user.email;
    }
}





function logout()
{
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}




const historySearch = document.getElementById("historySearch");
if(historySearch)
{
    historySearch.addEventListener("keyup",function()
{
    let search = this.value.toLowerCase();
    let rows = document.querySelectorAll("#historyTable tr");
    rows.forEach(row => 
    {
        let carName = row.children[0].innerText.toLowerCase();
        if(carName.includes(search))
        {
            row.style.display = "";
        }
        else
        {
            row.style.display = "none";
        }
    }
    );
});
}





function loadAdminBookings()
{
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let table = document.getElementById("bookingTable");
    if(!table) return;
    table.innerHTML = "";
    bookings.forEach(b =>
    {
        table.innerHTML += `
        <tr>
        <td>${b.car}</td>
        <td>${b.date}</td>
        <td>${b.status}</td>
        <td>
        <button onclick="approveBooking()">Approve</button>
        <button onclick="completeBooking()">Complete</button>
        </td>
        </tr>`;
    }
    );
}
loadAdminBookings();
function approveBooking()
{
    alert("Booking Approved");
}

function completeBooking()
{
    alert("Booking Completed");
}