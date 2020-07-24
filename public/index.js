const btnRemove = document.getElementsByClassName('btn-danger');
for(let i = 0; i < btnRemove.length ; i++){
    btnRemove[i].addEventListener('click',()=>{
        let urlId = btnRemove[i].getAttribute('data-id');
        //Call Ajax to get update when delete Url
        $.ajax({
            method: "POST",
            url: "/delete",
            data:{"url": urlId},
            success: (result) =>{
                $('tbody').empty();
                for(let url of result.allUrlsLeft){
                    //Reset data on board
                    $('tbody').append(`
                    <tr>
                    <td>
                        <a href="${url.fullUrl}">${url.fullUrl}</a>
                    </td>
                    <td>
                        <a href="${url.shortUrl}">${url.shortUrl}</a>
                    </td>
                    <td>
                        <button class="btn btn-danger" data-id="${url.shortUrl}" >X</button>
                    </td>
                </tr>
                `)    
                }

                

            }
        })
    });
}
$(document).ready(()=>{
    $.ajax({
        error: (error)=>{
            if(error.responseText == 'showAlert'){
                alert("Existed Short Url");
            }
        }
    })
})