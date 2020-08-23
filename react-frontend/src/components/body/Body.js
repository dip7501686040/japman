import React from 'react'
import './Body.css'
import ProductDetails from './product_details/ProductDetails'
import CreditDebit from './credit_debit/CreditDebit'

function Body() {
    return (
        <div className="body_container">
            <CreditDebit />
            <ProductDetails/>
        </div>
    )
}

export default Body
