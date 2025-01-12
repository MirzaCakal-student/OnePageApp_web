document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  
    
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;
    
    
    if (username && password) {
        
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        
        setTimeout(function() {
            window.location.href = "main.html"; 
        }, 2000); 
    } else {
       
        var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }
});