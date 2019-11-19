// TransactionsComponent.js

import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Transactions.css'
class TransactionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName :'Christopher Billy Setiawan',
            acc_no : '1234567890',
            balance : '1000000'
        };
    }
    columns = [{
        dataField: 'timestamp',
        text: 'Waktu Transaksi'
    }, {
        dataField: 'jenis_transaksi',
        text: 'Jenis Transaksi',
    }, {
        dataField: 'jumlah_transaksi',
        text: 'Jumlah Transaksi'
    }, {
        dataField: 'rekening_terkait',
        text: 'Rekening Terkait'
    }];

    // products = []
    products = [{
        timestamp: 'gatau',
        jenis_transaksi: 'Kredit',
        jumlah_transaksi: 100000,
        rekening_terkait: 1234567812,
    }, {
        timestamp: 'cie',
        jenis_transaksi: 'Debit',
        jumlah_transaksi: 100000,
        rekening_terkait: 1234567812,
    }]
    render() {
        return (
            <div style={{display:"flex"}}>
                <div className="card-transactions">
                    <h2>Transactions History</h2>
                    <hr/>
                    <BootstrapTable
                        keyField='id'
                        data={ this.products }
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
