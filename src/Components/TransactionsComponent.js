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
        if(this.props.responseObject !== null){
            console.log('bb');
            this.parseHistoryList(this.props.responseObject.return);
        }
    }

    parseHistoryList(response){
        if(response.historyList !== undefined){
            console.log('cc');
            this.setState({products : response.historyList})
        }
        else{
            this.setState({products : []})
        }
    }
    render() {
        console.log(this.state);
        console.log(this.columns);
        return (
            <div style={{display:"flex"}}>
                <div className="card-transactions">
                    <h2>Transactions History</h2>
                    <hr/>
                    <BootstrapTable
                        keyField='waktu'
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
