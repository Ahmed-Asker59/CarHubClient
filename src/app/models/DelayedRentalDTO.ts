export interface DelayedRentalDTO{
    clientID :number 
    clientName :string 
    clientPhone :number
    car:string
    rentalDate:Date
    endDate :Date
    rentalPrice :number
    delayInDays:number
    actualReturnDate :Date
}