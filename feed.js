

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 
  
  //****************** */

function onPageLoad(){
  
    let token = getCookie('xmemeJwt')
  token = token.substring(1,token.length-1)
   params={
    method:'get',
    headers:{
       'Content-Type':'application/json',
       'authorization': token
    }
   }
   console.log(token)
    url = 'https://xmeme-i4d8.onrender.com/feed'
    fetch(url,params).then((response)=>{
       return response.json();
    }).then((data)=>{
         if(!data.status){

            window.location='./login.html'
         }
         else{

            console.log(data) 
            memeFile = data.data
            let result ="";
            console.log(memeFile)
            for(var i =0;i<memeFile.length;i++){

              const s = new Date(memeFile[i]['dateTime'])
             s.toLocaleString()
            const time = s.getDay()+'/'+s.getMonth()+1+'  '+s.getHours()+':'+s.getMinutes()
          
            result =result+ '<div class="max-[700px]:mx-8 my-16 bg-white rounded-lg mx-16 mr-16 pt-6 shadow-2xl outline-1 outline-double outline-gray-200"><div class="flex ml-4 "><div><img src="./Resources/avatar.png" class="rounded-t-full w-9 h-9"></div><h2 class="ml-3 text-base font-semibold mt-3">'+memeFile[i]['username']+'</h2></div><p class=" mb-3 mt-6 text-gray-700 ml-2 text-xs">'+memeFile[i]['caption']+'</p><img src="'+memeFile[i]['image']+'" class="max-[400px]:h-[24rem] h-[30rem] w-full bg-cover bg-no-repeat "><div class="flex flex-row"> <p class="ml-3 text-center pt-4 text-sm text-gray-600 font-semibold" id="date">'+ s+'</p> </div></div>';
           
          }
                document.getElementById("meme_space").innerHTML= result 
         }
    })  

    
}





const shareform = document.forms['shareForm']
shareform.addEventListener('submit',(e)=>{
  
    let token = getCookie('xmemeJwt')
    token = token.substring(1,token.length-1)
        e.preventDefault();
        const image1 = shareform.querySelector('input[type="file"]').files[0]
        const caption1 = shareform.querySelector('textarea[name="caption"]').value
        console.log(image1)
        console.log(caption1)
        const formdata = new FormData();
        formdata.append("image",image1)
        formdata.append("caption",caption1)
        
        console.log(formdata.get('caption'))
          params = {
             method:'POST',
             headers:{
                'authorization':token
             },
             body: formdata,
          }
          
          url = 'https://xmeme-i4d8.onrender.com/upload'

          fetch(url,params).then((response)=>{
            return response.json()
          }).then((data)=>{
                 
               if(data.status){
                  alert('meme posted !')
                  shareForm.reset()
                  onPageLoad()
               }
               else{
                
                alert('Some error occured!')
               }

          })

         
        
        })
