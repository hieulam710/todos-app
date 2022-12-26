
// let baseApi = 'http://127.0.1:3000/api/v1/todos';
// fetch(baseApi)
//     .then((res) => res.json())
//     .then((data) => {
//         let arrData = data.data
//         let lastTask = 0
//         let taskDone = document.getElementById('taskDone');
//         let todoContent = document.getElementById('renderList');

//         for (let i = 0; i < arrData.length; i++) {
//             if (arrData[i].completed) {
//                 todoContent.innerHTML += `<li>
//                 <span id="textDecor" style="text-decoration: line-through">${arrData[i].title}</span>
//                 <div class="icon delete">
//                     <i class="fa-solid fa-trash"></i>
//                 </div>
//             </li>`

//             } else {
//                 lastTask += 1
//                 todoContent.innerHTML += `
//                 <li>
//                     <span id="textDecor" >${arrData[i].title}</span>
//                     <div class="icon delete">
//                         <i class="fa-solid fa-trash"></i>
//                     </div>
//                 </li>`
//                 taskDone.innerHTML = lastTask

//             }
//         }
//         let plusBtn = document.getElementById('plus');
//         plusBtn.addEventListener('click', () => {
//             let inputValue = document.getElementById('inputBtn').value;
//             let objPost = 
//                 {
//                     userId: 11,
//                     id: 2,
//                     title: `${inputValue}`,
//                     completed: false
//                 }
//             arrData.unshift(objPost);
//             fetch(baseApi,{
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(arrData),
//             })
//             .then((res)=>res.json())
//             .then(data)
//             .catch(err => console.log(err))
//             inputValue = ""
//         })
        
       

//         // })

//     })
//     .catch((err) => console.log(err))