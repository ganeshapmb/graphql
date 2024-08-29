export default function PaymentSuccess({
    searchParams:{amount},
}:{searchParams:{amount:string};}){
    return(
        <div>
            <p>Success ho gaya</p>
            <p>${amount}</p>
        </div>
    )
}