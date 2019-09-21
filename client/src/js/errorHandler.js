function errorHandler(err){
    Swal.close()
    if(err.response){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data.message}`
    })
        if(err.response.status === 401 ||err.response.status === 403) {
            localStorage.removeItem('token')
            this.$router.push('/')
        }
    }
    else if(err.request){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `No response from server`
        })
    }
    else {
        console.log(err)
    }
}

export default errorHandler