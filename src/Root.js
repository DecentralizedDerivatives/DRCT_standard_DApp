import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];
let composeEnhancer = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// TODO: move into Root when tests are improved
// temporary to avoid changing core before that
export function initStore( initialState = {} ) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
}

export function initFixtureStore() {
  return initStore({
    user: {
      userAccount: '0xd8e09fbab17f30e1C2b2Ae85A26EA1F3F31267ef',
      userBalance: 0,
      userTransactions: [
        {
          title: 'ContractCreation',
          hash: '0x7e1bf33a238354bebfd59f2bbd88a99e75c0b75d9aaa5a2e4b4225e1e51369fb'
        },
        {
          title: 'ContractCreation',
          hash: '0xd41070659dbcdf364914fdeaa55ebfa4ea9571d0'
        }
      ],
      userPositions: [{
        address: '0xd41070659dbcdf364914fdeaa55ebfa4ea9571d0',
        balance: 50,
        date: '10/26/2018',
        symbol: 'ETH/USD',
        contractDuration: 42,
        contractMultiplier: 2.5,
        contractGain: 3.5,
        tokenType: 'Long'
      },
      {
        address: '0xd41070659dbcdf364914fdeaa55ebfa4ea9571d0',
        balance: 50,
        date: '10/26/2018',
        symbol: 'ETH/USD',
        contractDuration: 42,
        contractMultiplier: 2.5,
        contractGain: 0,
        tokenType: 'Long'
      },
      {
        address: '0xd41070659dbcdf364914fdeaa55ebfa4ea9571d0',
        balance: 50,
        date: '10/26/2018',
        symbol: 'ETH/USD',
        contractDuration: 42,
        contractMultiplier: 2.5,
        contractGain: -1,
        tokenType: 'Long'
      }],
      userTokens: [
        {
          address: '0xd41070659dbcdf364914fdeaa55ebfa4ea9571d0',
          balance: 50,
          date: '10/26/2018',
          tokenType: 'Long',
          symbol: 'ETH/USD'
        }
      ],
      userOrders: [],
      userOrderLabels: '',
      cashOut: {
        id: '',
        amount: 0
      },
      cashOutError: null
    },
    contract: {
      contractAddress: '',
      contractCurrentPrice: 0,
      contractDuration: 0,
      contractGain: 0,
      contractMultiplier: 0,
      oracleAddress: '',
      orderbook: [
        {
          orderId: '25',
          creatorAddress: '0xd8e09fbab17f30e1C2b2Ae85A26EA1F3F31267ef',
          address: '0xaf0ff6be724648362c63921736505354af16ac3a',
          price: '0.20000',
          quantity: '200',
          date: '11/09/2018',
          symbol: 'ETH/USD',
          contractGain: 0,
          tokenType: 'Long'
        },
        {
          orderId: '25',
          creatorAddress: '0xc69c64c226fea62234afe4f5832a051ebc860540',
          address: '0xaf0ff6be724648362c63921736505354af16ac3a',
          price: '0.20000',
          quantity: '200',
          date: '11/09/2018',
          symbol: 'ETH/USD',
          contractGain: 0,
          tokenType: 'Long'
        }
      ],
      recentTrades: [
        {
          address: '0x65696fae9ee29c84c9e8a5a33cdf6e4a81458d64',
          volume: '1000',
          price: '0.11000',
          orderDate: '10/12/2018',
          contractDuration: 7,
          contractMultiplier: 5,
          symbol: 'ETH/USD',
          tokenType: 'Short',
          date: 'Fri Oct 12 2018 03:00:00 GMT+0300 (Eastern European Summer Time)'
        }
      ],
      contractOpenDates: {},
      contractStartPrice: 1,
      newContract: {
        id: '',
        address: '',
        duration: '',
        currency: '',
        startDate: '',
        amount: 0,
        funded: false,
        fundedTx: ''
      },
      newContractCreateError: null,
      newContractFundsError: null
    },
    order: {
      orderDetails: '',
      buy: {
        id: '',
        orderId: 0
      },
      buyOrderError: null,
      list: {
        id: '',
        token: '',
        price: 0,
        tokenAmount: '',
        approved: false
      },
      listOrderError: null,
      listOrderApproveError: null,
      unlist: {
        id: '',
        orderId: ''
      },
      unlistOrderError: null
    },
    status: {
      connectStatus: {
        metamask: true,
        network: 4,
        whiteListed: true,
        verified: true
      },
      isConnectModalOpen: false,
      isProcessing: false,
      fetchInProgress: [],
      fetchingError: []
    },
    form: {},
    data: {
      pricechart: [
        [
          1533708000000,
          6551.98
        ]
      ]
    }
  });
}

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  return <Provider store={store}>{children}</Provider>;
};

export default Root;
