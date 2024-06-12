let nameEntered = document.querySelector("#name");
let searchBtn = document.querySelector("button");
let result = document.querySelector(".result");
let resultName = document.querySelector('.resultName');
let month = document.querySelector('#months');

let monthVal = "All";
let monthClicked = false;

month.addEventListener('click', () => {
  monthVal = month.value;
  console.log(monthVal);
  if(monthVal=='All'){
    monthClicked=false
  }else{
    monthClicked=true
  }
  console.log(`Month clicked value is ${monthClicked}`);
});

let enteredName;
nameEntered.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    enteredName = nameEntered.value.trim().toLowerCase();
    // searchBtn.click();
  }
});

let flag = [];
function apiRender() {
  fetch(`./data.json`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      console.table(res['electricity_bills']);

      output = `
        <tr>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-400
           px-1 py-1 md:px-4 md:p-3">Month</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-400
           px-1 py-1 md:px-4 md:p-3">Amount</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-400
           px-1 py-1 md:px-4 md:p-3">Units used</th>
          <th class="border-4 text-center text-white border-white font-bold bg-slate-400
            px-1 py-1 md:px-4 md:p-3">Paid on</th>
        </tr>`;

      let totalBill = 0;
      let avgBill = 0;
      let avgUnits = 0;

      billOutput = `
        <tr>
          <th class="border-4 text-center border-white font-bold px-1 py-1 md:px-5 md:py-3
           bg-yellow-300">Total Bill</th>
          <th class="border-4 text-center border-white font-bold px-1 py-1 md:px-5 md:py-3
           bg-yellow-300">Average Bill</th>
          <th class="border-4 border-white text-center font-bold px-1 py-1 md:px-5 md:py-3
           bg-yellow-300">Average Units</th>
        </tr>`;

      let userFound = false;
      for (let i = 0; i < res['electricity_bills'].length; i++) {
        let nameInside = res['electricity_bills'][i]['name'].toLowerCase();
        if (enteredName === nameInside) {
          userFound = true;
          for (let j = 0; j < res['electricity_bills'][i]['monthly_bills'].length; j++) {
            let monthInside = res['electricity_bills'][i]['monthly_bills'][j];
            if (monthVal === monthInside['month'] || monthVal === 'All') {
              output += `<tr>
                <td class="border-4 font-semibold text-center border-white bg-slate-300 
                 px-1 py-1 md:px-4 md:p-3">${monthInside['month']}</td>
                <td class="border-4 font-semibold  text-center border-white bg-slate-200 
                 px-1 py-1 md:px-4 md:p-3">₹${monthInside['amount']}</td>
                <td class="border-4 font-semibold  text-center border-white bg-slate-300
                  px-1 py-1 md:px-4 md:p-3">${monthInside['units_used']}</td>
                <td class="border-4 font-semibold  text-center border-white  bg-slate-200
                 px-1 py-1 md:px-4 md:p-3">${monthInside['bill_paid_date']}</td>
              </tr>`;
              totalBill += monthInside['amount'];
              avgUnits += monthInside['units_used'];
              flag.push(1);
            }
          }
          avgBill = totalBill / res['electricity_bills'][i]['monthly_bills'].length;
          avgUnits = avgUnits / res['electricity_bills'][i]['monthly_bills'].length;
        }
      }

      if (!userFound) {
        imgOutput = `<img src='https://answers-afd.microsoft.com/static/images/image-not-found.jpg'
         width=500 height =500 class="flex w-[70%] mx-auto " >`
        resultName.innerHTML = imgOutput
        document.getElementById('records').innerHTML = "";
        document.getElementById('bill').innerHTML = "";
        return;
      }

      billOutput += `
        <tr>
          <td class="border-4 border-white text-center font-semibold px-2 py-1 md:px-5 md:py-3
           bg-yellow-100">₹${totalBill.toFixed(2)}</td>
          <td class="border-4 border-white text-center font-semibold px-2 py-1 md:px-5 md:py-3
           bg-yellow-100">₹${avgBill.toFixed(2)}</td>
          <td class="border-4 border-white text-center font-semibold px-2 py-1 md:px-5 md:py-3
           bg-yellow-100">${avgUnits.toFixed(0)}</td>
        </tr>`;

      console.log(`Total bill is ${totalBill}`);
      document.getElementById('records').innerHTML = output;
      document.getElementById('bill').innerHTML = billOutput;
    });
}

searchBtn.addEventListener("click", () => {
  enteredName = nameEntered.value.trim().toLowerCase();
  resultName.innerHTML = enteredName.toUpperCase();
  apiRender();
  nameEntered.value = '';
});


// let nameEntered = document.querySelector("#name");
// let searchBtn = document.querySelector("button");
// let result = document.querySelector(".result");
// let resultName = document.querySelector('.resultName')
// let month = document.querySelector('#months')

// let monthVal = "All";
// let monthClicked = false

// month.addEventListener('click',()=>{
//   monthVal = month.value
//   console.log(monthVal)
//   if(monthVal=='All'){
//     monthClicked=false
//   }else{
//     monthClicked=true
//   }
//   console.log(`Month clicked value is ${monthClicked}`)
// })


// let enteredName ;
// nameEntered.addEventListener("keypress",(e)=>{
//   if(e.target = 'Enter' ){
//     enteredName = nameEntered.value
//   }
// })

// let flag = []
// function apiRender(){
//   fetch(`./data.json`)
//     .then(res => res.json())
//     .then(res => {
//         console.log(res)
//         console.table(res['electricity_bills'])
        
//         output = ` 
//         <tr>
//           <th class="border-4 text-center text-white border-white font-bold bg-slate-400 px-4 p-3">Month</th>
//           <th class="border-4 text-center text-white border-white font-bold bg-slate-400 px-4 p-3">Amount</th>
//           <th class="border-4 text-center text-white border-white font-bold bg-slate-400 px-4 p-3">Units used</th>
//           <th class="border-4 text-center text-white border-white font-bold bg-slate-400  px-4 p-3">Paid on</th>
//         </tr>`;

//         let totalBill = 0
//         let avgBill = 0
//         let avgUnits = 0
        

//         billOutput=`
//           <tr>
//             <th class="border-4 text-center border-white font-bold px-5 py-3 bg-yellow-300" >Total Bill</th>  
//             <th class="border-4 text-center border-white font-bold px-5 py-3 bg-yellow-300">Average Bill</th>  
//             <th class="border-4 border-white text-center font-bold px-5 py-3 bg-yellow-300">Average Units</th>  
//           </tr>
//         `
//         // let checkName;
//         // for(let i =0;i<res['electricity_bills'].length;i++){
//         //   checkName = res['electricity_bills'][i]['name']
//         //   if(enteredName == checkName){
//         //     flag = true
//         //     break
//         //   }else{
//         //     flag = false
//         //   } 
//         // }


        

//         for(let i = 0; i < res['electricity_bills'].length; i++) {
//           nameInside = res['electricity_bills'][i]['name'] 
          
//           for(let j=0;j<res['electricity_bills'][0]['monthly_bills'].length;j++){
//             monthInside = res['electricity_bills'][i]['monthly_bills'][j]

//             if(enteredName == nameInside && monthVal == monthInside['month']){

//               output +=`<tr>
//                 <td class="border-4 font-semibold text-center border-white bg-slate-300  px-4 p-3">${monthInside['month']}</td>
//                 <td class="border-4 font-semibold  text-center border-white bg-slate-200  px-4 p-3">₹${monthInside['amount']}</td>
//                 <td class="border-4 font-semibold  text-center border-white bg-slate-300  px-4 p-3">${monthInside['units_used']}</td>
//                 <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-200  p-3">${monthInside['bill_paid_date']}</td>
//               `
//               totalBill +=monthInside['amount']
//               avgBill+=totalBill
//               avgUnits+=monthInside['units_used']

//               flag.push(1)
              

//             }else if(enteredName == nameInside && monthClicked == false ){

//                 output +=`<tr>
//                   <td class="border-4 font-semibold text-center border-white bg-slate-300  px-4 p-3">${monthInside['month']}</td>
//                   <td class="border-4 font-semibold  text-center border-white bg-slate-200  px-4 p-3">₹${monthInside['amount']}</td>
//                   <td class="border-4 font-semibold  text-center border-white bg-slate-300  px-4 p-3">${monthInside['units_used']}</td>
//                   <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-200  p-3">${monthInside['bill_paid_date']}</td>
//                 `
//                 totalBill +=monthInside['amount']
//                 avgBill=totalBill/res['electricity_bills'][i]['monthly_bills'].length
//                 avgUnits+=monthInside['units_used']/res['electricity_bills'][i]['monthly_bills'].length

//                 flag.push(1)
                
                
//             }else if(enteredName != nameInside){
//               flag.push(0)
//             }

              
//               // else{
//                 //   console.log('second')
//                 //   nameInside = res['electricity_bills'][i]['name'] 
//                 //   monthInside = res['electricity_bills'][i]['monthly_bills'][j]
                
//                 //   output +=`<tr>
//                 //     <td class="border-4 font-semibold text-center border-white bg-slate-500  px-4 p-3">${monthInside['month']}</td>
//                 //     <td class="border-4 font-semibold  text-center border-white bg-slate-400  px-4 p-3">₹${monthInside['amount']}</td>
//                 //     <td class="border-4 font-semibold  text-center border-white bg-slate-500  px-4 p-3">${monthInside['units_used']}</td>
//                 //     <td class="border-4 font-semibold  text-center border-white px-4 bg-slate-400  p-3">${monthInside['bill_paid_date']}</td>
//             //   `
//             // }
//           }

//           // output = output + `<tr>
          
//           //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['month']}</td>
//           //       <td class="border-2 border-black p-3">₹${res['electricity_bills'][i]['monthly_bills'][i]['amount']}</td>
//           //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['units_used']}</td>
//           //       <td class="border-2 border-black p-3">${res['electricity_bills'][i]['monthly_bills'][i]['bill_paid_date']}</td>
//           //     </tr>`
//         }
//         billOutput+=`
//               <tr>
//                 <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">₹${totalBill.toFixed(2)}</td>
//                 <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">₹${avgBill.toFixed(2)}</td>
//                 <td class="border-4 border-white text-center font-semibold px-5 py-3 bg-yellow-100">${avgUnits.toFixed(0)}</td>
//               </tr>
//               `
//         console.log(`Total bill is ${totalBill}`)
//         document.getElementById('records').innerHTML = output
//         document.getElementById('bill').innerHTML = billOutput
      

//         // for(let j=0;j<res['electricity_bills'][0]['monthly_bills'].length;j++){
//         //   output +=`<tr>
//         //     <td class="border-4 text-center border-white bg-slate-500  px-4 p-3">${res['electricity_bills'][0]['monthly_bills'][j]['month']}</td>
//         //     <td class="border-4 text-center border-white bg-slate-400  px-4 p-3">₹${res['electricity_bills'][0]['monthly_bills'][j]['amount']}</td>
//         //     <td class="border-4 text-center border-white bg-slate-500  px-4 p-3">${res['electricity_bills'][0]['monthly_bills'][j]['units_used']}</td>
//         //     <td class="border-4 text-center border-white px-4 bg-slate-400  p-3">${res['electricity_bills'][0]['monthly_bills'][j]['bill_paid_date']}</td>
//         //   `
//         // }
//         // for(let i=0;i<res['electricity_bills'].length;i++){
//         //   if(nameEntered.value == res['electricity_bills'][i]['name']){
//         //     elmName = document.createElement('p')
//         //     elmName.textContent = res['electricity_bills'][i]['name']
//         //     result.appendChild(elmName)
//         //   }
//         // }
//         //<td class="border-2 border-black p-3">${res['electricity_bills'][i]['name']}</td>

        
//         // for(let i=0;i<flag.length;i++){
//           // flag.sort()
//           // console.log(flag)
//         // }/

//     })
// }

// // for(let i=0;i<flag.length;i++){
// //   flag.sort()
// //   console.log(flag)
// // }
// let TFval = false ;
// searchBtn.addEventListener("click", () => {
//   // if(flag.sort()[flag.length - 1] == 1){
//     resultName.innerHTML = enteredName.toUpperCase()
//     apiRender()
//     nameEntered.value = ''
//     // flag.sort()
//     console.log(flag.sort())
//     for(let i=0;i<flag.length;i++){
//       if(flag[i] == 0){
//         TFval = false
//       }else{
//         TFval = true
//         break
//       }
//     }
//     console.log(TFval)

//   // }else{
//   //   resultName.innerHTML = "Error"
//   // }
//   // console.log(flag)
// });