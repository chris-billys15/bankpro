// TransactionsComponent.js

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Transactions.css'
class TransactionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.parseHistoryList = this.parseHistoryList.bind(this);
        this.columns = [{
            dataField: 'waktu',
            text: 'Waktu Transaksi'
        }, {
            dataField: 'jenis',
            text: 'Jenis Transaksi'
        }, {
            dataField: 'jumlah',
            text: 'Jumlah Transaksi',
        }, {
            dataField: 'rekeningTerkait',
            text: 'Rekening Terkait'
        }];
    }


    componentDidMount() {
        if(this.props.responseObject){
            this.parseHistoryList(this.props.responseObject.return.historyList);
        }
    }

    parseHistoryList(historyList){
        if(historyList !== null){
            this.setState({products : historyList})
        }
    }
    render() {
        return (
            <div style={{display:"flex"}}>
                <div className="card-transactions">
                    <h2>Transactions History</h2>
                    <hr/>
                    <BootstrapTable
                        keyField='id'
                        data={ this.state.products }
                        columns={ this.columns }
                        noDataIndication= "Oops.. No Transaction Found :("
                        striped
                        bordered={false}
                        wrapperClasses="table-responsive"/>
                </div>
            </div>
        );
    }
}

export default TransactionsComponent;
