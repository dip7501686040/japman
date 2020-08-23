import React, { useContext, useEffect, useRef } from 'react'
import './ProductDetails.css'
import { ItemContext } from '../../../App'

function ProductDetails() {

    const itemContext = useContext(ItemContext)
    const input1FocusRef = useRef(null)

    useEffect(() => {
        if (Object.keys(itemContext.itemState.item).length !== 0) {
            
            input1FocusRef.current.focus()
        }

    }, [itemContext.itemState])

    return (
        <div className="product_details">
            <span className="product__details__header">
                Product Details
            </span>
            <div className="product__list__container">
                <ul className="product__details__list">
                    <li className="product__details__list__item">
                        <span className="col-3">Name :</span>
                        <span className="col-8">{itemContext.itemState.item.name}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">QTY :</span>
                        <input ref={input1FocusRef} type='text' className="col-8" />
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Instock :</span>
                        <span className="col-8">{itemContext.itemState.item.instock}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">MRP :</span>
                        <span className="col-8">{itemContext.itemState.item.mrp}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Expiry :</span>
                        <span className="col-8">{itemContext.itemState.item.expiry}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Tax :</span>
                        <span className="col-8">{itemContext.itemState.item.tax}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Purchase Rate :</span>
                        <span className="col-8">{itemContext.itemState.item.purchase_rate}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Selleing Rate :</span>
                        <span className="col-8">{itemContext.itemState.item.selling_rate}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Discount :</span>
                        <span className="col-8">{itemContext.itemState.item.discount}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Batch :</span>
                        <span className="col-8">{itemContext.itemState.item.batch}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">HSN :</span>
                        <span className="col-8">{itemContext.itemState.item.hsn}</span>
                    </li>
                    <li className="product__details__list__item">
                        <span className="col-3">Free :</span>
                        <span className="col-8">{itemContext.itemState.item.free}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductDetails
