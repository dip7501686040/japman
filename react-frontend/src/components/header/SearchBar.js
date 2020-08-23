import React, { useState, useEffect, useRef, useContext } from 'react'
import './SearchBar.css'
import axios from 'axios';
import { ItemContext } from '../../App';

function SearchBar() {

    const [productName, setProductName] = useState('')
    const [toggleDisplay, setToggleDisplay] = useState('')
    const [responseData, setResponsedata] = useState([])
    // const [downKeyPressEvent, setDownKeyPressEvent] = useState(false)
    const inputFocusRef = useRef(null)
    // const listItemFocusRef = useRef(null)
    const itemContext = useContext(ItemContext)

    useEffect(() => {

        // fetch searched data //
        let cancelToken = axios.CancelToken.source();

        if (productName !== '') {
            axios.post('http://localhost:8000/api/product', {
                productName: productName
            },
                {
                    cancelToken: cancelToken.token
                })
                .then(function (response) {
                    if (response.data.length > 0) {
                        setToggleDisplay('active')
                        setResponsedata(response.data)
                    }
                    else {
                        setToggleDisplay('')
                    }

                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('axios: ' + error)
                    }
                    else {
                        console.log('Data fatching error: ' + error)
                    }
                });

        }
        else {
            setToggleDisplay('')
            // setDownKeyPressEvent(false)
        }
        // set initial focus to searchbox //
        inputFocusRef.current.focus()

        return () => {
            cancelToken.cancel()
        }

    }, [productName])

    // function downKeyPressHandler(e) {
    //     if (e.keyCode === 40 && responseData.length) {
    //         // document.getElementById("result__list").firstChild().focus();
    //         setDownKeyPressEvent(true)
    //         console.log(downKeyPressEvent)
    //     }
    // }

    // useEffect(() => {
    //     if(downKeyPressEvent && responseData.length){
    //         console.log(listItemFocusRef.current.focus())
    //     }
    // }, [downKeyPressEvent, responseData])

    


    return (
        <div id="search-box-container">
            <input type="text" ref={inputFocusRef} value={productName} id="search____box" placeholder="Search For A Product . . ."
                onChange={e => setProductName(e.target.value)}
            //onKeyDown={e => e.keyCode === 40? setDownKeyPressEvent(true) : ''}
            />
            <div className={'search__results__container ' + toggleDisplay}>
                <ul id='result__list'>
                    {responseData.length ? responseData.map(item => (
                        <li key={item.id} className='result__list__item'
                            onClick={() => {
                                setProductName('')
                                setToggleDisplay('')
                                itemContext.itemDispatch({type:'data', payLoad: item})
                            }}>
                            {item.name}
                        </li>
                    ))
                        : null}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar

// import React, { Component } from 'react'

// class SearchBar extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             productName: '',
//         }

//         this.handleChange = this.handleChange.bind(this);
//     }


//     handleChange(event) {
//         this.setState({ productName: event.target.value });
//     }
//     componentDidUpdate(prevProps){
//         if(prevProps.productName != this.state.productName){
//             alert(this.state.productName)
//         }
//     }


//     render() {
//         return (
//             <div id="search-box-container">
//                 <input type="text" name="" id="search-box" placeholder="Search For A Product . . ."
//                     onChange={this.handleChange} />
//             </div>

//         )
//     }
// }

// export default SearchBar

