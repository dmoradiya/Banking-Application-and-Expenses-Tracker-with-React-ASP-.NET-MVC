﻿import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../components/Layout';


function CloseAccount(props) {
    const [accountID, setAccountID] = useState("");    
    const [response, setResponse] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    // Populate DropDown Select Option with Account(S)
    const [accountInfo, setAccountInfo] = useState([]);
    const [loading, setLoading] = useState(true);

   
    async function populateClientData() {
        const response = await axios.get('BankAPI/LandingPage');
        setAccountInfo(response.data);
        setLoading(false);
    }

    useEffect(() => {
        populateClientData();
    }, [loading]);



    function handleFieldChange(event) {
        switch (event.target.id) {
            case "accountID":
                setAccountID(event.target.value);
                break;          
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setWaiting(true);
        setIsSubmit(true);
              
        // Patch Request
        axios(
            {
                method: 'patch',
                url: 'BankAPI/CloseAccount',
                params: {
                    accountID: accountID,
                }
            }
        ).then((res) => {
            setWaiting(false);
            setResponse(res.data);


        }
        ).catch((err) => {
            setWaiting(false);
            setResponse(err.response.data);
        });

        event.target.reset();
    }

    return (
        <div>
            <Layout />
            <h1> Make a Deposit </h1>
            <p>{isSubmit ? <p>{waiting ? "Waiting..." : `${response}`}</p> : ""}</p>

            <br />
            <form onSubmit={handleSubmit}>

                <label htmlFor="accountID">Account Type</label>
                <select id="accountID" onChange={handleFieldChange}>
                    <option value="" >Choose here</option>
                    {accountInfo.map(client => (
                        <option key={client.accountID} value={`${client.accountID}`}>
                            {console.log(client.accountID)}
                            {`${client.accountType} Account      Total Balance: $${client.accountBalance + client.accountInterest}`}
                        </option>
                    ))}
                </select>               
                <br />
                <input type="submit" className="btn btn-primary" value="Close Account" />
            </form>
        </div>


    );

}
export { CloseAccount };