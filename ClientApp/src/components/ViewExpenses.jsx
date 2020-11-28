﻿import React from 'react';
import { Layout } from './Layout';
import "./css/root.css"
import "./css/ViewExpenses.css"
import { PieChart } from 'react-minimal-pie-chart';


function ViewExpenses(props) {

    const { allTransaction } = props.location.state;

    function renderClientInfoTable(alltransaction) {

        let data = [];
        let newData = [];


        // Link: https://medium.com/@tgknapp11/render-a-chart-with-react-minimal-pie-chart-e30420c9276c
        allTransaction.map((transaction) => {
            var randomColor = "#000000".replace(/0/g, function () {
                return (~~(Math.random() * 16)).toString(16);
            });
            if (transaction.transactionSource === 'Bill Payment') {

                let insert = {
                    color: randomColor,
                    title: transaction.transactionCategory,
                    value: transaction.transactionValue,
                };
                data.push(insert);
            }

            //Link :  https://www.tutorialspoint.com/merge-object-and-sum-a-single-property-in-javascript
            // Reference : https://dev.to/ramonak/javascript-how-to-merge-multiple-objects-with-sum-of-values-43fd
            const newArray = (data) => {
                return [...data].reduce((acc, val, i, arr) => {
                    const { color, title, value } = val;
                    const ind = acc.findIndex(el => el.title === title);
                    if (ind !== -1) {
                        acc[ind].value += value;
                    } else {
                        acc.push({
                            color: color,
                            title: title,
                            value: value,
                        });
                    }
                    return acc;
                }, []);
            }
            newData = newArray(data);
        });

        // Sum for individual Catagory
        let sum = 0;
        for (let i = 0; i < newData.length; i++) {
            sum += newData[i].value;
        }


        return (
            <section id="view-expenses-section">

                <table className='table' aria-labelledby="tabelLabel">
                    <thead>
                        <tr className="col-sm-4">
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newData.map(transaction =>
                            <tr>
                                <td>{transaction.title}</td>
                                <td>{`$${transaction.value}`}</td>
                                <td>{`${Math.round((transaction.value / sum) * 100)} %`}</td>
                            </tr>
                        )}
                    </tbody>
                </table>               
                <p class="p-3 mb-2 bg-info text-white text-center">{`Total Expenses: $${sum}`}</p>
                <p class="p-3 mb-2 bg-info text-white text-center">Pie Chart for Tracking Expenses</p>
                <section id="pie-chart">
                    <PieChart
                        data={newData}
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        startAngle={0}
                        labelPosition={65}
                        labelStyle={{
                            fontSize: "6px",
                            fontWeight: "400",
                        }}
                        label={({ dataEntry }) => `${dataEntry.title}  ${Math.round(dataEntry.percentage)} %`}
                    />;
                </section>
            </section>
        );
    }
    
    let contents = renderClientInfoTable(allTransaction);

    return (
        <section id="view-expenses">
            <Layout />
            <h1>View Expenses</h1>
            {contents}
        </section>
    );
    
}

export { ViewExpenses };