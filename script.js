let nameEntered = document.querySelector("#name");
let searchBtn = document.querySelector("button");
let result = document.querySelector(".result");
let resultName = document.querySelector('.resultName')
let month = document.querySelector('#months')

let monthVal = "All";
let monthClicked = false

month.addEventListener('click',()=>{
  monthVal = month.value
  console.log(monthVal)
  if(monthVal=='All'){
    monthClicked=false
  }else{
    monthClicked=true
  }
  console.log(`Month clicked value is ${monthClicked}`)
})


let enteredName ;
nameEntered.addEventListener("keypress",(e)=>{
  if(e.target = 'Enter' ){
    enteredName = nameEntered.value
  }
})


searchBtn.addEventListener("click", () => {
  resultName.innerHTML = enteredName.toUpperCase()
  nameEntered.value = ''
  api()
  // console.log(enteredName)
});


// async function log(){
//   try{
//     let res = await fetch('./data.js')
//     let data = await res.json()
//     console.log(data)
//   }catch(e){
//     console.log("Error in fetching data : ",e)
//   }
// }
// log()

// function renderInfo(data){

// }

function api(){
  fetch(`./data.json`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        console.table(res['electricity_bills'])
        
        output = ` 
        <tr>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-700 px-4 p-3">Month</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-700 px-4 p-3">Amount</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-700 px-4 p-3">Units used</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-700  px-4 p-3">Paid on</th>
        </tr>`;

        let totalBill = 0
        let avgBill = 0
        let avgUnits = 0

        billOutput=`
          <tr>
            <th class="border-4 text-center border-white font-bold px-5 py-3 bg-yellow-300" >Total Bill</th>  
            <th class="border-4 text-center border-white font-bold px-5 py-3 bg-yellow-300">Average Bill</th>  
            <th class="border-4 border-white text-center font-bold px-5 py-3 bg-yellow-300">Average Units</th>  
          </tr>
        `

        

        for(let i = 0; i < res['electricity_bills'].length; i++) {
          nameInside = res['electricity_bills'][i]['name'] 
          
          for(let j=0;j<res['electricity_bills'][0]['monthly_bills'].length;j++){
            monthInside = res['electricity_bills'][i]['monthly_bills'][j]

            if(enteredName == nameInside && monthVal == monthInside['month']){

              output +=`<tr>
                <td class="border-4 font-semibold text-center border-white bg-slate-500  px-4 p-3">${monthInside['month']}</td>
                <td class="border-4 font-semibold  text-center border-white bg-slate-400  px-4 p-3">₹${monthInside['amount']}</td>
                <td class="border-4 font-semibold  text-center border-white bg-slate-500  px-4 p-3">${monthInside['units_used']}</td>
                <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-400  p-3">${monthInside['bill_paid_date']}</td>
              `
              totalBill +=monthInside['amount']
              avgBill+=totalBill
              avgUnits+=monthInside['units_used']
              

            }else if(enteredName == nameInside && monthClicked == false ){

                output +=`<tr>
                  <td class="border-4 font-semibold text-center border-white bg-slate-500  px-4 p-3">${monthInside['month']}</td>
                  <td class="border-4 font-semibold  text-center border-white bg-slate-400  px-4 p-3">₹${monthInside['amount']}</td>
                  <td class="border-4 font-semibold  text-center border-white bg-slate-500  px-4 p-3">${monthInside['units_used']}</td>
                  <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-400  p-3">${monthInside['bill_paid_date']}</td>
                `
                totalBill +=monthInside['amount']
                avgBill=totalBill/res['electricity_bills'][i]['monthly_bills'].length
                avgUnits+=monthInside['units_used']/res['electricity_bills'][i]['monthly_bills'].length
                
                
              }

              
              // else{
                //   console.log('second')
                //   nameInside = res['electricity_bills'][i]['name'] 
                //   monthInside = res['electricity_bills'][i]['monthly_bills'][j]
                
                //   output +=`<tr>
                //     <td class="border-4 font-semibold text-center border-white bg-slate-500  px-4 p-3">${monthInside['month']}</td>
                //     <td class="border-4 font-semibold  text-center border-white bg-slate-400  px-4 p-3">₹${monthInside['amount']}</td>
                //     <td class="border-4 font-semibold  text-center border-white bg-slate-500  px-4 p-3">${monthInside['units_used']}</td>
                //     <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-400  p-3">${monthInside['bill_paid_date']}</td>
            //   `
            // }
          }

          // output = output + `<tr>
          
          //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['month']}</td>
          //       <td class="border-2 border-black p-3">₹${res['electricity_bills'][i]['monthly_bills'][i]['amount']}</td>
          //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['units_used']}</td>
          //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['bill_paid_date']}</td>
          //     </tr>`
        }
        billOutput+=`
              <tr>
                <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">₹${totalBill.toFixed(2)}</td>
                <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">₹${avgBill.toFixed(2)}</td>
                <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">${avgUnits.toFixed(0)}</td>
              </tr>
              `
        console.log(`Total bill is ${totalBill}`)
        document.getElementById('records').innerHTML = output
        document.getElementById('bill').innerHTML = billOutput
      

        // for(let j=0;j<res['electricity_bills'][0]['monthly_bills'].length;j++){
        //   output +=`<tr>
        //     <td class="border-4 text-center border-white bg-slate-500  px-4 p-3">${res['electricity_bills'][0]['monthly_bills'][j]['month']}</td>
        //     <td class="border-4 text-center border-white bg-slate-400  px-4 p-3">₹${res['electricity_bills'][0]['monthly_bills'][j]['amount']}</td>
        //     <td class="border-4 text-center border-white bg-slate-500  px-4 p-3">${res['electricity_bills'][0]['monthly_bills'][j]['units_used']}</td>
        //     <td class="border-4 text-center border-white px-4 bg-slate-400  p-3">${res['electricity_bills'][0]['monthly_bills'][j]['bill_paid_date']}</td>
        //   `
        // }
        // for(let i=0;i<res['electricity_bills'].length;i++){
        //   if(nameEntered.value == res['electricity_bills'][i]['name']){
        //     elmName = document.createElement('p')
        //     elmName.textContent = res['electricity_bills'][i]['name']
        //     result.appendChild(elmName)
        //   }
        // }
        //<td class="border-2 border-black p-3">${res['electricity_bills'][i]['name']}</td>




    })
}


